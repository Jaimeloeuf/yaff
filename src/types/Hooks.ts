import type { AppGlobalState } from "./AppGlobalState";

/**
 * State change hooks, which can optionally do state transform by returning a
 * new state to replace the original state.
 */
export type StateChangeHook<State extends AppGlobalState = any> = (
  state: State
) => State | void;

/**
 * Pre-render hooks runs right before the framework renders the App UI.
 */
export type PreRenderHook<State extends AppGlobalState = any> = (
  state: State
) => void;

/**
 * An object of hooks that can be returned after a plugin initialises.
 */
export type PluginHooks<State extends AppGlobalState = any> = {
  stateChangeHooks?: Array<StateChangeHook<State>>;
  preRenderHooks?: Array<PreRenderHook<State>>;
};
