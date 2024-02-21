/**
 * This is a `StateChangeHookFn` used for debugging where it logs out the
 * entire global app state.
 */
export function stateChangeDebugger<State>(state: State) {
  console.log("App State Change:", state);
}
