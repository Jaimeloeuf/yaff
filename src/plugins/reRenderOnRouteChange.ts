import type { AppGlobalState, AppContext } from "../types/index";

/**
 * Router Plugin that triggers a re-render on history change through browser
 * controls like back/forward buttons.
 */
export function reRenderOnRouteChange<State extends AppGlobalState = any>({
  queueReRender,
}: AppContext<State>) {
  window.addEventListener("popstate", () => queueReRender());
}
