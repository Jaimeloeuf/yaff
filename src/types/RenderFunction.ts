import type { VNode } from "../VNode";

/**
 * A component, is also known as a render function, which is a function that
 * returns a VNode.
 */
export type RenderFunction = () => VNode;
