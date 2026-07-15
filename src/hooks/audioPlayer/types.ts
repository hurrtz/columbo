import { type SpeechDiagnosticsContext } from "../../services/speech/diagnostics";
import { type NativeWaveformAnalysis } from "../../services/nativeWaveform";

export type AudioQueueItem = {
  id: string;
  uri: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
};

export type NativeSpeechQueueItem = {
  id: string;
  text: string;
  voice?: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
};

export type NativeAudioQueueContext = {
  uri: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
  waveformAnalysis?: Promise<NativeWaveformAnalysis | null>;
};
