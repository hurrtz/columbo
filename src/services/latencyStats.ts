import AsyncStorage from "@react-native-async-storage/async-storage";

import type { WebSearchMode, WebSearchProvider } from "../constants/webSearch";
import type {
  AssistantResponseLength,
  AssistantResponseTone,
  Provider,
  ReplyPlayback,
  SttBackendMode,
  TtsBackendMode,
  VoicePhaseProgress,
} from "../types";

const STORAGE_KEY = "@columbo/latency_stats";
const MAX_SAMPLES_PER_ROUTE = 24;
const MIN_SAMPLE_MS = 250;
const MAX_SAMPLE_MS = 10 * 60_000;

export type LatencyStatsPhase =
  | "llm-response"
  | "web-search"
  | "turn-to-first-speech";

export interface LatencyRouteDescriptor {
  phase: LatencyStatsPhase;
  provider: Provider | WebSearchProvider | null;
  model?: string | null;
  effort?: string | null;
  responseLength?: AssistantResponseLength;
  responseTone?: AssistantResponseTone;
  webSearchMode?: WebSearchMode;
  webSearchProvider?: WebSearchProvider | null;
  inputSource?: "text" | "voice";
  sttMode?: SttBackendMode;
  sttProvider?: Provider | null;
  sttModel?: string | null;
  ttsMode?: TtsBackendMode;
  ttsProvider?: Provider | null;
  ttsModel?: string | null;
  replyPlayback?: ReplyPlayback;
  spokenRepliesEnabled?: boolean;
}

export interface LatencyRouteStats {
  samples: number[];
  updatedAt: string;
}

type LatencyStatsStore = Record<string, LatencyRouteStats>;

export interface LatencyEstimate {
  key: string;
  keys: string[];
  estimatedMs: number;
  sampleCount: number;
  learned: boolean;
  source: "default" | "family" | "exact";
}

function normalizeKeyPart(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return "none";
  }

  return value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "_");
}

export function createLatencyRouteKey(descriptor: LatencyRouteDescriptor) {
  if (descriptor.phase === "web-search") {
    return [
      "web",
      normalizeKeyPart(descriptor.provider),
      normalizeKeyPart(descriptor.webSearchMode),
    ].join(":");
  }

  if (descriptor.phase === "turn-to-first-speech") {
    return [
      "turn-to-first-speech-v1",
      normalizeKeyPart(descriptor.provider),
      normalizeKeyPart(descriptor.model),
      normalizeKeyPart(descriptor.effort),
      normalizeKeyPart(descriptor.responseLength),
      normalizeKeyPart(descriptor.responseTone),
      normalizeKeyPart(descriptor.inputSource),
      normalizeKeyPart(descriptor.sttMode),
      normalizeKeyPart(descriptor.sttProvider),
      normalizeKeyPart(descriptor.sttModel),
      descriptor.spokenRepliesEnabled ? "spoken" : "text-only",
      normalizeKeyPart(descriptor.ttsMode),
      normalizeKeyPart(descriptor.ttsProvider),
      normalizeKeyPart(descriptor.ttsModel),
      normalizeKeyPart(descriptor.replyPlayback),
      normalizeKeyPart(descriptor.webSearchMode),
      normalizeKeyPart(descriptor.webSearchProvider),
    ].join(":");
  }

  return [
    // v2 deliberately does not reuse the old first-token samples. The ring is
    // visible until the whole LLM response is ready, so it must learn that same
    // duration rather than an unrelated time-to-first-token metric.
    "llm-response-v2",
    normalizeKeyPart(descriptor.provider),
    normalizeKeyPart(descriptor.model),
    normalizeKeyPart(descriptor.effort),
    normalizeKeyPart(descriptor.responseLength),
    normalizeKeyPart(descriptor.responseTone),
    normalizeKeyPart(descriptor.webSearchMode),
    normalizeKeyPart(descriptor.webSearchProvider),
  ].join(":");
}

export function createLatencyRouteKeys(descriptor: LatencyRouteDescriptor) {
  const exactKey = createLatencyRouteKey(descriptor);

  if (descriptor.phase !== "turn-to-first-speech") {
    return [exactKey];
  }

  const familyKey = [
    "turn-to-first-speech-family-v1",
    normalizeKeyPart(descriptor.provider),
    normalizeKeyPart(descriptor.model),
    normalizeKeyPart(descriptor.effort),
    normalizeKeyPart(descriptor.responseLength),
    normalizeKeyPart(descriptor.inputSource),
    normalizeKeyPart(descriptor.sttMode),
    descriptor.spokenRepliesEnabled ? "spoken" : "text-only",
    normalizeKeyPart(descriptor.ttsMode),
    normalizeKeyPart(descriptor.ttsProvider),
    normalizeKeyPart(descriptor.replyPlayback),
    descriptor.webSearchMode && descriptor.webSearchMode !== "off"
      ? "search-on"
      : "search-off",
  ].join(":");

  return [exactKey, familyKey];
}

