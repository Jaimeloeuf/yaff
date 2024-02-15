import type { VNode } from "./VNode";

/**
 * Patch any changes made to attributes between `VNode`s
 */
export function patchAttributes(originalVNode: VNode, newVNode: VNode) {
  // Loop over all attributes of newVNode to add new attributes that were not
  // previously set, or update the attribute value if it has changed.
  for (const [attributeName, attribute] of Object.entries(newVNode.attrs)) {
    if (originalVNode.attrs[attributeName] !== attribute) {
      newVNode.el?.setAttribute(attributeName, attribute);
    }
  }

  // Loop over all attributes of originalVNode to check if it still exists on
  // the newVNode. Remove the attribute if it no longer exists on the newVNode.
  // @todo Can optimise to skip this if it is a newly created DOM element.
  for (const [attribute] of Object.entries(originalVNode.attrs)) {
    if (!Object.hasOwn(newVNode.attrs, attribute)) {
      // This uses newVNode's el since they share the same el if it is a
      // replacement/update to the original DOM element
      newVNode.el?.removeAttribute(attribute);
    }
  }

  // Although events are technically attributes too, they are added/removed
  // differently, since an event cannot be changed once attached until the
  // vNode / DOM element itself is removed.
}
