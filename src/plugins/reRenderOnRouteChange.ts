import { AppContext } from "../types/index";

/**
 * Router Plugin that triggers a re-render on history change through browser
 * controls like back/forward buttons.
 */
export function reRenderOnRouteChange<State>({ reRender }: AppContext<State>) {
  window.addEventListener("popstate", () => reRender());
}
