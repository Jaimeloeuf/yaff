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
    for (const route of config.routes) {
      if (window.location.pathname === route.path) {
        return route.component(ctx);
      }
    }

    return config.notFoundComponent !== undefined
      ? config.notFoundComponent(ctx)
      : defaultNotFoundComponent(ctx);
  }

  return { routerViewComponent };
}
