export class Store {
  static storeKey = "__yaff_store";

  /**
   * Initialise the store and returns the initial global state by hydrating from
   * localStorage. If no previously stored global state, store and return
   * defaultInitialState as the initial global state.
   */
  static init<State>(defaultInitialState: State): State {
    const state = localStorage.getItem(Store.storeKey);
    if (state === null) {
      Store.save(defaultInitialState);
      return defaultInitialState;
    }

    return JSON.parse(state);
  }

  /**
   * Save state to localStorage.
   */
  static save<State>(state: State) {
    localStorage.setItem(Store.storeKey, JSON.stringify(state));
  }

  static plugin() {
    return Store.save;
  }
}
