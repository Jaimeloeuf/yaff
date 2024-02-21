import { yaff } from "../../dist";
import { Store } from "./store";
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

  yaff<State>(
    appRootElement,

    Store.init({
      newTodo: "",
      todos: [],
    }),

    App,

    {
      plugins: [
        function reRenderOnRouteChange({ rerender }) {
          window.addEventListener("popstate", () => rerender());
        },
      ],

      stateChangeHooks: [Store.createSave(["todos"])],
    },
  );
}

main();
