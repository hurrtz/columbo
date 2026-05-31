import {
  getProviderSttModelOptions,
  getProviderTtsModelOptions,
  getProviderModelName,
  getSttModelLabel,
  getTtsModelLabel,
  getTtsVoiceLabel,
  PROVIDER_LABELS,
} from "../../constants/models";
import { PipelinePhase } from "../../hooks/useVoicePipeline";
import {
  AppLanguage,
  Conversation,
  Message,
  Provider,
  ResponseMode,
  Settings,
  TtsListenLanguage,
  VoiceVisualPhase,
  WaveformVisualizationVariant,
} from "../../types";
import { getStatusDisplayData, getStatusIndicatorTone } from "./statusSelectors";
import { TranslateFn } from "./shared";
import { getConversationUsageDisplayData } from "./usageSelectors";
import { hasProviderCredentialForCapability } from "../../utils/providerCredentials";

interface AudioSignalState {
  isPlaybackPaused: boolean;
  isPlaying: boolean;
  meteringData: number;
  waveformData: number[] | undefined;
  waveformVariant: string | WaveformVisualizationVariant;
}

interface GetMainScreenViewModelParams {
  activeConversation: Conversation | null;
  availableTtsProviders: Provider[];
  isRecording: boolean;
  language: AppLanguage;
  model: string;
  pipelinePhase: PipelinePhase;
  player: AudioSignalState;
  provider: Provider;
  recordingMetering: number;
  recordingLevels: number[] | undefined;
  recordingWaveformVariant: WaveformVisualizationVariant;
  selectedSttModel: string;
  selectedTtsModel: string;
  selectedTtsVoice: string;
  settings: Settings;
  streamingText: string;
  sttProvider: Provider | null;
  t: TranslateFn;
  ttsApiKey: string;
  ttsProvider: Provider | null;
}

function getResponseModeLabel(mode: ResponseMode, t: TranslateFn) {
  switch (mode) {
    case "quick":
      return t("quickAndShallow");
    case "normal":
      return t("responseModeReason");
    case "deep":
      return t("deepThinking");
  }
}

export function getMainScreenViewModel({
  activeConversation,
  availableTtsProviders,
  isRecording,
  language,
  model,
  pipelinePhase,
  player,
  provider,
  recordingMetering,
  recordingLevels,
  recordingWaveformVariant,
  selectedSttModel,
  selectedTtsModel,
  selectedTtsVoice,
  settings,
  streamingText,
  sttProvider,
  t,
  ttsApiKey,
  ttsProvider,
}: GetMainScreenViewModelParams) {
  const providerLabel = PROVIDER_LABELS[provider];
  const responseModeLabel = getResponseModeLabel(settings.activeResponseMode, t);
  const modelLabel = getProviderModelName(provider, model);
  const routeModelLabel = hasProviderCredentialForCapability(
    provider,
    settings.apiKeys[provider],
    "llm",
  )
    ? `${responseModeLabel} · ${providerLabel} · ${modelLabel}`
    : t("noProviderYet");
  const sttStatusLabel =
    settings.sttMode === "native"
      ? t("appNative")
      : sttProvider
        ? `${PROVIDER_LABELS[sttProvider]}${
            getProviderSttModelOptions(sttProvider).length > 1 &&
            selectedSttModel
              ? ` · ${getSttModelLabel(sttProvider, selectedSttModel)}`
              : ""
          }`
        : t("noProviderYet");

  const ttsStatusLabel =
    !settings.spokenRepliesEnabled
      ? t("spokenRepliesOff")
      : settings.ttsMode === "native"
        ? t("systemVoice")
        : ttsProvider
          ? `${PROVIDER_LABELS[ttsProvider]}${
              getProviderTtsModelOptions(ttsProvider).length > 1 &&
              selectedTtsModel
                ? ` · ${getTtsModelLabel(ttsProvider, selectedTtsModel)}`
                : ""
            } · ${getTtsVoiceLabel(ttsProvider, selectedTtsVoice, language)}`
          : t("noTtsProvider");

  const fallbackTtsStatusLabel =
    !settings.spokenRepliesEnabled
      ? null
      : settings.ttsMode === "provider"
        ? t("systemVoice")
        : null;

  const visualPhase: VoiceVisualPhase = isRecording
    ? "recording"
    : pipelinePhase === "transcribing"
      ? "transcribing"
      : pipelinePhase === "searching"
        ? "searching"
      : player.isPlaying || pipelinePhase === "speaking"
        ? "speaking"
        : pipelinePhase === "synthesizing"
          ? "synthesizing"
          : pipelinePhase === "thinking"
            ? "thinking"
            : "idle";
  const isActive = visualPhase !== "idle";
  const metering = isRecording
    ? recordingMetering
    : player.isPlaying
      ? player.meteringData
      : -160;
  const signalLevels = isRecording
    ? recordingLevels
    : player.isPlaying
      ? player.waveformData
      : undefined;
  const signalWaveformVariant: WaveformVisualizationVariant = isRecording
    ? recordingWaveformVariant
    : player.isPlaying
      ? (player.waveformVariant as WaveformVisualizationVariant)
      : "bars";

  const baseMessages = activeConversation?.messages || [];
  const lastAssistantReply =
    [...baseMessages]
      .reverse()
      .find((message) => message.role === "assistant" && message.content.trim())
      ?.content.trim() || "";
  const messages: Message[] = streamingText
    ? [
        ...baseMessages,
        {
          id: "streaming",
          role: "assistant",
          content: streamingText,
          model,
          provider,
          timestamp: new Date().toISOString(),
        },
      ]
    : baseMessages;

  const statusDisplay = getStatusDisplayData({
    inputMode: settings.inputMode,
    messageCount: messages.length,
    playbackPaused: player.isPlaybackPaused,
    pipelinePhase,
    providerLabel,
    t,
    ttsProviderLabel: ttsProvider ? PROVIDER_LABELS[ttsProvider] : providerLabel,
    visualPhase,
  });

  return {
    activeConversationTitle:
      activeConversation?.title.trim() || t("untitledConversation"),
    fallbackTtsStatusLabel,
    isActive,
    lastAssistantReply,
    messages,
    metering,
    routeModelLabel,
    signalLevels,
    signalWaveformVariant,
    statusDisplay,
    statusIndicatorTone: getStatusIndicatorTone(
      visualPhase,
      pipelinePhase,
      player.isPlaybackPaused,
    ),
    sttStatusLabel,
    ttsStatusLabel,
    usageDisplay: getConversationUsageDisplayData({
      conversation: activeConversation,
      showUsageStats: settings.showUsageStats,
      t,
    }),
    visualPhase,
  };
}