export function getDefaultLatencyEstimateMs(
  descriptor: LatencyRouteDescriptor,
) {
  if (descriptor.phase === "web-search") {
    return 6_000;
  }

  const effort = normalizeKeyPart(descriptor.effort);
  const model = normalizeKeyPart(descriptor.model);
  const provider = normalizeKeyPart(descriptor.provider);
  let estimateMs =
    effort.includes("max")
      ? 42_000
      : effort.includes("high")
        ? 30_000
        : effort.includes("medium")
          ? 18_000
          : effort.includes("low")
            ? 9_000
            : 14_000;

  if (provider === "anthropic") {
    estimateMs += 5_000;
  }
  if (model.includes("fable") || model.includes("opus")) {
    estimateMs += 8_000;
  }
  if (descriptor.responseLength === "thorough") {
    estimateMs += 5_000;
  } else if (descriptor.responseLength === "brief") {
    estimateMs -= 2_000;
  }
  if (
    descriptor.webSearchMode &&
    descriptor.webSearchMode !== "off" &&
    descriptor.webSearchProvider
  ) {
    estimateMs += 4_000;
  }

  if (descriptor.phase === "llm-response") {
    return Math.max(5_000, estimateMs);
  }

  if (descriptor.inputSource === "voice") {
    estimateMs += descriptor.sttMode === "provider" ? 7_000 : 3_500;
  }

  if (descriptor.spokenRepliesEnabled) {
    if (descriptor.ttsMode === "provider") {
      const providerSpeechMs =
        descriptor.ttsProvider === "xai"
          ? 18_000
          : descriptor.ttsProvider === "gemini"
            ? 15_000
            : 12_000;

      if (descriptor.replyPlayback === "wait") {
        estimateMs +=
          descriptor.responseLength === "thorough"
            ? providerSpeechMs + 45_000
            : descriptor.responseLength === "brief"
              ? providerSpeechMs + 12_000
              : providerSpeechMs + 25_000;
      } else {
        estimateMs += providerSpeechMs;
      }
    } else {
      estimateMs += descriptor.replyPlayback === "wait" ? 2_500 : 1_000;
    }
  }

  return Math.max(5_000, estimateMs);
}

function percentile(sortedSamples: number[], fraction: number) {
  if (sortedSamples.length === 0) {
    return 0;
  }

  const index = Math.min(
    sortedSamples.length - 1,
    Math.max(0, Math.ceil(sortedSamples.length * fraction) - 1),
  );

  return sortedSamples[index] ?? sortedSamples[sortedSamples.length - 1] ?? 0;
}

export function getLearnedLatencyEstimateMs(samples: number[]) {
  if (samples.length === 0) {
    return 0;
  }

  const sorted = [...samples].sort((a, b) => a - b);
  const p50 = percentile(sorted, 0.5);
  const p75 = percentile(sorted, 0.75);
  const p90 = percentile(sorted, 0.9);

  if (samples.length < 4) {
    return Math.round((p50 + p75) / 2);
  }

  return Math.round(p75 * 0.72 + p90 * 0.28);
}

export function getLatencyProgress(
  elapsedMs: number,
  estimatedMs: number,
): Pick<VoicePhaseProgress, "progress" | "overEstimate"> {
  const safeEstimateMs = Math.max(1, estimatedMs);

  if (elapsedMs <= safeEstimateMs) {
    const ratio = elapsedMs / safeEstimateMs;

    return {
      progress: Math.min(0.9, 0.06 + Math.pow(ratio, 0.78) * 0.84),
      overEstimate: false,
    };
  }

  const overRatio = (elapsedMs - safeEstimateMs) / safeEstimateMs;

  return {
    progress: Math.min(0.97, 0.9 + (1 - Math.exp(-overRatio)) * 0.07),
    overEstimate: true,
  };
}

function parseStore(raw: string | null): LatencyStatsStore {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as LatencyStatsStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export async function loadLatencyEstimate(
  descriptor: LatencyRouteDescriptor,
): Promise<LatencyEstimate> {
  const keys = createLatencyRouteKeys(descriptor);
  const [key, familyKey] = keys;
  const fallbackMs = getDefaultLatencyEstimateMs(descriptor);
  const store = parseStore(await AsyncStorage.getItem(STORAGE_KEY));
  const exactSamples = store[key]?.samples?.filter(Number.isFinite) ?? [];
  const familySamples = familyKey
    ? store[familyKey]?.samples?.filter(Number.isFinite) ?? []
    : [];
  const exactMs = getLearnedLatencyEstimateMs(exactSamples);
  const familyMs = getLearnedLatencyEstimateMs(familySamples);

  if (exactMs > 0 && exactSamples.length >= 4) {
    return {
      key,
      keys,
      estimatedMs: exactMs,
      sampleCount: exactSamples.length,
      learned: true,
      source: "exact",
    };
  }

  if (familyMs > 0) {
    const exactWeight = exactMs
      ? Math.min(0.8, 0.35 + exactSamples.length * 0.15)
      : 0;
    const estimatedMs = exactMs
      ? Math.round(exactMs * exactWeight + familyMs * (1 - exactWeight))
      : familyMs;

    return {
      key,
      keys,
      estimatedMs,
      sampleCount: familySamples.length,
      learned: true,
      source: exactMs ? "exact" : "family",
    };
  }

  if (exactMs > 0) {
    return {
      key,
      keys,
      estimatedMs: exactMs,
      sampleCount: exactSamples.length,
      learned: true,
      source: "exact",
    };
  }

  return {
    key,
    keys,
    estimatedMs: fallbackMs,
    sampleCount: 0,
    learned: false,
    source: "default",
  };
}

export async function recordLatencySamples(
  keys: string[],
  durationMs: number,
): Promise<void> {
  if (
    keys.length === 0 ||
    !Number.isFinite(durationMs) ||
    durationMs < MIN_SAMPLE_MS ||
    durationMs > MAX_SAMPLE_MS
  ) {
    return;
  }

  const store = parseStore(await AsyncStorage.getItem(STORAGE_KEY));
  const updatedAt = new Date().toISOString();

  for (const key of [...new Set(keys.filter(Boolean))]) {
    const current = store[key]?.samples?.filter(Number.isFinite) ?? [];
    const samples = [...current, Math.round(durationMs)].slice(
      -MAX_SAMPLES_PER_ROUTE,
    );

    store[key] = {
      samples,
      updatedAt,
    };
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export async function recordLatencySample(
  key: string,
  durationMs: number,
): Promise<void> {
  await recordLatencySamples([key], durationMs);
}
