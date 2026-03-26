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
  AiModelsSection,
  ApiKeysSection,
  VoiceSection,
} from "./settings/SettingsFlowSections";
import { styles } from "./settings/styles";
import { SettingsFlowTab, SettingsModalProps } from "./settings/types";
import { UiTab } from "./settings/UiTab";
import { useProviderValidationState } from "./settings/useProviderValidationState";
import { useSettingsModalController } from "./settings/useSettingsModalController";

export function SettingsModal(props: SettingsModalProps) {
  const {
    visible,
    settings,
    focusProvider,
    focusCatalogProviderId,
    focusTab,
    onUpdate,
    onUpdateResponseModeRoute,
    onUpdateProviderSttModel,
    onUpdateProviderTtsModel,
    onUpdateProviderTtsVoice,
    onUpdateLocalTtsVoice,
    onUpdateApiKey,
    localTtsPackStates,
    onInstallLocalTtsLanguagePack,
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
  const {
    activeTab,
    setActiveTab,
    contentScrollRef,
    providerPreviewTexts,
    setProviderPreviewText,
    localPreviewTexts,
    setLocalPreviewText,
    nativePreviewText,
    setNativePreviewText,
    activePreview,
    keyboardInset,
    speechDiagnostics,
    modalAnimStyle,
    handleTextInputFocus,
    handlePreviewLocalVoice,
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
    focusProvider,
    focusCatalogProviderId,
    focusTab,
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
  const tabOrder: SettingsFlowTab[] = ["keys", "ai", "voice", "app"];

  const getSectionLabel = React.useCallback(
    (section: SettingsFlowTab) => {
      switch (section) {
        case "keys":
          return t("settingsSectionApiKeys");
        case "ai":
          return t("settingsSectionAiModels");
        case "voice":
          return t("settingsSectionVoice");
        case "app":
          return t("settingsSectionApp");
      }
    },
    [t],
  );

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    requestAnimationFrame(() => {
      contentScrollRef.current?.scrollTo({ y: 0, animated: false });
    });
  }, [activeTab, contentScrollRef, visible]);

  const activeContent = (() => {
    switch (activeTab) {
      case "keys":
        return (
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
          />
        );
      case "ai":
        return (
          <AiModelsSection
            settings={settings}
            llmProviders={selectableLlmProviders}
            searchProviders={selectableSearchProviders}
            onUpdate={onUpdate}
            onUpdateResponseModeRoute={onUpdateResponseModeRoute}
          />
        );
      case "voice":
        return (
          <VoiceSection
            settings={settings}
            selectableSttProviders={selectableSttProviders}
            selectableTtsProviders={selectableTtsProviders}
            selectedSttProviderModelOptions={selectedSttProviderModelOptions}
            selectedSttProviderModel={selectedSttProviderModel}
            sttLanguageNote={sttLanguageNote}
            sttLimitNote={sttLimitNote}
            ttsLanguageNote={ttsLanguageNote}
            selectedPreviewProvider={selectedPreviewProvider}
            selectedPreviewProviderModelOptions={
              selectedPreviewProviderModelOptions
            }
            selectedPreviewProviderModel={selectedPreviewProviderModel}
            providerPreviewTexts={providerPreviewTexts}
            localPreviewTexts={localPreviewTexts}
            activePreview={activePreview}
            localTtsPackStates={localTtsPackStates}
            nativeVoiceOptions={nativeVoiceOptions}
            selectedNativeVoice={selectedNativeVoice}
            nativePreviewText={nativePreviewText}
            speechDiagnostics={speechDiagnostics}
            onUpdate={onUpdate}
            onUpdateProviderSttModel={onUpdateProviderSttModel}
            onUpdateProviderTtsModel={onUpdateProviderTtsModel}
            onUpdateProviderTtsVoice={onUpdateProviderTtsVoice}
            onUpdateLocalTtsVoice={onUpdateLocalTtsVoice}
            onInstallLocalTtsLanguagePack={onInstallLocalTtsLanguagePack}
            onStopPreviewVoice={onStopPreviewVoice}
            onSetProviderPreviewText={(
              provider: Provider,
              language: TtsListenLanguage,
              text: string,
            ) => setProviderPreviewText(provider, language, text)}
            onSetLocalPreviewText={setLocalPreviewText}
            onSetNativePreviewText={setNativePreviewText}
            onPreviewProviderVoice={handlePreviewProviderVoice}
            onPreviewLocalVoice={handlePreviewLocalVoice}
            onPreviewNativeVoice={handlePreviewNativeVoice}
            onSelectNativeVoice={setSelectedNativeVoice}
            onTextInputFocus={handleTextInputFocus}
            onToggleListenLanguage={toggleListenLanguage}
          />
        );
      case "app":
        return <UiTab settings={settings} onUpdate={onUpdate} />;
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

          {isLandscape ? (
            <View style={styles.landscapeBody}>
              <View
                style={[
                  styles.landscapeTabRail,
                  { borderRightColor: colors.border },
                ]}
              >
                <ScrollView
                  style={styles.landscapeTabScroll}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.landscapeTabRow}
                  contentInsetAdjustmentBehavior="never"
                >
                  {tabOrder.map((section) => {
                    const active = activeTab === section;

                    return (
                      <TouchableOpacity
                        key={section}
                        style={[
                          styles.tabButton,
                          styles.landscapeTabButton,
                          {
                            backgroundColor: active
                              ? colors.accentSoft
                              : colors.surface,
                            borderColor: active ? colors.accent : colors.border,
                          },
                        ]}
                        onPress={() => setActiveTab(section)}
                        activeOpacity={0.85}
                      >
                        <Text
                          style={[
                            styles.tabButtonText,
                            {
                              color: active
                                ? colors.accent
                                : colors.textSecondary,
                            },
                          ]}
                        >
                          {getSectionLabel(section)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <ScrollView
                ref={contentScrollRef}
                style={styles.contentScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.content,
                  styles.contentLandscape,
                  { paddingBottom: Math.max(20, keyboardInset + 20) },
                ]}
                scrollIndicatorInsets={{ bottom: keyboardInset }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                nestedScrollEnabled
              >
                {activeContent}
              </ScrollView>
            </View>
          ) : (
            <>
              <ScrollView
                horizontal
                style={styles.tabScroll}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabRow}
                contentInsetAdjustmentBehavior="never"
              >
                {tabOrder.map((section) => {
                  const active = activeTab === section;

                  return (
                    <TouchableOpacity
                      key={section}
                      style={[
                        styles.tabButton,
                        {
                          backgroundColor: active
                            ? colors.accentSoft
                            : colors.surface,
                          borderColor: active ? colors.accent : colors.border,
                        },
                      ]}
                      onPress={() => setActiveTab(section)}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          styles.tabButtonText,
                          {
                            color: active
                              ? colors.accent
                              : colors.textSecondary,
                          },
                        ]}
                      >
                        {getSectionLabel(section)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <ScrollView
                ref={contentScrollRef}
                style={styles.contentScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.content,
                  { paddingBottom: Math.max(20, keyboardInset + 20) },
                ]}
                scrollIndicatorInsets={{ bottom: keyboardInset }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                nestedScrollEnabled
              >
                {activeContent}
              </ScrollView>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
