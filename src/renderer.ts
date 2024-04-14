import type { Component } from "./Component";

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
 *
 * Steps to render a component:
 * 1. Set given component as the current component that is being rendered.
 * 1. Reset component's hook storage index.
 * 1. Run component's render function to create VNode.
 * 1. Save reference to the newly created VNode on component instance.
 * 1. Return the rendered VNode.
 */
export function renderer(component: Component) {
  console.log("render");
  currentComponent = component;
  component.hookIndex = 0;
  component.latestVNode = component.renderFunction();
  return component.latestVNode;
}
