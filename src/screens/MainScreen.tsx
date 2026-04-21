import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ConversationMemoryModal } from "../components/ConversationMemoryModal";
import { ConversationDrawer } from "../components/ConversationDrawer";
import { SettingsModal } from "../components/SettingsModal";
import { SetupGuideModal } from "../components/SetupGuideModal";
import { Toast } from "../components/Toast";
import {
  DEFAULT_WEB_SEARCH_PROVIDER,
  type WebSearchProvider,
} from "../constants/webSearch";
import { getTtsListenLanguageLabel } from "../constants/localTts";
import {
  PROVIDER_DEFAULT_STT_MODELS,
  PROVIDER_DEFAULT_TTS_MODELS,
  PROVIDER_DEFAULT_TTS_VOICES,
  PROVIDER_LABELS,
} from "../constants/models";
import { useSharedSettings } from "../context/SettingsContext";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useLocalTtsPacks } from "../hooks/useLocalTtsPacks";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useDynamicProviderTtsVoiceCatalog } from "../hooks/useDynamicProviderTtsVoiceCatalog";
import { useNativeSpeechRecognizer } from "../hooks/useNativeSpeechRecognizer";
import { useConversations } from "../hooks/useConversations";
import { useVoicePipeline } from "../hooks/useVoicePipeline";
import { useLocalization } from "../i18n";
import {
  getDebugLogCaptureState,
  installDebugLogConsoleCapture,
  recoverPendingDebugLogCapture,
  recordDebugLogEvent,
  startDebugLogCapture,
  stopDebugLogCapture,
  subscribeToDebugLogCapture,
} from "../services/debugLogCapture";
import { validateProviderConnection } from "../services/llm";
import { validateTtsProviderConnection } from "../services/providerValidation";
import { validateWebSearchConnection } from "../services/webSearch";
import { useTheme } from "../theme/ThemeContext";
import {
  Provider,
  ResponseMode,
  TtsListenLanguage,
  WaveformVisualizationVariant,
} from "../types";
import {
  getEnabledSttProviders,
  getEnabledTtsProviders,
} from "../utils/providerCapabilities";
import { hasProviderCredentialForCapability } from "../utils/providerCredentials";
import {
  getAvailableResponseModes,
  getProviderValidationModel,
} from "../utils/responseModes";
import { MainScreenTopBar } from "./main/MainScreenTopBar";
import { MainScreenRouteCard } from "./main/MainScreenRouteCard";
import {
  MainScreenStatusStrip,
  MainScreenVoiceStage,
} from "./main/MainScreenVoiceStage";
import { StatusDetailsModal } from "./main/StatusDetailsModal";
import { TranscriptPreviewCard } from "./main/TranscriptPreviewCard";
import { getMainScreenViewModel } from "./main/mainScreenViewModel";
import { TranscriptModal } from "./main/TranscriptModal";
import { styles } from "./main/styles";
import { useConversationActions } from "./main/useConversationActions";
import { useMainScreenUiState } from "./main/useMainScreenUiState";
import { usePreviewVoiceController } from "./main/usePreviewVoiceController";
import { useProviderAvailabilityGuards } from "./main/useProviderAvailabilityGuards";
import { useSetupGuideController } from "./main/useSetupGuideController";
import { useVoiceSessionController } from "./main/useVoiceSessionController";
import { getProviderValidationTarget } from "../components/settings/providerSupport";

