import { useCallback, useRef } from "react";
import { Platform } from "react-native";
import { setAudioModeAsync, setIsAudioActiveAsync } from "expo-audio";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";

import { recordDebugLogEvent } from "../../services/debugLogCapture";

function ensureIosPlaybackMode() {
  if (
    Platform.OS !== "ios" ||
    typeof ExpoSpeechRecognitionModule.setCategoryIOS !== "function"
  ) {
    return;
  }

  // Recording/STT switches the shared session into `.measurement`,
  // which lowers playback output. Reset it before TTS playback.
  ExpoSpeechRecognitionModule.setCategoryIOS({
    category: "playback",
    categoryOptions: [],
    mode: "default",
  });
}

export function usePlaybackSession() {
  const audioSessionReadyRef = useRef(false);
  const audioSessionPromiseRef = useRef<Promise<void> | null>(null);

  const resetPlaybackSession = useCallback(() => {
    audioSessionReadyRef.current = false;
    audioSessionPromiseRef.current = null;
    recordDebugLogEvent({ event: "diag-audio-session-deactivate" });
    void setIsAudioActiveAsync(false).catch(() => {
      // Ignore audio-session teardown failures; the next playback attempt will re-prime it.
    });
  }, []);

  const ensurePlaybackSession = useCallback(async () => {
    if (audioSessionReadyRef.current) {
      return;
    }

    if (!audioSessionPromiseRef.current) {
      audioSessionPromiseRef.current = setIsAudioActiveAsync(true)
        .then(() =>
          setAudioModeAsync({
            allowsRecording: false,
            interruptionMode: "doNotMix",
            playsInSilentMode: true,
            shouldPlayInBackground: true,
          }),
        )
        .then(() => {
          ensureIosPlaybackMode();
        })
        .then(() => {
          audioSessionReadyRef.current = true;
          recordDebugLogEvent({ event: "diag-audio-session-activate" });
        })
        .finally(() => {
          audioSessionPromiseRef.current = null;
        });
    }

    await audioSessionPromiseRef.current;
  }, []);

  return {
    ensurePlaybackSession,
    resetPlaybackSession,
  };
}
