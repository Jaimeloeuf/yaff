export interface EventContext {
  /**
   * The actual DOM event.
   */
  event: Event;
}

export type EventHandler = (context: EventContext) => void;
