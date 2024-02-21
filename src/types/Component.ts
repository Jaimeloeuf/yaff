import { AppContext } from "./AppContext";
import { VNode } from "./VNode";

/**
 * A UI Component for a vDOM framework is a function of State => VNode
 */
export type Component<State> = (context: AppContext<State>) => VNode;
