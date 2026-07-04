import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLocalization } from "../i18n";
import { Provider, TtsListenLanguage } from "../types";
import { useTheme } from "../theme/ThemeContext";

import {
  ApiKeysSection,
  ListeningSection,
  SearchSection,
  SpeakingSection,
  ThinkingSection,
} from "./settings/SettingsFlowSections";
import { SettingsOverview } from "./settings/SettingsOverview";
import { getSettingsReadiness } from "./settings/readiness";
import { SpeechDiagnosticsSection } from "./settings/shared";
import { styles } from "./settings/styles";
import { SettingsModalProps, SettingsPage } from "./settings/types";
import { UiTab } from "./settings/UiTab";
import { useProviderValidationState } from "./settings/useProviderValidationState";
import { useSettingsModalController } from "./settings/useSettingsModalController";

type DrillInSettingsPage = Exclude<SettingsPage, "overview">;

function getInitialSettingsPage(params: {
  focusProvider?: SettingsModalProps["focusProvider"];
  focusCatalogProviderId?: SettingsModalProps["focusCatalogProviderId"];
  focusTab?: SettingsModalProps["focusTab"];
}): SettingsPage {
  const { focusProvider, focusCatalogProviderId, focusTab } = params;

  if (focusProvider || focusCatalogProviderId || focusTab === "providers") {
    return "connections";
  }

  if (focusTab === "instructions") {
    return "thinking";
  }

  if (focusTab === "stt") {
    return "listening";
  }

  if (focusTab === "tts") {
    return "speaking";
  }

  if (focusTab === "web") {
    return "search";
  }

  if (focusTab === "ui") {
    return "app";
  }

  return "overview";
}

