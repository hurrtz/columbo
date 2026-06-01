import { useEffect, useRef, useCallback, useState } from "react";
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioRecorder as useExpoAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import {
  EMPTY_OSCILLOSCOPE_SAMPLES,
  EMPTY_VISUAL_LEVELS,
  levelToMetering,
  averageSampleMagnitude,
  appendMeterHistory,
  blendWaveformSamples,
  enhanceInputWaveformSamples,
  INPUT_WAVEFORM_REFERENCE_FLOOR,
} from "../utils/audioVisualization";
import { useLocalization } from "../i18n";
import { WaveformVisualizationVariant } from "../types";
import {
  cancelNativeWaveformRecording,
  isNativeWaveformAvailable,
  startNativeWaveformRecording,
  stopNativeWaveformRecording,
  subscribeToNativeWaveform,
} from "../services/nativeWaveform";
import { recordDebugLogEvent } from "../services/debugLogCapture";

export interface RecorderState {
  isRecording: boolean;
  meteringData: number;
  waveformData: number[];
  waveformVariant: WaveformVisualizationVariant;
  lastError: string | null;
  clearLastError: () => void;
}

const RECORDING_OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
  numberOfChannels: 1,
};
const RECORDER_STATUS_INTERVAL_MS = 150;
const STOPPED_RECORDING_URI_ATTEMPTS = 12;
const STOPPED_RECORDING_URI_RETRY_MS = 50;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function useAudioRecorder() {
  const { t } = useLocalization();
  const usingNativeRecorder = isNativeWaveformAvailable();
  const recorder = useExpoAudioRecorder(RECORDING_OPTIONS);
  const recorderState = useAudioRecorderState(recorder, RECORDER_STATUS_INTERVAL_MS);
  const startTimeRef = useRef<number>(0);
  const nativeSessionIdRef = useRef<string | null>(null);
  const inputReferenceLevelRef = useRef(INPUT_WAVEFORM_REFERENCE_FLOOR);
  const lastWaveformPublishRef = useRef<number>(0);
  const [nativeRecording, setNativeRecording] = useState(false);
  const [nativeMeteringData, setNativeMeteringData] = useState(-160);
  const [lastError, setLastError] = useState<string | null>(null);
  const [waveformData, setWaveformData] = useState(
    usingNativeRecorder ? EMPTY_OSCILLOSCOPE_SAMPLES : EMPTY_VISUAL_LEVELS
  );

  const resolveStoppedRecordingUri = useCallback(async () => {
    for (let attempt = 0; attempt < STOPPED_RECORDING_URI_ATTEMPTS; attempt += 1) {
      const status = recorder.getStatus();
      const resolvedUri = recorder.uri ?? status.url ?? recorderState.url;

      if (resolvedUri) {
        return resolvedUri;
      }

      if (attempt < STOPPED_RECORDING_URI_ATTEMPTS - 1) {
        await wait(STOPPED_RECORDING_URI_RETRY_MS);
      }
    }

    return null;
  }, [recorder, recorderState.url]);

  useEffect(() => {
    if (!usingNativeRecorder) {
      return;
    }

    return subscribeToNativeWaveform((event) => {
      recordDebugLogEvent({
        event: "native-waveform-event",
        payload: {
          sessionId: "sessionId" in event ? event.sessionId : null,
          type: event.type,
        },
      });

      if (
        event.type === "error" &&
        nativeSessionIdRef.current &&
        event.sessionId === nativeSessionIdRef.current
      ) {
        const sessionId = nativeSessionIdRef.current;
        nativeSessionIdRef.current = null;
        inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
        setNativeRecording(false);
        setNativeMeteringData(-160);
        setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);
        setLastError(event.message);
        void cancelNativeWaveformRecording(sessionId).catch(() => {
          // The native module may have already cleaned up after the failure.
        });
        return;
      }

      if (
        event.type !== "levels" ||
        !nativeSessionIdRef.current ||
        event.sessionId !== nativeSessionIdRef.current
      ) {
        return;
      }

      const { samples, referenceLevel } = enhanceInputWaveformSamples(
        event.samples?.length ? event.samples : EMPTY_OSCILLOSCOPE_SAMPLES,
        inputReferenceLevelRef.current
      );
      // Always keep the smoothing reference up to date so dropped frames blend
      // seamlessly, but throttle the React state updates to ~12 fps to avoid a
      // whole-screen re-render storm while recording.
      inputReferenceLevelRef.current = referenceLevel;

      const now = Date.now();
      if (now - lastWaveformPublishRef.current < 80) {
        return;
      }
      lastWaveformPublishRef.current = now;

      setWaveformData((previous) => blendWaveformSamples(previous, samples, 0.08));
      setNativeMeteringData(
        levelToMetering(averageSampleMagnitude(samples))
      );
    });
  }, [usingNativeRecorder]);

  useEffect(() => {
    if (usingNativeRecorder) {
      if (!nativeRecording) {
        inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
        setNativeMeteringData(-160);
        setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);
      }
      return;
    }

    if (!recorderState.isRecording) {
      setWaveformData(EMPTY_VISUAL_LEVELS);
      return;
    }

    setWaveformData((previous) =>
      appendMeterHistory(previous, recorderState.metering ?? -160)
    );
  }, [
    nativeRecording,
    recorderState.isRecording,
    recorderState.metering,
    usingNativeRecorder,
  ]);

  const startRecording = useCallback(async () => {
    recordDebugLogEvent({
      event: "recorder-start-requested",
      payload: {
        recorderRoute: usingNativeRecorder ? "native-waveform" : "expo-audio",
      },
    });

    if (usingNativeRecorder) {
      if (nativeRecording) {
        recordDebugLogEvent({
          event: "recorder-start-skipped",
          payload: {
            reason: "native-recorder-already-active",
          },
        });
        return;
      }

      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        throw new Error(t("microphonePermissionNotGranted"));
      }

      setLastError(null);
      const sessionId = `native-recorder-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

      nativeSessionIdRef.current = sessionId;
      inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
      lastWaveformPublishRef.current = 0;
      setNativeMeteringData(-160);
      setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);

      try {
        await startNativeWaveformRecording({ sessionId });
        startTimeRef.current = Date.now();
        setNativeRecording(true);
        recordDebugLogEvent({
          event: "recorder-started",
          payload: {
            recorderRoute: "native-waveform",
            sessionId,
          },
        });
      } catch (error) {
        nativeSessionIdRef.current = null;
        setNativeRecording(false);
        recordDebugLogEvent({
          event: "recorder-start-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
            recorderRoute: "native-waveform",
            sessionId,
          },
        });
        throw error;
      }
      return;
    }

    if (recorderState.isRecording) {
      recordDebugLogEvent({
        event: "recorder-start-skipped",
        payload: {
          reason: "expo-recorder-already-active",
        },
      });
      return;
    }

    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      throw new Error(t("microphonePermissionNotGranted"));
    }

    setLastError(null);
    await recorder.prepareToRecordAsync(RECORDING_OPTIONS);
    recorder.record();
    startTimeRef.current = Date.now();
    recordDebugLogEvent({
      event: "recorder-started",
      payload: {
        recorderRoute: "expo-audio",
      },
    });
  }, [nativeRecording, recorder, recorderState.isRecording, t, usingNativeRecorder]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    recordDebugLogEvent({
      event: "recorder-stop-requested",
      payload: {
        recorderRoute: usingNativeRecorder ? "native-waveform" : "expo-audio",
      },
    });

    if (usingNativeRecorder) {
      const sessionId = nativeSessionIdRef.current;
      if (!sessionId) {
        recordDebugLogEvent({
          event: "recorder-stop-skipped",
          payload: {
            reason: "missing-native-session-id",
          },
        });
        return null;
      }

      const duration = Date.now() - startTimeRef.current;
      nativeSessionIdRef.current = null;

      try {
        if (duration < 300) {
          await cancelNativeWaveformRecording(sessionId);
          inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
          setNativeRecording(false);
          setNativeMeteringData(-160);
          setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);
          startTimeRef.current = 0;
          recordDebugLogEvent({
            event: "recorder-stop-discarded",
            payload: {
              durationMs: duration,
              recorderRoute: "native-waveform",
              reason: "recording-too-short",
              sessionId,
            },
          });
          return null;
        }

        const result = await stopNativeWaveformRecording(sessionId);
        inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
        setNativeRecording(false);
        setNativeMeteringData(-160);
        setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);
        startTimeRef.current = 0;

        if (result.uri) {
          recordDebugLogEvent({
            event: "recorder-stop-succeeded",
            payload: {
              durationMs: duration,
              recorderRoute: "native-waveform",
              sessionId,
              uri: result.uri,
            },
          });
          return result.uri;
        }

        recordDebugLogEvent({
          event: "recorder-stop-missing-uri",
          level: "warn",
          payload: {
            durationMs: duration,
            recorderRoute: "native-waveform",
            sessionId,
          },
        });
        throw new Error(t("couldntProcessVoiceInput"));
      } catch (error) {
        inputReferenceLevelRef.current = INPUT_WAVEFORM_REFERENCE_FLOOR;
        setNativeRecording(false);
        setNativeMeteringData(-160);
        setWaveformData(EMPTY_OSCILLOSCOPE_SAMPLES);
        startTimeRef.current = 0;
        recordDebugLogEvent({
          event: "recorder-stop-failed",
          level: "error",
          payload: {
            durationMs: duration,
            message: error instanceof Error ? error.message : String(error),
            recorderRoute: "native-waveform",
            sessionId,
          },
        });
        throw error;
      }
    }

    const statusBeforeStop = recorder.getStatus();
    if (
      !recorderState.isRecording &&
      !statusBeforeStop.isRecording &&
      !recorderState.canRecord &&
      !statusBeforeStop.canRecord
    ) {
      recordDebugLogEvent({
        event: "recorder-stop-skipped",
        payload: {
          reason: "expo-recorder-not-ready",
        },
      });
      return null;
    }

    const duration = Date.now() - startTimeRef.current;
    await recorder.stop();
    startTimeRef.current = 0;

    if (duration < 300) {
      recordDebugLogEvent({
        event: "recorder-stop-discarded",
        payload: {
          durationMs: duration,
          recorderRoute: "expo-audio",
          reason: "recording-too-short",
        },
      });
      return null;
    }

    const resolvedUri = await resolveStoppedRecordingUri();

    if (resolvedUri) {
      recordDebugLogEvent({
        event: "recorder-stop-succeeded",
        payload: {
          durationMs: duration,
          recorderRoute: "expo-audio",
          uri: resolvedUri,
        },
      });
      return resolvedUri;
    }

    recordDebugLogEvent({
      event: "recorder-stop-missing-uri",
      level: "warn",
      payload: {
        durationMs: duration,
        recorderRoute: "expo-audio",
      },
    });
    throw new Error(t("couldntProcessVoiceInput"));
  }, [
    recorder,
    recorderState.canRecord,
    recorderState.isRecording,
    recorderState.url,
    resolveStoppedRecordingUri,
    t,
    usingNativeRecorder,
  ]);

  const clearLastError = useCallback(() => {
    setLastError(null);
  }, []);

  return {
    isRecording: usingNativeRecorder ? nativeRecording : recorderState.isRecording,
    meteringData: usingNativeRecorder
      ? nativeMeteringData
      : recorderState.metering ?? -160,
    waveformData,
    waveformVariant: usingNativeRecorder ? "oscilloscope" : "bars",
    lastError,
    clearLastError,
    startRecording,
    stopRecording,
  };
}
