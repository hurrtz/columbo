import React, { useMemo, useRef, useState } from "react";
import { Platform, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PROVIDER_DEFAULT_TTS_MODELS,
  getNativeSttLanguageNote,
  getNativeTtsLanguageNote,
  getProviderSttLimitNote,
  getProviderSttLanguageNoteForModel,
  getProviderSttModelOptions,
  getProviderTtsLanguageNoteForModel,
  getProviderTtsModelOptions,
} from "../../constants/models";
import { useSpeechDiagnostics } from "../../hooks/useSpeechDiagnostics";
import { useLocalization } from "../../i18n";
import { TtsListenLanguage } from "../../types";
import {
  getEnabledProviders,
  getEnabledSttProviders,
  getEnabledTtsProviders,
} from "../../utils/providerCapabilities";

import {
  SettingsFlowTab,
  SettingsModalProps,
  SettingsTab,
  TextInputFocusHandler,
} from "./types";
import { useNativeVoiceOptions } from "./useNativeVoiceOptions";
import { usePreviewTextState } from "./usePreviewTextState";
import { useSettingsKeyboardInset } from "./useSettingsKeyboardInset";
import { useSettingsModalAnimation } from "./useSettingsModalAnimation";
import { useSettingsNormalization } from "./useSettingsNormalization";
import { useVoicePreviewState } from "./useVoicePreviewState";

function getInitialSettingsFlowTab(params: {
  focusProvider?: SettingsModalProps["focusProvider"];
  focusCatalogProviderId?: SettingsModalProps["focusCatalogProviderId"];
  focusTab?: SettingsTab;
}): SettingsFlowTab {
  const { focusProvider, focusCatalogProviderId, focusTab } = params;

  if (focusTab === "ui") {
    return "app";
  }

  if (focusTab === "stt" || focusTab === "tts") {
    return "voice";
  }

  if (focusTab === "instructions" || focusTab === "web") {
    return "ai";
  }

  if (focusTab === "providers" || focusProvider || focusCatalogProviderId) {
    return "keys";
  }

  return "keys";
}

