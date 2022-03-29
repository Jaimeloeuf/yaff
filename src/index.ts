import { HTMLTags } from "./types/HTMLTags";

// @todo Might rename props to attributes

type HTMLNode = {
  tag: HTMLTags;
  props: Record<string, string>;
  children: Array<HTMLNode> | string;

  element?: HTMLElement;
};

type VDom = {
  root: HTMLNode;
};

// Or should VDom just be an alias to HTMLNode directly?

export function createVNode(
  tag: HTMLTags,
  props: Record<string, string>,
  children: HTMLNode | Array<HTMLNode> | string = []
): HTMLNode {
  return {
    tag,
    props,
    children: Array.isArray(children)
      ? children
      : typeof children === "string"
      ? children
      : [children],
  };
}

// Alias
export const h = createVNode;

// Rename 2 to new
export function patch(VNode1: HTMLNode, VNode2: HTMLNode) {
  // Assign the parent DOM element
  // @todo Remve this !
  const element = (VNode2.element = VNode1.element!);

  // Now we have to check the difference between the two vnodes

  // If the nodes are of different tags, assume that the whole content has changed.
  if (VNode1.tag !== VNode2.tag) {
    // Just unmount the old node and mount the new node
    unmount(VNode1);
    // @todo Remove the !
    mount(VNode2, element.parentNode!);
    return;
  }

  // Nodes have same tags
  // So we have two checks remaining
  // - Props
  // - Children

  // @todo I am not going to check the props for now because it would just lengthen the post and miss the point.
  // @todo I might write a third article which contains the full implementation

  // Checking the children
  // If the new node has a string for children
  // And the two children are **strictly** different
  if (
    typeof VNode2.children === "string" &&
    VNode2.children !== VNode1.children
  ) {
    element.textContent = VNode2.children;
    return;
  } else {
    // need the else to do control flow analysis, as child should be string instead of HTML element

    // If the new node has an array of children
    // - The length of children is the same
    // - The old node has more children than the new one
    // - The new node has more children than the old one

    // Find out the lengths
    const children1 = VNode1.children;
    const children2 = VNode2.children;
    const commonLen = Math.min(children1.length, children2.length);

    // Recursively call patch for all the common children
    for (let i = 0; i < commonLen; i++) {
      patch(children1[i], children2[i]);
    }

    // If the new node has fewer children
    if (children1.length > children2.length) {
      children1.slice(children2.length).forEach(unmount);
    }

    // If the new node has more children
    if (children2.length > children1.length) {
      children2.slice(children1.length).forEach((child) => {
        mount(child, element);
      });
    }
  }
}

export function mount(vnode: HTMLNode, container: HTMLElement | ParentNode) {
  const element = (vnode.element = document.createElement(vnode.tag));

  Object.entries(vnode.props || {}).forEach(([key, value]) =>
    element.setAttribute(key, value as string)
  );

  if (typeof vnode.children === "string") element.textContent = vnode.children;
  // Recursively mount the children
  // Maybe more efficient to do for loop directly instead?
  else vnode.children.forEach((child) => mount(child, element));

  container.appendChild(element);
}

export function unmount(vnode: HTMLNode) {
  // @todo Fix parentNode possibly undefined
  // @todo Fix element possibly undefined
  if (vnode.element) vnode.element.parentNode?.removeChild(vnode.element);
}

/**
 * Find diff in VDom and update elements as needed
 */
// function diffVDom(originalVDom, newVDom) {}
