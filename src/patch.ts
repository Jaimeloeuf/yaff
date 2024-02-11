import { mount } from "./mount";
import { unmount } from "./unmount";
import type { VNode } from "./VNode";

/**
 * Patches the difference between the original `vNode` and the new `vNode` to
 * reconcile the 2 and apply the differences to the real DOM.
 */
export function patch(originalVNode: VNode, newVNode: VNode) {
  // Assign the parent DOM element
  // @todo Remve this !
  const element = (newVNode.el = originalVNode.el!);

  /* Check for difference between the two VNodes and update DOM if needed */

  // If VNodes have different tags, assume that the whole content has changed.
  if (originalVNode.tag !== newVNode.tag) {
    // Unmount old node and mount new node
    unmount(originalVNode);
    mount(newVNode, element.parentNode!); // @todo Remove the !
  }

  // Repatch node if children type changed, e.g. from text to a VNodes or an array of VNodes
  else if (typeof newVNode.child !== typeof originalVNode.child) {
    // Unmount old node and mount new node
    unmount(originalVNode);
    mount(newVNode, element.parentNode!); // @todo Remove the !
  }

  // If the tags are the same, and its child nodes are of the same type,
  // check if new node has a string as its child, and update the textContent if
  // the two strings are different.
  // This is split into 2 separate conditionals so that TS can narrow the type
  // of vnode child to Arra
  else if (typeof newVNode.child === "string") {
    if (newVNode.child !== originalVNode.child) {
      element.textContent = newVNode.child;
    }
  }

  // This is a no-op conditional used only for TS type narrowing. Because in the
  // second condition, it already checked for child type equality, if they were
  // not equal, it would have ran that block of code. So in the third condition
  // if newVNode's child is a string, the originalVNode's child would definitely
  // be a string too. However TS can't type narrow it properly, so this helps it
  // to know that in the final else block, both VNode's child will not be string.
  else if (typeof originalVNode.child === "string") {
  }

  // If VNodes have same the tag, and both have array of VNodes as their child,
  // check for Prop or Child diff
  else {
    // @todo Check the props here
    // @todo I am not going to check the props for now because it would just lengthen the post and miss the point. I might write a third article which contains the full implementation

    /* Check array diff */
    // If the new node has an array of children
    // - The length of children is the same
    // - The old node has more children than the new one
    // - The new node has more children than the old one

    // Find out the lengths
    // This only works if the empty no-op else if is included, see it's docs
    // If not included, `const children1 = originalVNode.child as Array<VNode>;`
    const originalChild = originalVNode.child;
    const newChild = newVNode.child;
    const commonLen = Math.min(originalChild.length, newChild.length);

    // Recursively call patch for all the common children
    for (let i = 0; i < commonLen; i++) {
      patch(originalChild[i]!, newChild[i]!);
    }

    if (typeof originalVNode.child === "string") {
    }

    // If the new node has fewer children
    if (originalChild.length > newChild.length)
      originalChild.slice(newChild.length).forEach(unmount);
    // If the new node has more children
    else if (newChild.length > originalChild.length)
      newChild
        .slice(originalChild.length)
        .forEach((child) => mount(child, element));
  }
}
