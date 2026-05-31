import { type WebSearchProvider } from "../../constants/webSearch";

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
 * and ready.
 */
export function getWebSearchToggleDisplay(params: {
  webSearchEnabled: boolean;
  webSearchProvider: WebSearchProvider | null;
  webSearchReady: boolean;
  providerLabels: Record<WebSearchProvider, string>;
  t: TranslateFn;
}): WebSearchToggleDisplay {
  const { webSearchEnabled, webSearchProvider, webSearchReady, providerLabels, t } =
    params;

  const active =
    webSearchEnabled && webSearchProvider !== null && webSearchReady;

  return {
    active,
    title: t("webSearch"),
    providerLabel: active && webSearchProvider !== null
      ? providerLabels[webSearchProvider]
      : null,
  };
}
