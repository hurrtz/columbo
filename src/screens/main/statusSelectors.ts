import { PipelinePhase } from "../../hooks/useVoicePipeline";
import { InputMode, VoiceVisualPhase } from "../../types";

import { TranslateFn } from "./shared";

export interface StatusDisplayData {
  actionLabel: string;
  statusTitle: string;
  statusDetail: string;
  messageCountLabel: string | null;
}

export function getVisualPhaseActionLabel(params: {
  inputMode: InputMode;
  t: TranslateFn;
  visualPhase: VoiceVisualPhase;
}) {
  const { inputMode, t, visualPhase } = params;

  return visualPhase === "recording"
    ? t("listening")
    : visualPhase === "transcribing"
      ? t("parsing")
      : visualPhase === "searching"
        ? t("webSearch")
      : visualPhase === "synthesizing"
        ? t("voiceOutput")
        : visualPhase === "thinking"
          ? t("thinking")
          : visualPhase === "speaking"
            ? t("speaking")
            : inputMode === "push-to-talk"
              ? t("holdToSpeak")
              : t("tapToSpeak");
}

export function getStatusDisplayData(params: {
  inputMode: InputMode;
  messageCount: number;
  pipelinePhase: PipelinePhase;
  providerLabel: string;
  t: TranslateFn;
  ttsProviderLabel: string;
  visualPhase: VoiceVisualPhase;
}): StatusDisplayData {
  const {
    inputMode,
    messageCount,
    pipelinePhase,
    providerLabel,
    t,
    ttsProviderLabel,
    visualPhase,
  } = params;

  const messageCountLabel =
    messageCount > 0 ? t("messageCount", { count: messageCount }) : null;
  const actionLabel = getVisualPhaseActionLabel({
    inputMode,
    t,
    visualPhase,
  });
  const statusTitle =
    visualPhase === "recording"
      ? t("listening")
      : visualPhase === "searching"
        ? t("webSearch")
      : visualPhase === "speaking"
        ? t("speaking")
        : pipelinePhase === "synthesizing"
          ? t("voiceOutput")
          : visualPhase === "transcribing"
            ? t("parsing")
            : visualPhase === "thinking"
              ? t("thinking")
              : t("idle");
  const statusDetail =
    visualPhase === "recording"
      ? t("listeningToYourVoice")
      : visualPhase === "searching"
        ? t("searchingTheWeb")
      : visualPhase === "speaking"
        ? t("speakingBackToYou")
        : pipelinePhase === "synthesizing"
          ? t("preparingVoiceWithProvider", {
              provider: ttsProviderLabel,
            })
          : visualPhase === "transcribing"
            ? t("parsingYourVoiceInput")
            : visualPhase === "thinking"
              ? t("waitingForProvider", { provider: providerLabel })
              : (messageCountLabel ?? t("freshSession"));

  return {
    actionLabel,
    statusTitle,
    statusDetail,
    messageCountLabel,
  };
}

export function getStatusIndicatorTone(
  visualPhase: VoiceVisualPhase,
  pipelinePhase: PipelinePhase,
): "danger" | "accent" | "muted" | "success" | "accentWarm" {
  if (visualPhase === "recording") {
    return "danger";
  }

  if (visualPhase === "speaking") {
    return "accent";
  }

  if (
    pipelinePhase === "synthesizing" ||
    pipelinePhase === "searching" ||
    visualPhase === "thinking" ||
    visualPhase === "transcribing" ||
    visualPhase === "searching"
  ) {
    return "muted";
  }

  if (visualPhase !== "idle") {
    return "success";
  }

  return "accentWarm";
}
