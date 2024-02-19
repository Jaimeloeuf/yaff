import { mountFF } from "./mount";
import { patchFF } from "./patch";
import type { VNode } from "./VNode";

export class Yaff<State> {
  private currentVNode: VNode;
  private mount: (vnode: VNode, container: HTMLElement | ParentNode) => void;
  private patch: (originalVNode: VNode, newVNode: VNode) => void;

  constructor(
    container: HTMLElement,
    private state: State,
    private readonly rootComponent: (
      state: State,
      rerender: (newState?: State) => void
    ) => VNode,

    plugins?: Array<
      (state: State, rerender: (newState?: State) => void) => void
    >
  ) {
    // Initialise all the plugins
    if (plugins !== undefined) {
      for (const plugin of plugins) {
        plugin(state, this.rerender.bind(this));
      }
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

    const newVNode = this.rootComponent(this.state, this.rerender.bind(this));
    this.patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }
}

/**
 * Create a new app to mount. This is basically a wrapper around the `Yaff`
 * constructor, where args are inferred from `Yaff.constructor` type.
 */
export const yaff = <State>(
  ...args: ConstructorParameters<typeof Yaff<State>>
) => new Yaff<State>(...args);
