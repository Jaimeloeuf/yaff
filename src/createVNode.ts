export function createVNode(
  tag: HTMLTags,
  props: VNode["props"],
  children: VNode | Array<VNode> | string = []
): VNode {
  return {
    tag,
    props,
    child: Array.isArray(children)
      ? children
      : typeof children === "string"
      ? children
      : [children],
  };
}

/**
 * Alias for `createVNode` function where h stands for hyperscript.
 */
export const h = createVNode;
