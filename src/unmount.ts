import type { VNode } from "./types/index";

/**
 * Unmount a `VNode` from the DOM.
 */
export function unmount(vNode: VNode) {
  vNode.el?.remove();
}
