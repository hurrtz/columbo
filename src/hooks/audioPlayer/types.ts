import { type SpeechDiagnosticsContext } from "../../services/speech/diagnostics";
import { type NativeWaveformAnalysis } from "../../services/nativeWaveform";

export type AudioQueueItem = {
  generation: number;
  id: string;
  uri: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
};

export type NativeSpeechQueueItem = {
  generation: number;
  id: string;
  text: string;
  voice?: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
};

export type NativeAudioQueueContext = {
  generation: number;
  uri: string;
  diagnostics?: SpeechDiagnosticsContext;
  onPlaybackStarted?: () => void;
  waveformAnalysis?: Promise<NativeWaveformAnalysis | null>;
};
