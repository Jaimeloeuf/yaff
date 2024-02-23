import {
  yaff,
  Store,
  debugVNodeRenderingTime,
  debugPlugin,
  reRenderOnRouteChange,
} from "../../dist";
import { App } from "./views/App";
import type { State } from "./State";

/**
 * Define a new application to mount onto the DOM.
 */
function main() {
  const appRootElement = document.getElementById("app");

  if (appRootElement === null) {
    throw new Error("App root element 'app' does not exist");
  }

  yaff
    .appState<State>(
      Store.init<State>({
        newTodo: "",
        todos: [],
      }),
    )
    .useRootComponent(debugVNodeRenderingTime(App))
    // .useRootComponent(App) // Use this if no need for debugging
    .usePlugins(debugPlugin, reRenderOnRouteChange)
    .useStateChangeHooks(Store.createSave(["todos"]))
    .create(appRootElement);
}

main();
