import { HTMLTags } from "./types/HTMLTags";

type vDomNode = {
  tag: HTMLTags;

  props: Record<string, string>;

  child: Array<vDomNode> | string;

  /**
   * Reference to the HTML Element created for this virtual node.
   */
  el?: HTMLElement;
};

type VDom = {
  root: vDomNode;
};

// Or should VDom just be an alias to HTMLNode directly?

export function createVNode(
  tag: HTMLTags,
  props: vDomNode["props"],
  children: vDomNode | Array<vDomNode> | string = []
): vDomNode {
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

// Alias
export const h = createVNode;

// Rename 2 to new
export function patch(VNode1: vDomNode, VNode2: vDomNode) {
  // Assign the parent DOM element
  // @todo Remve this !
  const element = (VNode2.el = VNode1.el!);

  /* Check for difference between the two VNodes and update DOM if needed */

  // If VNodes have different tags, assume that the whole content has changed.
  if (VNode1.tag !== VNode2.tag) {
    // Unmount old node and mount new node
    unmount(VNode1);
    mount(VNode2, element.parentNode!); // @todo Remove the !
  }

  // Repatch node if children type changed, e.g. from text to a VNodes or an array of VNodes
  else if (typeof VNode2.child !== typeof VNode1.child) {
    // Unmount old node and mount new node
    unmount(VNode1);
    mount(VNode2, element.parentNode!); // @todo Remove the !
  }

  // If new VNode has a string as its child, update textContent if the two strings are different
  else if (typeof VNode2.child === "string") {
    if (VNode2.child !== VNode1.child) element.textContent = VNode2.child;
  }

  //
  else if (typeof VNode1.child === "string") {
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
    const children1 = VNode1.child as Array<vDomNode>;
    const children2 = VNode2.child;
    const commonLen = Math.min(children1.length, children2.length);

    // Recursively call patch for all the common children
    for (let i = 0; i < commonLen; i++) {
      patch(children1[i]!, children2[i]!);
    }

    if (typeof VNode1.child === "string") {
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

export function mount(vnode: vDomNode, container: HTMLElement | ParentNode) {
  const element = (vnode.el = document.createElement(vnode.tag));

  Object.entries(vnode.props || {}).forEach(([key, value]) =>
    element.setAttribute(key, value as string)
  );
  if (typeof vnode.child === "string") element.textContent = vnode.child;
  // Recursively mount the children
  // Maybe more efficient to do for loop directly instead?
  else vnode.child.forEach((child) => mount(child, element));

  container.appendChild(element);
}

export function unmount(vnode: vDomNode) {
  // @todo Fix parentNode possibly undefined
  // @todo Fix element possibly undefined
  if (vnode.el) vnode.el.parentNode?.removeChild(vnode.el);
}

// @todo Actually this might be a Class so that it is more flexible?
export function createApp(
  initialState: any,
  app: (state: any) => vDomNode,
  container: HTMLElement
) {
  mount(app(initialState), container);
}

/**
 * Find diff in VDom and update elements as needed
 */
// function diffVDom(originalVDom, newVDom) {}
