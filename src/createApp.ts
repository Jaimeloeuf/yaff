import { mount } from "./mount";
import type { VNode } from "./VNode";

export function createApp<State>(
  initialState: State,
  app: (state: State) => VNode,
  container: HTMLElement
) {
  mount(app(initialState), container);
}
