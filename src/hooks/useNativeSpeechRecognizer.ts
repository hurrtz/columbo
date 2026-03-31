import { Platform } from "react-native";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import { useLocalization } from "../i18n";
import { WaveformVisualizationVariant } from "../types";
import { isNativeWaveformAvailable } from "../services/nativeWaveform";
import { useRecognitionControls } from "./nativeSpeechRecognizer/useRecognitionControls";
import { useRecognitionSession } from "./nativeSpeechRecognizer/useRecognitionSession";
import { useRecognitionSubscriptions } from "./nativeSpeechRecognizer/useRecognitionSubscriptions";

function canUseNativeWaveformRecorderForRecognition() {
  if (!isNativeWaveformAvailable()) {
    return false;
  }

  if (Platform.OS !== "android") {
    return true;
  }

  return typeof Platform.Version === "number" && Platform.Version >= 33;
}

export function useNativeSpeechRecognizer() {
  const { t } = useLocalization();
  const usingNativeRecorder = canUseNativeWaveformRecorderForRecognition();
  const session = useRecognitionSession({ t, usingNativeRecorder });

  useRecognitionSubscriptions({
    session,
    usingNativeRecorder,
  });

  const { startRecognition, stopRecognition, abortRecognition } =
    useRecognitionControls({
      session,
      t,
      usingNativeRecorder,
    });

  return {
    isAvailable: ExpoSpeechRecognitionModule.isRecognitionAvailable(),
    isRecording: session.isRecording,
    lastError: session.lastError,
    meteringData: session.meteringData,
    waveformData: session.waveformData,
    waveformVariant: (usingNativeRecorder ? "oscilloscope" : "bars") as WaveformVisualizationVariant,
    startRecognition,
    stopRecognition,
    abortRecognition,
    clearLastError: session.clearLastError,
  };
}
