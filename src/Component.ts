import { setCurrentComponent } from "./currentComponentTracker";
import type { VNode, RenderFunction, ComponentHooks } from "./types/index";

/**
 * Internal representation of a component.
 *
 * Note:
 * A render function **returns** VNode
 * A component **is not** a VNode
 * So a component should not be treated as a VNode and used directly...
 */
export class Component {
  /**
   * Use this static method to create a new Component instance
   */
  static use = (renderFunction: RenderFunction) =>
    new Component(renderFunction);

  /**
   * Component name used to identify this component during renders
   */
  public readonly name: string;

  constructor(
    /**
     * The Render Function that is used to generate VNodes of this component
     */
    public readonly renderFunction: RenderFunction,

    /**
     * This component's VNode generated during the latest render. Can be null if
     * this Component hasnt been rendered before.
     */
    public latestVNode: VNode | null = null,

    /**
     * Hooks data for this specific component.
     */
    public readonly hooks: ComponentHooks<any> = [],

    /**
     * Current hook index used by this component instance.
     *
     * This needs to be reset to 0 before every single render to ensure that the
     * right component `ComponentHookPair` is returned to the hook user since
     * this is used to track the hook use order within all this component to
     * determine which pair belongs to which user.
     */
    public hookIndex: number = 0
  ) {
    this.name = renderFunction.name;
  }

  /**
   * Render the current component.
   *
   * Steps to render a component:
   * 1. Set component as the current component being rendered / worked on.
   * 1. Reset component's hook storage index.
   * 1. Run component's render function to create VNode.
   * 1. Save reference to the newly created VNode on component instance.
   * 1. Return the rendered VNode.
   */
  render() {
    setCurrentComponent(this);
    this.hookIndex = 0;
    this.latestVNode = this.renderFunction();
    return this.latestVNode;
  }
}
