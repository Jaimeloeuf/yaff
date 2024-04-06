import { mount } from "./mount";
import type { Component } from "./types/index";

let currentComponent: Component | null = null;

export function getCurrentComponent() {
  if (currentComponent === null) {
    throw new Error(
      "Internal Error: Tried to get current component before it is set"
    );
  }

  return currentComponent;
}

/**
 * Render a component
 */
export function renderer(
  component: Component,
  container: HTMLElement | ParentNode
) {
  currentComponent = component;
  currentComponent.hookIndex = 0;
  currentComponent.latestVNode = currentComponent.renderFunction();
  mount(currentComponent.latestVNode, container);
}
