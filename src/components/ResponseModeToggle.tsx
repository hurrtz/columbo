import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PROVIDER_LABELS, getProviderModelName } from "../constants/models";
import { useLocalization } from "../i18n";
import { useTheme } from "../theme/ThemeContext";
import { fonts } from "../theme/typography";
import { ResponseMode, ResponseModeSelections } from "../types";
import { RESPONSE_MODE_ORDER } from "../utils/responseModes";
import { getResponseModeRouteEffortLabel } from "../utils/modelEffort";
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
      return t("responseModeReason");
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
  const { language, t } = useLocalization();

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
        const modeLabel = getResponseModeLabel(mode, t);
        const providerLabel = PROVIDER_LABELS[route.provider];
        const modelLabel = getProviderModelName(route.provider, route.model);
        const effortLabel = getResponseModeRouteEffortLabel(route, language);
        const effortText = effortLabel
          ? t("effortValue", { effort: effortLabel })
          : "";
        const content = (
          <View style={styles.optionContent}>
            <View
              style={[
                styles.modeRow,
                compact ? styles.modeRowCompact : null,
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
                {modeLabel}
              </Text>
            </View>

            <View
              style={[
                styles.providerIconRow,
                compact ? styles.providerIconRowCompact : null,
              ]}
            >
              <ProviderIcon
                provider={route.provider}
                color={active ? colors.text : colors.textSecondary}
              />
            </View>

            <View
              style={[
                styles.modelRow,
                compact ? styles.modelRowCompact : null,
              ]}
            >
              <Text
                style={[
                  styles.modelText,
                  compact ? styles.modelTextCompact : null,
                  { color: active ? colors.text : colors.textMuted },
                ]}
                numberOfLines={effortText || compact ? 1 : 2}
              >
                {modelLabel}
              </Text>
              {effortText ? (
                <Text
                  style={[
                    styles.effortText,
                    compact ? styles.effortTextCompact : null,
                    { color: active ? colors.text : colors.textMuted },
                  ]}
                  numberOfLines={1}
                >
                  {effortText}
                </Text>
              ) : null}
            </View>
          </View>
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
            accessibilityLabel={`${t("useResponseMode", {
              mode: modeLabel,
            })}. ${providerLabel}. ${modelLabel}${effortText ? `. ${effortText}` : ""}`}
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
    minHeight: 124,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionInnerCompact: {
    minHeight: 92,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  optionContent: {
    width: "100%",
    alignItems: "center",
  },
  modeRow: {
    height: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modeRowCompact: {
    height: 18,
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
  providerIconRow: {
    height: 32,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  providerIconRowCompact: {
    height: 28,
  },
  modelRow: {
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  modelRowCompact: {
    height: 30,
    gap: 1,
  },
  modelText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.body,
    textAlign: "center",
  },
  modelTextCompact: {
    fontSize: 10,
    lineHeight: 14,
  },
  effortText: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: fonts.body,
    textAlign: "center",
  },
  effortTextCompact: {
    fontSize: 9,
    lineHeight: 11,
  },
});
