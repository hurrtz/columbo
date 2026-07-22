import { useEffect, useState, useRef, useCallback } from "react";
import { Platform } from "react-native";
import {
  useAudioPlayer as useExpoAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import * as Speech from "expo-speech";
import {
  isNativeAudioQueueAvailable,
  pauseNativeAudioQueue,
  prepareNativeAudioQueue,
  resumeNativeAudioQueue,
} from "../services/nativeAudioQueue";
import { supportsNativeOutputWaveformPlayback } from "../services/nativeWaveform";
import { logWaveformDebug } from "../utils/waveformDebug";
import { PLAYER_STATUS_INTERVAL_MS } from "./audioPlayer/shared";
import { useAudioClipPlayback } from "./audioPlayer/useAudioClipPlayback";
import { useNativeAudioQueuePlayback } from "./audioPlayer/useNativeAudioQueuePlayback";
import { useNativeAudioQueueSubscription } from "./audioPlayer/useNativeAudioQueueSubscription";
import { useNativeOutputWaveformController } from "./audioPlayer/useNativeOutputWaveformController";
import { useNativeSpeechPlayback } from "./audioPlayer/useNativeSpeechPlayback";
import { usePendingPlaybackState } from "./audioPlayer/usePendingPlaybackState";
import { usePlaybackLifecycle } from "./audioPlayer/usePlaybackLifecycle";
import { usePlaybackSession } from "./audioPlayer/usePlaybackSession";
import { usePlaybackVisualState } from "./audioPlayer/usePlaybackVisualState";
import { useStopPlaybackController } from "./audioPlayer/useStopPlaybackController";
import {
  type AudioQueueItem,
  type NativeAudioQueueContext,
  type NativeSpeechQueueItem,
} from "./audioPlayer/types";

export function useAudioPlayer() {
  const usingNativeAudioQueue = isNativeAudioQueueAvailable();
  const supportsNativeOutputWaveform =
    supportsNativeOutputWaveformPlayback();
  const player = useExpoAudioPlayer(null, {
    updateInterval: PLAYER_STATUS_INTERVAL_MS,
    keepAudioSessionActive: false,
  });
  const status = useAudioPlayerStatus(player);
  const queueRef = useRef<AudioQueueItem[]>([]);
  const currentAudioRef = useRef<AudioQueueItem | null>(null);
  const playingRef = useRef(false);
  const startingRef = useRef(false);
  const cancelledRef = useRef(false);
  const playbackGenerationRef = useRef(0);
  const loadedSourceRef = useRef(false);
  const hasSeenAudioPlayingRef = useRef(false);
  const nativeAudioQueueContextsRef = useRef<Map<string, NativeAudioQueueContext>>(
    new Map(),
  );
  const nativeAudioQueuePendingCountRef = useRef(0);
  const nativeAudioQueuePlayingRef = useRef(false);
  const nativeQueueRef = useRef<NativeSpeechQueueItem[]>([]);
  const nativeSpeakingRef = useRef(false);
  const playbackPausedRef = useRef(false);
  const [nativeAudioQueuePlaying, setNativeAudioQueuePlaying] =
    useState(false);
  const [nativeSpeaking, setNativeSpeaking] = useState(false);
  const [nativeSpeechPlaying, setNativeSpeechPlaying] = useState(false);
  const [isPlaybackPaused, setPlaybackPaused] = useState(false);
  const { ensurePlaybackSession, resetPlaybackSession } =
    usePlaybackSession();
  const {
    publishWaveform,
    resetVisualState,
    setWaveformVariant,
  } = usePlaybackVisualState({
    player,
    status,
    nativeSpeaking,
    nativeSpeakingRef,
    nativeAudioQueuePlaying,
    usingNativeAudioQueue,
  });
  const {
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
  } = useNativeOutputWaveformController({
    nativeAudioQueueContextsRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    publishWaveform,
    setNativeAudioQueuePlaying,
    setWaveformVariant,
    supportsNativeOutputWaveform,
    usingNativeAudioQueue,
  });
  const {
    hasPendingPlayback,
    hasPendingPlaybackNow,
    markPlaybackEnded,
    resolveDrainWaiters,
    updatePendingPlaybackState,
    waitForDrain,
    waitForPlaybackRouteSettle: waitForPlaybackRouteSettleInternal,
  } = usePendingPlaybackState({
    currentAudioRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    nativeQueueRef,
    nativeSpeakingRef,
    playingRef,
    queueRef,
    startingRef,
    usingNativeAudioQueue,
  });
  const finalizeDrainedStateRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    logWaveformDebug("audio-player-init", {
      platform: Platform.OS,
      usingNativeAudioQueue,
      supportsNativeOutputWaveform,
      expoAudioSamplingSupported: player.isAudioSamplingSupported,
    });
  }, [
    player.isAudioSamplingSupported,
    supportsNativeOutputWaveform,
    usingNativeAudioQueue,
  ]);

  const ensureAudioQueuePlaybackSession = useCallback(async () => {
    if (!usingNativeAudioQueue) {
      await ensurePlaybackSession();
      return;
    }

    await ensurePlaybackSession();
    await prepareNativeAudioQueue();
  }, [ensurePlaybackSession, usingNativeAudioQueue]);

  const { playNativeAudio } = useNativeAudioQueuePlayback({
    cancelledRef,
    ensureAudioQueuePlaybackSession,
    finalizeDrainedStateRef,
    nativeAudioQueueContextsRef,
    nativeAudioQueuePendingCountRef,
    nativeQueueRef,
    nativeSpeakingRef,
    playbackGenerationRef,
    updatePendingPlaybackState,
  });

  const { enqueueAudio, playNextAudio, removeLoadedAudio } =
    useAudioClipPlayback({
      player,
      cancelledRef,
      currentAudioRef,
      ensurePlaybackSession,
      finalizeDrainedStateRef,
      getWaveformAnalysis,
      hasSeenAudioPlayingRef,
      loadedSourceRef,
      nativeAudioQueueContextsRef,
      nativeAudioQueuePendingCountRef,
      nativeSpeakingRef,
      playNativeAudio,
      playbackGenerationRef,
      playingRef,
      queueRef,
      startingRef,
      supportsNativeOutputWaveform,
      updatePendingPlaybackState,
      usingNativeAudioQueue,
    });

  const finalizeDrainedState = useCallback(() => {
    playbackPausedRef.current = false;
    setPlaybackPaused(false);
    markPlaybackEnded();
    removeLoadedAudio();
    stopNativeMetering();
    stopNativeOutputWaveform();
    clearNativeAudioQueueState();
    resetVisualState();
    resetPlaybackSession();
    updatePendingPlaybackState();
  }, [
    clearNativeAudioQueueState,
    markPlaybackEnded,
    removeLoadedAudio,
    resetPlaybackSession,
    resetVisualState,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
  ]);

  finalizeDrainedStateRef.current = finalizeDrainedState;

  const { playNextNative, speakText } = useNativeSpeechPlayback({
    nativeSpeaking,
    setNativeSpeaking,
    setNativeSpeechPlaying,
    nativeQueueRef,
    queueRef,
    currentAudioRef,
    nativeSpeakingRef,
    playingRef,
    playbackGenerationRef,
    startingRef,
    cancelledRef,
    ensurePlaybackSession,
    finalizeDrainedState,
    playNextAudio,
    startNativeMetering,
    stopNativeMetering,
    updatePendingPlaybackState,
  });

  useNativeAudioQueueSubscription({
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
  });

  usePlaybackLifecycle({
    cancelledRef,
    currentAudioRef,
    finalizeDrainedState,
    hasSeenAudioPlayingRef,
    nativeAudioQueuePendingCountRef,
    nativeAudioQueuePlayingRef,
    nativeQueueRef,
    nativeSpeakingRef,
    playbackPausedRef,
    playNextAudio,
    playNextNative,
    playingRef,
    queueRef,
    resolveDrainWaiters,
    setNativeAudioQueuePlaying,
    statusPlaybackState: status.playbackState,
    statusPlaying: status.playing,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  });

  const { stopPlayback, resetCancellation } = useStopPlaybackController({
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
    queueRef,
  });

  const pausePlayback = useCallback(async () => {
    if (playbackPausedRef.current) {
      return true;
    }

    const hasNativeSpeech = nativeSpeakingRef.current;
    const hasNativeAudioQueue =
      usingNativeAudioQueue && nativeAudioQueuePlayingRef.current;
    const hasAudioClip =
      !usingNativeAudioQueue &&
      (playingRef.current || currentAudioRef.current !== null);

    if (!hasNativeSpeech && !hasNativeAudioQueue && !hasAudioClip) {
      return false;
    }

    try {
      if (hasNativeSpeech) {
        await Speech.pause();
        setNativeSpeechPlaying(false);
      } else if (hasNativeAudioQueue) {
        await pauseNativeAudioQueue();
        nativeAudioQueuePlayingRef.current = false;
        setNativeAudioQueuePlaying(false);
      } else {
        player.pause();
      }

      playbackPausedRef.current = true;
      setPlaybackPaused(true);
      playingRef.current = false;
      stopNativeMetering();
      if (hasNativeAudioQueue) {
        pauseNativeOutputWaveform();
      } else {
        stopNativeOutputWaveform();
      }
      updatePendingPlaybackState();
      return true;
    } catch {
      return false;
    }
  }, [
    currentAudioRef,
    nativeSpeakingRef,
    nativeAudioQueuePlayingRef,
    player,
    playingRef,
    pauseNativeOutputWaveform,
    setNativeAudioQueuePlaying,
    stopNativeMetering,
    stopNativeOutputWaveform,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  ]);

  const resumePlayback = useCallback(async () => {
    if (!playbackPausedRef.current) {
      return true;
    }

    try {
      if (nativeSpeakingRef.current) {
        await ensurePlaybackSession();
        await Speech.resume();
        setNativeSpeechPlaying(true);
        startNativeMetering();
      } else if (usingNativeAudioQueue && currentAudioRef.current) {
        await ensureAudioQueuePlaybackSession();
        const resumed = await resumeNativeAudioQueue();

        if (!resumed) {
          return false;
        }

        nativeAudioQueuePlayingRef.current = true;
        setNativeAudioQueuePlaying(true);
        playingRef.current = true;
        resumeNativeOutputWaveform();
      } else if (currentAudioRef.current) {
        await ensurePlaybackSession();
        player.play();
        playingRef.current = true;
      } else if (queueRef.current.length > 0) {
        playbackPausedRef.current = false;
        setPlaybackPaused(false);
        void playNextAudio();
        updatePendingPlaybackState();
        return true;
      } else if (nativeQueueRef.current.length > 0) {
        playbackPausedRef.current = false;
        setPlaybackPaused(false);
        void playNextNative();
        updatePendingPlaybackState();
        return true;
      } else {
        playbackPausedRef.current = false;
        setPlaybackPaused(false);
        updatePendingPlaybackState();
        return false;
      }

      playbackPausedRef.current = false;
      setPlaybackPaused(false);
      updatePendingPlaybackState();
      return true;
    } catch {
      return false;
    }
  }, [
    currentAudioRef,
    ensureAudioQueuePlaybackSession,
    ensurePlaybackSession,
    nativeAudioQueuePlayingRef,
    nativeQueueRef,
    nativeSpeakingRef,
    playNextAudio,
    playNextNative,
    player,
    playingRef,
    queueRef,
    resumeNativeOutputWaveform,
    setNativeAudioQueuePlaying,
    startNativeMetering,
    updatePendingPlaybackState,
    usingNativeAudioQueue,
  ]);

  const waitForPlaybackRouteSettle = useCallback(async () => {
    if (Platform.OS !== "ios") {
      return;
    }

    await waitForPlaybackRouteSettleInternal();
  }, [waitForPlaybackRouteSettleInternal]);

  return {
    isPlaying: hasPendingPlayback,
    isActivelyPlaying:
      nativeSpeechPlaying ||
      nativeAudioQueuePlaying ||
      (!usingNativeAudioQueue && status.playing),
    hasPendingPlayback,
    isPlaybackPaused,
    enqueueAudio,
    speakText,
    pausePlayback,
    resumePlayback,
    stopPlayback,
    resetCancellation,
    hasPendingPlaybackNow,
    waitForDrain,
    waitForPlaybackRouteSettle,
  };
}
