import { VNode } from "./VNode";

/**
 * A UI Component for a vDOM framework is a function of State => VNode
 */
export type Component<State> = (
  state: State,
  rerender: (newState?: State) => void
) => VNode;
