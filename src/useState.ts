import { queueReRender } from "./reRender";
import type { ComponentHookPair, ComponentHooks } from "./types/index";

const componentHooks: ComponentHooks<any> = [];

/**
 * This needs to be reset to 0 before every single render to ensure that the
 * right component `ComponentHookPair` is returned to the useState caller since
 * this is used to track the useState call order within all the component to
 * determine which pair belongs to which caller.
 */
let currentHookIndex = 0;

export function useState<T>(initialState: T): ComponentHookPair<T> {
  let hookPair = componentHooks[currentHookIndex];

  // If hookPair is not undefined it means that this is not the first render as
  // the getter/setter pair already exists. Return it and increment hook index
  // before the next use Hook call.
  if (hookPair !== undefined) {
    currentHookIndex++;
    return hookPair;
  }

  let internalState = initialState;

  /** Getter function for the internal state */
  const getState = (): T => internalState;

  /** Update state and trigger a re-render */
  function setState(nextState: T) {
    internalState = nextState;
    queueReRender();
  }

  // If it is the first time rendering, create a new getter/setter pair.
  hookPair = [getState, setState];

  // Store the getter/setter pair for future renders and increment hook index
  // before the next use Hook call.
  componentHooks.push(hookPair);
  currentHookIndex++;

  return hookPair;
}
