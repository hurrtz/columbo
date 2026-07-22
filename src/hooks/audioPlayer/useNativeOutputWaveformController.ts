import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from "react";

import type { PlaybackWaveformControls } from "./usePlaybackVisualState";

import {
  analyzeNativeAudioFile,
  type NativeWaveformAnalysis,
  startNativeOutputWaveformPlayback,
  stopNativeOutputWaveformPlayback,
} from "../../services/nativeWaveform";
import {
  OSCILLOSCOPE_SAMPLE_COUNT,
  averageLevels,
  averageSampleMagnitude,
  buildFallbackSpeechLevels,
  getPlaybackWaveformWindow,
  levelToMetering,
} from "../../utils/audioVisualization";
import { logWaveformDebug } from "../../utils/waveformDebug";

import {
  OSCILLOSCOPE_TICK_INTERVAL_MS,
  VISUAL_UPDATE_INTERVAL_MS,
} from "./shared";
import { type NativeAudioQueueContext } from "./types";

interface UseNativeOutputWaveformControllerParams {
  nativeAudioQueueContextsRef: MutableRefObject<
    Map<string, NativeAudioQueueContext>
  >;
  nativeAudioQueuePendingCountRef: MutableRefObject<number>;
  nativeAudioQueuePlayingRef: MutableRefObject<boolean>;
  publishWaveform: PlaybackWaveformControls["publishWaveform"];
  setNativeAudioQueuePlaying: Dispatch<SetStateAction<boolean>>;
  setWaveformVariant: PlaybackWaveformControls["setWaveformVariant"];
  supportsNativeOutputWaveform: boolean;
  usingNativeAudioQueue: boolean;
}

const NATIVE_OUTPUT_WAVEFORM_ANALYSIS_SAMPLE_COUNT = 480;

