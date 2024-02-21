import { App } from "./App";
import type {
  AppGlobalState,
  Component,
  StateChangeHookFn,
  Plugin,
} from "./types/index";

/**
 * `yaff` uses the builder pattern to get all the app options/properties from
 * user before creating an instance of `App` to make it more ergonomic to use.
 */
export class yaff<State extends AppGlobalState> {
  /**
   * Start the builder process by setting the default global app state.
   */
  static appState<State extends AppGlobalState>(
    ...args: ConstructorParameters<typeof yaff<State>>
  ) {
    return new yaff<State>(...args);
  }

  private rootComponent?: Component<State>;
  private plugins?: Array<Plugin<State>>;
  private stateChangeHooks?: Array<StateChangeHookFn<State>>;

  constructor(private readonly state: State) {}

  /**
   * Set the root UI component.
   *
   * Returns this to chain method calls using the builder pattern.
   */
  useRootComponent(rootComponent: Component<State>) {
    this.rootComponent = rootComponent;
    return this;
  }

  /**
   * Set plugins that will run before initial app start.
   *
   * Plugins are functions that are runs on startup, and can optionally return a
   * `StateChangeHookFn` after initialising.
   *
   * Returns this to chain method calls using the builder pattern.
   */
  usePlugins(...plugins: Array<Plugin<State>>) {
    this.plugins = plugins;
    return this;
  }

  /**
   * State change hooks are functions that will be called on every single state
   * change in the order that they were set before a re-rendering happens. These
   * hook functions can optionally do state transform if it returns a new state
   * object.
   *
   * Note that stateChangeHooks set here will run after stateChangeHooks
   * returned from plugins.
   *
   * Returns this to chain method calls using the builder pattern.
   */
  useStateChangeHooks(...stateChangeHooks: Array<StateChangeHookFn<State>>) {
    this.stateChangeHooks = stateChangeHooks;
    return this;
  }

  /**
   * Create new app using the options set and mount onto the provided DOM
   * container element.
   */
  create(container: HTMLElement) {
    if (this.rootComponent === undefined) {
      throw new Error(
        "Missing root component, set using 'useRootComponent' method"
      );
    }

    return new App(
      container,
      this.state,
      this.rootComponent,
      this.plugins,
      this.stateChangeHooks
    );
  }
}
