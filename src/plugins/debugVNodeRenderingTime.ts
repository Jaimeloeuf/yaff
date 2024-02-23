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

    const timeTakenInMs = (
      Math.trunc((timerEnd - timerStart) * 100) / 100
    ).toFixed(3);

    console.debug(`[${component.name}] VNode rendered in: ${timeTakenInMs} ms`);

    return vNode;
  };
}