export function useNativeOutputWaveformController({
  nativeAudioQueueContextsRef,
  nativeAudioQueuePendingCountRef,
  nativeAudioQueuePlayingRef,
  publishWaveform,
  setNativeAudioQueuePlaying,
  setWaveformVariant,
  supportsNativeOutputWaveform,
  usingNativeAudioQueue,
}: UseNativeOutputWaveformControllerParams) {
  const nativeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nativeOutputWaveformIntervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);
  const nativeOutputWaveformItemIdRef = useRef<string | null>(null);
  const nativeOutputWaveformStartedAtRef = useRef<number | null>(null);
  const pausedNativeOutputWaveformRef = useRef<{
    analysis: NativeWaveformAnalysis;
    elapsedMs: number;
    itemId: string;
  } | null>(null);
  const activeNativeOutputWaveformAnalysisRef =
    useRef<NativeWaveformAnalysis | null>(null);
  const waveformAnalysisCacheRef = useRef<
    Map<string, Promise<NativeWaveformAnalysis | null>>
  >(new Map());

  const stopNativeMetering = useCallback(() => {
    if (nativeIntervalRef.current) {
      clearInterval(nativeIntervalRef.current);
      nativeIntervalRef.current = null;
    }
  }, []);

  const stopNativeOutputWaveform = useCallback(() => {
    const pausedItemId = pausedNativeOutputWaveformRef.current?.itemId ?? null;
    if (usingNativeAudioQueue) {
      logWaveformDebug("output-waveform-stop-requested", {
        itemId: nativeOutputWaveformItemIdRef.current ?? pausedItemId,
        usingNativeAudioQueue,
        supportsNativeOutputWaveform,
      });
      void stopNativeOutputWaveformPlayback(
        nativeOutputWaveformItemIdRef.current ?? pausedItemId,
      );
    }

    if (nativeOutputWaveformIntervalRef.current) {
      clearInterval(nativeOutputWaveformIntervalRef.current);
      nativeOutputWaveformIntervalRef.current = null;
    }

    nativeOutputWaveformItemIdRef.current = null;
    nativeOutputWaveformStartedAtRef.current = null;
    activeNativeOutputWaveformAnalysisRef.current = null;
    pausedNativeOutputWaveformRef.current = null;
    setWaveformVariant("bars");
  }, [setWaveformVariant, supportsNativeOutputWaveform, usingNativeAudioQueue]);

  const pauseNativeOutputWaveform = useCallback(() => {
    const itemId = nativeOutputWaveformItemIdRef.current;
    const startedAtMs = nativeOutputWaveformStartedAtRef.current;
    const analysis = activeNativeOutputWaveformAnalysisRef.current;

    if (!itemId || startedAtMs === null || !analysis) {
      return false;
    }

    const elapsedMs = Math.min(
      analysis.durationMs,
      Math.max(0, Date.now() - startedAtMs),
    );
    pausedNativeOutputWaveformRef.current = {
      analysis,
      elapsedMs,
      itemId,
    };

    if (usingNativeAudioQueue) {
      void stopNativeOutputWaveformPlayback(itemId);
    }
    if (nativeOutputWaveformIntervalRef.current) {
      clearInterval(nativeOutputWaveformIntervalRef.current);
      nativeOutputWaveformIntervalRef.current = null;
    }

    nativeOutputWaveformItemIdRef.current = null;
    nativeOutputWaveformStartedAtRef.current = null;
    activeNativeOutputWaveformAnalysisRef.current = null;
    setWaveformVariant("bars");
    return true;
  }, [setWaveformVariant, usingNativeAudioQueue]);

  const clearNativeAudioQueueState = useCallback(() => {
    nativeAudioQueueContextsRef.current.clear();
    nativeAudioQueuePendingCountRef.current = 0;
    nativeAudioQueuePlayingRef.current = false;
    waveformAnalysisCacheRef.current.clear();
    setNativeAudioQueuePlaying(false);
    stopNativeOutputWaveform();
  }, [
    nativeAudioQueueContextsRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    setNativeAudioQueuePlaying,
    stopNativeOutputWaveform,
  ]);

  const startNativeMetering = useCallback(() => {
    stopNativeMetering();
    setWaveformVariant("bars");

    const baseTime = Date.now() / 1000;
    nativeIntervalRef.current = setInterval(() => {
      const levels = buildFallbackSpeechLevels(baseTime + Date.now() / 700);
      publishWaveform(levels, levelToMetering(averageLevels(levels)));
    }, VISUAL_UPDATE_INTERVAL_MS);
  }, [
    publishWaveform,
    setWaveformVariant,
    stopNativeMetering,
  ]);

  const getWaveformAnalysis = useCallback((uri: string) => {
    const cached = waveformAnalysisCacheRef.current.get(uri);
    if (cached) {
      return cached;
    }

    const next = analyzeNativeAudioFile({
      uri,
      sampleCount: NATIVE_OUTPUT_WAVEFORM_ANALYSIS_SAMPLE_COUNT,
    }).catch(() => null);

    waveformAnalysisCacheRef.current.set(uri, next);
    return next;
  }, []);

  const startNativeOutputWaveform = useCallback(
    (
      itemId: string,
      analysis: NativeWaveformAnalysis,
      playbackStartedAtMs: number,
    ) => {
      if (!analysis.samples.length || analysis.durationMs <= 0) {
        logWaveformDebug("output-waveform-skipped", {
          itemId,
          reason: "empty-analysis",
          durationMs: analysis.durationMs,
          sampleCount: analysis.samples.length,
        });
        return;
      }

      logWaveformDebug("output-waveform-primed", {
        itemId,
        durationMs: analysis.durationMs,
        sampleCount: analysis.samples.length,
        usingNativeAudioQueue,
        supportsNativeOutputWaveform,
      });
      stopNativeOutputWaveform();
      nativeOutputWaveformItemIdRef.current = itemId;
      nativeOutputWaveformStartedAtRef.current = playbackStartedAtMs;
      activeNativeOutputWaveformAnalysisRef.current = analysis;
      pausedNativeOutputWaveformRef.current = null;
      setWaveformVariant("oscilloscope");
      void startNativeOutputWaveformPlayback({
        itemId,
        samples: analysis.samples,
        durationMs: analysis.durationMs,
        elapsedMs: Math.max(0, Date.now() - playbackStartedAtMs),
      });

      const tick = () => {
        if (nativeOutputWaveformItemIdRef.current !== itemId) {
          return;
        }

        const startedAt = nativeOutputWaveformStartedAtRef.current ?? Date.now();
        const progress = Math.min(
          1,
          Math.max(0, (Date.now() - startedAt) / Math.max(1, analysis.durationMs)),
        );
        const samples = getPlaybackWaveformWindow(
          analysis.samples,
          progress,
          OSCILLOSCOPE_SAMPLE_COUNT,
        );

        publishWaveform(samples, levelToMetering(averageSampleMagnitude(samples)));
      };

      tick();
      nativeOutputWaveformIntervalRef.current = setInterval(
        tick,
        OSCILLOSCOPE_TICK_INTERVAL_MS,
      );
    },
    [
      getWaveformAnalysis,
      publishWaveform,
      setWaveformVariant,
      stopNativeOutputWaveform,
      supportsNativeOutputWaveform,
      usingNativeAudioQueue,
    ],
  );

  const resumeNativeOutputWaveform = useCallback(() => {
    const paused = pausedNativeOutputWaveformRef.current;
    if (!paused) {
      return false;
    }

    pausedNativeOutputWaveformRef.current = null;
    startNativeOutputWaveform(
      paused.itemId,
      paused.analysis,
      Date.now() - paused.elapsedMs,
    );
    return true;
  }, [startNativeOutputWaveform]);

  return {
    clearNativeAudioQueueState,
    getWaveformAnalysis,
    nativeOutputWaveformItemIdRef,
    nativeOutputWaveformStartedAtRef,
    pauseNativeOutputWaveform,
    resumeNativeOutputWaveform,
    startNativeMetering,
    startNativeOutputWaveform,
    stopNativeMetering,
    stopNativeOutputWaveform,
  };
}
