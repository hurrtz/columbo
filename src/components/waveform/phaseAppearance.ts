import { Feather } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { VoiceVisualPhase } from "../../types";

export type WaveformControlIconName =
  React.ComponentProps<typeof Feather>["name"];

export function isWaveformProcessingPhase(phase: VoiceVisualPhase) {
  return (
    phase === "transcribing" ||
    phase === "searching" ||
    phase === "thinking" ||
    phase === "synthesizing"
  );
}

export function getWaveformPhaseGradientColors(params: {
  colors: Colors;
  isDark: boolean;
  phase: VoiceVisualPhase;
}): [string, string, string] {
  const { colors, isDark, phase } = params;

  if (phase === "recording") {
    return isDark
      ? ["#FF978C", colors.danger, "#D74C5A"]
      : ["#F29186", colors.danger, "#C94756"];
  }

  if (phase === "speaking") {
    return isDark
      ? ["#9AF4B8", "#42C97B", "#247E5D"]
      : ["#BDF7CB", "#63D88D", "#2D9B6F"];
  }

  if (isWaveformProcessingPhase(phase)) {
    return isDark
      ? ["#FFD27D", "#F39A58", "#E06A5C"]
      : ["#FFE4A6", "#F5AF70", "#E88A74"];
  }

  return [
    colors.accentGradientStart,
    colors.accentGradientEnd,
    colors.accentGradientEnd,
  ];
}

export function getWaveformControlIconName(
  phase: VoiceVisualPhase,
): WaveformControlIconName {
  switch (phase) {
    case "recording":
      return "square";
    case "transcribing":
      return "align-left";
    case "searching":
      return "globe";
    case "thinking":
      return "loader";
    case "synthesizing":
      return "download-cloud";
    case "speaking":
      return "volume-2";
    default:
      return "mic";
  }
}
