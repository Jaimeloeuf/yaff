import { yaff } from "../../dist";
import { Store } from "./store";
import { todo } from "./todo";
import { about } from "./about";
import { notFound } from "./notFound";
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

    function (state, rerender) {
      console.log("App state", state);

      if (window.location.pathname === "/") {
        return todo(state, rerender);
      } else if (window.location.pathname === "/about") {
        return about(state, rerender);
      } else {
        return notFound(state, rerender);
      }
    },

    {
      plugins: [
        function reRenderOnRouteChange(_, rerender) {
          window.addEventListener("popstate", () => rerender());
        },
      ],

      stateChangeHooks: [Store.createSave(["todos"])],
    },
  );
}

main();
