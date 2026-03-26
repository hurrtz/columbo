import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getProviderModelName } from "../constants/models";
import { useLocalization } from "../i18n";
import { useTheme } from "../theme/ThemeContext";
import { fonts } from "../theme/typography";
import { ResponseMode, ResponseModeSelections } from "../types";
import { RESPONSE_MODE_ORDER } from "../utils/responseModes";
import { ProviderIcon } from "./ProviderIcon";

interface ResponseModeToggleProps {
  compact?: boolean;
  selected: ResponseMode;
  onSelect: (mode: ResponseMode) => void;
  routes: ResponseModeSelections;
  readyModes?: ResponseMode[];
}

function getResponseModeLabel(
  mode: ResponseMode,
  t: ReturnType<typeof useLocalization>["t"],
) {
  switch (mode) {
    case "quick":
      return t("quickAndShallow");
    case "normal":
      return t("normal");
    case "deep":
      return t("deepThinking");
  }
}

export function ResponseModeToggle({
  compact = false,
  selected,
  onSelect,
  routes,
  readyModes = RESPONSE_MODE_ORDER,
}: ResponseModeToggleProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();

  return (
    <View
      style={[
        styles.container,
        compact ? styles.containerCompact : null,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.glow,
        },
      ]}
    >
      {RESPONSE_MODE_ORDER.map((mode) => {
        const active = mode === selected;
        const route = routes[mode];
        const ready = readyModes.includes(mode);
        const content = (
          <>
            <View
              style={[
                styles.optionHeader,
                compact ? styles.optionHeaderCompact : null,
              ]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  compact ? styles.optionLabelCompact : null,
                  { color: active ? colors.text : colors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {getResponseModeLabel(mode, t)}
              </Text>
            </View>

            {!compact ? (
              <>
                <View style={styles.providerRow}>
                  <ProviderIcon
                    provider={route.provider}
                    color={active ? colors.text : colors.textSecondary}
                  />
                </View>

                <Text
                  style={[
                    styles.modelText,
                    { color: active ? colors.text : colors.textMuted },
                  ]}
                  numberOfLines={2}
                >
                  {getProviderModelName(route.provider, route.model)}
                </Text>
              </>
            ) : null}
          </>
        );

        return (
          <Pressable
            key={mode}
            style={[
              styles.option,
              !ready ? styles.optionDisabled : null,
              active
                ? styles.optionActiveShell
                : {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                  },
            ]}
            onPress={() => onSelect(mode)}
            accessibilityRole="button"
            accessibilityLabel={t("useResponseMode", {
              mode: getResponseModeLabel(mode, t),
            })}
            accessibilityState={{ disabled: !ready, selected: active }}
          >
            {active ? (
              <LinearGradient
                colors={[colors.accentGradientStart, colors.accentGradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.optionInner,
                  compact ? styles.optionInnerCompact : null,
                ]}
              >
                {content}
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.optionInner,
                  compact ? styles.optionInnerCompact : null,
                ]}
              >
                {content}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    borderRadius: 26,
    padding: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  containerCompact: {
    gap: 6,
    padding: 5,
  },
  option: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  optionActiveShell: {
    borderColor: "rgba(255,255,255,0.18)",
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionInner: {
    flex: 1,
    minHeight: 96,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 10,
  },
  optionInnerCompact: {
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 0,
  },
  optionHeader: {
    minHeight: 17,
    alignItems: "center",
  },
  optionHeaderCompact: {
    minHeight: 0,
  },
  optionLabel: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: fonts.display,
  },
  optionLabelCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
  providerRow: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
  },
  modelText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.body,
    textAlign: "center",
  },
});
