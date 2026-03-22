import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useLocalization } from "../../i18n";
import { useTheme } from "../../theme/ThemeContext";

import { styles } from "./styles";
import { PreviewButtonPhase, TextInputFocusHandler } from "./types";

export function PreviewComposer({
  text,
  setText,
  phase,
  interactionDisabled,
  onPreview,
  onStop,
  onTextInputFocus,
}: {
  text: string;
  setText: (text: string) => void;
  phase: PreviewButtonPhase;
  interactionDisabled: boolean;
  onPreview: () => Promise<void>;
  onStop: () => Promise<void>;
  onTextInputFocus: TextInputFocusHandler;
}) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const isGenerating = phase === "generating";
  const isPlaying = phase === "playing";
  const isBusy = isGenerating || isPlaying;

  return (
    <>
      <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>
        {t("voicePreviewText")}
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        onFocus={onTextInputFocus}
        multiline
        placeholder={t("voicePreviewPlaceholder")}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.accent}
        style={[
          styles.previewInput,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />
      <Text style={[styles.previewHint, { color: colors.textMuted }]}>
        {t("voicePreviewHint")}
      </Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          void (isBusy ? onStop() : onPreview());
        }}
        disabled={interactionDisabled || (!isBusy && !text.trim())}
      >
        <LinearGradient
          colors={[colors.accentGradientStart, colors.accentGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.previewButton,
            !text.trim() ? styles.previewButtonDisabled : null,
            isGenerating ? styles.previewButtonBusy : null,
          ]}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#F4F8FF" />
          ) : isPlaying ? (
            <Feather name="square" size={14} color="#F4F8FF" />
          ) : (
            <Feather name="volume-2" size={16} color="#F4F8FF" />
          )}
          <Text style={styles.previewButtonText}>
            {isBusy ? t("stop") : t("previewVoice")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}
