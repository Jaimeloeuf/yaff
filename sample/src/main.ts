import { yaff } from "../../dist";
import { todo } from "./todo";
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

    function (state) {
      console.log("App state", state);

      return todo(state);
    },
  );
}

main();
