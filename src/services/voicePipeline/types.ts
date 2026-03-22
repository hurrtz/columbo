import type {
  AppLanguage,
  AssistantResponseLength,
  AssistantResponseTone,
  LocalTtsVoiceSelections,
  Message,
  Provider,
  ReplyPlayback,
  SttBackendMode,
  TtsBackendMode,
  TtsListenLanguage,
  UsageEstimate,
} from "../../types";
import type { SpeechDiagnosticsContext } from "../speech/diagnostics";

export interface PipelineCallbacks {
  onTranscription: (text: string) => void;
  onContextSummary?: (
    summary: string,
    summarizedMessageCount: number,
    usage?: UsageEstimate,
  ) => void;
  onChunk: (text: string) => void;
  onResponseDone: (fullText: string, usage?: UsageEstimate) => void;
  onAudioReady: (
    audioUri: string,
    diagnostics?: SpeechDiagnosticsContext,
  ) => void;
  onSpeechTextReady: (
    text: string,
    voice?: string,
    diagnostics?: SpeechDiagnosticsContext,
  ) => void;
  onTtsFallback?: (error: Error) => void;
  onError: (error: Error) => void;
}

export interface RunVoicePipelineParams {
  audioUri?: string;
  transcriptionOverride?: string;
  messages: Message[];
  model: string;
  provider: Provider;
  providerApiKey: string;
  sttMode: SttBackendMode;
  sttProvider?: Provider | null;
  sttApiKey?: string;
  sttModel?: string;
  ttsMode: TtsBackendMode;
  ttsProvider?: Provider | null;
  ttsApiKey?: string;
  ttsModel?: string;
  ttsVoice: string;
  ttsListenLanguages?: TtsListenLanguage[];
  localTtsVoices?: LocalTtsVoiceSelections;
  replyPlayback: ReplyPlayback;
  contextSummary?: string;
  summarizedMessageCount?: number;
  assistantInstructions: string;
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  language: AppLanguage;
  callbacks: PipelineCallbacks;
  abortSignal?: AbortSignal;
}
