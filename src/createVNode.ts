import type { VNode } from "./VNode";
import type { HTMLTags } from "./types/HTMLTags";

/**
 * Creates a new `VNode` that can be mounted onto the DOM.
 */
export function createVNode(
  tag: HTMLTags,
  attrs: VNode["attrs"],
  child: VNode | Array<VNode> | string = []
): VNode {
  return {
    tag,
    attrs,
    child: Array.isArray(child)
      ? child
      : typeof child === "string"
      ? child
      : [child],
  };
}

/**
 * Alias for `createVNode` function where h stands for hyperscript.
 */
export const h = createVNode;
