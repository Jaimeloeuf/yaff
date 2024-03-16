import { mountFF } from "./mount";
import { patchFF } from "./patch";
import { setQueueReRender } from "./reRender";
import { resetHookIndex } from "./useState";
import type {
  AppGlobalState,
  VNode,
  Component,
  StateChangeHook,
  PreRenderHook,
  PluginHooks,
  Plugin,
  AppContext,
} from "./types/index";

export class App<State extends AppGlobalState = any> {
  /**
   * The current app's AppContext<State>
   */
  private appContext: AppContext<State>;

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
  private stateChangeHooks: Array<StateChangeHook<State>> = [];

  /**
   * Pre-render hooks will be called before every single rendering in the order
   * that they were set.
   *
   * Note that `PreRenderHooks` runs right before re-rendering happens and after
   * all `stateChangeHooks` have ran.
   *
   * `resetHookIndex` PreRenderHook is always ran first to ensure useState hook
   * works by default without any user intervention.
   */
  private preRenderHooks: Array<PreRenderHook<State>> = [resetHookIndex];

  /**
   * Instance variable that acts as a flag to track whether there is a pending
   * re-rendering queued.
   *
   * ### See `queueReRender` method for more details
   */
  private reRenderQueued: boolean = false;

  constructor(
    container: HTMLElement,
    private state: State,
    private readonly rootComponent: Component<State>,
    plugins: undefined | Array<Plugin<State>>,
    stateChangeHooks: undefined | Array<StateChangeHook<State>>,
    preRenderHooks: undefined | Array<PreRenderHook<State>>
  ) {
    // Create the initial appContext to use in the constructor.
    this.appContext = {
      state: this.state,
      updateState: this.updateState.bind(this),
      queueReRender: this.queueReRender.bind(this),
    };

    // Set the globally shared queueReRender function so it can be called by any
    // other modules in this library without having to bind it in its closure.
    setQueueReRender(this.appContext.queueReRender);

    // Initialise all plugins, and save any hooks returned.
    if (plugins !== undefined) {
      const pluginHooks = plugins
        .map((plugin) => plugin(this.appContext))
        .filter((hooks) => hooks !== undefined) as Array<PluginHooks<State>>;

      for (const pluginHook of pluginHooks) {
        if (pluginHook.stateChangeHooks !== undefined) {
          this.stateChangeHooks.push(...pluginHook.stateChangeHooks);
        }
        if (pluginHook.preRenderHooks !== undefined) {
          this.preRenderHooks.push(...pluginHook.preRenderHooks);
        }
      }
    }

    // Merge in any directly set stateChangeHooks onto the instance state change
    // hook functions array after any from the plugins (this take priority).
    if (stateChangeHooks !== undefined) {
      this.stateChangeHooks.push(...stateChangeHooks);
    }

    // Merge in any directly set preRenderHooks onto the instance pre render
    // hook functions array after any from the plugins (this take priority).
    if (preRenderHooks !== undefined) {
      this.preRenderHooks.push(...preRenderHooks);
    }

    this.mount = mountFF<State>(
      (eventHandler) => (event) =>
        eventHandler({ event, ...this.createAppContext() })
    );

    this.patch = patchFF(this.mount);

    // Run state change hooks before initial render as state changed from
    // 'nothing' to the default global app state.
    this.runStateChangeHooks();

    this.runPreRenderHooks();

    this.currentVNode = rootComponent(this.appContext);
    this.mount(this.currentVNode, container);
  }

  /**
   * Creates AppContext<State> by re-using the original appContext and only
   * updating the reference to state since only that changes instead of re-
   * creating the whole AppContext object every single time.
   */
  private createAppContext(): AppContext<State> {
    this.appContext.state = this.state;
    return this.appContext;
  }

  /**
   * Call this method to queue for a new re-render in the next event loop.
   *
   * This is an optimisation that combines multiple synchronous re-render
   * requests into a single re-rendering that is ran once the application code
   * yields control back to the framework in the next event loop.
   */
  private queueReRender() {
    // If there is already a reRenderQueued, do nothing
    if (this.reRenderQueued === true) {
      return;
    }

    this.reRenderQueued = true;

    // Use setTimeout to re-render in the next event loop.
    // `reRenderQueued` flag is always cleared synchronously after re-render to
    // prevent future re-render requests from being ignored.
    setTimeout(() => {
      this.reRender();
      this.reRenderQueued = false;
    });
  }

  /**
   * Run all stateChangeHook functions to let them know that state is updated,
   * and optionally use the transformed state if any as the new state.
   */
  private runStateChangeHooks() {
    this.state = this.stateChangeHooks.reduce(
      (state, stateChangeHook) => stateChangeHook(state) ?? state,
      this.state
    );
  }

  /**
   * Run all preRenderHook functions to let them know that rendering is about to
   * happen.
   */
  private runPreRenderHooks() {
    for (const preRenderHook of this.preRenderHooks) {
      preRenderHook(this.state);
    }
  }

  /**
   * Re-render UI after using the root component.
   */
  private reRender() {
    this.runPreRenderHooks();

    const newVNode = this.rootComponent(this.createAppContext());
    this.patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }

  /**
   * Update state, run all stateChangeHooks and queue a UI re-render.
   *
   * Users can pass in only parts of the `State` that they want to update, as
   * this will help to perform the spread operation for them to fill in the
   * missing State properties from the original value.
   */
  private updateState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.runStateChangeHooks();
    this.queueReRender();
  }
}
