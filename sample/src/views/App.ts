import { AppContext } from "../../../dist";
import type { State } from "../State";
import { routerViewComponent } from "../router";

export function App(ctx: AppContext<State>) {
  return routerViewComponent(ctx);
}
