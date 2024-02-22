import type { AppGlobalState } from "./AppGlobalState";

/**
 * The current app's context, passed to every single UI component function on
 * every single render, and passed to every single plugin on app start. Contains
 * everything needed to use the framework, accessing global app state, updating
 * the state, and triggering a re-render.
 */
export interface AppContext<State extends AppGlobalState = any> {
  /**
   * The global app state.
   */
  state: State;

  /**
   * Call this function to update the global app state and trigger a re-render
   * using the new state.
   */
  updateState: (state: Partial<State>) => void;

  /**
   * Call this function to trigger a reRender
   */
  reRender: () => void;
}
