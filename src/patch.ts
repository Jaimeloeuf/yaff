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

  // If new VNode has a string as its child, update textContent if the two strings are different
  else if (typeof newVNode.child === "string") {
    if (newVNode.child !== originalVNode.child)
      element.textContent = newVNode.child;
  }

  //
  else if (typeof originalVNode.child === "string") {
  }

  // If VNodes have same the tag, and both have array of VNodes as their child, check for Prop or Child diff
  else {
    // @todo Check the props here
    // @todo I am not going to check the props for now because it would just lengthen the post and miss the point. I might write a third article which contains the full implementation

    /* Check array diff */
    // If the new node has an array of children
    // - The length of children is the same
    // - The old node has more children than the new one
    // - The new node has more children than the old one

    // Find out the lengths
    // const children1 = VNode1.children; // This only works if the empty else if is included
    const children1 = originalVNode.child as Array<VNode>;
    const children2 = newVNode.child;
    const commonLen = Math.min(children1.length, children2.length);

    // Recursively call patch for all the common children
    for (let i = 0; i < commonLen; i++) {
      patch(children1[i]!, children2[i]!);
    }

    if (typeof originalVNode.child === "string") {
    }

    // If the new node has fewer children
    if (children1.length > children2.length)
      children1.slice(children2.length).forEach(unmount);
    // If the new node has more children
    else if (children2.length > children1.length)
      children2
        .slice(children1.length)
        .forEach((child) => mount(child, element));
  }
}
