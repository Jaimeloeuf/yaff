export type EventListenerStateTransformer<State = any> = (
  state: State,
  event: Event
) => State;
