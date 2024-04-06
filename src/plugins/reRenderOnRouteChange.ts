/**
 * Router Plugin that triggers a re-render on history change through browser
 * controls like back/forward buttons.
 */
export function reRenderOnRouteChange(queueReRender: Function) {
  window.addEventListener("popstate", () => queueReRender());
}
