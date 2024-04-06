export type ComponentHookPair<T> = [() => T, (newState: T) => void];

export type ComponentHooks<T> = Array<ComponentHookPair<T>>;
