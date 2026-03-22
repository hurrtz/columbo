import React from "react";
import { Pressable, Text, View } from "react-native";

import {
  getTtsListenLanguageLabel,
  TTS_LISTEN_LANGUAGE_OPTIONS,
} from "../../constants/localTts";
import { useLocalization } from "../../i18n";
import { TtsListenLanguage } from "../../types";
import { useTheme } from "../../theme/ThemeContext";

import { PickerSection } from "./SettingsSectionPrimitives";
import { styles } from "./styles";

export function ListenLanguageSelector({
  selectedLanguages,
  onToggleLanguage,
}: {
  selectedLanguages: TtsListenLanguage[];
  onToggleLanguage: (language: TtsListenLanguage) => void;
}) {
  const { colors } = useTheme();
  const { t, language } = useLocalization();

  return (
    <PickerSection>
      <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>
        {t("listenLanguages")}
      </Text>
      <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
        {t("listenLanguagesHint")}
      </Text>
      <View style={styles.languageChipRow}>
        {TTS_LISTEN_LANGUAGE_OPTIONS.map((entry) => {
          const selected = selectedLanguages.includes(entry);

          return (
            <Pressable
              key={entry}
              onPress={() => onToggleLanguage(entry)}
              style={[
                styles.languageChip,
                {
                  backgroundColor: selected
                    ? colors.accentSoft
                    : colors.surface,
                  borderColor: selected ? colors.accent : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.languageChipText,
                  { color: selected ? colors.accent : colors.textSecondary },
                ]}
              >
                {getTtsListenLanguageLabel(entry, language)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </PickerSection>
  );
}
