/**
 * This is a `StateChangeHook` used for debugging where it logs out the
 * entire global app state.
 */
export function debugPlugin<State>(state: State) {
  console.log("App State Change:", state);
}