export function SettingsModal(props: SettingsModalProps) {
  const {
    visible,
    settings,
    focusProvider,
    focusCatalogProviderId,
    focusTab,
    onUpdate,
    onUpdateResponseModeRoute,
    onAddResponseMode,
    onRemoveResponseMode,
    onUpdateProviderSttModel,
    onUpdateProviderTtsModel,
    onUpdateProviderTtsVoice,
    onUpdateApiKey,
    onPreviewVoice,
    onStopPreviewVoice,
    onValidateProvider,
    onValidateWebSearchProvider,
    onClose,
  } = props;
  const { colors } = useTheme();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const modalMaxWidth = isLandscape ? Math.min(width - 24, 980) : 460;
  const [activePage, setActivePage] = React.useState<SettingsPage>(() =>
    getInitialSettingsPage({
      focusProvider,
      focusCatalogProviderId,
      focusTab,
    }),
  );
  const {
    contentScrollRef,
    providerPreviewTexts,
    setProviderPreviewText,
    nativePreviewText,
    setNativePreviewText,
    activePreview,
    keyboardInset,
    speechDiagnostics,
    modalAnimStyle,
    handleTextInputFocus,
    handlePreviewProviderVoice,
    handlePreviewNativeVoice,
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
  } = useSettingsModalController({
    visible,
    settings,
    onUpdate,
    onPreviewVoice,
    onStopPreviewVoice,
  });
  const {
    getHealthState,
    getValidationState,
    canValidateProvider,
    validateProviderForSettings,
    selectableLlmProviders,
    selectableSttProviders,
    selectableTtsProviders,
    selectableSearchProviders,
  } = useProviderValidationState({
    settings,
    onValidateProvider,
    onValidateWebSearchProvider,
  });
  const readiness = React.useMemo(
    () =>
      getSettingsReadiness(settings, {
        llmProviders: selectableLlmProviders,
        sttProviders: selectableSttProviders,
        ttsProviders: selectableTtsProviders,
        searchProviders: selectableSearchProviders,
      }),
    [
      selectableLlmProviders,
      selectableSearchProviders,
      selectableSttProviders,
      selectableTtsProviders,
      settings,
    ],
  );

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    setActivePage(
      getInitialSettingsPage({
        focusProvider,
        focusCatalogProviderId,
        focusTab,
      }),
    );
  }, [focusCatalogProviderId, focusProvider, focusTab, visible]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    requestAnimationFrame(() => {
      contentScrollRef.current?.scrollTo({ y: 0, animated: false });
    });
  }, [activePage, contentScrollRef, visible]);

  const getPageTitle = React.useCallback(
    (page: DrillInSettingsPage) => {
      switch (page) {
        case "connections":
          return t("settingsConnections");
        case "thinking":
          return t("settingsThinking");
        case "listening":
          return t("settingsListening");
        case "speaking":
          return t("settingsSpeaking");
        case "search":
          return t("settingsSearch");
        case "app":
          return t("settingsAppDiagnostics");
      }
    },
    [t],
  );

  const getPageSummary = React.useCallback(
    (page: DrillInSettingsPage) => {
      switch (page) {
        case "connections":
          return t("settingsConnectionsSummary");
        case "thinking":
          return t("settingsThinkingSummary");
        case "listening":
          return t("settingsListeningSummary");
        case "speaking":
          return t("settingsSpeakingSummary");
        case "search":
          return t("settingsSearchSummary");
        case "app":
          return t("settingsAppDiagnosticsSummary");
      }
    },
    [t],
  );

  const renderDrillInPage = React.useCallback(
    (page: DrillInSettingsPage, children: React.ReactNode) => (
      <View style={styles.tabPane}>
        <View style={styles.drillInHeader}>
          <TouchableOpacity
            style={[
              styles.drillInBackButton,
              { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
            ]}
            activeOpacity={0.85}
            onPress={() => setActivePage("overview")}
          >
            <Feather name="chevron-left" size={16} color={colors.accent} />
            <Text style={[styles.tabButtonText, { color: colors.accent }]}>
              {t("settingsBackToOverview")}
            </Text>
          </TouchableOpacity>
          <View style={styles.drillInTitleBlock}>
            <Text style={[styles.drillInTitle, { color: colors.text }]}>
              {getPageTitle(page)}
            </Text>
            <Text style={[styles.drillInSummary, { color: colors.textMuted }]}>
              {getPageSummary(page)}
            </Text>
          </View>
        </View>
        {children}
      </View>
    ),
    [colors, getPageSummary, getPageTitle, t],
  );

  const activeContent = (() => {
    switch (activePage) {
      case "overview":
        return (
          <SettingsOverview
            readiness={readiness}
            onOpenPage={(page) => setActivePage(page)}
          />
        );
      case "connections":
        return renderDrillInPage(
          "connections",
          <ApiKeysSection
            settings={settings}
            focusProvider={focusProvider}
            focusCatalogProviderId={focusCatalogProviderId}
            getProviderHealthState={getHealthState}
            getProviderValidationState={getValidationState}
            canValidateProvider={canValidateProvider}
            onValidateProvider={validateProviderForSettings}
            onUpdateApiKey={onUpdateApiKey}
            onTextInputFocus={handleTextInputFocus}
          />,
        );
      case "thinking":
        return renderDrillInPage(
          "thinking",
          <ThinkingSection
            settings={settings}
            llmProviders={selectableLlmProviders}
            onUpdate={onUpdate}
            onUpdateResponseModeRoute={onUpdateResponseModeRoute}
            onAddResponseMode={onAddResponseMode}
            onRemoveResponseMode={onRemoveResponseMode}
          />,
        );
      case "listening":
        return renderDrillInPage(
          "listening",
          <ListeningSection
            settings={settings}
            selectableSttProviders={selectableSttProviders}
            selectedSttProviderModelOptions={selectedSttProviderModelOptions}
            selectedSttProviderModel={selectedSttProviderModel}
            sttLanguageNote={sttLanguageNote}
            sttLimitNote={sttLimitNote}
            onUpdate={onUpdate}
            onUpdateProviderSttModel={onUpdateProviderSttModel}
          />,
        );
      case "speaking":
        return renderDrillInPage(
          "speaking",
          <SpeakingSection
            settings={settings}
            selectableTtsProviders={selectableTtsProviders}
            ttsLanguageNote={ttsLanguageNote}
            selectedPreviewProvider={selectedPreviewProvider}
            selectedPreviewProviderModelOptions={
              selectedPreviewProviderModelOptions
            }
            selectedPreviewProviderModel={selectedPreviewProviderModel}
            providerPreviewTexts={providerPreviewTexts}
            activePreview={activePreview}
            nativeVoiceOptions={nativeVoiceOptions}
            selectedNativeVoice={selectedNativeVoice}
            nativePreviewText={nativePreviewText}
            onUpdate={onUpdate}
            onUpdateProviderTtsModel={onUpdateProviderTtsModel}
            onUpdateProviderTtsVoice={onUpdateProviderTtsVoice}
            onStopPreviewVoice={onStopPreviewVoice}
            onSetProviderPreviewText={(
              provider: Provider,
              language: TtsListenLanguage,
              text: string,
            ) => setProviderPreviewText(provider, language, text)}
            onSetNativePreviewText={setNativePreviewText}
            onPreviewProviderVoice={handlePreviewProviderVoice}
            onPreviewNativeVoice={handlePreviewNativeVoice}
            onSelectNativeVoice={setSelectedNativeVoice}
            onTextInputFocus={handleTextInputFocus}
            onToggleListenLanguage={toggleListenLanguage}
          />,
        );
      case "app":
        return renderDrillInPage(
          "app",
          <>
            <UiTab settings={settings} onUpdate={onUpdate} />
            <SpeechDiagnosticsSection summaries={speechDiagnostics} />
          </>,
        );
      case "search":
        return renderDrillInPage(
          "search",
          <SearchSection
            settings={settings}
            searchProviders={selectableSearchProviders}
            onUpdate={onUpdate}
          />,
        );
    }
  })();

  return (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={[
          styles.overlay,
          {
            paddingTop: Math.max(insets.top + 10, 24),
            paddingBottom: 0,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              maxWidth: modalMaxWidth,
              shadowColor: colors.glow,
            },
            modalAnimStyle,
          ]}
        >
          <LinearGradient
            colors={[colors.accentSoft, "rgba(255, 255, 255, 0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGlow}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <View style={styles.headerCopy}>
              <Text style={[styles.title, { color: colors.text }]}>
                {t("settings")}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={onClose}
            >
              <Feather name="x" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={contentScrollRef}
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.content,
              isLandscape ? styles.contentLandscape : null,
              { paddingBottom: Math.max(20, keyboardInset + 20) },
            ]}
            scrollIndicatorInsets={{ bottom: keyboardInset }}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            nestedScrollEnabled
          >
            {activeContent}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
