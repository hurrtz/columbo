import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useLocalization } from "../../i18n";
import {
  getResponseLengthOptions,
  getResponseToneOptions,
} from "../../components/settings/helpers";
import { useTheme } from "../../theme/ThemeContext";
import {
  AssistantResponseLength,
  AssistantResponseTone,
} from "../../types";

import { styles } from "./styles";

interface MainScreenStyleChipProps {
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  onPress: () => void;
}

export function MainScreenStyleChip({
  responseLength,
  responseTone,
  onPress,
}: MainScreenStyleChipProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();

  const toneLabel =
    getResponseToneOptions(t).find((o) => o.value === responseTone)?.label ??
    responseTone;
  const lengthLabel =
    getResponseLengthOptions(t).find((o) => o.value === responseLength)
      ?.label ?? responseLength;

  const chipLabel = t("homeStyleChipLabel", {
    tone: toneLabel,
    length: lengthLabel,
  });
  const accessibilityLabel = `${t("openStyleSheet")}. ${toneLabel}. ${lengthLabel}.`;

  return (
    <TouchableOpacity
      style={[
        styles.styleChip,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.glow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.styleChipLabelRow}>
        <Feather name="sliders" size={16} color={colors.textSecondary} />
        <Text
          style={[styles.styleChipLabel, { color: colors.text }]}
          numberOfLines={1}
        >
          {chipLabel}
        </Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
