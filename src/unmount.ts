import type { VNode } from "./VNode";

export function unmount(vNode: VNode) {
  // @todo Fix parentNode possibly undefined
  // @todo Fix element possibly undefined
  if (vNode.el) vNode.el.parentNode?.removeChild(vNode.el);
}
