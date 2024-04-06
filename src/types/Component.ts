import type { VNode } from "./VNode";

/**
 * A UI Component function for a vDOM framework is a function of State => VNode
 */
export type ComponentFunction = () => VNode;
