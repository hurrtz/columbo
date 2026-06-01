import { useEffect, useState } from "react";
import { AppState, type AppStateStatus, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { supportsNativeOutputWaveformPlayback } from "../../services/nativeWaveform";
import {
  InputMode,
  VoiceVisualPhase,
  WaveformVisualizationVariant,
} from "../../types";
import { normalizeMetering } from "../../utils/audioVisualization";
import {
  getWaveformControlIconName,
  getWaveformPhaseGradientColors,
  isWaveformProcessingPhase,
} from "./phaseAppearance";

export function useWaveformCircleState(params: {
  inputMode: InputMode;
  isActive: boolean;
  metering: number;
  phase: VoiceVisualPhase;
  waveformVariant: WaveformVisualizationVariant;
}) {
  const { inputMode, isActive, metering, phase, waveformVariant } = params;
  const { colors, isDark } = useTheme();
  const intensity = normalizeMetering(metering);
  const isRecording = phase === "recording";
  const isBlockingPhase = isWaveformProcessingPhase(phase);
  const isSpeaking = phase === "speaking";
  const showsStaticControlState =
    phase === "idle" || isRecording || isBlockingPhase;
  const showsOutputBars = isSpeaking && waveformVariant === "oscilloscope";
  const usesPreciseWaveform =
    waveformVariant === "oscilloscope" &&
    !showsStaticControlState &&
    !showsOutputBars;
  const nativeWaveformChannel =
    Platform.OS === "ios" &&
    waveformVariant === "oscilloscope"
      ? phase === "speaking" &&
        supportsNativeOutputWaveformPlayback() &&
        !showsOutputBars
          ? ("output" as const)
          : null
      : null;
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const activityOverlayColors: [string, string, string, string, string] =
    isRecording
      ? [
          "rgba(255,255,255,0)",
          "rgba(255, 235, 229, 0.16)",
          "rgba(255, 198, 182, 0.34)",
          "rgba(255, 235, 229, 0.12)",
          "rgba(255,255,255,0)",
        ]
      : isSpeaking
        ? [
            "rgba(255,255,255,0)",
            "rgba(228, 255, 236, 0.14)",
            "rgba(122, 233, 165, 0.28)",
            "rgba(94, 201, 138, 0.18)",
            "rgba(255,255,255,0)",
          ]
        : [
            "rgba(255,255,255,0)",
            "rgba(255, 243, 209, 0.14)",
            "rgba(255, 194, 121, 0.28)",
            "rgba(255, 166, 104, 0.18)",
            "rgba(255,255,255,0)",
          ];
  const ringColor = isRecording
    ? colors.danger
    : isSpeaking
      ? "#54D685"
      : isBlockingPhase
        ? "#F1A457"
        : colors.accent;
  const gradientColors = getWaveformPhaseGradientColors({
    colors,
    isDark,
    phase,
  });
  const ringBorderColor = isRecording
    ? "rgba(255, 122, 112, 0.2)"
    : isSpeaking
      ? isDark
        ? "rgba(132, 236, 170, 0.24)"
        : "rgba(84, 214, 133, 0.22)"
    : isBlockingPhase
      ? isDark
        ? "rgba(255, 196, 124, 0.22)"
        : "rgba(241, 164, 87, 0.2)"
      : colors.border;
  const innerRingBorderColor = isRecording
    ? "rgba(255, 122, 112, 0.28)"
    : isSpeaking
      ? isDark
        ? "rgba(162, 244, 190, 0.28)"
        : "rgba(84, 214, 133, 0.26)"
    : isBlockingPhase
      ? isDark
        ? "rgba(255, 212, 146, 0.28)"
        : "rgba(241, 164, 87, 0.24)"
      : colors.borderStrong;
  const innerFrameBorderColor = isRecording
    ? "rgba(255, 255, 255, 0.28)"
    : isSpeaking
      ? isDark
        ? "rgba(255, 255, 255, 0.24)"
        : "rgba(255, 255, 255, 0.28)"
    : isBlockingPhase
      ? isDark
        ? "rgba(255, 244, 224, 0.22)"
        : "rgba(255, 250, 240, 0.3)"
      : "rgba(255, 255, 255, 0.22)";
  const shellShadowColor = isRecording
    ? isDark
      ? "rgba(255, 122, 112, 0.42)"
      : "rgba(231, 104, 91, 0.34)"
    : isSpeaking
      ? isDark
        ? "rgba(66, 201, 123, 0.36)"
        : "rgba(76, 194, 120, 0.28)"
    : isBlockingPhase
      ? isDark
        ? "rgba(241, 164, 87, 0.34)"
        : "rgba(235, 153, 74, 0.26)"
      : colors.glowStrong;
  const controlIconName: React.ComponentProps<typeof Feather>["name"] =
    getWaveformControlIconName(phase);
  const controlIconSize = 40;
  const shouldAnimate = appState === "active" && isActive;
  // Only run the heavy continuous motion (orbit/spin + the spin-driven
  // gradient/aura/sheen movement) during recording and speaking. The waiting
  // phases (transcribing/searching/thinking/synthesizing) keep just the gentle
  // pulse so the circle still breathes while staying cheap.
  const richMotion = shouldAnimate && (isRecording || isSpeaking);

  return {
    activityOverlayColors,
    colors,
    controlIconName,
    controlIconSize,
    gradientColors,
    innerFrameBorderColor,
    innerRingBorderColor,
    inputMode,
    intensity,
    isBlockingPhase,
    isRecording,
    isSpeaking,
    nativeWaveformChannel,
    phase,
    richMotion,
    ringBorderColor,
    ringColor,
    shellShadowColor,
    shouldAnimate,
    showsOutputBars,
    showsStaticControlState,
    usesPreciseWaveform,
    waveformVariant,
  };
}
