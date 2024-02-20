/**
 * State change hooks, which can optionally do state transform by returning a
 * new state to replace the original state.
 */
export type StateChangeHookFn<State> = (state: State) => State | void;

/**
 * Plugins are functions that are runs on startup, and can optionally return a
 * `StateChangeHookFn` after initialising.
 */
export type Plugin<State> = (context: {
  state: State;
  rerender: (newState?: State) => void;
}) => StateChangeHookFn<State> | void;
