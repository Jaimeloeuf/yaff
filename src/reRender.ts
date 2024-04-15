import { getCurrentComponent } from "./currentComponentTracker";
import { patch } from "./patch";

/**
 * Re-render the current component and all of its child components.
 */
function reRender() {
  const currentComponent = getCurrentComponent();

  currentComponent.hookIndex = 0;

  const newVNode = currentComponent.renderFunction();

  if (currentComponent.latestVNode === null) {
    throw new Error("Internal Error: Tried to re-render before initial render");
  }

  patch(currentComponent.latestVNode, newVNode);

  currentComponent.latestVNode = newVNode;
}

/**
 * Flag to track whether there is a pending re-rendering queued.
 */
let reRenderQueued = false;

/**
 * Call this function to queue for a new re-render in the next event loop.
 *
 * This is an optimisation that combines multiple synchronous re-render
 * requests into a single re-rendering that is ran once the application code
 * yields control back to the framework in the next event loop.
 */
export function queueReRender() {
  // If there is already a reRenderQueued, do nothing
  if (reRenderQueued === true) {
    return;
  }

  reRenderQueued = true;

  // Use setTimeout to re-render in the next event loop.
  // `reRenderQueued` flag is always cleared synchronously after re-render to
  // prevent future re-render requests from being ignored.
  setTimeout(() => {
    reRender();
    reRenderQueued = false;
  });
}