export function useSettingsModalController({
  visible,
  focusProvider,
  focusCatalogProviderId,
  focusTab,
  settings,
  onUpdate,
  onPreviewVoice,
  onStopPreviewVoice,
}: Pick<
  SettingsModalProps,
  | "visible"
  | "focusProvider"
  | "focusCatalogProviderId"
  | "focusTab"
  | "settings"
  | "onUpdate"
  | "onPreviewVoice"
  | "onStopPreviewVoice"
>) {
  const { t, language } = useLocalization();
  const insets = useSafeAreaInsets();
  const contentScrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState<SettingsFlowTab>(() =>
    getInitialSettingsFlowTab({
      focusProvider,
      focusCatalogProviderId,
      focusTab,
    }),
  );
  const speechDiagnostics = useSpeechDiagnostics(6);
  const {
    providerPreviewTexts,
    nativePreviewText,
    setProviderPreviewText,
    setNativePreviewText,
  } = usePreviewTextState({
    settings,
    language,
  });

  const enabledProviders = useMemo(() => getEnabledProviders(settings), [settings]);
  const enabledSttProviders = useMemo(
    () => getEnabledSttProviders(settings),
    [settings],
  );
  const enabledTtsProviders = useMemo(
    () => getEnabledTtsProviders(settings),
    [settings],
  );
  const modalAnimStyle = useSettingsModalAnimation(visible);
  const keyboardInset = useSettingsKeyboardInset({
    visible,
    bottomInset: insets.bottom,
  });
  const {
    nativeVoiceOptions,
    selectedNativeVoice,
    setSelectedNativeVoice,
  } = useNativeVoiceOptions({
    visible,
    shouldLoad: activeTab === "voice",
    language,
  });

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    setActiveTab(
      getInitialSettingsFlowTab({
        focusProvider,
        focusCatalogProviderId,
        focusTab,
      }),
    );
  }, [focusCatalogProviderId, focusProvider, focusTab, visible]);
  useSettingsNormalization({
    visible,
    settings,
    enabledProviders,
    enabledSttProviders,
    enabledTtsProviders,
    language,
    onUpdate,
  });

  const handleTextInputFocus = React.useCallback<TextInputFocusHandler>(
    (event) => {
      const target = Number(event.target);
      const scrollResponder = (
        contentScrollRef.current as ScrollView & {
          getScrollResponder?: () => {
            scrollResponderScrollNativeHandleToKeyboard?: (
              nodeHandle: number,
              additionalOffset?: number,
              preventNegativeScrollOffset?: boolean,
            ) => void;
          };
        }
      ).getScrollResponder?.();

      if (
        !target ||
        !scrollResponder?.scrollResponderScrollNativeHandleToKeyboard
      ) {
        return;
      }

      setTimeout(
        () => {
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard?.(
            target,
            96,
            true,
          );
        },
        Platform.OS === "ios" ? 80 : 40,
      );
    },
    [],
  );
  const {
    activePreview,
    handlePreviewProviderVoice,
    handlePreviewNativeVoice,
  } = useVoicePreviewState({
    visible,
    settings,
    language,
    providerPreviewTexts,
    nativePreviewText,
    selectedNativeVoice,
    onPreviewVoice,
    onStopPreviewVoice,
  });

  const providerPickerDisabled =
    settings.sttMode !== "provider" || enabledSttProviders.length === 0;
  const ttsProviderPickerDisabled =
    settings.ttsMode === "native" || enabledTtsProviders.length === 0;
  const selectedSttProviderModelOptions =
    settings.sttProvider &&
    enabledSttProviders.includes(settings.sttProvider)
      ? getProviderSttModelOptions(settings.sttProvider)
      : [];
  const selectedSttProviderModel =
    settings.sttProvider &&
    enabledSttProviders.includes(settings.sttProvider)
      ? settings.providerSttModels[settings.sttProvider] ||
        selectedSttProviderModelOptions[0]?.id ||
        ""
      : "";
  const sttLanguageNote =
    settings.sttMode === "native"
      ? getNativeSttLanguageNote(language)
      : settings.sttProvider && selectedSttProviderModel
        ? getProviderSttLanguageNoteForModel(
            settings.sttProvider,
            selectedSttProviderModel,
            language,
          )
        : null;
  const sttLimitNote =
    settings.sttMode === "provider" &&
    settings.sttProvider &&
    selectedSttProviderModel
      ? getProviderSttLimitNote(
          settings.sttProvider,
          selectedSttProviderModel,
          language,
        )
      : null;
  const selectedPreviewProvider =
    settings.ttsProvider && enabledTtsProviders.includes(settings.ttsProvider)
      ? settings.ttsProvider
      : null;
  const selectedPreviewProviderModelOptions = selectedPreviewProvider
    ? getProviderTtsModelOptions(selectedPreviewProvider)
    : [];
  const selectedPreviewProviderModel =
    selectedPreviewProvider
      ? settings.providerTtsModels[selectedPreviewProvider] ||
        PROVIDER_DEFAULT_TTS_MODELS[selectedPreviewProvider] ||
        selectedPreviewProviderModelOptions[0]?.id ||
        ""
      : "";
  const ttsLanguageNote =
    settings.ttsMode === "native"
      ? getNativeTtsLanguageNote(language)
      : selectedPreviewProvider && selectedPreviewProviderModel
        ? getProviderTtsLanguageNoteForModel(
            selectedPreviewProvider,
            selectedPreviewProviderModel,
            language,
          )
        : null;
  const toggleListenLanguage = (value: TtsListenLanguage) => {
    const exists = settings.ttsListenLanguages.includes(value);

    if (exists && settings.ttsListenLanguages.length === 1) {
      return;
    }

    onUpdate({
      ttsListenLanguages: exists
        ? settings.ttsListenLanguages.filter((entry) => entry !== value)
        : [...settings.ttsListenLanguages, value],
    });
  };

  return {
    activeTab,
    setActiveTab,
    contentScrollRef,
    providerPreviewTexts,
    setProviderPreviewText,
    nativePreviewText,
    setNativePreviewText,
    activePreview,
    keyboardInset,
    speechDiagnostics,
    enabledProviders,
    enabledSttProviders,
    enabledTtsProviders,
    modalAnimStyle,
    handleTextInputFocus,
    handlePreviewProviderVoice,
    handlePreviewNativeVoice,
    providerPickerDisabled,
    ttsProviderPickerDisabled,
    selectedSttProviderModelOptions,
    selectedSttProviderModel,
    sttLanguageNote,
    sttLimitNote,
    ttsLanguageNote,
    selectedPreviewProvider,
    selectedPreviewProviderModelOptions,
    selectedPreviewProviderModel,
    nativeVoiceOptions,
    selectedNativeVoice,
    setSelectedNativeVoice,
    toggleListenLanguage,
  };
}
