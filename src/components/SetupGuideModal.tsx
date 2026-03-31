import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Picker } from "./Picker";
import {
  PROVIDER_API_KEY_HINTS,
  PROVIDER_API_KEY_PLACEHOLDERS,
  PROVIDER_LABELS,
} from "../constants/models";
import { useLocalization } from "../i18n";
import { useTheme } from "../theme/ThemeContext";
import { fonts } from "../theme/typography";
import type { Provider } from "../types";
import type { SetupGuideProviderOption, SetupGuideResolvedRoutes, SetupGuideStep, SetupGuideValidationState } from "../screens/main/setupGuideSupport";
import type { SetupGuideVoiceTestPhase } from "../screens/main/useSetupGuideVoiceTest";

interface SetupGuideModalProps {
  visible: boolean;
  step: SetupGuideStep;
  providerOptions: SetupGuideProviderOption[];
  selectedProvider: Provider;
  selectedProviderApiKey: string;
  currentValidationState: SetupGuideValidationState;
  resolvedRoutes: SetupGuideResolvedRoutes;
  voiceTest: {
    phase: SetupGuideVoiceTestPhase;
    transcript: string;
    reply: string;
    errorMessage: string | null;
    isRecording: boolean;
    isBusy: boolean;
    hasCompleted: boolean;
  };
  onSelectProvider: (provider: Provider) => void;
  onChangeProviderApiKey: (value: string) => void;
  onDismiss: () => void;
  onBack: () => void;
  onContinueFromIntro: () => void;
  onValidateProviderKey: () => void;
  onContinueFromProvider: () => void;
  onVoiceTestAction: () => void;
  onResetVoiceTest: () => void;
  onContinueFromVoiceTest: () => void;
  onFinish: () => void;
  onOpenSettings: () => void;
}

const STEP_ORDER: SetupGuideStep[] = ["intro", "provider", "voice-test", "summary"];

function RouteRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.routeRow,
        {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.routeLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.routeValue,
          { color: muted ? colors.textMuted : colors.text },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function getSttRouteCopy(
  t: ReturnType<typeof useLocalization>["t"],
  routes: SetupGuideResolvedRoutes,
) {
  if (routes.stt.kind === "on-device") {
    return t("setupGuideRouteOnDeviceStt");
  }

  if (routes.stt.kind === "provider") {
    return t("setupGuideRouteProviderStt", {
      provider: PROVIDER_LABELS[routes.stt.provider],
    });
  }

  return t("setupGuideRouteUnavailable");
}

function getTtsRouteCopy(
  t: ReturnType<typeof useLocalization>["t"],
  routes: SetupGuideResolvedRoutes,
) {
  if (routes.tts.kind === "provider") {
    return t("setupGuideRouteProviderTts", {
      provider: PROVIDER_LABELS[routes.tts.provider],
    });
  }

  if (routes.tts.kind === "local") {
    return t("setupGuideRouteLocalTts");
  }

  return t("setupGuideRouteOff");
}

function getVoiceTestActionLabel(
  t: ReturnType<typeof useLocalization>["t"],
  phase: SetupGuideVoiceTestPhase,
) {
  switch (phase) {
    case "recording":
      return t("setupGuideVoiceTestStop");
    case "transcribing":
      return t("setupGuideVoiceTestTranscribing");
    case "thinking":
      return t("setupGuideVoiceTestThinking");
    case "synthesizing":
      return t("setupGuideVoiceTestSynthesizing");
    case "speaking":
      return t("setupGuideVoiceTestSpeaking");
    case "error":
    case "success":
      return t("setupGuideVoiceTestRetry");
    case "idle":
    default:
      return t("setupGuideVoiceTestStart");
  }
}

export function SetupGuideModal({
  visible,
  step,
  providerOptions,
  selectedProvider,
  selectedProviderApiKey,
  currentValidationState,
  resolvedRoutes,
  voiceTest,
  onSelectProvider,
  onChangeProviderApiKey,
  onDismiss,
  onBack,
  onContinueFromIntro,
  onValidateProviderKey,
  onContinueFromProvider,
  onVoiceTestAction,
  onResetVoiceTest,
  onContinueFromVoiceTest,
  onFinish,
  onOpenSettings,
}: SetupGuideModalProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const cardMaxWidth = isLandscape ? Math.min(width - 40, 760) : 460;
  const stepIndex = STEP_ORDER.indexOf(step);
  const providerHint = PROVIDER_API_KEY_HINTS[selectedProvider];
  const providerPlaceholder =
    PROVIDER_API_KEY_PLACEHOLDERS[selectedProvider] || t("setupGuideApiKeyPlaceholder");
  const canValidateProvider = selectedProviderApiKey.trim().length > 0;
  const canContinueFromProvider = currentValidationState.status === "success";
  const canContinueFromVoiceTest =
    !resolvedRoutes.stt.enabled || voiceTest.hasCompleted;

  const summaryRows = [
    {
      label: t("setupGuideSummaryLlm"),
      value: t("setupGuideRouteProviderLlm", {
        provider: PROVIDER_LABELS[resolvedRoutes.llm.provider],
      }),
      muted: false,
    },
    {
      label: t("setupGuideSummaryStt"),
      value: getSttRouteCopy(t, resolvedRoutes),
      muted: !resolvedRoutes.stt.enabled,
    },
    {
      label: t("setupGuideSummaryTts"),
      value: getTtsRouteCopy(t, resolvedRoutes),
      muted: !resolvedRoutes.tts.enabled,
    },
    {
      label: t("setupGuideSummaryWebSearch"),
      value: resolvedRoutes.webSearch.available
        ? t("setupGuideWebSearchAvailableOff", {
            provider: PROVIDER_LABELS[resolvedRoutes.webSearch.provider!],
          })
        : t("setupGuideRouteUnavailable"),
      muted: !resolvedRoutes.webSearch.available,
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={[
          styles.overlay,
          {
            paddingTop: Math.max(insets.top + 24, 36),
            paddingBottom: Math.max(insets.bottom + 24, 36),
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
          activeOpacity={1}
          onPress={onDismiss}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoider}
        >
          <View
            style={[
              styles.card,
              { maxWidth: cardMaxWidth },
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.glow,
              },
            ]}
          >
            <LinearGradient
              colors={[colors.accentSoft, "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glow}
            />

            <View style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={[styles.eyebrow, { color: colors.accent }]}>
                  {t("firstRun")}
                </Text>
                <Text style={[styles.title, { color: colors.text }]}>
                  {step === "intro"
                    ? t("setupGuideIntroTitle")
                    : step === "provider"
                      ? t("setupGuideProviderTitle")
                      : step === "voice-test"
                        ? t("setupGuideVoiceTestTitle")
                        : t("setupGuideSummaryTitle")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onDismiss}
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                  },
                ]}
                activeOpacity={0.85}
              >
                <Feather name="x" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.progressRow}>
              {STEP_ORDER.map((entry, index) => {
                const active = index === stepIndex;
                const complete = index < stepIndex;

                return (
                  <View
                    key={entry}
                    style={[
                      styles.progressDot,
                      {
                        backgroundColor: active || complete
                          ? colors.accent
                          : colors.surfaceElevated,
                        borderColor: active
                          ? colors.accent
                          : complete
                            ? colors.borderStrong
                            : colors.border,
                        opacity: active || complete ? 1 : 0.7,
                      },
                    ]}
                  />
                );
              })}
            </View>

            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {step === "intro" ? (
                <>
                  <Text style={[styles.body, { color: colors.textSecondary }]}>
                    {t("setupGuideIntroBody")}
                  </Text>
                  <Text style={[styles.note, { color: colors.textMuted }]}>
                    {t("setupGuideIntroNote")}
                  </Text>
                </>
              ) : null}

              {step === "provider" ? (
                <>
                  <Text style={[styles.body, { color: colors.textSecondary }]}>
                    {t("setupGuideProviderBody")}
                  </Text>
                  <Picker
                    label={t("provider")}
                    value={selectedProvider}
                    options={providerOptions}
                    onChange={(value) => onSelectProvider(value as Provider)}
                    dropdownLabel={t("setupGuideProviderPickerLabel")}
                    containerStyle={styles.providerPicker}
                  />
                  <View style={styles.inputSection}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      {t("setupGuideApiKeyLabel")}
                    </Text>
                    <TextInput
                      value={selectedProviderApiKey}
                      onChangeText={onChangeProviderApiKey}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder={providerPlaceholder}
                      placeholderTextColor={colors.textMuted}
                      style={[
                        styles.input,
                        {
                          backgroundColor: colors.surfaceElevated,
                          borderColor: colors.border,
                          color: colors.text,
                        },
                      ]}
                    />
                    <Text style={[styles.helperText, { color: colors.textMuted }]}>
                      {providerHint}
                    </Text>
                  </View>
                  {currentValidationState.message ? (
                    <View
                      style={[
                        styles.statusCard,
                        {
                          backgroundColor:
                            currentValidationState.status === "success"
                              ? colors.accentSoft
                              : colors.surfaceElevated,
                          borderColor:
                            currentValidationState.status === "error"
                              ? colors.borderStrong
                              : colors.border,
                        },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: colors.text }]}>
                        {currentValidationState.message}
                      </Text>
                    </View>
                  ) : null}
                </>
              ) : null}

              {step === "voice-test" ? (
                <>
                  <Text style={[styles.body, { color: colors.textSecondary }]}>
                    {resolvedRoutes.stt.enabled
                      ? t("setupGuideVoiceTestBody")
                      : t("setupGuideVoiceTestNoInputBody")}
                  </Text>
                  <View style={styles.summaryStack}>
                    <RouteRow
                      label={t("setupGuideSummaryStt")}
                      value={getSttRouteCopy(t, resolvedRoutes)}
                      muted={!resolvedRoutes.stt.enabled}
                    />
                    <RouteRow
                      label={t("setupGuideSummaryTts")}
                      value={getTtsRouteCopy(t, resolvedRoutes)}
                      muted={!resolvedRoutes.tts.enabled}
                    />
                  </View>
                  {resolvedRoutes.stt.enabled ? (
                    <>
                      {!resolvedRoutes.tts.enabled ? (
                        <Text style={[styles.note, { color: colors.textMuted }]}>
                          {t("setupGuideVoiceTestTextOnlyNote")}
                        </Text>
                      ) : null}
                      {voiceTest.transcript ? (
                        <View
                          style={[
                            styles.resultCard,
                            {
                              backgroundColor: colors.surfaceElevated,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Text
                            style={[styles.resultLabel, { color: colors.textSecondary }]}
                          >
                            {t("setupGuideVoiceTestTranscript")}
                          </Text>
                          <Text style={[styles.resultText, { color: colors.text }]}>
                            {voiceTest.transcript}
                          </Text>
                        </View>
                      ) : null}
                      {voiceTest.reply ? (
                        <View
                          style={[
                            styles.resultCard,
                            {
                              backgroundColor: colors.surfaceElevated,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Text
                            style={[styles.resultLabel, { color: colors.textSecondary }]}
                          >
                            {t("setupGuideVoiceTestReply")}
                          </Text>
                          <Text style={[styles.resultText, { color: colors.text }]}>
                            {voiceTest.reply}
                          </Text>
                        </View>
                      ) : null}
                      {voiceTest.errorMessage ? (
                        <View
                          style={[
                            styles.statusCard,
                            {
                              backgroundColor: colors.surfaceElevated,
                              borderColor: colors.borderStrong,
                            },
                          ]}
                        >
                          <Text style={[styles.statusText, { color: colors.text }]}>
                            {voiceTest.errorMessage}
                          </Text>
                        </View>
                      ) : null}
                      {(voiceTest.phase === "success" || voiceTest.phase === "error") ? (
                        <TouchableOpacity
                          onPress={onResetVoiceTest}
                          activeOpacity={0.8}
                          style={styles.inlineLink}
                        >
                          <Text style={[styles.inlineLinkText, { color: colors.accent }]}>
                            {t("setupGuideVoiceTestReset")}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}

              {step === "summary" ? (
                <>
                  <Text style={[styles.body, { color: colors.textSecondary }]}>
                    {t("setupGuideSummaryBody")}
                  </Text>
                  <View style={styles.summaryStack}>
                    {summaryRows.map((row) => (
                      <RouteRow
                        key={row.label}
                        label={row.label}
                        value={row.value}
                        muted={row.muted}
                      />
                    ))}
                  </View>
                  {!resolvedRoutes.tts.enabled ? (
                    <Text style={[styles.note, { color: colors.textMuted }]}>
                      {t("setupGuideSummaryTextOnlyNote")}
                    </Text>
                  ) : null}
                </>
              ) : null}
            </ScrollView>

            <View style={styles.footer}>
              {step === "intro" ? (
                <>
                  <TouchableOpacity
                    onPress={onDismiss}
                    style={[
                      styles.secondaryButton,
                      {
                        backgroundColor: colors.surfaceElevated,
                        borderColor: colors.border,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[styles.secondaryButtonText, { color: colors.textSecondary }]}
                    >
                      {t("notNow")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9} onPress={onContinueFromIntro}>
                    <LinearGradient
                      colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.primaryButton}
                    >
                      <Text style={styles.primaryButtonText}>
                        {t("setupGuideContinue")}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : null}

              {step === "provider" ? (
                <>
                  <TouchableOpacity
                    onPress={onBack}
                    style={[
                      styles.secondaryButton,
                      {
                        backgroundColor: colors.surfaceElevated,
                        borderColor: colors.border,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[styles.secondaryButtonText, { color: colors.textSecondary }]}
                    >
                      {t("setupGuideBack")}
                    </Text>
                  </TouchableOpacity>
                  {canContinueFromProvider ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onContinueFromProvider}
                    >
                      <LinearGradient
                        colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.primaryButton}
                      >
                        <Text style={styles.primaryButtonText}>
                          {t("setupGuideContinue")}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      disabled={!canValidateProvider || currentValidationState.status === "validating"}
                      onPress={onValidateProviderKey}
                    >
                      <LinearGradient
                        colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                          styles.primaryButton,
                          !canValidateProvider || currentValidationState.status === "validating"
                            ? styles.primaryButtonDisabled
                            : null,
                        ]}
                      >
                        <Text style={styles.primaryButtonText}>
                          {currentValidationState.status === "validating"
                            ? t("validatingKey")
                            : t("setupGuideValidateKey")}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </>
              ) : null}

              {step === "voice-test" ? (
                <>
                  <TouchableOpacity
                    onPress={onBack}
                    style={[
                      styles.secondaryButton,
                      {
                        backgroundColor: colors.surfaceElevated,
                        borderColor: colors.border,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[styles.secondaryButtonText, { color: colors.textSecondary }]}
                    >
                      {t("setupGuideBack")}
                    </Text>
                  </TouchableOpacity>
                  {canContinueFromVoiceTest ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onContinueFromVoiceTest}
                    >
                      <LinearGradient
                        colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.primaryButton}
                      >
                        <Text style={styles.primaryButtonText}>
                          {t("setupGuideContinue")}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      disabled={voiceTest.isBusy}
                      onPress={onVoiceTestAction}
                    >
                      <LinearGradient
                        colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                          styles.primaryButton,
                          voiceTest.isBusy ? styles.primaryButtonDisabled : null,
                        ]}
                      >
                        <Text style={styles.primaryButtonText}>
                          {getVoiceTestActionLabel(t, voiceTest.phase)}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </>
              ) : null}

              {step === "summary" ? (
                <>
                  <TouchableOpacity
                    onPress={onOpenSettings}
                    style={[
                      styles.secondaryButton,
                      {
                        backgroundColor: colors.surfaceElevated,
                        borderColor: colors.border,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[styles.secondaryButtonText, { color: colors.textSecondary }]}
                    >
                      {t("settings")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9} onPress={onFinish}>
                    <LinearGradient
                      colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.primaryButton}
                    >
                      <Text style={styles.primaryButtonText}>
                        {t("setupGuideFinish")}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardAvoider: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 460,
    borderRadius: 30,
    borderWidth: 1,
    padding: 22,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 10,
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.mono,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontFamily: fonts.display,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  progressRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  progressDot: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  content: {
    maxHeight: 430,
  },
  contentContainer: {
    gap: 14,
    paddingBottom: 12,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.body,
  },
  note: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: fonts.body,
  },
  providerPicker: {
    marginBottom: 0,
  },
  inputSection: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontFamily: fonts.mono,
  },
  input: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: fonts.body,
  },
  helperText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.body,
  },
  statusCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.body,
  },
  summaryStack: {
    gap: 10,
  },
  routeRow: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 4,
  },
  routeLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontFamily: fonts.mono,
  },
  routeValue: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fonts.display,
  },
  resultCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  resultLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontFamily: fonts.mono,
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.body,
  },
  inlineLink: {
    alignSelf: "flex-start",
  },
  inlineLinkText: {
    fontSize: 14,
    fontFamily: fonts.body,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    minWidth: 148,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: fonts.mono,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontFamily: fonts.mono,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
});
