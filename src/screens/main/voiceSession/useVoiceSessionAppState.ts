import { useEffect } from "react";
import type { MutableRefObject } from "react";
import { AppState } from "react-native";

import { PipelinePhase } from "../../../hooks/useVoicePipeline";

import type {
  AudioRecorderController,
  NativeSpeechRecognizerController,
} from "./types";

interface UseVoiceSessionAppStateParams {
  abortRef: MutableRefObject<AbortController | null>;
  isRecording: boolean;
  nativeStt: NativeSpeechRecognizerController;
  recorder: AudioRecorderController;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string) => void;
  sttMode: "native" | "provider";
}

export function useVoiceSessionAppState({
  abortRef,
  isRecording,
  nativeStt,
  recorder,
  setPipelinePhase,
  setStreamingText,
  sttMode,
}: UseVoiceSessionAppStateParams) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState !== "background") {
        return;
      }

      if (!isRecording) {
        return;
      }

      void (async () => {
        abortRef.current?.abort();
        setPipelinePhase("idle");
        setStreamingText("");

        try {
          if (sttMode === "native") {
            await nativeStt.abortRecognition();
          } else {
            await recorder.stopRecording();
          }
        } catch {
          // Ignore background-stop failures.
        }
      })();
    });

    return () => {
      subscription.remove();
    };
  }, [
    abortRef,
    isRecording,
    nativeStt,
    recorder,
    setPipelinePhase,
    setStreamingText,
    sttMode,
  ]);
}
