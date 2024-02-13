export type EventListenerStateTransformer = <State>(
  state: State,
  event: Event
) => State;
