import { mountFF } from "./mount";
import { patchFF } from "./patch";
import type { VNode } from "./VNode";

export class Yaff<State> {
  currentVNode: VNode;

  mount: (vnode: VNode, container: HTMLElement | ParentNode) => void;
  patch: (originalVNode: VNode, newVNode: VNode) => void;

  constructor(
    container: HTMLElement,
    private state: State,
    private readonly rootComponent: (
      state: State,
      rerender: (newState: State) => void
    ) => VNode
  ) {
    this.mount = mountFF(
      (eventHandler: Function) => (event: Event) =>
        this.rerender(eventHandler(this.state, event))
    );
    this.patch = patchFF(this.mount);

    this.currentVNode = rootComponent(state, this.rerender.bind(this));
    this.mount(this.currentVNode, container);
  }

  /**
   * Update local state, and create new VNodes using the rootComponent and new
   * state, before patching the new VNode changes onto the existing VNode.
   */
  private rerender(newState: State) {
    this.state = newState;

    const newVNode = this.rootComponent(this.state, this.rerender.bind(this));
    this.patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }
}

// @todo should use an easier way to type the args by inferring constructor type
export const yaff = <State>(
  container: HTMLElement,
  initialState: State,
  rootComponent: (state: State) => VNode
) => new Yaff(container, initialState, rootComponent);
