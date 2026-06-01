import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useAudioSampleListener,
  type AudioPlayer,
  type AudioStatus,
} from "expo-audio";
import { WaveformVisualizationVariant } from "../../types";
import {
  EMPTY_VISUAL_LEVELS,
  averageLevels,
  averageSampleMagnitude,
  blendWaveformSamples,
  buildFallbackSpeechLevels,
  buildSampleWaveform,
  levelToMetering,
} from "../../utils/audioVisualization";
import {
  publishWaveformFrame,
  resetWaveformFrame,
} from "../../state/waveformFeed";
import {
  OSCILLOSCOPE_TICK_INTERVAL_MS,
  VISUAL_UPDATE_INTERVAL_MS,
} from "./shared";

export interface PlaybackWaveformControls {
  /**
   * Updates the active variant used for subsequently published frames. The
   * variant flips rarely (bars <-> oscilloscope, a handful of times per
   * playback) so it is tracked as low-frequency React state, while the
   * per-frame levels/metering go straight to the external waveform store.
   */
  setWaveformVariant: (variant: WaveformVisualizationVariant) => void;
  /** Publishes a waveform frame carrying the active variant. */
  publishWaveform: (levels: number[], metering: number) => void;
  /** Clears the waveform back to idle. */
  resetVisualState: () => void;
}

export function usePlaybackVisualState(params: {
  player: AudioPlayer;
  status: AudioStatus;
  nativeSpeaking: boolean;
  nativeSpeakingRef: MutableRefObject<boolean>;
  nativeAudioQueuePlaying: boolean;
  usingNativeAudioQueue: boolean;
}): PlaybackWaveformControls {
  const {
    player,
    status,
    nativeSpeaking,
    nativeSpeakingRef,
    nativeAudioQueuePlaying,
    usingNativeAudioQueue,
  } = params;
  const [waveformVariant, setWaveformVariantState] =
    useState<WaveformVisualizationVariant>("bars");
  const waveformVariantRef = useRef<WaveformVisualizationVariant>("bars");
  const waveformDataRef = useRef<number[]>(EMPTY_VISUAL_LEVELS);
  const lastSampleUpdateAtRef = useRef(0);

  const setWaveformVariant = useCallback(
    (variant: WaveformVisualizationVariant) => {
      if (waveformVariantRef.current === variant) {
        return;
      }
      waveformVariantRef.current = variant;
      setWaveformVariantState(variant);
    },
    [],
  );

  const publishWaveform = useCallback((levels: number[], metering: number) => {
    waveformDataRef.current = levels;
    publishWaveformFrame({
      metering,
      levels,
      variant: waveformVariantRef.current,
    });
  }, []);

  const resetVisualState = useCallback(() => {
    lastSampleUpdateAtRef.current = 0;
    waveformDataRef.current = EMPTY_VISUAL_LEVELS;
    waveformVariantRef.current = "bars";
    setWaveformVariantState("bars");
    resetWaveformFrame();
  }, []);

  useAudioSampleListener(player, (sample) => {
    if (usingNativeAudioQueue || nativeSpeakingRef.current) {
      return;
    }

    const now = Date.now();

    if (
      lastSampleUpdateAtRef.current &&
      now - lastSampleUpdateAtRef.current < OSCILLOSCOPE_TICK_INTERVAL_MS
    ) {
      return;
    }

    lastSampleUpdateAtRef.current = now;

    const samples = buildSampleWaveform(sample.channels);

    setWaveformVariant("oscilloscope");
    const blended = blendWaveformSamples(
      waveformDataRef.current,
      samples,
      0.16,
    );
    publishWaveform(blended, levelToMetering(averageSampleMagnitude(samples)));
  });

  useEffect(() => {
    const clipPlaybackActive = usingNativeAudioQueue
      ? nativeAudioQueuePlaying
      : status.playing;

    if (nativeSpeaking) {
      return;
    }

    if (!clipPlaybackActive) {
      resetVisualState();
      return;
    }

    if (
      (!usingNativeAudioQueue && player.isAudioSamplingSupported) ||
      (usingNativeAudioQueue && waveformVariant === "oscilloscope")
    ) {
      return;
    }

    setWaveformVariant("bars");
    const baseTime = player.currentTime;
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      const levels = buildFallbackSpeechLevels(baseTime + elapsed);
      publishWaveform(levels, levelToMetering(averageLevels(levels)));
    }, VISUAL_UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [
    nativeSpeaking,
    nativeAudioQueuePlaying,
    player.currentTime,
    player.id,
    player.isAudioSamplingSupported,
    publishWaveform,
    resetVisualState,
    setWaveformVariant,
    status.playing,
    usingNativeAudioQueue,
    waveformVariant,
  ]);

  return {
    publishWaveform,
    resetVisualState,
    setWaveformVariant,
  };
}
