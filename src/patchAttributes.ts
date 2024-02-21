import type { VNode } from "./types/index";

/**
 * Patch any changes made to attributes between `VNode`s
 */
export function patchAttributes(originalVNode: VNode, newVNode: VNode) {
  // Loop over all attributes of newVNode to add new attributes that were not
  // previously set, or update the attribute value if it has changed.
  for (const [attributeName, attribute] of Object.entries(newVNode.attrs)) {
    if (originalVNode.attrs[attributeName] !== attribute) {
      // Value is special in that it is both an attribute and a HTML DOM element
      // property, where the property value takes precedence over the attribute
      // value. Therefore to make sure it works, the value property must be set
      // to the same value as the value attribute.
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#content_versus_idl_attributes
      // https://stackoverflow.com/questions/29929797/setattribute-doesnt-work-the-way-i-expect-it-to
      // https://stackoverflow.com/a/68249079
      if (attributeName === "value") {
        // Typecasting it since it assumes users know that the element they are
        // using have a value property, e.g. an input element.
        (newVNode.el as HTMLElement & { value: unknown }).value = attribute;
      }

      newVNode.el?.setAttribute(attributeName, attribute);
    }
  }

  // Loop over all attributes of originalVNode to check if it still exists on
  // the newVNode. Remove the attribute if it no longer exists on the newVNode.
  for (const [attribute] of Object.entries(originalVNode.attrs)) {
    if (!Object.hasOwn(newVNode.attrs, attribute)) {
      // This uses newVNode's el since they share the same el if it is a
      // replacement/update to the original DOM element
      newVNode.el?.removeAttribute(attribute);
    }
  }

  // Although events are technically attributes too, they are added/removed
  // differently, since an event cannot be changed once attached until the
  // vNode / DOM element itself is removed. Assumes event listeners are removed
  // automatically once the DOM element it is attached to is removed.
  // https://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
}
