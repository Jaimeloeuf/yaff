import { HTMLTags } from "./types/HTMLTags";

export type VNode = {
  tag: HTMLTags;

  props: Record<string, string>;

  child: Array<VNode> | string;

  /**
   * Reference to the HTML Element created for this virtual node.
   */
  el?: HTMLElement;
};
