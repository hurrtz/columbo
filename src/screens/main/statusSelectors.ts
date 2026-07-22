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
  playbackPaused?: boolean;
  t: TranslateFn;
  visualPhase: VoiceVisualPhase;
}) {
  const { inputMode, playbackPaused = false, t, visualPhase } = params;

  return playbackPaused && visualPhase === "speaking"
    ? t("paused")
    : visualPhase === "recording"
    ? inputMode === "toggle-to-talk"
      ? t("tapAgainToSend")
      : t("listening")
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
  playbackPaused?: boolean;
  pipelinePhase: PipelinePhase;
  providerLabel: string;
  t: TranslateFn;
  ttsProviderLabel: string;
  visualPhase: VoiceVisualPhase;
}): StatusDisplayData {
  const {
    inputMode,
    messageCount,
    playbackPaused = false,
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
    playbackPaused,
    t,
    visualPhase,
  });
  const statusTitle =
    playbackPaused && visualPhase === "speaking"
      ? t("paused")
      : visualPhase === "recording"
        ? t("listening")
        : visualPhase === "searching"
          ? t("webSearch")
          : visualPhase === "speaking"
            ? t("speaking")
            : visualPhase === "synthesizing"
              ? t("voiceOutput")
              : visualPhase === "transcribing"
                ? t("parsing")
                : visualPhase === "thinking"
                  ? t("thinking")
                  : t("idle");
  const statusDetail =
    playbackPaused && visualPhase === "speaking"
      ? t("speechPaused")
      : visualPhase === "recording"
        ? t("listeningToYourVoice")
        : visualPhase === "searching"
          ? t("searchingTheWeb")
          : visualPhase === "speaking"
            ? t("speakingBackToYou")
            : visualPhase === "synthesizing"
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

/**
 * Phases that run long enough to justify showing an elapsed-seconds counter
 * and a reassurance line. The app trades latency for answer quality, so the
 * wait must feel intentional rather than stalled.
 */
const LONG_RUNNING_PHASES: ReadonlySet<PipelinePhase> = new Set([
  "thinking",
  "searching",
  "synthesizing",
]);

export function isLongRunningPhase(phase: PipelinePhase): boolean {
  return LONG_RUNNING_PHASES.has(phase);
}

export function isPipelineWorking(phase: PipelinePhase): boolean {
  return (
    phase === "transcribing" ||
    phase === "searching" ||
    phase === "thinking" ||
    phase === "synthesizing"
  );
}

/**
 * Augments a base status-detail line with an elapsed-seconds counter and,
 * after a threshold, a reassurance line. Pure so it can be unit-tested and
 * reused regardless of which component owns the timer.
 *
 * @param reassureAfterSeconds threshold (inclusive) after which the
 *   reassurance line is appended. Defaults to 8s.
 */
export function formatThinkingStatus(params: {
  baseDetail: string;
  elapsedSeconds: number;
  reassurance: string;
  withElapsed: (detail: string, seconds: number) => string;
  reassureAfterSeconds?: number;
}): string {
  const {
    baseDetail,
    elapsedSeconds,
    reassurance,
    withElapsed,
    reassureAfterSeconds = 8,
  } = params;

  if (elapsedSeconds <= 0) {
    return baseDetail;
  }

  const withSeconds = withElapsed(baseDetail, elapsedSeconds);
  if (elapsedSeconds >= reassureAfterSeconds) {
    return `${withSeconds}\n${reassurance}`;
  }

  return withSeconds;
}

export function getStatusIndicatorTone(
  visualPhase: VoiceVisualPhase,
  pipelinePhase: PipelinePhase,
  playbackPaused = false,
): "danger" | "accent" | "muted" | "success" {
  if (playbackPaused && visualPhase === "speaking") {
    return "muted";
  }

  if (visualPhase === "recording") {
    return "accent";
  }

  if (visualPhase === "speaking") {
    return "accent";
  }

  if (
    visualPhase === "synthesizing" ||
    pipelinePhase === "searching" ||
    visualPhase === "thinking" ||
    visualPhase === "transcribing" ||
    visualPhase === "searching"
  ) {
    return "accent";
  }

  if (visualPhase !== "idle") {
    return "success";
  }

  return "muted";
}
