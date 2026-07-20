import { useCallback, useEffect, useRef } from "react";
import { recordDebugLogEvent } from "../../../services/debugLogCapture";

import type { ShowToastFn, TranslateFn } from "../shared";
import type {
  AudioPlayerController,
  AudioRecorderController,
  NativeSpeechRecognizerController,
} from "./types";

// Default hard cap on a single spoken turn, used when the caller does not pass a
// derived limit. When reached we auto-stop through the same path the user's stop
// tap uses, so the captured audio is still transcribed and answered rather than
// discarded. Callers normally pass `maxRecordingMs` derived from the active STT
// model's upload size limit (see getMaxRecordingMs).
export const MAX_RECORDING_MS = 150000;

interface UseVoiceCaptureLifecycleParams {
  isRecording?: boolean;
  maxRecordingMs?: number;
  nativeStt: NativeSpeechRecognizerController;
  player: AudioPlayerController;
  processCapturedVoiceTurn: (params: {
    audioUri?: string;
    transcriptionOverride?: string;
  }) => Promise<void>;
  recorder: AudioRecorderController;
  showToast: ShowToastFn;
  sttMode: "native" | "provider";
  t: TranslateFn;
}

export function useVoiceCaptureLifecycle({
  isRecording = false,
  maxRecordingMs = MAX_RECORDING_MS,
  nativeStt,
  player,
  processCapturedVoiceTurn,
  recorder,
  showToast,
  sttMode,
  t,
}: UseVoiceCaptureLifecycleParams) {
  const recordingStartedRef = useRef<Promise<void> | null>(null);
  const captureActiveRef = useRef(false);
  const stopInFlightRef = useRef<Promise<void> | null>(null);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The auto-stop timer fires the latest stopVoiceCapture; keep a ref so the
  // timer callback never closes over a stale handler.
  const stopVoiceCaptureRef = useRef<() => Promise<void>>(async () => {});

  const clearMaxDurationTimer = useCallback(() => {
    if (maxDurationTimerRef.current) {
      clearTimeout(maxDurationTimerRef.current);
      maxDurationTimerRef.current = null;
    }
  }, []);

  const startVoiceCapture = useCallback(async () => {
    recordDebugLogEvent({
      event: "voice-capture-start-requested",
      payload: {
        sttMode,
      },
    });

    await player.waitForPlaybackRouteSettle();
    recordDebugLogEvent({
      event: "voice-capture-route-settled",
      payload: {
        sttMode,
      },
    });

    const startPromise =
      sttMode === "native"
        ? nativeStt.startRecognition()
        : recorder.startRecording();

    recordingStartedRef.current = startPromise;

    try {
      await startPromise;
      captureActiveRef.current = true;
      recordDebugLogEvent({
        event: "voice-capture-started",
        payload: {
          sttMode,
        },
      });

      // Arm the auto-stop only after recording is actually running.
      clearMaxDurationTimer();
      maxDurationTimerRef.current = setTimeout(() => {
        maxDurationTimerRef.current = null;
        recordDebugLogEvent({
          event: "voice-capture-max-duration-reached",
          level: "warn",
          payload: {
            maxDurationMs: maxRecordingMs,
            sttMode,
          },
        });
        showToast(t("maxRecordingLengthReached"));
        void stopVoiceCaptureRef.current();
      }, maxRecordingMs);
    } finally {
      if (recordingStartedRef.current === startPromise) {
        recordingStartedRef.current = null;
      }
    }
  }, [
    clearMaxDurationTimer,
    maxRecordingMs,
    nativeStt,
    player,
    recorder,
    showToast,
    sttMode,
    t,
  ]);

  const performStopVoiceCapture = useCallback(async () => {
    clearMaxDurationTimer();

    recordDebugLogEvent({
      event: "voice-capture-stop-requested",
      payload: {
        sttMode,
      },
    });

    const startPromise = recordingStartedRef.current;

    if (startPromise) {
      try {
        await startPromise;
      } catch {
        recordDebugLogEvent({
          event: "voice-capture-stop-aborted",
          level: "warn",
          payload: {
            reason: "start-promise-rejected",
            sttMode,
          },
        });
        return;
      } finally {
        if (recordingStartedRef.current === startPromise) {
          recordingStartedRef.current = null;
        }
      }
    }

    if (!captureActiveRef.current && !isRecording) {
      recordDebugLogEvent({
        event: "voice-capture-stop-ignored",
        payload: {
          reason: "capture-not-active",
          sttMode,
        },
      });
      return;
    }

    captureActiveRef.current = false;

    if (sttMode === "native") {
      const transcription = await nativeStt.stopRecognition();

      if (transcription) {
        recordDebugLogEvent({
          event: "voice-capture-transcription-ready",
          payload: {
            sttMode,
            textLength: transcription.trim().length,
          },
        });
        void processCapturedVoiceTurn({ transcriptionOverride: transcription });
      } else {
        recordDebugLogEvent({
          event: "voice-capture-transcription-missing",
          level: "warn",
          payload: {
            sttMode,
          },
        });
        showToast(t("couldntCatchThatTryAgain"));
      }

      return;
    }

    const uri = await recorder.stopRecording();

    if (uri) {
      recordDebugLogEvent({
        event: "voice-capture-audio-ready",
        payload: {
          sttMode,
          uri,
        },
      });
      void processCapturedVoiceTurn({ audioUri: uri });
    } else {
      recordDebugLogEvent({
        event: "voice-capture-audio-missing",
        level: "warn",
        payload: {
          sttMode,
        },
      });
      showToast(t("couldntCatchThatTryAgain"));
    }
  }, [
    clearMaxDurationTimer,
    isRecording,
    nativeStt,
    processCapturedVoiceTurn,
    recorder,
    showToast,
    sttMode,
    t,
  ]);

  const stopVoiceCapture = useCallback(() => {
    if (stopInFlightRef.current) {
      return stopInFlightRef.current;
    }

    const stopPromise = performStopVoiceCapture().finally(() => {
      if (stopInFlightRef.current === stopPromise) {
        stopInFlightRef.current = null;
      }
    });
    stopInFlightRef.current = stopPromise;

    return stopPromise;
  }, [performStopVoiceCapture]);

  stopVoiceCaptureRef.current = stopVoiceCapture;

  // Defensively clear the timer if the component unmounts mid-recording.
  useEffect(() => clearMaxDurationTimer, [clearMaxDurationTimer]);

  return {
    startVoiceCapture,
    stopVoiceCapture,
  };
}