export function MainScreen() {
  const { colors, isDark } = useTheme();
  const { t, language } = useLocalization();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const {
    settings,
    updateSettings,
    updateActiveResponseMode,
    updateResponseModeRoute,
    updateProviderSttModel,
    updateProviderTtsModel,
    updateProviderTtsVoice,
    updateLocalTtsVoice,
    updateApiKey,
    loaded,
  } = useSharedSettings();
  const {
    conversations,
    activeConversation,
    createConversation,
    selectConversation,
    getConversationById,
    addMessage,
    updateMessage,
    updateConversationContextSummary,
    clearConversationMemory,
    renameConversation,
    toggleConversationPinned,
    searchConversations,
    deleteConversation,
    clearActiveConversation,
    captureActiveConversationSnapshot,
    restoreActiveConversationSnapshot,
  } = useConversations();

  const recorder = useAudioRecorder();
  const nativeStt = useNativeSpeechRecognizer();
  const player = useAudioPlayer();
  const {
    packStates: localTtsPackStates,
    installLanguagePack,
    refreshPackStates: refreshLocalTtsPackStates,
  } = useLocalTtsPacks(settings);

  const [toast, setToast] = useState<{
    message: string;
    onRetry?: () => void;
  } | null>(null);
  const [debugLogCaptureState, setDebugLogCaptureState] = useState(
    () => getDebugLogCaptureState(),
  );
  const {
    settingsVisible,
    settingsFocusCatalogProviderId,
    settingsFocusTab,
    drawerVisible,
    statusDetailsVisible,
    transcriptVisible,
    conversationMenuVisible,
    setupGuideVisible,
    memoryConversation,
    memoryVisible,
    setDrawerVisible,
    setSetupGuideVisible,
    setMemoryConversation,
    openSettings,
    closeSettings,
    openMemoryConversation,
    closeMemory,
    openTranscript,
    closeTranscript,
    openStatusDetails,
    closeStatusDetails,
    closeConversationMenu,
    toggleConversationMenu,
    runAfterDrawerDismiss,
    handleDrawerDismiss,
  } = useMainScreenUiState();

  const activeResponseMode = settings.activeResponseMode;
  const activeResponseRoute = settings.responseModes[activeResponseMode];
  const provider = activeResponseRoute.provider;
  const providerApiKey = settings.apiKeys[provider].trim();
  const model = activeResponseRoute.model;
  const availableResponseModes = getAvailableResponseModes(settings);
  const availableSttProviders = getEnabledSttProviders(settings);
  const availableTtsProviders = getEnabledTtsProviders(settings);
  const sttProvider =
    settings.sttMode === "provider" ? settings.sttProvider : null;
  const ttsProvider = settings.ttsProvider;
  const webSearchProvider = settings.webSearchProvider;
  const webSearchMode = settings.webSearchMode;
  const sttApiKey = sttProvider ? settings.apiKeys[sttProvider].trim() : "";
  const ttsApiKey = ttsProvider ? settings.apiKeys[ttsProvider].trim() : "";
  const webSearchApiKey = webSearchProvider
    ? settings.apiKeys[webSearchProvider].trim()
    : "";
  const webSearchOptions = webSearchProvider
    ? settings.webSearchProviderSettings[webSearchProvider]
    : undefined;
  const webSearchReady = !!webSearchProvider && !!webSearchApiKey;
  const webSearchActive = webSearchMode !== "off" && webSearchReady;
  const isLandscape = width > height;
  const stageCircleSize = isLandscape
    ? Math.max(172, Math.min(208, Math.round(Math.min(height * 0.44, width * 0.24))))
    : 260;
  const selectedSttModel = sttProvider
    ? settings.providerSttModels[sttProvider] ||
      PROVIDER_DEFAULT_STT_MODELS[sttProvider] ||
      ""
    : "";
  const selectedTtsVoice = ttsProvider
    ? settings.providerTtsVoices[ttsProvider] ||
      PROVIDER_DEFAULT_TTS_VOICES[ttsProvider] ||
      ""
    : "";
  const selectedTtsModel = ttsProvider
    ? settings.providerTtsModels[ttsProvider] ||
      PROVIDER_DEFAULT_TTS_MODELS[ttsProvider] ||
      ""
    : "";
  useDynamicProviderTtsVoiceCatalog({
    provider: ttsProvider,
    apiKey: ttsApiKey,
    enabled: Boolean(ttsProvider && ttsApiKey),
  });
  const providerLabel = PROVIDER_LABELS[provider];
  const isRecording =
    settings.sttMode === "native"
      ? nativeStt.isRecording
      : recorder.isRecording;
  const recordingMetering =
    settings.sttMode === "native"
      ? nativeStt.meteringData
      : recorder.meteringData;
  const recordingLevels =
    settings.sttMode === "native"
      ? nativeStt.waveformData
      : recorder.waveformData;
  const recordingWaveformVariant: WaveformVisualizationVariant =
    settings.sttMode === "native"
      ? (nativeStt.waveformVariant as WaveformVisualizationVariant)
      : (recorder.waveformVariant as WaveformVisualizationVariant);

  const showToast = useCallback((message: string, onRetry?: () => void) => {
    recordDebugLogEvent({
      event: "toast-shown",
      payload: {
        hasRetry: Boolean(onRetry),
        message,
      },
    });
    setToast({ message, onRetry });
  }, []);

  useEffect(() => {
    const syncState = () => {
      setDebugLogCaptureState(getDebugLogCaptureState());
    };

    syncState();

    return subscribeToDebugLogCapture(syncState);
  }, []);

  const {
    pipelinePhase,
    setPipelinePhase,
    streamingText,
    setStreamingText,
    abortRef,
    lastCompletedReplyRef,
    replayPhase,
    activeReplayMessageId,
    handleRepeatLastReply,
    stopReplay,
    handleVoiceCaptureDone,
  } = useVoicePipeline({
    activeConversation,
    addMessage,
    createConversation,
    updateMessage,
    updateConversationContextSummary,
    player,
    provider,
    providerApiKey,
    model,
    sttMode: settings.sttMode,
    sttProvider,
    sttApiKey,
    selectedSttModel,
    selectedTtsModel,
    ttsMode: settings.ttsMode,
    ttsProvider,
    ttsApiKey,
    selectedTtsVoice,
    ttsListenLanguages: settings.ttsListenLanguages,
    localTtsVoices: settings.localTtsVoices,
    replyPlayback: settings.replyPlayback,
    spokenRepliesEnabled: settings.spokenRepliesEnabled,
    assistantInstructions: settings.assistantInstructions,
    responseLength: settings.responseLength,
    responseTone: settings.responseTone,
    language,
    webSearchMode,
    webSearchProvider,
    webSearchApiKey,
    webSearchOptions,
    isRecording,
    showToast,
    t,
  });

  const isBusy = pipelinePhase !== "idle";

  const handleInstallLocalTtsLanguage = useCallback(
    async (languageCode: TtsListenLanguage) => {
      recordDebugLogEvent({
        event: "local-tts-pack-install-requested",
        payload: {
          languageCode,
        },
      });

      try {
        const status = await installLanguagePack(languageCode);
        const languageLabel = getTtsListenLanguageLabel(languageCode, language);

        if (status?.downloaded && !status.verified) {
          recordDebugLogEvent({
            event: "local-tts-pack-install-invalid",
            level: "warn",
            payload: {
              languageCode,
              verificationError: status.verificationError || null,
            },
          });
          showToast(status.verificationError || t("localTtsPackBroken"));
          return;
        }

        recordDebugLogEvent({
          event: "local-tts-pack-install-succeeded",
          payload: {
            downloaded: status?.downloaded ?? false,
            languageCode,
            verified: status?.verified ?? false,
          },
        });
        showToast(t("localTtsPackInstalled", { languageLabel }));
      } catch (error) {
        recordDebugLogEvent({
          event: "local-tts-pack-install-failed",
          level: "error",
          payload: {
            languageCode,
            message: error instanceof Error ? error.message : String(error),
          },
        });
        showToast(
          error instanceof Error
            ? error.message
            : t("localTtsPackInstallFailed"),
        );
      }
    },
    [installLanguagePack, language, showToast, t],
  );

  const handleRepeatMessage = useCallback(
    async (message: { id: string; content: string }) => {
      if (activeReplayMessageId === message.id) {
        recordDebugLogEvent({
          event: "reply-repeat-stop-requested",
          payload: {
            messageId: message.id,
          },
        });
        await stopReplay();
        return;
      }

      recordDebugLogEvent({
        event: "reply-repeat-requested",
        payload: {
          contentLength: message.content.length,
          messageId: message.id,
        },
      });
      await handleRepeatLastReply(message.content, message.id);
    },
    [activeReplayMessageId, handleRepeatLastReply, stopReplay],
  );

  useProviderAvailabilityGuards({
    activeResponseMode,
    availableResponseModes,
    availableSttProviders,
    availableTtsProviders,
    loaded,
    providerApiKey,
    settings,
    sttProvider,
    ttsProvider,
    updateActiveResponseMode,
    updateSettings,
  });

  const {
    handleDismissSetupGuide,
    handleOpenSetupGuide,
    handleBack,
    handleContinueFromIntro,
    handleSelectProvider,
    handleProviderApiKeyChange,
    handleValidateProviderKey,
    handleContinueFromProvider,
    handleContinueFromVoiceTest,
    handleFinishSetupGuide,
    handleOpenSettingsFromSummary,
    step: setupGuideStep,
    providerOptions: setupGuideProviderOptions,
    selectedProvider: setupGuideSelectedProvider,
    selectedProviderApiKey: setupGuideSelectedProviderApiKey,
    currentValidationState: setupGuideValidationState,
    resolvedRoutes: setupGuideResolvedRoutes,
    voiceTest: setupGuideVoiceTest,
  } = useSetupGuideController({
    loaded,
    localTtsPackStates,
    nativeStt,
    openSettings,
    player,
    recorder,
    setSetupGuideVisible,
    setupGuideVisible,
    setupGuideDismissed: settings.setupGuideDismissed,
    settings,
    updateApiKey,
    updateSettings,
  });

  const {
    handlePressIn,
    handlePressOut,
    handleTogglePress,
    resetVoiceSessionState,
  } = useVoiceSessionController({
    abortRef,
    availableSttProviders,
    availableTtsProviders,
    captureActiveConversationSnapshot,
    handleVoiceCaptureDone,
    isBusy,
    isRecording,
    lastCompletedReplyRef,
    nativeStt,
    player,
    providerApiKey,
    providerLabel,
    recorder,
    restoreActiveConversationSnapshot,
    setPipelinePhase,
    setStreamingText,
    settings,
    showToast,
    sttApiKey,
    sttProvider,
    t,
    ttsApiKey,
    ttsProvider,
  });

  const {
    handleCopyMessage,
    handleCopyThread,
    handleShareThread,
    handleShareMessage,
    handleRenameThread,
    handleTogglePinned,
    handleSelectConversation,
    handleStartNewSession,
    openMemory,
    handleCopyMemory,
    handleClearMemory,
  } = useConversationActions({
    activeConversation,
    memoryConversation,
    getConversationById,
    renameConversation,
    toggleConversationPinned,
    clearConversationMemory,
    selectConversation,
    clearActiveConversation,
    resetVoiceSessionState,
    openMemoryConversation,
    setMemoryConversation,
    showToast,
    language,
    t,
  });

  const handleResponseModeChange = useCallback(
    (nextMode: ResponseMode) => {
      const nextProvider = settings.responseModes[nextMode].provider;

      recordDebugLogEvent({
        event: "response-mode-change-requested",
        payload: {
          currentMode: activeResponseMode,
          nextMode,
          nextProvider,
        },
      });

      if (
        !hasProviderCredentialForCapability(
          nextProvider,
          settings.apiKeys[nextProvider],
          "llm",
        )
      ) {
        recordDebugLogEvent({
          event: "response-mode-change-blocked",
          level: "warn",
          payload: {
            missingProviderKey: nextProvider,
            nextMode,
          },
        });
        showToast(
          t("addProviderKeyToEnableProvider", {
            provider: PROVIDER_LABELS[nextProvider],
          }),
        );
        return;
      }

      recordDebugLogEvent({
        event: "response-mode-change-applied",
        payload: {
          nextMode,
          nextProvider,
        },
      });
      updateActiveResponseMode(nextMode);
    },
    [
      activeResponseMode,
      settings.apiKeys,
      settings.responseModes,
      showToast,
      t,
      updateActiveResponseMode,
    ],
  );

  const { handlePreviewVoice, stopPreviewVoice } = usePreviewVoiceController({
    isBusy,
    isRecording,
    language,
    player,
    refreshLocalTtsPackStates,
    settings,
    showToast,
    t,
    ttsProvider,
  });

  const handleValidateProvider = useCallback(
    async (nextProvider: Provider) => {
      const apiKey = settings.apiKeys[nextProvider].trim();
      const target = getProviderValidationTarget(settings, nextProvider);

      recordDebugLogEvent({
        event: "provider-validation-requested",
        payload: {
          provider: nextProvider,
          target: target.kind,
        },
      });

      try {
        if (target.kind === "llm") {
          await validateProviderConnection({
            provider: nextProvider,
            model: getProviderValidationModel(settings, nextProvider),
            apiKey,
            language,
          });
        } else if (target.kind === "tts") {
          const voice =
            (() => {
              try {
                const parsed = target.configKey
                  ? JSON.parse(target.configKey)
                  : null;
                return typeof parsed?.voice === "string" ? parsed.voice : "";
              } catch {
                return "";
              }
            })();

          await validateTtsProviderConnection({
            provider: nextProvider,
            model: target.model,
            voice,
            apiKey,
            language,
          });
        }
        recordDebugLogEvent({
          event: "provider-validation-succeeded",
          payload: {
            provider: nextProvider,
            target: target.kind,
          },
        });
      } catch (error) {
        recordDebugLogEvent({
          event: "provider-validation-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
            provider: nextProvider,
            target: target.kind,
          },
        });
        throw error;
      }
    },
    [language, settings],
  );

  const handleValidateWebSearchProvider = useCallback(
    async (nextProvider: WebSearchProvider) => {
      const apiKey = settings.apiKeys[nextProvider].trim();

      recordDebugLogEvent({
        event: "web-search-validation-requested",
        payload: {
          provider: nextProvider,
        },
      });

      try {
        await validateWebSearchConnection({
          provider: nextProvider,
          apiKey,
          language,
          options: settings.webSearchProviderSettings[nextProvider],
        });
        recordDebugLogEvent({
          event: "web-search-validation-succeeded",
          payload: {
            provider: nextProvider,
          },
        });
      } catch (error) {
        recordDebugLogEvent({
          event: "web-search-validation-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
            provider: nextProvider,
          },
        });
        throw error;
      }
    },
    [language, settings.apiKeys],
  );

  const {
    activeConversationTitle,
    fallbackTtsStatusLabel,
    isActive,
    lastAssistantReply,
    messages,
    metering,
    routeModelLabel,
    signalLevels,
    signalWaveformVariant,
    statusDisplay,
    statusIndicatorTone,
    sttStatusLabel,
    ttsStatusLabel,
    usageDisplay,
    visualPhase,
  } = getMainScreenViewModel({
    activeConversation,
    availableTtsProviders,
    isRecording,
    language,
    localTtsPackStates,
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
  });

  useEffect(() => {
    lastCompletedReplyRef.current = lastAssistantReply;
  }, [lastAssistantReply, lastCompletedReplyRef]);

  useEffect(() => {
    installDebugLogConsoleCapture();

    recordDebugLogEvent({
      event: "main-screen-mounted",
    });

    return () => {
      recordDebugLogEvent({
        event: "main-screen-unmounted",
      });
    };
  }, []);

  const handleToggleDebugLog = useCallback(async () => {
    if (!debugLogCaptureState.active) {
      startDebugLogCapture({
        activeConversationId: activeConversation?.id ?? null,
        inputMode: settings.inputMode,
        model,
        pipelinePhase,
        provider,
        sttMode: settings.sttMode,
        ttsMode: settings.ttsMode,
      });
      showToast(t("debugLogCaptureStarted"));
      return;
    }

    try {
      const result = await stopDebugLogCapture({
        activeConversationId: activeConversation?.id ?? null,
        inputMode: settings.inputMode,
        model,
        pipelinePhase,
        provider,
        sttMode: settings.sttMode,
        ttsMode: settings.ttsMode,
      });

      if (!result) {
        return;
      }

      const fileName =
        result.path.split("/").filter(Boolean).pop() ??
        result.sessionId ??
        "debug-log.log";

      showToast(
        result.copiedToClipboard
          ? t("debugLogCaptureStopped", {
              entryCount: result.entryCount,
              fileName,
            })
          : t("debugLogCaptureStoppedNoClipboard", {
              entryCount: result.entryCount,
              fileName,
            }),
      );
    } catch (error) {
      recordDebugLogEvent({
        event: "debug-log-stop-failed",
        level: "error",
        payload: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
      showToast(t("debugLogCaptureFailed"));
    }
  }, [
    activeConversation?.id,
    debugLogCaptureState.active,
    model,
    pipelinePhase,
    provider,
    settings.inputMode,
    settings.sttMode,
    settings.ttsMode,
    showToast,
    t,
  ]);

  useEffect(() => {
    let cancelled = false;

    void recoverPendingDebugLogCapture()
      .then((result) => {
        if (cancelled || !result) {
          return;
        }

        const fileName =
          result.path.split("/").filter(Boolean).pop() ??
          result.sessionId ??
          "recovered-debug-log.log";

        showToast(
          result.copiedToClipboard
            ? t("debugLogCaptureRecovered", {
                entryCount: result.entryCount,
                fileName,
              })
            : t("debugLogCaptureRecoveredNoClipboard", {
                entryCount: result.entryCount,
                fileName,
              }),
        );
      })
      .catch((error) => {
        recordDebugLogEvent({
          event: "debug-log-recovery-failed",
          level: "error",
          payload: {
            message: error instanceof Error ? error.message : String(error),
          },
        });
      });

    return () => {
      cancelled = true;
    };
  }, [showToast, t]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "main-screen-loaded-state-changed",
      payload: {
        loaded,
      },
    });
  }, [loaded]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "route-selection-changed",
      payload: {
        activeResponseMode,
        inputMode: settings.inputMode,
        model,
        provider,
        replyPlayback: settings.replyPlayback,
        responseLength: settings.responseLength,
        responseTone: settings.responseTone,
        spokenRepliesEnabled: settings.spokenRepliesEnabled,
        sttMode: settings.sttMode,
        sttProvider,
        ttsMode: settings.ttsMode,
        ttsProvider,
      },
    });
  }, [
    activeResponseMode,
    model,
    provider,
    settings.inputMode,
    settings.replyPlayback,
    settings.responseLength,
    settings.responseTone,
    settings.spokenRepliesEnabled,
    settings.sttMode,
    settings.ttsMode,
    sttProvider,
    ttsProvider,
  ]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "pipeline-phase-changed",
      payload: {
        pipelinePhase,
      },
    });
  }, [pipelinePhase]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "visual-phase-changed",
      payload: {
        visualPhase,
      },
    });
  }, [visualPhase]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "recording-state-changed",
      payload: {
        isRecording,
        sttMode: settings.sttMode,
      },
    });
  }, [isRecording, settings.sttMode]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "audio-playback-state-changed",
      payload: {
        activeReplayMessageId,
        isPlaying: player.isPlaying,
        replayPhase,
      },
    });
  }, [activeReplayMessageId, player.isPlaying, replayPhase]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "streaming-text-length-changed",
      payload: {
        length: streamingText.length,
      },
    });
  }, [streamingText.length]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "active-conversation-changed",
      payload: {
        conversationCount: conversations.length,
        id: activeConversation?.id ?? null,
        title: activeConversation?.title ?? null,
      },
    });
  }, [activeConversation?.id, activeConversation?.title, conversations.length]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "message-count-changed",
      payload: {
        count: messages.length,
      },
    });
  }, [messages.length]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "settings-visibility-changed",
      payload: {
        focusCatalogProviderId: settingsFocusCatalogProviderId ?? null,
        visible: settingsVisible,
      },
    });
  }, [settingsFocusCatalogProviderId, settingsVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "drawer-visibility-changed",
      payload: {
        visible: drawerVisible,
      },
    });
  }, [drawerVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "transcript-visibility-changed",
      payload: {
        visible: transcriptVisible,
      },
    });
  }, [transcriptVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "status-details-visibility-changed",
      payload: {
        visible: statusDetailsVisible,
      },
    });
  }, [statusDetailsVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "conversation-menu-visibility-changed",
      payload: {
        visible: conversationMenuVisible,
      },
    });
  }, [conversationMenuVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "memory-modal-visibility-changed",
      payload: {
        conversationId: memoryConversation?.id ?? null,
        visible: memoryVisible,
      },
    });
  }, [memoryConversation?.id, memoryVisible]);

  useEffect(() => {
    recordDebugLogEvent({
      event: "setup-guide-visibility-changed",
      payload: {
        visible: setupGuideVisible,
      },
    });
  }, [setupGuideVisible]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <LinearGradient
        colors={[
          colors.background,
          colors.backgroundSecondary,
          colors.background,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={[colors.accentSoft, "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.orb, styles.orbTop]}
        />
        <LinearGradient
          colors={[`${colors.accentWarm}55`, "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.orb, styles.orbBottom]}
        />
      </View>

      <Toast
        message={toast?.message || ""}
        visible={!!toast}
        onDismiss={() => setToast(null)}
        onRetry={toast?.onRetry}
      />

      <View
        style={[
          styles.defaultLayout,
          isLandscape ? styles.defaultLayoutLandscape : null,
        ]}
      >
        {isLandscape ? (
          <View style={styles.landscapeShell}>
            <View style={styles.landscapeLeftColumn}>
              <MainScreenTopBar
                colors={colors}
                debugLogActive={debugLogCaptureState.active}
                debugLogLabel={t("debugLogLabel")}
                onOpenDrawer={() => setDrawerVisible(true)}
                onOpenSettings={() => openSettings()}
                onToggleDebugLog={handleToggleDebugLog}
              />

              <MainScreenRouteCard
                activeResponseMode={activeResponseMode}
                availableResponseModes={loaded ? availableResponseModes : []}
                compactResponseModes
                colors={colors}
                onOpenSetupGuide={() => handleOpenSetupGuide("provider")}
                onSelectResponseMode={handleResponseModeChange}
                onToggleWebSearchEnabled={() => {
                  if (!webSearchActive && !webSearchReady) {
                    openSettings(
                      webSearchProvider ?? DEFAULT_WEB_SEARCH_PROVIDER,
                      "web",
                    );
                    return;
                  }

                  updateSettings({
                    webSearchMode: webSearchActive ? "off" : "auto",
                  });
                }}
                responseModes={settings.responseModes}
                style={styles.heroCardLandscape}
                t={t}
                webSearchEnabled={webSearchActive}
                webSearchMode={webSearchMode}
                webSearchProvider={webSearchProvider}
                webSearchReady={webSearchReady}
              />

              <View style={styles.landscapeStageArea}>
                <MainScreenVoiceStage
                  circleSize={stageCircleSize}
                  colors={colors}
                  inputMode={settings.inputMode}
                  isActive={isActive}
                  layout="landscape"
                  metering={metering}
                  onOpenStatusDetails={openStatusDetails}
                  onPress={handleTogglePress}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  providerLabel={providerLabel}
                  signalLevels={signalLevels}
                  signalWaveformVariant={signalWaveformVariant}
                  showStatusStrip={false}
                  statusDetail={statusDisplay.statusDetail}
                  statusIndicatorTone={statusIndicatorTone}
                  statusTitle={statusDisplay.actionLabel}
                  visualPhase={visualPhase}
                />
              </View>
            </View>

            <View style={styles.landscapeRightColumn}>
              <MainScreenStatusStrip
                colors={colors}
                fullWidth
                layout="landscape"
                onOpenStatusDetails={openStatusDetails}
                statusDetail={statusDisplay.statusDetail}
                statusIndicatorTone={statusIndicatorTone}
                statusTitle={statusDisplay.actionLabel}
              />

              <TranscriptPreviewCard
                colors={colors}
                layout="landscape"
                messages={messages}
                onCopyMessage={(message) => {
                  void handleCopyMessage(message.content);
                }}
                onOpenTranscript={openTranscript}
                scrollEnabled
                showUsageStats={settings.showUsageStats}
                showWhenEmpty
                style={styles.landscapeTranscriptCard}
                t={t}
              />
            </View>
          </View>
        ) : (
          <>
            <MainScreenTopBar
              colors={colors}
              debugLogActive={debugLogCaptureState.active}
              debugLogLabel={t("debugLogLabel")}
              onOpenDrawer={() => setDrawerVisible(true)}
              onOpenSettings={() => openSettings()}
              onToggleDebugLog={handleToggleDebugLog}
            />

            <ScrollView
              style={styles.defaultScroll}
              contentContainerStyle={styles.defaultLayoutContent}
              showsVerticalScrollIndicator={false}
            >
              <MainScreenRouteCard
                activeResponseMode={activeResponseMode}
                availableResponseModes={loaded ? availableResponseModes : []}
                colors={colors}
                onOpenSetupGuide={() => handleOpenSetupGuide("provider")}
                onSelectResponseMode={handleResponseModeChange}
                onToggleWebSearchEnabled={() => {
                  if (!webSearchActive && !webSearchReady) {
                    openSettings(
                      webSearchProvider ?? DEFAULT_WEB_SEARCH_PROVIDER,
                      "web",
                    );
                    return;
                  }

                  updateSettings({
                    webSearchMode: webSearchActive ? "off" : "auto",
                  });
                }}
                responseModes={settings.responseModes}
                t={t}
                webSearchEnabled={webSearchActive}
                webSearchMode={webSearchMode}
                webSearchProvider={webSearchProvider}
                webSearchReady={webSearchReady}
              />

              <MainScreenVoiceStage
                circleSize={stageCircleSize}
                colors={colors}
                inputMode={settings.inputMode}
                isActive={isActive}
                metering={metering}
                onOpenStatusDetails={openStatusDetails}
                onPress={handleTogglePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                providerLabel={providerLabel}
                signalLevels={signalLevels}
                signalWaveformVariant={signalWaveformVariant}
                statusDetail={statusDisplay.statusDetail}
                statusIndicatorTone={statusIndicatorTone}
                statusTitle={statusDisplay.actionLabel}
                visualPhase={visualPhase}
              />

              <TranscriptPreviewCard
                colors={colors}
                messages={messages}
                onCopyMessage={(message) => {
                  void handleCopyMessage(message.content);
                }}
                onOpenTranscript={openTranscript}
                showUsageStats={settings.showUsageStats}
                t={t}
              />
            </ScrollView>
          </>
        )}
      </View>

      <StatusDetailsModal
        visible={statusDetailsVisible}
        colors={colors}
        fallbackTtsStatusLabel={fallbackTtsStatusLabel}
        isActive={isActive}
        messageCountLabel={statusDisplay.messageCountLabel}
        onClose={closeStatusDetails}
        routeModelLabel={routeModelLabel}
        statusDetail={statusDisplay.statusDetail}
        statusTitle={statusDisplay.statusTitle}
        sttStatusLabel={sttStatusLabel}
        t={t}
        ttsStatusLabel={ttsStatusLabel}
      />

      <TranscriptModal
        visible={transcriptVisible}
        activeConversationTitle={activeConversationTitle}
        activeReplayMessageId={activeReplayMessageId}
        colors={colors}
        conversationMenuVisible={conversationMenuVisible}
        insets={insets}
        isActive={isActive}
        metering={metering}
        messages={messages}
        onClose={closeTranscript}
        onCloseConversationMenu={closeConversationMenu}
        onCopyMessage={(message) => {
          void handleCopyMessage(message.content);
        }}
        onCopyThread={() => {
          closeConversationMenu();
          void handleCopyThread();
        }}
        onManageMemory={() => {
          closeConversationMenu();
          void openMemory();
        }}
        onPress={handleTogglePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onRepeatMessage={(message) => {
          void handleRepeatMessage(message);
        }}
        onShareMessage={(message) => {
          void handleShareMessage(message.content);
        }}
        onShareThread={() => {
          closeConversationMenu();
          void handleShareThread();
        }}
        replayPhase={replayPhase}
        settingsShowUsageStats={settings.showUsageStats}
        signalLevels={signalLevels}
        signalWaveformVariant={signalWaveformVariant}
        t={t}
        toggleConversationMenu={toggleConversationMenu}
        usageDisplay={usageDisplay}
        visualPhase={visualPhase}
        waveformInputMode={settings.inputMode}
      />

      <SettingsModal
        visible={settingsVisible}
        settings={settings}
        focusCatalogProviderId={settingsFocusCatalogProviderId}
        focusTab={settingsFocusTab}
        onUpdate={updateSettings}
        onUpdateResponseModeRoute={updateResponseModeRoute}
        onUpdateProviderSttModel={updateProviderSttModel}
        onUpdateProviderTtsModel={updateProviderTtsModel}
        onUpdateProviderTtsVoice={updateProviderTtsVoice}
        onUpdateLocalTtsVoice={updateLocalTtsVoice}
        onUpdateApiKey={updateApiKey}
        localTtsPackStates={localTtsPackStates}
        onInstallLocalTtsLanguagePack={handleInstallLocalTtsLanguage}
        onPreviewVoice={handlePreviewVoice}
        onStopPreviewVoice={stopPreviewVoice}
        onValidateProvider={handleValidateProvider}
        onValidateWebSearchProvider={handleValidateWebSearchProvider}
        onClose={closeSettings}
      />
      <SetupGuideModal
        visible={setupGuideVisible}
        step={setupGuideStep}
        providerOptions={setupGuideProviderOptions}
        selectedProvider={setupGuideSelectedProvider}
        selectedProviderApiKey={setupGuideSelectedProviderApiKey}
        currentValidationState={setupGuideValidationState}
        resolvedRoutes={setupGuideResolvedRoutes}
        voiceTest={setupGuideVoiceTest}
        onSelectProvider={handleSelectProvider}
        onChangeProviderApiKey={handleProviderApiKeyChange}
        onDismiss={handleDismissSetupGuide}
        onBack={handleBack}
        onContinueFromIntro={handleContinueFromIntro}
        onValidateProviderKey={() => {
          void handleValidateProviderKey();
        }}
        onContinueFromProvider={handleContinueFromProvider}
        onVoiceTestAction={() => {
          void setupGuideVoiceTest.handleAction();
        }}
        onResetVoiceTest={() => {
          void setupGuideVoiceTest.reset(true);
        }}
        onContinueFromVoiceTest={handleContinueFromVoiceTest}
        onFinish={() => {
          void handleFinishSetupGuide();
        }}
        onOpenSettings={() => {
          void handleOpenSettingsFromSummary();
        }}
      />
      <ConversationMemoryModal
        visible={memoryVisible}
        title={memoryConversation?.title ?? t("freshSession")}
        summary={memoryConversation?.contextSummary}
        summarizedMessageCount={memoryConversation?.summarizedMessageCount}
        onCopy={() => {
          void handleCopyMemory();
        }}
        onClear={() => {
          void handleClearMemory();
        }}
        onClose={closeMemory}
      />
      <ConversationDrawer
        visible={drawerVisible}
        conversations={conversations}
        activeId={activeConversation?.id || null}
        onSearchConversations={searchConversations}
        onSelect={handleSelectConversation}
        onCopyThread={(id) => {
          void handleCopyThread(id);
        }}
        onShareThread={(id) => {
          runAfterDrawerDismiss(() => {
            void handleShareThread(id);
          });
        }}
        onManageMemory={(id) => {
          runAfterDrawerDismiss(() => {
            void openMemory(id);
          });
        }}
        onRenameThread={(id, title) => {
          void handleRenameThread(id, title);
        }}
        onTogglePinned={handleTogglePinned}
        onNewSession={handleStartNewSession}
        onDelete={deleteConversation}
        onClose={() => setDrawerVisible(false)}
        onDismiss={handleDrawerDismiss}
      />
    </SafeAreaView>
  );
}
