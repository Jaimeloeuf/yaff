import { mount } from "./mount";
import type { VNode } from "./VNode";

export function createApp(
  initialState: any,
  app: (state: any) => VNode,
  container: HTMLElement
) {
  mount(app(initialState), container);
}
