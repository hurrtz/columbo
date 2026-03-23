import { useCallback, useRef } from "react";
import { recordDebugLogEvent } from "../../../services/debugLogCapture";

import type {
  AudioPlayerController,
  AudioRecorderController,
  NativeSpeechRecognizerController,
} from "./types";

interface UseVoiceCaptureLifecycleParams {
  nativeStt: NativeSpeechRecognizerController;
  player: AudioPlayerController;
  processCapturedVoiceTurn: (params: {
    audioUri?: string;
    transcriptionOverride?: string;
  }) => Promise<void>;
  recorder: AudioRecorderController;
  sttMode: "native" | "provider";
}

export function useVoiceCaptureLifecycle({
  nativeStt,
  player,
  processCapturedVoiceTurn,
  recorder,
  sttMode,
}: UseVoiceCaptureLifecycleParams) {
  const recordingStartedRef = useRef<Promise<void> | null>(null);

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
      recordDebugLogEvent({
        event: "voice-capture-started",
        payload: {
          sttMode,
        },
      });
    } finally {
      if (recordingStartedRef.current === startPromise) {
        recordingStartedRef.current = null;
      }
    }
  }, [nativeStt, player, recorder, sttMode]);

  const stopVoiceCapture = useCallback(async () => {
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
    }
  }, [nativeStt, processCapturedVoiceTurn, recorder, sttMode]);

  return {
    startVoiceCapture,
    stopVoiceCapture,
  };
}
