import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

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
        <View
          style={[
            styles.previewButton,
            { backgroundColor: colors.bubbleUser },
            !text.trim() ? styles.previewButtonDisabled : null,
            isGenerating ? styles.previewButtonBusy : null,
          ]}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color={colors.onPrimary} />
          ) : isPlaying ? (
            <Feather name="square" size={14} color={colors.onPrimary} />
          ) : (
            <Feather name="volume-2" size={16} color={colors.onPrimary} />
          )}
          <Text style={[styles.previewButtonText, { color: colors.onPrimary }]}>
            {isBusy ? t("stop") : t("previewVoice")}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
