import type { AppGlobalState } from "./AppGlobalState";
import type { AppContext } from "./AppContext";
import type { PluginHooks } from "./Hooks";

/**
 * Plugins are functions that are runs on startup, and can optionally return
 * `PluginHooks` after initialising.
 */
export type Plugin<State extends AppGlobalState = any> = (
  context: AppContext<State>
) => void | PluginHooks<State>;
