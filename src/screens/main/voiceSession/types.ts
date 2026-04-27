import { MutableRefObject } from "react";

import { PipelinePhase } from "../../../hooks/useVoicePipeline";
import { Provider, Settings } from "../../../types";

import { ShowToastFn, TranslateFn } from "../shared";

export interface AudioPlayerController {
  isPlaybackPaused: boolean;
  isPlaying: boolean;
  pausePlayback: () => Promise<boolean>;
  resumePlayback: () => Promise<boolean>;
  stopPlayback: () => Promise<void>;
  waitForPlaybackRouteSettle: () => Promise<void>;
}

export interface AudioRecorderController {
  clearLastError: () => void;
  lastError: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
}

export interface NativeSpeechRecognizerController {
  abortRecognition: () => Promise<void>;
  clearLastError: () => void;
  isAvailable: boolean;
  lastError: string | null;
  startRecognition: () => Promise<void>;
  stopRecognition: () => Promise<string | null>;
}

export interface UseVoiceSessionControllerParams<Snapshot> {
  abortRef: MutableRefObject<AbortController | null>;
  availableSttProviders: Provider[];
  availableTtsProviders: Provider[];
  captureActiveConversationSnapshot: () => Snapshot;
  handleVoiceCaptureDone: (params: {
    audioUri?: string;
    transcriptionOverride?: string;
  }) => Promise<void>;
  isBusy: boolean;
  isRecording: boolean;
  lastCompletedReplyRef: MutableRefObject<string>;
  nativeStt: NativeSpeechRecognizerController;
  player: AudioPlayerController;
  providerApiKey: string;
  providerLabel: string;
  recorder: AudioRecorderController;
  restoreActiveConversationSnapshot: (snapshot: Snapshot) => Promise<void>;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string) => void;
  settings: Pick<Settings, "spokenRepliesEnabled" | "sttMode" | "ttsMode">;
  showToast: ShowToastFn;
  sttApiKey: string;
  sttProvider: Provider | null;
  t: TranslateFn;
  ttsApiKey: string;
  ttsProvider: Provider | null;
}
