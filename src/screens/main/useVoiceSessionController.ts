import { useCallback, useEffect } from "react";

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
  const { startVoiceCapture, stopVoiceCapture } = useVoiceCaptureLifecycle({
    nativeStt,
    player,
    processCapturedVoiceTurn,
    recorder,
    sttMode: settings.sttMode,
  });

  useVoiceSessionAppState({
    abortRef,
    nativeStt,
    recorder,
    setPipelinePhase,
    setStreamingText,
    sttMode: settings.sttMode,
  });

  useEffect(() => {
    if (player.isPlaying) {
      clearCancelableVoiceTurn();
    }
  }, [clearCancelableVoiceTurn, player.isPlaying]);

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
    if (player.isPlaying) {
      await cancelCurrentInteraction({ rollbackConversation: false });
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
  ]);

  const handlePressOut = useCallback(async () => {
    try {
      await stopVoiceCapture();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("couldntProcessVoiceInput");
      showToast(message);
    }
  }, [showToast, stopVoiceCapture, t]);

  const handleTogglePress = useCallback(async () => {
    if (
      !isRecording &&
      !player.isPlaying &&
      !isBusy &&
      !ensureVoiceSessionReady()
    ) {
      return;
    }

    if (player.isPlaying) {
      await cancelCurrentInteraction({ rollbackConversation: false });
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
  ]);

  const resetVoiceSessionState = useCallback(async () => {
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
