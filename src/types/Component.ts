import type { RenderFunction } from "./RenderFunction";
import type { ComponentHooks } from "./ComponentHook";

/**
 * Internal representation of a component.
 *
 * Note:
 * A render function **returns** VNode
 * A component **is not** a VNode
 * So a component should not be treated as a VNode and used directly...
 */
export type Component = {
  /**
   * The Render Function that is used to generate VNodes of this component
   */
  renderFunction: RenderFunction;

  /**
   * Hooks data for this specific component.
   */
  hooks: ComponentHooks<any>;

  // @todo
  // Child Component
  // Parent Component
};

export function createComponent(renderFunction: RenderFunction): Component {
  return {
    renderFunction,
    hooks: [],
  };
}
