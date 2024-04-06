import type { VNode } from "./VNode";
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
   * This component's VNode generated during the latest render. Can be null if
   * this Component hasnt been rendered before.
   */
  latestVNode: VNode | null;

  /**
   * Hooks data for this specific component.
   */
  hooks: ComponentHooks<any>;

  /**
   * Current hook index used by this component instance.
   *
   * This needs to be reset to 0 before every single render to ensure that the
   * right component `ComponentHookPair` is returned to the hook user since
   * this is used to track the hook use order within all this component to
   * determine which pair belongs to which user.
   */
  hookIndex: number;
  // @todo
  // Child Component
  // Parent Component
};

export function createComponent(renderFunction: RenderFunction): Component {
  return {
    renderFunction,
    latestVNode: null,
    hooks: [],
    hookIndex: 0,
  };
}
