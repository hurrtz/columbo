import { useEffect } from "react";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import {
  cancelNativeWaveformRecording,
  subscribeToNativeWaveform,
} from "../../services/nativeWaveform";
import type { RecognitionSession } from "./useRecognitionSession";

interface UseRecognitionSubscriptionsParams {
  session: RecognitionSession;
  usingNativeRecorder: boolean;
}

export function useRecognitionSubscriptions({
  session,
  usingNativeRecorder,
}: UseRecognitionSubscriptionsParams) {
  const {
    abortRequestedRef,
    finalTranscriptRef,
    handleError,
    handleResult,
    isRecordingRef,
    latestTranscriptRef,
    nativeSessionIdRef,
    rejectPendingStop,
    resolvePendingStop,
    setIsRecording,
    stopRequestedRef,
    stopResolverRef,
  } = session;

  useEffect(() => {
    if (!usingNativeRecorder) {
      return;
    }

    return subscribeToNativeWaveform((event) => {
      if (
        event.type === "error" &&
        nativeSessionIdRef.current &&
        event.sessionId === nativeSessionIdRef.current
      ) {
        const sessionId = nativeSessionIdRef.current;
        nativeSessionIdRef.current = null;
        void cancelNativeWaveformRecording(sessionId).catch(() => {
          // The native module may have already cleaned up after the failure.
        });
        rejectPendingStop(new Error(event.message));
        return;
      }

    });
  }, [
    nativeSessionIdRef,
    rejectPendingStop,
    usingNativeRecorder,
  ]);

  useEffect(() => {
    if (usingNativeRecorder) {
      return;
    }

    const startSubscription = ExpoSpeechRecognitionModule.addListener("start", () => {
      isRecordingRef.current = true;
      setIsRecording(true);
    });

    const resultSubscription = ExpoSpeechRecognitionModule.addListener(
      "result",
      handleResult,
    );

    const errorSubscription = ExpoSpeechRecognitionModule.addListener(
      "error",
      handleError,
    );

    const endSubscription = ExpoSpeechRecognitionModule.addListener("end", () => {
      if (abortRequestedRef.current) {
        resolvePendingStop(null);
        return;
      }

      if (stopResolverRef.current || stopRequestedRef.current) {
        const transcript =
          finalTranscriptRef.current.trim() ||
          latestTranscriptRef.current.trim() ||
          null;
        resolvePendingStop(transcript);
        return;
      }

      isRecordingRef.current = false;
      setIsRecording(false);
    });

    return () => {
      startSubscription.remove();
      resultSubscription.remove();
      errorSubscription.remove();
      endSubscription.remove();

      if (isRecordingRef.current) {
        ExpoSpeechRecognitionModule.abort();
      }
    };
  }, [
    abortRequestedRef,
    finalTranscriptRef,
    handleError,
    handleResult,
    isRecordingRef,
    latestTranscriptRef,
    resolvePendingStop,
    setIsRecording,
    stopRequestedRef,
    stopResolverRef,
    usingNativeRecorder,
  ]);

  useEffect(() => {
    if (!usingNativeRecorder) {
      return;
    }

    return () => {
      if (nativeSessionIdRef.current) {
        void cancelNativeWaveformRecording(nativeSessionIdRef.current);
        nativeSessionIdRef.current = null;
      }
    };
  }, [nativeSessionIdRef, usingNativeRecorder]);
}
