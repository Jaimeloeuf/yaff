import { AppContext } from "../../../dist";
import type { State } from "../State";

import { Todos } from "./Todos";
import { About } from "./About";
import { NotFound } from "./NotFound";

export function App(ctx: AppContext<State>) {
  // This is basically a primitive version of a <RouterView> component from
  // vue-router or react router.
  if (window.location.pathname === "/") {
    return Todos(ctx);
  } else if (window.location.pathname === "/about") {
    return About(ctx);
  } else {
    return NotFound(ctx);
  }
}
