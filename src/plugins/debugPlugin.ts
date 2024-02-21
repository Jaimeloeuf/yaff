/**
 * This plugin is used for debugging where it adds hooks to log out the entire
 * global app state on every state change and render.
 *
 * This uses console.debug, to see it you need to include verbose logging level.
 */
export function debugPlugin() {
  return {
    stateChangeHooks: [
      <State>(state: State) => console.debug("DEBUG-StateChanged:", state),
    ],

    preRenderHooks: [
      <State>(state: State) => console.debug("DEBUG-PreRender:", state),
    ],
  };
}
