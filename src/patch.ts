import { mount } from "./mount";
import { unmount } from "./unmount";
import { patchAttributes } from "./patchAttributes";
import type { VNode } from "./VNode";

/**
 * Patches the difference between the original `vNode` and the new `vNode` to
 * reconcile the 2 and apply the differences to the real DOM.
 */
export function patch(originalVNode: VNode, newVNode: VNode) {
  if (originalVNode.el === undefined) {
    throw new Error(`originalVNode.el is not set`);
  }

  /**
   * Set new vNode's element to be the original element first, since it might
   * reuse it with just some changes. If the tag changed or something happens
   * that require a new element, a new one will be created to replace this.
   */
  newVNode.el = originalVNode.el;

  /**
   * Hold a reference to the parent DOM node before any potential unmounting to
   * replace with a new node, since the mounting process right after unmounting
   * needs the parent node to mount to, which will be lost when trying to access
   * it from the DOM element itself since it is no longer mounted now.
   */
  const originalParentNode = originalVNode.el.parentNode;
  if (originalParentNode === null) {
    throw new Error(`originalVNode.el.parentNode is not accessible`);
  }

  // If VNodes have different tags, assume that the whole content has changed.
  if (originalVNode.tag !== newVNode.tag) {
    unmount(originalVNode);
    mount(newVNode, originalParentNode);
  }

  // Repatch node if children type changed, e.g. from text to a VNodes or an
  // array of VNodes.
  else if (typeof newVNode.child !== typeof originalVNode.child) {
    unmount(originalVNode);
    mount(newVNode, originalParentNode);
  }

  // If the tags are the same, and its child nodes are of the same type,
  // check if new node has a string as its child, and update the textContent if
  // the two strings are different.
  // This is split into 2 separate conditionals so that TS can narrow the type
  // of vnode child to Arra
  else if (typeof newVNode.child === "string") {
    if (newVNode.child !== originalVNode.child) {
      newVNode.el.textContent = newVNode.child;
    }

    // Since this DOM element is kept the same, patch any attributes changes.
    patchAttributes(originalVNode, newVNode);
  }

  // This is a no-op conditional used only for TS type narrowing. Because in the
  // second condition, it already checked for child type equality, if they were
  // not equal, it would have ran that block of code. So in the third condition
  // if newVNode's child is a string, the originalVNode's child would definitely
  // be a string too. However TS can't type narrow it properly, so this helps it
  // to know that in the final else block, both VNode's child will not be string.
  else if (typeof originalVNode.child === "string") {
    // Since this DOM element is kept the same, patch any attributes changes.
    patchAttributes(originalVNode, newVNode);
  }

  // If VNodes have same the tag, and both have array of VNodes as their child,
  // check for Prop or Child diff
  else {
    // Since this DOM element is kept the same, patch any attributes changes.
    patchAttributes(originalVNode, newVNode);

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

    // After patching all the common children, need to deal with new child
    // VNodes, or when there are more old child VNodes left over.
    // If the new node has fewer children, remove the old child VNodes.
    if (originalChild.length > newChild.length) {
      originalChild.slice(newChild.length).forEach(unmount);
    }

    // If the new node has more children, mount all of them.
    else if (newChild.length > originalChild.length) {
      newChild
        .slice(originalChild.length)
        /** @todo
         * Remove !, this should be fixed in TS 5.4
         * References:
         * https://github.com/microsoft/TypeScript/pull/56908
         * https://devblogs.microsoft.com/typescript/announcing-typescript-5-4-beta/#preserved-narrowing-in-closures-following-last-assignments
         */
        .forEach((child) => mount(child, newVNode.el!));
    }
  }
}
