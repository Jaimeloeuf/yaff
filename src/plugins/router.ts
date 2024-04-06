import { f } from "../f";
import type { Component, AppGlobalState, AppContext } from "../types/index";

type RouteObject = {
  path: string;
  name: string;
  component: Component;
};

type RouterConfig = {
  routes: Array<RouteObject>;
  notFoundComponent?: Component;
};

type Route = { path: string };

/**
 * Default 404 not found component used when user did not supply one.
 */
const defaultNotFoundComponent: Component = () => f.h1.child("404");

/**
 * Setup router to declaratively define route --> component mappings.
 *
 * @todo support dynamic route component loading just like vue-router
 */
export function router(config: RouterConfig) {
  function routerViewComponent<State extends AppGlobalState = any>(
    ctx: AppContext<State>
  ) {
    // Create every single vDOM component first before finding the one component
    // that matches the current route, so that all the hooks will be called in
    // order throughout the entire app as hooks storage is shared globally.
    const matchedRoute = config.routes
      .map((route) => ({ path: route.path, component: route.component(ctx) }))
      .find((route) => route.path === window.location.pathname);

    if (matchedRoute !== undefined) {
      return matchedRoute.component;
    }

    return config.notFoundComponent !== undefined
      ? config.notFoundComponent(ctx)
      : defaultNotFoundComponent(ctx);
  }

  return { routerViewComponent };
}
