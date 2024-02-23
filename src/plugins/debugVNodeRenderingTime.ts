import type { AppGlobalState, Component } from "../types/index";

/**
 * Wraps a component to log how long it took to render that component's VNode.
 */
export function debugVNodeRenderingTime<State extends AppGlobalState = any>(
  component: Component<State>
) {
  return function (...args: Parameters<typeof component>) {
    const timerStart = performance.now();
    const vNode = component(...args);
    const timerEnd = performance.now();

    const timeTakenInMs = timerEnd - timerStart;
    console.debug(
      `[${component.name}] VNode rendered in: ${timeTakenInMs.toFixed(2)}ms`
    );

    return vNode;
  };
}
