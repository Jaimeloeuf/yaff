import type { Component } from "./Component";

let currentComponent: Component | null = null;

export function setCurrentComponent(component: Component) {
  currentComponent = component;
}

export function getCurrentComponent() {
  if (currentComponent === null) {
    throw new Error(
      "Internal Error: Tried to get current component before it is set"
    );
  }

  return currentComponent;
}
