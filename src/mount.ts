import type { VNode } from "./VNode";

// @todo ParentNode type like wrong ah?
export function mount(vnode: VNode, container: HTMLElement | ParentNode) {
  const element = (vnode.el = document.createElement(vnode.tag));

  Object.entries(vnode.props || {}).forEach(([attributeName, attribute]) => {
    // If attribute name start with a low dash, treat it as an indicator that
    // this attribute is an event.
    if (attributeName.startsWith("_")) {
      // @todo deal with the type casting
      element.addEventListener(
        attributeName.slice(1),
        attribute as any as EventListenerOrEventListenerObject
      );
    }

    // Set attribute as is if not a special attribute type.
    else {
      element.setAttribute(attributeName, attribute);
    }
  });

  if (typeof vnode.child === "string") {
    element.textContent = vnode.child;
  }

  // Recursively mount the children
  // @todo Maybe more efficient to do for loop directly instead?
  else {
    vnode.child.forEach((child) => mount(child, element));
  }

  container.appendChild(element);
}
