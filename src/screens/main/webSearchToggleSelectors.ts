import {
  type WebSearchMode,
  type WebSearchProvider,
} from "../../constants/webSearch";

import { TranslateFn } from "./shared";

export interface WebSearchToggleDisplay {
  /** Whether the toggle reflects a live, configured web-search route. */
  active: boolean;
  /** Title shown next to the switch. */
  title: string;
  /** Provider label to surface, or null when the toggle is off/unconfigured. */
  providerLabel: string | null;
}

/**
 * Derives the home-screen web-search toggle display state. The toggle is only
 * "active" when it is switched on AND a search-capable provider is configured
 * and ready; otherwise it shows an honest "off" label with no provider logo.
 */
export function getWebSearchToggleDisplay(params: {
  webSearchEnabled: boolean;
  webSearchMode: WebSearchMode;
  webSearchProvider: WebSearchProvider | null;
  webSearchReady: boolean;
  providerLabels: Record<WebSearchProvider, string>;
  t: TranslateFn;
}): WebSearchToggleDisplay {
  const {
    webSearchEnabled,
    webSearchMode,
    webSearchProvider,
    webSearchReady,
    providerLabels,
    t,
  } = params;

  const active =
    webSearchEnabled && webSearchProvider !== null && webSearchReady;

  if (!active || webSearchProvider === null) {
    return {
      active: false,
      title: t("webSearchOffLabel"),
      providerLabel: null,
    };
  }

  const modeLabel = t(
    webSearchMode === "on" ? "webSearchModeAlways" : "webSearchModeAuto",
  );

  return {
    active: true,
    title: `${t("webSearch")} (${modeLabel})`,
    providerLabel: providerLabels[webSearchProvider],
  };
}
