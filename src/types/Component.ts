import type { AppGlobalState } from "./AppGlobalState";
import type { AppContext } from "./AppContext";
import type { VNode } from "./VNode";

/**
 * A UI Component function for a vDOM framework is a function of State => VNode
 */
export type ComponentFunction<State extends AppGlobalState = any> = (
  context: AppContext<State>
) => VNode;
