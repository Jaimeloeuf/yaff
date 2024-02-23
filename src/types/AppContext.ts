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
   *
   * Note this uses `queueReRender` under the hood to trigger re-renders, so
   * multiple synchronous calls to this will only re-render once.
   */
  updateState: (state: Partial<State>) => void;

  /**
   * Call this function to trigger a reRender
   *
   * Note that multiple synchronous calls to this will be combined to only
   * re-render once.
   */
  queueReRender: () => void;
}
