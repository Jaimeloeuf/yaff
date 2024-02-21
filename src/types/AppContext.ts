/**
 * @todo
 */
export type AppContext<State> = {
  /**
   * The global app state.
   */
  state: State;

  /**
   *
   */
  updateState: (state: State) => void;

  /**
   *
   */
  reRender: () => void;
};
