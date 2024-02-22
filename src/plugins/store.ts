import type { AppGlobalState } from "../types/index";

export class Store {
  static storeKey = "__yaff_store";

  /**
   * Initialise the store and returns the initial global state by hydrating from
   * localStorage. If no stored global state found, use `defaultInitialState`
   * as the initial global state.
   */
  static init<State extends AppGlobalState = any>(
    defaultInitialState: State
  ): State {
    const state = localStorage.getItem(Store.storeKey);

    return state === null
      ? defaultInitialState
      : // Since state can be partially stored using `pathToCache`, there could
        // be missing properties on the state object, which will be set using
        // the default initialState provided.
        { ...defaultInitialState, ...JSON.parse(state) };
  }

  /**
   * Factory function to create a `StateChangeHook` to save state (only the
   * properties as specified in `pathToCache` array if given) to localStorage.
   */
  static createSave<State extends AppGlobalState = any>(
    pathToCache?: Array<string>
  ) {
    return pathToCache === undefined
      ? (state: State) =>
          localStorage.setItem(Store.storeKey, JSON.stringify(state))
      : (state: State) =>
          localStorage.setItem(
            Store.storeKey,
            JSON.stringify(
              pathToCache.reduce((stateToCache, path) => {
                stateToCache[path] = state[path];
                return stateToCache;
              }, {} as Record<string, unknown>)
            )
          );
  }
}
