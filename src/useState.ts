import { patch } from "./patch";
import { getCurrentComponent } from "./currentComponentTracker";
import type { ComponentHookPair } from "./types/index";

export function useState<T>(initialState: T): ComponentHookPair<T> {
  const currentComponent = getCurrentComponent();

  let hookPair = currentComponent.hooks[currentComponent.hookIndex];

  // If hookPair is not undefined it means that this is not the first render as
  // the getter/setter pair already exists. Return it and increment hook index
  // before the next use Hook call.
  if (hookPair !== undefined) {
    currentComponent.hookIndex++;
    return hookPair;
  }

  let internalState = initialState;

  /** Getter function for the internal state */
  const getState = (): T => internalState;

  /** Update state and trigger a re-render */
  function setState(nextState: T) {
    internalState = nextState;

    // Trigger a re-render on state change, just for the component that owns
    // this hook and its descendants.
    const originalVNode = currentComponent.latestVNode;
    const newVNode = currentComponent.render();
    patch(originalVNode!, newVNode);
  }

  // If it is the first time rendering, create a new getter/setter pair.
  hookPair = [getState, setState];

  // Store the getter/setter pair for future renders and increment hook index
  // before the next use Hook call.
  currentComponent.hooks.push(hookPair);
  currentComponent.hookIndex++;

  return hookPair;
}
