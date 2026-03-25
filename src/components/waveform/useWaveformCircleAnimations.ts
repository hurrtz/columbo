import { useEffect } from "react";
import Animated, {
  Easing,
  cancelAnimation,
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
  getSheenMetrics,
  getTopAuraMetrics,
  getWaveformMetrics,
} from "./animations/targets";
import { useGradientTransition } from "./animations/useGradientTransition";

export function useWaveformCircleAnimations(params: {
  gradientColors: [string, string, string];
  intensity: number;
  isRecording: boolean;
  isSpeaking: boolean;
  phase: VoiceVisualPhase;
  shouldAnimate: boolean;
  usesPreciseWaveform: boolean;
}) {
  const {
    gradientColors,
    intensity,
    isRecording,
    isSpeaking,
    phase,
    shouldAnimate,
    usesPreciseWaveform,
  } = params;
  const pulse = useSharedValue(0);
  const orbit = useSharedValue(0);
  const spin = useSharedValue(0);
  const energy = useSharedValue(intensity);
  const { backgroundGradientFade, previousGradientColors } =
    useGradientTransition(gradientColors);

  useEffect(() => {
    if (!shouldAnimate) {
      cancelAnimation(orbit);
      orbit.value = 0;
      return;
    }

    orbit.value = withRepeat(
      withTiming(1, { duration: 4600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [orbit, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) {
      cancelAnimation(spin);
      spin.value = 0;
      return;
    }

    spin.value = withRepeat(
      withTiming(1, {
        duration: isRecording ? 2800 : isSpeaking ? 3600 : 4400,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [isRecording, isSpeaking, shouldAnimate, spin]);

  useEffect(() => {
    energy.value = withTiming(shouldAnimate ? intensity : 0, {
      duration: 120,
      easing: Easing.out(Easing.ease),
    });
  }, [energy, intensity, shouldAnimate]);

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
          isSpeaking,
          shouldAnimate,
          usesPreciseWaveform,
        },
        pulse.value,
        energy.value,
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
        ],
      };
    },
    [phase],
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
    sheenStyle,
    topAuraStyle,
    waveformStyle,
  };
}
