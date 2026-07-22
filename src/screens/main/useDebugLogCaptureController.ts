import { useCallback, useEffect, useState } from "react";

import type { PipelinePhase } from "../../hooks/useVoicePipeline";
import {
  getDebugLogCaptureState,
  recoverPendingDebugLogCapture,
  recordDebugLogEvent,
  startDebugLogCapture,
  stopDebugLogCapture,
  subscribeToDebugLogCapture,
} from "../../services/debugLogCapture";
import type {
  InputMode,
  Provider,
  ReplyPlayback,
  SttBackendMode,
  TtsBackendMode,
} from "../../types";
import type { TranslateFn } from "./shared";
import type { ShowToastFn } from "./shared";

interface DebugLogCaptureControllerParams {
  activeConversationId: string | null;
  inputMode: InputMode;
  model: string;
  pipelinePhase: PipelinePhase;
  provider: Provider;
  replyPlayback: ReplyPlayback;
  selectedSttModel: string;
  selectedTtsModel: string;
  showToast: ShowToastFn;
  spokenRepliesEnabled: boolean;
  sttMode: SttBackendMode;
  sttProvider: Provider | null;
  t: TranslateFn;
  ttsMode: TtsBackendMode;
  ttsProvider: Provider | null;
}

export function useDebugLogCaptureController({
  activeConversationId,
  inputMode,
  model,
  pipelinePhase,
  provider,
  replyPlayback,
  selectedSttModel,
  selectedTtsModel,
  showToast,
  spokenRepliesEnabled,
  sttMode,
  sttProvider,
  t,
  ttsMode,
  ttsProvider,
}: DebugLogCaptureControllerParams) {
  const [captureActive, setCaptureActive] = useState(
    () => getDebugLogCaptureState().active,
  );

  useEffect(() => {
    const syncState = () => setCaptureActive(getDebugLogCaptureState().active);
    syncState();
    return subscribeToDebugLogCapture(syncState);
  }, []);

  const buildCaptureContext = useCallback(
    () => ({
      activeConversationId,
      inputMode,
      model,
      pipelinePhase,
      provider,
      replyPlayback,
      spokenRepliesEnabled,
      sttMode,
      sttProvider,
      sttModel: selectedSttModel,
      ttsMode,
      ttsProvider,
      ttsModel: selectedTtsModel,
    }),
    [
      activeConversationId,
      inputMode,
      model,
      pipelinePhase,
      provider,
      replyPlayback,
      selectedSttModel,
      selectedTtsModel,
      spokenRepliesEnabled,
      sttMode,
      sttProvider,
      ttsMode,
      ttsProvider,
    ],
  );

  const handleToggle = useCallback(async () => {
    if (!captureActive) {
      startDebugLogCapture(buildCaptureContext());
      showToast(t("debugLogCaptureStarted"));
      return;
    }

    try {
      const result = await stopDebugLogCapture(buildCaptureContext());
      if (!result) {
        return;
      }

      const fileName =
        result.path.split("/").filter(Boolean).pop() ??
        result.sessionId ??
        "debug-log.log";
      showToast(
        result.copiedToClipboard
          ? t("debugLogCaptureStopped", {
              entryCount: result.entryCount,
              fileName,
            })
          : t("debugLogCaptureStoppedNoClipboard", {
              entryCount: result.entryCount,
              fileName,
            }),
        undefined,
        "success",
      );
    } catch (error) {
      recordDebugLogEvent({
        event: "debug-log-stop-failed",
        level: "error",
        payload: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
      showToast(t("debugLogCaptureFailed"), undefined, "danger");
    }
  }, [buildCaptureContext, captureActive, showToast, t]);

  useEffect(() => {
    let cancelled = false;

    void recoverPendingDebugLogCapture()
      .then((result) => {
        if (cancelled || !result) {
          return;
        }

        const fileName =
          result.path.split("/").filter(Boolean).pop() ??
          result.sessionId ??
          "recovered-debug-log.log";
        showToast(
          result.copiedToClipboard
            ? t("debugLogCaptureRecovered", {
                entryCount: result.entryCount,
                fileName,
              })
            : t("debugLogCaptureRecoveredNoClipboard", {
                entryCount: result.entryCount,
                fileName,
              }),
          undefined,
          "success",
        );
      })
      .catch((error) => {
        recordDebugLogEvent({
          event: "debug-log-recovery-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
          },
        });
      });

    return () => {
      cancelled = true;
    };
  }, [showToast, t]);

  return {
    captureState: { active: captureActive },
    handleToggle,
  };
}
