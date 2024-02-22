import type {
  AppGlobalState,
  VNode,
  EventListenerStateTransformer,
} from "./types/index";

/**
 * Factory function to create a new `mount` instance with the
 * `eventHandlerWrapper` in its closure so that event handlers can always get
 * the newest app state to transform it.
 *
 * `mount` creates a new DOM element based on the given `VNode` and mounts it
 * onto the given parent container element / DOM node.
 */
export const mountFF = <State extends AppGlobalState = any>(
  eventHandlerWrapper: (
    eventHandler: EventListenerStateTransformer<State>
  ) => (event: Event) => void
) =>
  /**
   * Creates a new DOM element based on the given `VNode` and mounts it onto the
   * given parent container element / DOM node.
   */
  function mount(vnode: VNode, container: HTMLElement | ParentNode) {
    const element = (vnode.el = document.createElement(vnode.tag));

    for (const [attributeName, attribute] of Object.entries(vnode.attrs)) {
      element.setAttribute(attributeName, attribute);
    }

    if (vnode.event !== undefined) {
      for (const [eventName, eventHandler] of Object.entries(vnode.event)) {
        element.addEventListener(eventName, eventHandlerWrapper(eventHandler));
      }
    }

    if (typeof vnode.child === "string") {
      element.textContent = vnode.child;
    }

    // Create and mount child VNodes that are not of string type.
    else {
      for (const child of vnode.child) {
        mount(child, element);
      }
    }

    container.appendChild(element);
  };
