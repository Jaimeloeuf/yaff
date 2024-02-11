import { mount } from "./mount";
import { patch } from "./patch";
import type { VNode } from "./VNode";

export class Yaff<State> {
  currentVNode: VNode;

  constructor(
    private readonly container: HTMLElement,
    private readonly initialState: State,
    private readonly rootComponent: (state: State) => VNode
  ) {
    this.currentVNode = rootComponent.call(this, this.initialState);
    mount(this.currentVNode, this.container);
  }

  rerender(newState: State) {
    const newVNode = this.rootComponent.call(this, newState);
    patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }
}

// @todo should use an easier way to type the args by inferring constructor type
export const yaff = <State>(
  container: HTMLElement,
  initialState: State,
  rootComponent: (state: State) => VNode
) => new Yaff(container, initialState, rootComponent);
