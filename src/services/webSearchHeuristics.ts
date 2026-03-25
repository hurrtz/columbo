import type { WebSearchMode } from "../constants/webSearch";
import type { AppLanguage, Message } from "../types";

type WebSearchDecisionReason =
  | "mode-off"
  | "missing-provider-config"
  | "manual-on"
  | "freshness-signals"
  | "grounded-follow-up"
  | "stable-query";

export interface WebSearchDecision {
  shouldSearch: boolean;
  reason: WebSearchDecisionReason;
  matchedSignals: string[];
}

const EN_FRESHNESS_PATTERNS: Array<[string, RegExp]> = [
  ["latest", /\b(latest|current|currently|recent|recently|new|news)\b/i],
  ["time-sensitive", /\b(today|tonight|tomorrow|yesterday|this week|this month|this year)\b/i],
  ["release", /\b(release|released|shipping|shipped|rollout|rolled out|version|changelog|patch)\b/i],
  ["market", /\b(price|stock|shares|market cap|bitcoin|btc|ethereum|eth|crypto|forecast)\b/i],
  ["live-data", /\b(weather|forecast|temperature|score|standings|schedule|traffic)\b/i],
  ["public-office", /\b(ceo|president|prime minister|chancellor|minister|governor|election|law|regulation)\b/i],
  ["docs", /\b(api|sdk|library|documentation|docs)\b/i],
];

const DE_FRESHNESS_PATTERNS: Array<[string, RegExp]> = [
  ["latest", /\b(aktuell|derzeit|neu|neuste|neueste|letzte|zuletzt|nachrichten)\b/i],
  ["time-sensitive", /\b(heute|morgen|gestern|diese woche|diesen monat|dieses jahr)\b/i],
  ["release", /\b(release|version|changelog|patch|veroeffentlicht|veröffentlicht|ausgerollt)\b/i],
  ["market", /\b(preis|aktie|aktien|marktkapitalisierung|bitcoin|btc|ethereum|eth|krypto)\b/i],
  ["live-data", /\b(wetter|vorhersage|temperatur|spielstand|tabelle|spielplan|verkehr)\b/i],
  ["public-office", /\b(ceo|präsident|praesident|kanzler|kanzlerin|minist(er|erin)|wahl|gesetz|verordnung)\b/i],
  ["docs", /\b(api|sdk|bibliothek|dokumentation|docs)\b/i],
];

const FOLLOW_UP_PATTERNS = [
  /^(and|what about|how about|what else|does that|is that|who else|when exactly|where exactly)\b/i,
  /^(und|wie sieht es mit|was ist mit|und was ist mit|wie genau|wer noch|wann genau|wo genau)\b/i,
];

function collectFreshnessSignals(query: string, language: AppLanguage) {
  const patterns =
    language === "de" ? DE_FRESHNESS_PATTERNS : EN_FRESHNESS_PATTERNS;

  return patterns
    .filter(([, pattern]) => pattern.test(query))
    .map(([signal]) => signal);
}

function isGroundedFollowUp(query: string, messages: Message[]) {
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");

  if (!lastAssistantMessage?.metadata?.webSearch) {
    return false;
  }

  return FOLLOW_UP_PATTERNS.some((pattern) => pattern.test(query.trim()));
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

  if (params.mode === "on") {
    return {
      shouldSearch: true,
      reason: "manual-on",
      matchedSignals: [],
    };
  }

  const normalizedQuery = params.query.trim();
  const matchedSignals = collectFreshnessSignals(normalizedQuery, params.language);

  if (matchedSignals.length > 0) {
    return {
      shouldSearch: true,
      reason: "freshness-signals",
      matchedSignals,
    };
  }

  if (isGroundedFollowUp(normalizedQuery, params.messages)) {
    return {
      shouldSearch: true,
      reason: "grounded-follow-up",
      matchedSignals: ["follow-up"],
    };
  }

  return {
    shouldSearch: false,
    reason: "stable-query",
    matchedSignals: [],
  };
}
