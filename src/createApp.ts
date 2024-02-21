import { mountFF } from "./mount";
import { patchFF } from "./patch";
import type {
  AppGlobalState,
  VNode,
  Component,
  StateChangeHookFn,
  Plugin,
} from "./types/index";

export class Yaff<State extends AppGlobalState> {
  private currentVNode: VNode;
  private mount: (vnode: VNode, container: HTMLElement | ParentNode) => void;
  private patch: (originalVNode: VNode, newVNode: VNode) => void;

  /**
   * State change hooks that will be called on every single state change in the
   * order that they were set, and can optionally do state transform if it
   * returns a new state object.
   *
   * Note that `stateChangeHooks` runs before re-rendering happens.
   */
  private stateChangeHooks: Array<StateChangeHookFn<State>> = [];

  constructor(
    container: HTMLElement,
    private state: State,
    private readonly rootComponent: Component<State>,
    options?: {
      plugins?: Array<Plugin<State>>;
      stateChangeHooks?: Array<StateChangeHookFn<State>>;
    }
  ) {
    // Initialise all plugins, and save any stateChangeHooks returned.
    if (options?.plugins !== undefined) {
      this.stateChangeHooks = options.plugins
        .map((plugin) => plugin({ state, rerender: this.rerender.bind(this) }))
        .filter((stateChangeHook) => stateChangeHook !== undefined) as Array<
        StateChangeHookFn<State>
      >;
    }

    // Merge in any directly set stateChangeHooks onto the instance state change
    // hook functions array after any from the plugins (this take priority).
    if (options?.stateChangeHooks !== undefined) {
      this.stateChangeHooks = this.stateChangeHooks.concat(
        options.stateChangeHooks
      );
    }

    this.mount = mountFF<State>((eventHandler) => (event) => {
      const newState = eventHandler(this.state, event);

      // Only re-render if Event Listener transforms and returns new state.
      if (newState !== undefined) {
        this.rerender(newState);
      }
    });
    this.patch = patchFF(this.mount);

    this.currentVNode = rootComponent(state, this.rerender.bind(this));
    this.mount(this.currentVNode, container);
  }

  /**
   * Re-render UI after optionally updating local state. UI can be re-rendered
   * even if state did not change since UI can rely on externally managed state
   * like window.location.
   */
  private rerender(newState?: State) {
    if (newState !== undefined) {
      this.state = newState;
    }

    // Run all stateChangeHook functions to let them know that state is updated,
    // and optionally use the transformed state if any as the new state.
    this.state = this.stateChangeHooks.reduce(
      (state, stateChangeHook) => stateChangeHook(state) ?? state,
      this.state
    );

    const newVNode = this.rootComponent(this.state, this.rerender.bind(this));
    this.patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }
}

/**
 * Create a new app to mount. This is basically a wrapper around the `Yaff`
 * constructor, where args are inferred from `Yaff.constructor` type.
 */
export const yaff = <State extends AppGlobalState>(
  ...args: ConstructorParameters<typeof Yaff<State>>
) => new Yaff<State>(...args);
