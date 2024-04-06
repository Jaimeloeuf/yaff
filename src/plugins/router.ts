import { f } from "../f";
import type { RenderFunction } from "../types/index";

type RouteObject = {
  path: string;
  name: string;
  renderFunction: RenderFunction;
};

type RouterConfig = {
  routes: Array<RouteObject>;
  notFoundComponent?: RenderFunction;
};

/**
 * Default 404 not found component used when user did not supply one.
 */
const defaultNotFoundComponent: RenderFunction = () => f.h1.child("404");

/**
 * Setup router to declaratively define route --> component mappings.
 *
 * @todo support dynamic route component loading just like vue-router
 */
export function router(config: RouterConfig) {
  function routerViewComponent() {
    // Create every single vDOM component first before finding the one component
    // that matches the current route, so that all the hooks will be called in
    // order throughout the entire app as hooks storage is shared globally.
    const matchedRoute = config.routes
      .map((route) => ({
        path: route.path,
        component: route.renderFunction(),
      }))
      .find((route) => route.path === window.location.pathname);

    if (matchedRoute !== undefined) {
      return matchedRoute.component;
    }

    return config.notFoundComponent !== undefined
      ? config.notFoundComponent()
      : defaultNotFoundComponent();
  }

  return { routerViewComponent };
}
