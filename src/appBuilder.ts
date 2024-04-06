import { App } from "./App";
import type { RenderFunction } from "./types/index";

/**
 * `yaff` uses the builder pattern to get all the app options/properties from
 * user before creating an instance of `App` to make it more ergonomic to use.
 */
export class yaff {
  /**
   * Start the builder process by setting the root UI component.
   * Returns this to chain method calls using the builder pattern.
   */
  static createAppWith(rootComponent: RenderFunction) {
    return new yaff(rootComponent);
  }

  constructor(private readonly rootComponent: RenderFunction) {}

  /**
   * Create new app using the options set and mount onto the provided DOM
   * container element.
   */
  mountAppOn(container: HTMLElement) {
    return new App(container, this.rootComponent);
  }
}
