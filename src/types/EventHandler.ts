import type { AppGlobalState } from "./AppGlobalState";
import type { AppContext } from "./AppContext";

/**
 * The current app's context at the point of the event, passed to every single
 * `EventHandler`. Contains everything needed to use the framework like
 * accessing the event object, the global app state, updating state, and
 * triggering re-renders.
 *
 * `EventContext` is an extension of `AppContext` to include the DOM `Event`.
 */
export interface EventContext<State extends AppGlobalState = any>
  extends AppContext<State> {
  /**
   * The actual DOM event.
   */
  event: Event;
}

export type EventHandler<State extends AppGlobalState = any> = (
  context: EventContext<State>
) => void;
