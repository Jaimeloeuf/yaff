import type { VNode } from "./types/index";

/**
 * Creates a new DOM element based on the given `VNode` and mounts it onto the
 * given parent container element / DOM node.
 */
export function mount(vnode: VNode, container: HTMLElement | ParentNode) {
  const element = (vnode.el = document.createElement(vnode.tag));

  for (const [attributeName, attribute] of Object.entries(vnode.attrs)) {
    element.setAttribute(attributeName, attribute);
  }

  if (vnode.event !== undefined) {
    for (const [eventName, eventHandler] of Object.entries(vnode.event)) {
      element.addEventListener(eventName, eventHandler);
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
}
