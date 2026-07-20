import { useEffect } from "react";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { VoiceVisualPhase } from "../../types";
import {
  getActivityGradientMetrics,
  getBackgroundGradientMetrics,
  getBottomAuraMetrics,
  getCircleShellScale,
  getControlIconMetrics,
  getInnerRingMetrics,
  getOuterRingMetrics,
  getPulseAnimationConfig,
  getProcessingControlRotationDeg,
  getSheenMetrics,
  getTopAuraMetrics,
  getWaveformMetrics,
} from "./animations/targets";
import { useGradientTransition } from "./animations/useGradientTransition";

export function useWaveformCircleAnimations(params: {
  fillHeight: number;
  gradientColors: [string, string, string];
  intensity: number;
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  maxRecordingMs?: number;
  phase: VoiceVisualPhase;
  processingMotion: boolean;
  richMotion: boolean;
  shouldAnimate: boolean;
  usesPreciseWaveform: boolean;
}) {
  const {
    fillHeight,
    gradientColors,
    intensity,
    isRecording,
    isProcessing,
    isSpeaking,
    maxRecordingMs,
    phase,
    processingMotion,
    richMotion,
    shouldAnimate,
    usesPreciseWaveform,
  } = params;
  const pulse = useSharedValue(0);
  const orbit = useSharedValue(0);
  const spin = useSharedValue(0);
  const energy = useSharedValue(intensity);
  // 0 → 1 over the recording cap; drives the "glass filling" auto-send timer.
  const recordingFill = useSharedValue(0);
  const { backgroundGradientFade, previousGradientColors } =
    useGradientTransition(gradientColors);

  useEffect(() => {
    if (!richMotion && !processingMotion) {
      cancelAnimation(orbit);
      orbit.value = 0;
      return;
    }

    orbit.value = withRepeat(
      withTiming(1, {
        duration: processingMotion ? 3400 : 4600,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [orbit, processingMotion, richMotion]);

  useEffect(() => {
    if (!richMotion && !processingMotion) {
      cancelAnimation(spin);
      spin.value = 0;
      return;
    }

    spin.value = withRepeat(
      withTiming(1, {
        duration: isRecording
          ? 2800
          : isSpeaking
            ? 3600
            : processingMotion
              ? 5200
              : 4400,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [isRecording, isSpeaking, processingMotion, richMotion, spin]);

  useEffect(() => {
    energy.value = withTiming(shouldAnimate ? intensity : 0, {
      duration: 120,
      easing: Easing.out(Easing.ease),
    });
  }, [energy, intensity, shouldAnimate]);

  useEffect(() => {
    // While recording, the circle "fills up like a glass" from empty to the rim
    // over the auto-send cap, giving a calm sense of how much time is left. A
    // single linear timing value — no per-frame work. Resets when not recording.
    if (!isRecording || !maxRecordingMs || maxRecordingMs <= 0) {
      cancelAnimation(recordingFill);
      recordingFill.value = 0;
      return;
    }

    recordingFill.value = 0;
    recordingFill.value = withTiming(1, {
      duration: maxRecordingMs,
      easing: Easing.linear,
    });

    return () => {
      cancelAnimation(recordingFill);
    };
  }, [isRecording, maxRecordingMs, recordingFill]);

  const recordingFillStyle = useAnimatedStyle(() => ({
    // Anchored to the bottom of the circle; translate up as it fills.
    transform: [{ translateY: (1 - recordingFill.value) * fillHeight }],
    // Calm translucent level most of the way; warms to amber → red near the rim
    // so the imminent auto-send reads clearly.
    backgroundColor: interpolateColor(
      recordingFill.value,
      [0, 0.85, 0.93, 1],
      [
        "rgba(255, 255, 255, 0.16)",
        "rgba(255, 255, 255, 0.16)",
        "rgba(255, 176, 92, 0.5)",
        "rgba(255, 96, 86, 0.62)",
      ],
    ),
    opacity: interpolate(recordingFill.value, [0, 0.04, 1], [0, 1, 1]),
  }));

  useEffect(() => {
    if (!shouldAnimate) {
      cancelAnimation(pulse);
      pulse.value = 0;
      return;
    }

    const { highPoint, duration } = getPulseAnimationConfig(phase);

    pulse.value = withRepeat(
      withSequence(
        withTiming(highPoint, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
  }, [phase, pulse, shouldAnimate]);

  const outerRingStyle = useAnimatedStyle(() => ({
    opacity: getOuterRingMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
    ).opacity,
    transform: [
      {
        scale: getOuterRingMetrics(
          {
            phase,
            isRecording,
            isProcessing,
            isSpeaking,
            shouldAnimate,
            usesPreciseWaveform,
          },
          pulse.value,
          energy.value,
        ).scale,
      } as const,
    ],
  }));

  const innerRingStyle = useAnimatedStyle(() => ({
    opacity: getInnerRingMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
    ).opacity,
    transform: [
      {
        scale: getInnerRingMetrics(
          {
            phase,
            isRecording,
            isProcessing,
            isSpeaking,
            shouldAnimate,
            usesPreciseWaveform,
          },
          pulse.value,
          energy.value,
        ).scale,
      } as const,
    ],
  }));

  const circleShellStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: getCircleShellScale(
          {
            phase,
            isRecording,
            isProcessing,
            isSpeaking,
            shouldAnimate,
            usesPreciseWaveform,
          },
          pulse.value,
          energy.value,
        ),
      } as const,
    ],
  }));

  const backgroundGradientStyle = useAnimatedStyle(() => {
    const metrics = getBackgroundGradientMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
      spin.value,
    );

    return {
      transform: [
        {
          translateX: metrics.translateX,
        } as const,
        {
          translateY: metrics.translateY,
        } as const,
        {
          rotate: `${metrics.rotationDeg}deg`,
        } as const,
        {
          scale: metrics.scale,
        } as const,
      ],
    };
  });

  const previousBackgroundGradientStyle = useAnimatedStyle(() => ({
    opacity: backgroundGradientFade.value,
  }));

  const activityGradientOverlayStyle = useAnimatedStyle(() => {
    const metrics = getActivityGradientMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
      spin.value,
    );

    return {
      opacity: metrics.opacity,
      transform: [
        {
          translateX: metrics.translateX,
        } as const,
        {
          translateY: metrics.translateY,
        } as const,
        { rotate: `${metrics.rotationDeg}deg` } as const,
        {
          scale: metrics.scale,
        } as const,
      ],
    };
  });

  const topAuraStyle = useAnimatedStyle(() => {
    const metrics = getTopAuraMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
      orbit.value,
    );

    return {
      opacity: metrics.opacity,
      transform: [
        { translateX: metrics.translateX } as const,
        { translateY: metrics.translateY } as const,
        { scale: metrics.scale } as const,
      ] as any,
    };
  });

  const bottomAuraStyle = useAnimatedStyle(() => {
    const metrics = getBottomAuraMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      energy.value,
      orbit.value,
    );

    return {
      opacity: metrics.opacity,
      transform: [
        { translateX: metrics.translateX } as const,
        { translateY: metrics.translateY } as const,
        { scale: metrics.scale } as const,
      ] as any,
    };
  });

  const sheenStyle = useAnimatedStyle(() => {
    const metrics = getSheenMetrics(
      {
        phase,
        isRecording,
        isProcessing,
        isSpeaking,
        shouldAnimate,
        usesPreciseWaveform,
      },
      pulse.value,
      orbit.value,
    );

    return {
      opacity: metrics.opacity,
      transform: [
        { translateX: metrics.translateX } as const,
        { rotate: `${metrics.rotationDeg}deg` } as const,
      ] as any,
    };
  });

  const waveformStyle = useAnimatedStyle(() => {
    const metrics = getWaveformMetrics(usesPreciseWaveform, energy.value);

    return {
      opacity: metrics.opacity,
      transform: [
        {
          translateY: metrics.translateY,
        } as const,
      ],
    };
  });

  const controlIconStyle = useAnimatedStyle(
    () => {
      const metrics = getControlIconMetrics(
        {
          phase,
          isRecording,
          isProcessing,
          isSpeaking,
          shouldAnimate,
          usesPreciseWaveform,
        },
        pulse.value,
        energy.value,
      );
      const processingRotationDeg = getProcessingControlRotationDeg(
        {
          phase,
          isRecording,
          isProcessing,
          isSpeaking,
          shouldAnimate,
          usesPreciseWaveform,
        },
        spin.value,
      );

      return {
        opacity: metrics.opacity,
        transform: [
          {
            scale: metrics.scale,
          } as const,
          {
            translateY: metrics.translateY,
          } as const,
          {
            rotate: `${processingRotationDeg}deg`,
          } as const,
        ],
      };
    },
    [isProcessing, phase, shouldAnimate],
  );

  return {
    activityGradientOverlayStyle,
    backgroundGradientStyle,
    bottomAuraStyle,
    circleShellStyle,
    controlIconStyle,
    outerRingStyle,
    innerRingStyle,
    previousBackgroundGradientStyle,
    previousGradientColors,
    recordingFillStyle,
    sheenStyle,
    topAuraStyle,
    waveformStyle,
  };
}
