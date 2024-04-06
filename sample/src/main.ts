import { yaff } from "../../dist";
import { App } from "./views/App";

/**
 * Define a new application to mount onto the DOM.
 */
function main() {
  const appRootElement = document.getElementById("app");

  if (appRootElement === null) {
    throw new Error("App root element 'app' does not exist");
  }

  yaff.createAppWith(App).mountAppOn(appRootElement);
}

main();
