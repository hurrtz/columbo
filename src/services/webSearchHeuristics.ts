import type { WebSearchMode } from "../constants/webSearch";
import type { AppLanguage, Message } from "../types";

type WebSearchDecisionReason =
  | "mode-off"
  | "missing-provider-config"
  | "manual-on";

export interface WebSearchDecision {
  shouldSearch: boolean;
  reason: WebSearchDecisionReason;
  matchedSignals: string[];
}

export function getWebSearchDecision(params: {
  enabled: boolean;
  mode: WebSearchMode;
  ready: boolean;
  language: AppLanguage;
  query: string;
  messages: Message[];
}): WebSearchDecision {
  if (!params.enabled || params.mode === "off") {
    return {
      shouldSearch: false,
      reason: "mode-off",
      matchedSignals: [],
    };
  }

  if (!params.ready) {
    return {
      shouldSearch: false,
      reason: "missing-provider-config",
      matchedSignals: [],
    };
  }

  return {
    shouldSearch: true,
    reason: "manual-on",
    matchedSignals: [],
  };
}
