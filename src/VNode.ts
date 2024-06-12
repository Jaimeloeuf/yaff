import type { HTMLTags } from "./types/index";

export class VNode {
  /**
   * Reference to the HTML Element created for this virtual node.
   */
  public el?: HTMLElement;

  constructor(
    public readonly tag: HTMLTags,

    /**
     * The attributes that will be set on the HTML DOM element after creating it.
     * This does not include event listeners, those are all in `event` property.
     */
    public readonly attrs: {
      class?: string;
      [K: string]: string;
    },

    public readonly child: Array<VNode> | string,

    /**
     * Mapping of events from the `el` DOM node that will be listened to
     *
     * Type of `Record<eventName, EventHandler>`
     */
    public readonly event?: Record<string, (event: Event) => void>
  ) {}
}

/**
 * `VNodes` can recursively contain itself, e.g. `[VNode1, [VNode2, VNode3]]`
 *
 * Value can be a raw string to support text nodes, where it will be
 * automatically wrapped in a `p` tag.
 *
 * Value can be a literal `false` to support conditional rendering without using
 * the ternary operator by ignoring VNode children that are conditionally hidden
 * using the logical OR and AND operator short circuiting.
 */
export type VNodes = Array<VNodes | VNode | string | false>;
