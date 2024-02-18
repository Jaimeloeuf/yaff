import { yaff } from "../../dist";
import { todo } from "./todo";
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

    {
      newTodo: "",
      todos: [],
    },

    function (state, rerender) {
      console.log("App state", state);

      if (window.location.pathname === "/") {
        return todo(state, rerender);
      } else {
        return notFound(state, rerender);
      }
    },
  );
}

main();
