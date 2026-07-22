import { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from "react";

import { recordDebugLogEvent } from "../../services/debugLogCapture";
import {
  createLatencyRouteKey,
  createLatencyRouteKeys,
  getDefaultLatencyEstimateMs,
  getLatencyProgress,
  loadLatencyEstimate,
  recordLatencySamples,
  type LatencyRouteDescriptor,
} from "../../services/latencyStats";
import type {
  VoicePhaseProgress,
  VoicePhaseProgressPhase,
} from "../../types";

interface ActiveLatencyProgress {
  phase: VoicePhaseProgressPhase;
  key: string;
  keys: string[];
  startedAt: number;
  estimatedMs: number;
  sampleCount: number;
  learned: boolean;
  progress: number;
  runId: number;
}

export function useLatencyProgressController({
  setPhaseProgress,
}: {
  setPhaseProgress: Dispatch<SetStateAction<VoicePhaseProgress | null>>;
}) {
  const activeLatencyProgressRef = useRef<ActiveLatencyProgress | null>(null);
  const latencyRunIdRef = useRef(0);

  const updateLatencyProgress = useCallback(
    (active: ActiveLatencyProgress) => {
      const elapsedMs = Date.now() - active.startedAt;
      const progress = getLatencyProgress(elapsedMs, active.estimatedMs);
      active.progress = Math.max(active.progress, progress.progress);

      setPhaseProgress({
        phase: active.phase,
        progress: active.progress,
        elapsedMs,
        startedAt: active.startedAt,
        estimatedMs: active.estimatedMs,
        sampleCount: active.sampleCount,
        learned: active.learned,
        overEstimate: progress.overEstimate,
      });
    },
    [setPhaseProgress],
  );

  const clearLatencyProgress = useCallback(() => {
    latencyRunIdRef.current += 1;
    activeLatencyProgressRef.current = null;
    setPhaseProgress(null);
  }, [setPhaseProgress]);

  const startLatencyProgress = useCallback(
    (
      phase: VoicePhaseProgressPhase,
      descriptor: LatencyRouteDescriptor,
    ) => {
      clearLatencyProgress();

      const runId = latencyRunIdRef.current + 1;
      latencyRunIdRef.current = runId;
      const startedAt = Date.now();
      const fallbackEstimateMs = getDefaultLatencyEstimateMs(descriptor);
      const key = createLatencyRouteKey(descriptor);
      const keys = createLatencyRouteKeys(descriptor);
      const active: ActiveLatencyProgress = {
        phase,
        key,
        keys,
        startedAt,
        estimatedMs: fallbackEstimateMs,
        sampleCount: 0,
        learned: false,
        progress: 0,
        runId,
      };

      activeLatencyProgressRef.current = active;
      updateLatencyProgress(active);

      void loadLatencyEstimate(descriptor)
        .then((estimate) => {
          const current = activeLatencyProgressRef.current;

          if (current?.runId !== runId) {
            return;
          }

          current.estimatedMs = estimate.estimatedMs;
          current.sampleCount = estimate.sampleCount;
          current.learned = estimate.learned;
          current.keys = estimate.keys;
          recordDebugLogEvent({
            event: "adaptive-latency-estimate-loaded",
            payload: {
              estimatedMs: estimate.estimatedMs,
              key: estimate.key,
              phase,
              sampleCount: estimate.sampleCount,
              source: estimate.source,
            },
          });
          updateLatencyProgress(current);
        })
        .catch((error) => {
          recordDebugLogEvent({
            event: "adaptive-latency-estimate-load-failed",
            level: "warn",
            payload: {
              key,
              message: error instanceof Error ? error.message : String(error),
              phase,
            },
          });
        });
    },
    [clearLatencyProgress, updateLatencyProgress],
  );

  const recordLatencyProgressSample = useCallback(
    (phase: VoicePhaseProgressPhase) => {
      const active = activeLatencyProgressRef.current;

      if (!active || active.phase !== phase) {
        return;
      }

      const durationMs = Date.now() - active.startedAt;
      const key = active.key;

      void recordLatencySamples(active.keys, durationMs)
        .then(() => {
          recordDebugLogEvent({
            event: "adaptive-latency-sample-recorded",
            payload: {
              durationMs,
              key,
              routeCount: active.keys.length,
              phase,
            },
          });
        })
        .catch((error) => {
          recordDebugLogEvent({
            event: "adaptive-latency-sample-record-failed",
            level: "warn",
            payload: {
              durationMs,
              key,
              message: error instanceof Error ? error.message : String(error),
              phase,
            },
          });
        });
    },
    [],
  );

  const finishLatencyProgress = useCallback(
    (phase: VoicePhaseProgressPhase) => {
      recordLatencyProgressSample(phase);
      clearLatencyProgress();
    },
    [clearLatencyProgress, recordLatencyProgressSample],
  );

  useEffect(
    () => () => {
      latencyRunIdRef.current += 1;
      activeLatencyProgressRef.current = null;
    },
    [],
  );

  return {
    clearLatencyProgress,
    finishLatencyProgress,
    startLatencyProgress,
  };
}
