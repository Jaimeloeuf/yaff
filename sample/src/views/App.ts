import { Todos } from "./Todos";
import { About } from "./About";
import { NotFound } from "./NotFound";

export function App(state, rerender) {
  // This is basically a primitive version of a <RouterView> component from
  // vue-router or react router.
  if (window.location.pathname === "/") {
    return Todos(state, rerender);
  } else if (window.location.pathname === "/about") {
    return About(state, rerender);
  } else {
    return NotFound(state, rerender);
  }
}
