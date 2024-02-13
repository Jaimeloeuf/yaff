import { HTMLTags } from "./types/HTMLTags";

export type VNode = {
  tag: HTMLTags;

  /**
   * The attributes that will be set on the HTML DOM element after creating it.
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
};
