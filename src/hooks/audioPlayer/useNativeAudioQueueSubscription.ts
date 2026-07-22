import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
} from "react";

import {
  subscribeToNativeAudioQueue,
  type NativeAudioQueueEvent,
} from "../../services/nativeAudioQueue";
import {
  NativeWaveformAnalysis,
} from "../../services/nativeWaveform";
import {
  SpeechDiagnosticsContext,
  recordSpeechDiagnostic,
} from "../../services/speech/diagnostics";
import { logWaveformDebug } from "../../utils/waveformDebug";
import {
  type AudioQueueItem,
  type NativeAudioQueueContext,
  type NativeSpeechQueueItem,
} from "./types";

export function useNativeAudioQueueSubscription(params: {
  usingNativeAudioQueue: boolean;
  supportsNativeOutputWaveform: boolean;
  playNextNative: () => Promise<void>;
  finalizeDrainedState: () => void;
  updatePendingPlaybackState: () => void;
  startNativeOutputWaveform: (
    itemId: string,
    analysis: NativeWaveformAnalysis,
    playbackStartedAtMs: number,
  ) => void;
  stopNativeOutputWaveform: () => void;
  setNativeAudioQueuePlaying: Dispatch<SetStateAction<boolean>>;
  currentAudioRef: MutableRefObject<AudioQueueItem | null>;
  cancelledRef: MutableRefObject<boolean>;
  playingRef: MutableRefObject<boolean>;
  hasSeenAudioPlayingRef: MutableRefObject<boolean>;
  nativeOutputWaveformItemIdRef: MutableRefObject<string | null>;
  nativeOutputWaveformStartedAtRef: MutableRefObject<number | null>;
  nativeAudioQueueContextsRef: MutableRefObject<
    Map<string, NativeAudioQueueContext>
  >;
  nativeAudioQueuePendingCountRef: MutableRefObject<number>;
  nativeAudioQueuePlayingRef: MutableRefObject<boolean>;
  nativeQueueRef: MutableRefObject<
    NativeSpeechQueueItem[]
  >;
}) {
  const {
    usingNativeAudioQueue,
    supportsNativeOutputWaveform,
    playNextNative,
    finalizeDrainedState,
    updatePendingPlaybackState,
    startNativeOutputWaveform,
    stopNativeOutputWaveform,
    setNativeAudioQueuePlaying,
    currentAudioRef,
    cancelledRef,
    playingRef,
    hasSeenAudioPlayingRef,
    nativeOutputWaveformItemIdRef,
    nativeOutputWaveformStartedAtRef,
    nativeAudioQueueContextsRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    nativeQueueRef,
  } = params;

  useEffect(() => {
    if (!usingNativeAudioQueue) {
      return;
    }

    const handleNativeAudioQueueEvent = (event: NativeAudioQueueEvent) => {
      const itemId = event.itemId ?? "";
      const context = itemId
        ? nativeAudioQueueContextsRef.current.get(itemId)
        : undefined;

      switch (event.type) {
        case "started": {
          logWaveformDebug("native-audio-queue-event", {
            type: event.type,
            itemId,
            uri: context?.uri ?? event.uri ?? null,
            usingNativeAudioQueue,
            supportsNativeOutputWaveform,
          });
          stopNativeOutputWaveform();
          if (context) {
            currentAudioRef.current = {
              generation: context.generation,
              id: itemId,
              uri: context.uri,
              diagnostics: context.diagnostics,
            };
          }
          hasSeenAudioPlayingRef.current = true;
          playingRef.current = true;
          nativeAudioQueuePlayingRef.current = true;
          setNativeAudioQueuePlaying(true);
          nativeOutputWaveformItemIdRef.current = itemId;
          nativeOutputWaveformStartedAtRef.current = Date.now();
          context?.onPlaybackStarted?.();
          recordSpeechDiagnostic({
            requestId:
              context?.diagnostics?.requestId ?? event.requestId ?? undefined,
            source:
              context?.diagnostics?.source ??
              (event.source as SpeechDiagnosticsContext["source"] | null) ??
              "unknown",
            stage: "playback-started",
            provider: context?.diagnostics?.provider ?? null,
            providerModel: context?.diagnostics?.providerModel ?? null,
          });
          if (context?.waveformAnalysis) {
            const playbackStartedAtMs =
              nativeOutputWaveformStartedAtRef.current ?? Date.now();
            void context.waveformAnalysis.then((analysis) => {
              if (
                !analysis ||
                !analysis.samples.length ||
                cancelledRef.current ||
                !nativeAudioQueuePlayingRef.current ||
                nativeOutputWaveformItemIdRef.current !== itemId
              ) {
                return;
              }

              startNativeOutputWaveform(
                itemId,
                analysis,
                playbackStartedAtMs,
              );
            });
          }
          updatePendingPlaybackState();
          break;
        }
        case "finished":
        case "failed": {
          logWaveformDebug("native-audio-queue-event", {
            type: event.type,
            itemId,
            uri: context?.uri ?? event.uri ?? null,
            message: event.type === "failed" ? event.message ?? null : null,
            usingNativeAudioQueue,
            supportsNativeOutputWaveform,
          });
          if (itemId && nativeOutputWaveformItemIdRef.current === itemId) {
            stopNativeOutputWaveform();
          }
          if (context) {
            recordSpeechDiagnostic({
              requestId:
                context.diagnostics?.requestId ?? event.requestId ?? undefined,
              source:
                context.diagnostics?.source ??
                (event.source as SpeechDiagnosticsContext["source"] | null) ??
                "unknown",
              stage:
                event.type === "finished"
                  ? "playback-finished"
                  : "playback-stopped",
              provider: context.diagnostics?.provider ?? null,
              providerModel: context.diagnostics?.providerModel ?? null,
              message:
                event.type === "failed" ? event.message ?? undefined : undefined,
            });
          }

          if (itemId) {
            nativeAudioQueueContextsRef.current.delete(itemId);
          }
          nativeAudioQueuePendingCountRef.current = Math.max(
            0,
            nativeAudioQueuePendingCountRef.current - 1,
          );
          if (nativeAudioQueuePendingCountRef.current === 0) {
            currentAudioRef.current = null;
            hasSeenAudioPlayingRef.current = false;
            playingRef.current = false;
            nativeAudioQueuePlayingRef.current = false;
            setNativeAudioQueuePlaying(false);
          }
          updatePendingPlaybackState();
          if (
            !cancelledRef.current &&
            nativeAudioQueuePendingCountRef.current === 0 &&
            nativeQueueRef.current.length > 0
          ) {
            void playNextNative();
          }
          break;
        }
        case "stopped": {
          logWaveformDebug("native-audio-queue-event", {
            type: event.type,
            itemId,
            usingNativeAudioQueue,
            supportsNativeOutputWaveform,
          });
          if (itemId && nativeOutputWaveformItemIdRef.current === itemId) {
            stopNativeOutputWaveform();
          }
          break;
        }
        case "drained": {
          logWaveformDebug("native-audio-queue-event", {
            type: event.type,
            itemId,
            usingNativeAudioQueue,
            supportsNativeOutputWaveform,
          });
          stopNativeOutputWaveform();
          currentAudioRef.current = null;
          hasSeenAudioPlayingRef.current = false;
          playingRef.current = false;
          nativeAudioQueuePlayingRef.current = false;
          setNativeAudioQueuePlaying(false);
          nativeAudioQueuePendingCountRef.current = 0;
          nativeAudioQueueContextsRef.current.clear();
          updatePendingPlaybackState();

          if (!cancelledRef.current && nativeQueueRef.current.length > 0) {
            void playNextNative();
          } else {
            finalizeDrainedState();
          }
          break;
        }
      }
    };

    return subscribeToNativeAudioQueue(handleNativeAudioQueueEvent);
  }, [
    cancelledRef,
    currentAudioRef,
    finalizeDrainedState,
    hasSeenAudioPlayingRef,
    nativeAudioQueueContextsRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    nativeOutputWaveformItemIdRef,
    nativeOutputWaveformStartedAtRef,
    nativeQueueRef,
    playNextNative,
    playingRef,
    setNativeAudioQueuePlaying,
    startNativeOutputWaveform,
    stopNativeOutputWaveform,
    supportsNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  ]);
}
