import { useCallback, useEffect, useMemo, useRef } from "react";
import { recordDebugLogEvent } from "../../services/debugLogCapture";
import { PROVIDER_DEFAULT_STT_MODELS } from "../../constants/models";
import { getMaxRecordingMs } from "../../utils/recordingLimits";

import { useVoiceCaptureLifecycle } from "./voiceSession/useVoiceCaptureLifecycle";
import { useVoiceSessionAppState } from "./voiceSession/useVoiceSessionAppState";
import { useVoiceSessionCancellation } from "./voiceSession/useVoiceSessionCancellation";
import { useVoiceSessionGuards } from "./voiceSession/useVoiceSessionGuards";
import type { UseVoiceSessionControllerParams } from "./voiceSession/types";
import { useVoiceTurnSnapshots } from "./voiceSession/useVoiceTurnSnapshots";

export function useVoiceSessionController<Snapshot>({
  abortRef,
  availableSttProviders,
  availableTtsProviders,
  captureActiveConversationSnapshot,
  handleVoiceCaptureDone,
  isBusy,
  isRecording,
  lastCompletedReplyRef,
  nativeStt,
  player,
  providerApiKey,
  providerLabel,
  recorder,
  restoreActiveConversationSnapshot,
  setPipelinePhase,
  setStreamingText,
  settings,
  showToast,
  sttApiKey,
  sttProvider,
  t,
  ttsApiKey,
  ttsProvider,
}: UseVoiceSessionControllerParams<Snapshot>) {
  const suppressNextPressOutRef = useRef(false);
  const {
    clearCancelableVoiceTurn,
    processCapturedVoiceTurn,
    resetVoiceTurnSnapshots,
    rollbackCancelableVoiceTurn,
  } = useVoiceTurnSnapshots({
    captureActiveConversationSnapshot,
    handleVoiceCaptureDone,
    restoreActiveConversationSnapshot,
  });
  const { cancelCurrentInteraction, resetPipelineState } =
    useVoiceSessionCancellation({
      abortRef,
      player,
      rollbackCancelableVoiceTurn,
      setPipelinePhase,
      setStreamingText,
    });
  const ensureVoiceSessionReady = useVoiceSessionGuards({
    availableSttProviders,
    availableTtsProviders,
    nativeSttAvailable: nativeStt.isAvailable,
    providerApiKey,
    providerLabel,
    settings,
    showToast,
    sttApiKey,
    sttProvider,
    t,
    ttsApiKey,
    ttsProvider,
  });
  // Auto-stop a long recording just before it would exceed the active STT
  // model's upload size limit (derived from the catalog), so a long thought is
  // sent rather than rejected. Adapts per provider/model.
  const maxRecordingMs = useMemo(() => {
    const sttModel = sttProvider
      ? settings.providerSttModels?.[sttProvider] ||
        PROVIDER_DEFAULT_STT_MODELS[sttProvider] ||
        ""
      : "";
    return getMaxRecordingMs({
      sttMode: settings.sttMode,
      sttProvider,
      sttModel,
    });
  }, [settings.sttMode, settings.providerSttModels, sttProvider]);

  const { startVoiceCapture, stopVoiceCapture } = useVoiceCaptureLifecycle({
    isRecording,
    maxRecordingMs,
    nativeStt,
    player,
    processCapturedVoiceTurn,
    recorder,
    showToast,
    sttMode: settings.sttMode,
    t,
  });

  useVoiceSessionAppState({
    isRecording,
    onBackgroundSubmitError: (error) => {
      showToast(
        error instanceof Error ? error.message : t("couldntProcessVoiceInput"),
      );
    },
    stopVoiceCapture,
  });

  useEffect(() => {
    if (player.isPlaying) {
      clearCancelableVoiceTurn();
    }
  }, [clearCancelableVoiceTurn, player.isPlaying]);

  const togglePlaybackPause = useCallback(async () => {
    const updated = player.isPlaybackPaused
      ? await player.resumePlayback()
      : await player.pausePlayback();

    if (!updated) {
      showToast(t("pausePlaybackUnavailable"));
    }
  }, [player, showToast, t]);

  useEffect(() => {
    if (!nativeStt.lastError) {
      return;
    }

    showToast(nativeStt.lastError);
    nativeStt.clearLastError();
  }, [nativeStt, showToast]);

  useEffect(() => {
    if (!recorder.lastError) {
      return;
    }

    showToast(recorder.lastError);
    recorder.clearLastError();
  }, [recorder, showToast]);

  const handlePressIn = useCallback(async () => {
    recordDebugLogEvent({
      event: "voice-session-press-in",
      payload: {
        isBusy,
        isRecording,
        playerIsPlaying: player.isPlaying,
      },
    });

    if (player.isPlaying) {
      suppressNextPressOutRef.current = true;
      await togglePlaybackPause();
      return;
    }

    if (isBusy) {
      await cancelCurrentInteraction({ rollbackConversation: true });
      return;
    }

    if (!ensureVoiceSessionReady()) {
      return;
    }

    try {
      await startVoiceCapture();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("couldntStartVoiceInput");
      recordDebugLogEvent({
        event: "voice-session-start-failed",
        level: "error",
        payload: {
          message,
        },
      });
      showToast(message);
    }
  }, [
    cancelCurrentInteraction,
    ensureVoiceSessionReady,
    isBusy,
    player.isPlaying,
    showToast,
    startVoiceCapture,
    t,
    togglePlaybackPause,
  ]);

  const handlePressOut = useCallback(async () => {
    recordDebugLogEvent({
      event: "voice-session-press-out",
      payload: {
        isRecording,
      },
    });

    if (suppressNextPressOutRef.current) {
      suppressNextPressOutRef.current = false;
      return;
    }

    try {
      await stopVoiceCapture();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("couldntProcessVoiceInput");
      recordDebugLogEvent({
        event: "voice-session-stop-failed",
        level: "error",
        payload: {
          message,
        },
      });
      showToast(message);
    }
  }, [showToast, stopVoiceCapture, t]);

  const handleTogglePress = useCallback(async () => {
    recordDebugLogEvent({
      event: "voice-session-toggle-press",
      payload: {
        isBusy,
        isRecording,
        playerIsPlaying: player.isPlaying,
      },
    });

    if (
      !isRecording &&
      !player.isPlaying &&
      !isBusy &&
      !ensureVoiceSessionReady()
    ) {
      return;
    }

    if (player.isPlaying) {
      await togglePlaybackPause();
      return;
    }

    if (isBusy) {
      await cancelCurrentInteraction({ rollbackConversation: true });
      return;
    }

    try {
      if (isRecording) {
        await stopVoiceCapture();
        return;
      }

      await startVoiceCapture();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : isRecording
            ? t("couldntProcessVoiceInput")
            : t("couldntStartVoiceInput");
      recordDebugLogEvent({
        event: "voice-session-toggle-failed",
        level: "error",
        payload: {
          isRecording,
          message,
        },
      });
      showToast(message);
    }
  }, [
    cancelCurrentInteraction,
    ensureVoiceSessionReady,
    isBusy,
    isRecording,
    player.isPlaying,
    showToast,
    startVoiceCapture,
    stopVoiceCapture,
    t,
    togglePlaybackPause,
  ]);

  const resetVoiceSessionState = useCallback(async () => {
    recordDebugLogEvent({
      event: "voice-session-reset-requested",
      payload: {
        isRecording,
        playerIsPlaying: player.isPlaying,
        sttMode: settings.sttMode,
      },
    });

    resetPipelineState();
    lastCompletedReplyRef.current = "";
    resetVoiceTurnSnapshots();

    if (player.isPlaying) {
      await player.stopPlayback();
    }

    if (!isRecording) {
      return;
    }

    try {
      if (settings.sttMode === "native") {
        await nativeStt.abortRecognition();
      } else {
        await recorder.stopRecording();
      }
    } catch {
      // Ignore recorder cleanup failures while switching conversations.
    }
  }, [
    isRecording,
    lastCompletedReplyRef,
    nativeStt,
    player,
    recorder,
    resetPipelineState,
    resetVoiceTurnSnapshots,
    settings.sttMode,
  ]);

  return {
    handlePressIn,
    handlePressOut,
    handleTogglePress,
    resetVoiceSessionState,
  };
}
