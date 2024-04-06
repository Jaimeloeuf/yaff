import { mountFF } from "./mount";
import { patchFF } from "./patch";
import { setQueueReRender } from "./reRender";
import type { VNode, ComponentFunction } from "./types/index";

export class App {
  private currentVNode: VNode;
  private mount: (vnode: VNode, container: HTMLElement | ParentNode) => void;
  private patch: (originalVNode: VNode, newVNode: VNode) => void;

  /**
   * Instance variable that acts as a flag to track whether there is a pending
   * re-rendering queued.
   *
   * ### See `queueReRender` method for more details
   */
  private reRenderQueued: boolean = false;

  constructor(
    container: HTMLElement,
    private readonly rootComponent: ComponentFunction
  ) {
    // Set the globally shared queueReRender function so it can be called by any
    // other modules in this library without having to bind it in its closure.
    setQueueReRender(this.queueReRender);

    this.mount = mountFF((eventHandler) => (event) => eventHandler({ event }));
    this.patch = patchFF(this.mount);

    this.currentVNode = rootComponent();
    this.mount(this.currentVNode, container);
  }

  /**
   * Call this method to queue for a new re-render in the next event loop.
   *
   * This is an optimisation that combines multiple synchronous re-render
   * requests into a single re-rendering that is ran once the application code
   * yields control back to the framework in the next event loop.
   */
  private queueReRender() {
    // If there is already a reRenderQueued, do nothing
    if (this.reRenderQueued === true) {
      return;
    }

    this.reRenderQueued = true;

    // Use setTimeout to re-render in the next event loop.
    // `reRenderQueued` flag is always cleared synchronously after re-render to
    // prevent future re-render requests from being ignored.
    setTimeout(() => {
      this.reRender();
      this.reRenderQueued = false;
    });
  }

  /**
   * Re-render UI after using the root component.
   */
  private reRender() {
    const newVNode = this.rootComponent();
    this.patch(this.currentVNode, newVNode);
    this.currentVNode = newVNode;
  }
}
