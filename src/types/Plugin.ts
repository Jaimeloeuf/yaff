import { AppContext } from "./AppContext";
import { PluginHooks } from "./Hooks";

/**
 * Plugins are functions that are runs on startup, and can optionally return
 * `PluginHooks` after initialising.
 */
export type Plugin<State> = (
  context: AppContext<State>
) => void | PluginHooks<State>;
