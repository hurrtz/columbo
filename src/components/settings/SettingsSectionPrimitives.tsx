import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useLocalization } from "../../i18n";
import { useTheme } from "../../theme/ThemeContext";

import { getTabDescription } from "./helpers";
import { styles } from "./styles";
import { SettingsTab } from "./types";

export function TabIntro({ tab }: { tab: SettingsTab }) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const description = getTabDescription(tab, t);

  if (!description) {
    return null;
  }

  return (
    <Text style={[styles.tabIntroText, { color: colors.textSecondary }]}>
      {description}
    </Text>
  );
}

export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  helperText,
}: {
  label: string;
  options: {
    value: T;
    label: string;
    description?: string;
    disabled?: boolean;
  }[];
  value: T;
  onChange: (value: T) => void;
  helperText?: string;
}) {
  const { colors } = useTheme();
  const activeOption = options.find((option) => option.value === value);

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
      ]}
    >
      <Text
        accessibilityRole="header"
        style={[styles.sectionLabel, { color: colors.text }]}
      >
        {label}
      </Text>
      <View style={styles.radioRow}>
        {options.map((option) => {
          const active = value === option.value;
          const disabled = !!option.disabled;

          return (
            <TouchableOpacity
              key={option.value}
              style={styles.radioButtonWrap}
              onPress={() => {
                if (!disabled) {
                  onChange(option.value);
                }
              }}
              activeOpacity={0.85}
              disabled={disabled}
            >
              <View
                style={[
                  styles.radioButton,
                  {
                    borderColor: active ? colors.accent : colors.border,
                    backgroundColor: active
                      ? colors.accentSoft
                      : colors.surface,
                    opacity: disabled ? 0.55 : 1,
                  },
                  active ? styles.radioButtonActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.radioLabel,
                    {
                      color: active ? colors.accent : colors.textSecondary,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {activeOption?.description ? (
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          {activeOption.description}
        </Text>
      ) : null}
      {helperText ? (
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

export function PickerSection({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
      ]}
    >
      {children}
    </View>
  );
}
