import { AppContext } from "./AppContext";

/**
 * State change hooks, which can optionally do state transform by returning a
 * new state to replace the original state.
 */
export type StateChangeHook<State> = (state: State) => State | void;

/**
 * Plugins are functions that are runs on startup, and can optionally return a
 * `StateChangeHook` after initialising.
 */
export type Plugin<State> = (
  context: AppContext<State>
) => StateChangeHook<State> | void;
