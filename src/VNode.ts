import { HTMLTags } from "./types/HTMLTags";

export type VNode = {
  tag: HTMLTags;

  /**
   * The attributes that will be set on the HTML DOM element after creating it.
   * This does not include event listeners, those are all in `event` property.
   */
  attrs: {
    class?: string;
    [K: string]: string;
  };

  child: Array<VNode> | string;

  /**
   * Reference to the HTML Element created for this virtual node.
   */
  el?: HTMLElement;

  /**
   * Mapping of events from the `el` DOM node that will be listened to
   *
   * Type of `Record<eventName, eventHandler>`
   */
  event?: Record<string, EventListener>;
};
