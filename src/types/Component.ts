import type { AppGlobalState } from "./AppGlobalState";
import type { AppContext } from "./AppContext";
import type { VNode } from "./VNode";

/**
 * A UI Component for a vDOM framework is a function of State => VNode
 */
export type Component<State extends AppGlobalState = any> = (
  context: AppContext<State>
) => VNode;
