import type { VNode } from "./VNode";

// @todo ParentNode type like wrong ah?
export function mount(vnode: VNode, container: HTMLElement | ParentNode) {
  const element = (vnode.el = document.createElement(vnode.tag));

  Object.entries(vnode.props || {}).forEach(([key, value]) =>
    element.setAttribute(key, value as string)
  );

  if (typeof vnode.child === "string") element.textContent = vnode.child;
  // Recursively mount the children
  // Maybe more efficient to do for loop directly instead?
  else vnode.child.forEach((child) => mount(child, element));

  container.appendChild(element);
}
