import { type MutableRefObject, useCallback, type Dispatch, type SetStateAction } from "react";
import * as Speech from "expo-speech";
import { stopNativeAudioQueue } from "../../services/nativeAudioQueue";
import { recordSpeechDiagnostic } from "../../services/speech/diagnostics";
import { type AudioQueueItem, type NativeSpeechQueueItem } from "./types";

export function useStopPlaybackController(params: {
  clearNativeAudioQueueState: () => void;
  currentAudioRef: MutableRefObject<AudioQueueItem | null>;
  hasPendingPlaybackNow: () => boolean;
  hasSeenAudioPlayingRef: MutableRefObject<boolean>;
  markPlaybackEnded: () => void;
  nativeQueueRef: MutableRefObject<NativeSpeechQueueItem[]>;
  nativeSpeakingRef: MutableRefObject<boolean>;
  playbackGenerationRef: MutableRefObject<number>;
  playbackPausedRef: MutableRefObject<boolean>;
  player: { pause: () => void };
  playingRef: MutableRefObject<boolean>;
  removeLoadedAudio: () => void;
  resetPlaybackSession: () => void;
  resetVisualState: () => void;
  setNativeSpeaking: Dispatch<SetStateAction<boolean>>;
  setNativeSpeechPlaying: Dispatch<SetStateAction<boolean>>;
  setPlaybackPaused: Dispatch<SetStateAction<boolean>>;
  startingRef: MutableRefObject<boolean>;
  stopNativeMetering: () => void;
  stopNativeOutputWaveform: () => void;
  updatePendingPlaybackState: () => void;
  usingNativeAudioQueue: boolean;
  queueRef: MutableRefObject<AudioQueueItem[]>;
  cancelledRef: MutableRefObject<boolean>;
}) {
  const {
    cancelledRef,
    clearNativeAudioQueueState,
    currentAudioRef,
    hasPendingPlaybackNow,
    hasSeenAudioPlayingRef,
    markPlaybackEnded,
    nativeQueueRef,
    nativeSpeakingRef,
    playbackGenerationRef,
    playbackPausedRef,
    player,
    playingRef,
    queueRef,
    removeLoadedAudio,
    resetPlaybackSession,
    resetVisualState,
    setNativeSpeaking,
    setNativeSpeechPlaying,
    setPlaybackPaused,
    startingRef,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  } = params;

  const stopPlayback = useCallback(async () => {
    const hadPlayback =
      hasPendingPlaybackNow() ||
      nativeSpeakingRef.current ||
      playingRef.current ||
      startingRef.current;
    const stoppedAudioDiagnostics = currentAudioRef.current?.diagnostics;
    // Dispatch native teardown first so system speech/audio receives the stop
    // request before any React state bookkeeping. The UI still settles below
    // without waiting for either native promise.
    const nativeStops: Promise<unknown>[] = [Speech.stop()];
    if (usingNativeAudioQueue) {
      nativeStops.push(stopNativeAudioQueue());
    }
    playbackGenerationRef.current += 1;
    cancelledRef.current = true;
    playbackPausedRef.current = false;
    setPlaybackPaused(false);
    queueRef.current = [];
    nativeQueueRef.current = [];
    currentAudioRef.current = null;
    hasSeenAudioPlayingRef.current = false;
    clearNativeAudioQueueState();
    player.pause();
    removeLoadedAudio();
    stopNativeMetering();
    stopNativeOutputWaveform();
    nativeSpeakingRef.current = false;
    setNativeSpeaking(false);
    setNativeSpeechPlaying(false);
    startingRef.current = false;
    playingRef.current = false;
    if (hadPlayback) {
      markPlaybackEnded();
    }
    resetVisualState();
    resetPlaybackSession();
    updatePendingPlaybackState();

    // Release the UI and playback-drain waiters before native teardown. Both
    // native stop calls can take perceptible time on a busy audio session.
    await Promise.allSettled(nativeStops);
    if (stoppedAudioDiagnostics) {
      recordSpeechDiagnostic({
        requestId: stoppedAudioDiagnostics.requestId,
        source: stoppedAudioDiagnostics.source ?? "unknown",
        stage: "playback-stopped",
        provider: stoppedAudioDiagnostics.provider ?? null,
        providerModel: stoppedAudioDiagnostics.providerModel ?? null,
        message: "Playback stopped explicitly.",
      });
    }
  }, [
    cancelledRef,
    clearNativeAudioQueueState,
    currentAudioRef,
    hasPendingPlaybackNow,
    hasSeenAudioPlayingRef,
    markPlaybackEnded,
    nativeQueueRef,
    nativeSpeakingRef,
    playbackGenerationRef,
    playbackPausedRef,
    player,
    playingRef,
    queueRef,
    removeLoadedAudio,
    resetPlaybackSession,
    resetVisualState,
    setNativeSpeaking,
    setNativeSpeechPlaying,
    setPlaybackPaused,
    startingRef,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  ]);

  const resetCancellation = useCallback(() => {
    const hadPlayback =
      hasPendingPlaybackNow() ||
      nativeSpeakingRef.current ||
      playingRef.current ||
      startingRef.current;
    playbackGenerationRef.current += 1;
    cancelledRef.current = false;
    playbackPausedRef.current = false;
    setPlaybackPaused(false);
    queueRef.current = [];
    nativeQueueRef.current = [];
    currentAudioRef.current = null;
    hasSeenAudioPlayingRef.current = false;
    clearNativeAudioQueueState();
    nativeSpeakingRef.current = false;
    setNativeSpeaking(false);
    setNativeSpeechPlaying(false);
    startingRef.current = false;
    playingRef.current = false;
    if (hadPlayback) {
      markPlaybackEnded();
    }
    player.pause();
    removeLoadedAudio();
    if (usingNativeAudioQueue) {
      void stopNativeAudioQueue();
    }
    stopNativeMetering();
    stopNativeOutputWaveform();
    resetVisualState();
    resetPlaybackSession();
    updatePendingPlaybackState();
  }, [
    cancelledRef,
    clearNativeAudioQueueState,
    currentAudioRef,
    hasPendingPlaybackNow,
    hasSeenAudioPlayingRef,
    markPlaybackEnded,
    nativeQueueRef,
    nativeSpeakingRef,
    playbackGenerationRef,
    playbackPausedRef,
    player,
    playingRef,
    queueRef,
    removeLoadedAudio,
    resetPlaybackSession,
    resetVisualState,
    setNativeSpeaking,
    setNativeSpeechPlaying,
    setPlaybackPaused,
    startingRef,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  ]);

  return {
    resetCancellation,
    stopPlayback,
  };
}
