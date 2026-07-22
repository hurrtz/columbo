import Feather from "@expo/vector-icons/Feather";

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
