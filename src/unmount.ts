import type { VNode } from "./VNode";

/**
 * Unmount a `VNode` from the DOM.
 */
export function unmount(vNode: VNode) {
  vNode.el?.remove();
}
