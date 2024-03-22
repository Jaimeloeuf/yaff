import { queueReRender } from "./reRender";
import type { PreRenderHook } from "./types/index";

type ComponentHookPair<T> = [() => T, (newState: T) => void];

const hookIndexResetFunctions: Array<Function> = [];

/**
 * PreRenderHook function to reset `currentHookIndex` before every single render
 * to make sure that components always get their state back for as long as calls
 * to `useState` is stable across renders.
 */
export const resetAllHookIndex: PreRenderHook = () =>
  hookIndexResetFunctions.forEach((fn) => fn());

export function localState() {
  let componentHooks: Array<ComponentHookPair<any>> = [];

  /**
   * This needs to be reset to 0 before every single render to ensure that the
   * right component `ComponentHookPair` is returned to the useState caller since
   * this is used to track the useState call order within all the component to
   * determine which pair belongs to which caller.
   */
  let currentHookIndex = 0;

  hookIndexResetFunctions.push(() => (currentHookIndex = 0));

  function useState<T>(initialState: T): ComponentHookPair<T> {
    console.log(`[useState] ${currentHookIndex}`);
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

  return { useState };
}
