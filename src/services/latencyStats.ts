import AsyncStorage from "@react-native-async-storage/async-storage";

import type { WebSearchMode, WebSearchProvider } from "../constants/webSearch";
import type {
  AssistantResponseLength,
  AssistantResponseTone,
  Provider,
  VoicePhaseProgress,
} from "../types";

const STORAGE_KEY = "@schnackai/latency_stats";
const MAX_SAMPLES_PER_ROUTE = 24;
const MIN_SAMPLE_MS = 250;
const MAX_SAMPLE_MS = 180_000;

export type LatencyStatsPhase = "llm-first-output" | "web-search";

export interface LatencyRouteDescriptor {
  phase: LatencyStatsPhase;
  provider: Provider | WebSearchProvider | null;
  model?: string | null;
  effort?: string | null;
  responseLength?: AssistantResponseLength;
  responseTone?: AssistantResponseTone;
  webSearchMode?: WebSearchMode;
  webSearchProvider?: WebSearchProvider | null;
}

export interface LatencyRouteStats {
  samples: number[];
  updatedAt: string;
}

type LatencyStatsStore = Record<string, LatencyRouteStats>;

export interface LatencyEstimate {
  key: string;
  estimatedMs: number;
  sampleCount: number;
  learned: boolean;
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

  return [
    "llm",
    normalizeKeyPart(descriptor.provider),
    normalizeKeyPart(descriptor.model),
    normalizeKeyPart(descriptor.effort),
    normalizeKeyPart(descriptor.responseLength),
    normalizeKeyPart(descriptor.responseTone),
    normalizeKeyPart(descriptor.webSearchMode),
    normalizeKeyPart(descriptor.webSearchProvider),
  ].join(":");
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
  const key = createLatencyRouteKey(descriptor);
  const fallbackMs = getDefaultLatencyEstimateMs(descriptor);
  const store = parseStore(await AsyncStorage.getItem(STORAGE_KEY));
  const samples = store[key]?.samples?.filter(Number.isFinite) ?? [];
  const learnedMs = getLearnedLatencyEstimateMs(samples);

  return {
    key,
    estimatedMs: learnedMs || fallbackMs,
    sampleCount: samples.length,
    learned: samples.length > 0 && learnedMs > 0,
  };
}

export async function recordLatencySample(
  key: string,
  durationMs: number,
): Promise<void> {
  if (
    !key ||
    !Number.isFinite(durationMs) ||
    durationMs < MIN_SAMPLE_MS ||
    durationMs > MAX_SAMPLE_MS
  ) {
    return;
  }

  const store = parseStore(await AsyncStorage.getItem(STORAGE_KEY));
  const current = store[key]?.samples?.filter(Number.isFinite) ?? [];
  const samples = [...current, Math.round(durationMs)].slice(
    -MAX_SAMPLES_PER_ROUTE,
  );

  store[key] = {
    samples,
    updatedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}
