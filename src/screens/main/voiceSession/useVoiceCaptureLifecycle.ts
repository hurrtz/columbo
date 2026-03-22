import { useCallback, useRef } from "react";

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
    await player.waitForPlaybackRouteSettle();

    const startPromise =
      sttMode === "native"
        ? nativeStt.startRecognition()
        : recorder.startRecording();

    recordingStartedRef.current = startPromise;

    try {
      await startPromise;
    } finally {
      if (recordingStartedRef.current === startPromise) {
        recordingStartedRef.current = null;
      }
    }
  }, [nativeStt, player, recorder, sttMode]);

  const stopVoiceCapture = useCallback(async () => {
    const startPromise = recordingStartedRef.current;

    if (startPromise) {
      try {
        await startPromise;
      } catch {
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
        void processCapturedVoiceTurn({ transcriptionOverride: transcription });
      }

      return;
    }

    const uri = await recorder.stopRecording();

    if (uri) {
      void processCapturedVoiceTurn({ audioUri: uri });
    }
  }, [nativeStt, processCapturedVoiceTurn, recorder, sttMode]);

  return {
    startVoiceCapture,
    stopVoiceCapture,
  };
}
