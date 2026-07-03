import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PROVIDER_LABELS, getProviderModelName } from "../constants/models";
import { useLocalization } from "../i18n";
import { useTheme } from "../theme/ThemeContext";
import { fonts } from "../theme/typography";
import { ResponseMode, ResponseModeSelections } from "../types";
import { getResponseModeIds } from "../utils/responseModes";
import { getResponseModeRouteEffortLabel } from "../utils/modelEffort";
import { ProviderIcon } from "./ProviderIcon";

interface ResponseModeToggleProps {
  compact?: boolean;
  selected: ResponseMode;
  onSelect: (mode: ResponseMode) => void;
  modes: ResponseModeSelections;
  readyModes?: ResponseMode[];
}

export function ResponseModeToggle({
  compact = false,
  selected,
  onSelect,
  modes,
  readyModes = getResponseModeIds(modes),
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
      {modes.map(({ id, route }) => {
        const active = id === selected;
        const ready = readyModes.includes(id);
        const providerLabel = PROVIDER_LABELS[route.provider];
        const modelLabel = getProviderModelName(route.provider, route.model);
        const effortLabel = getResponseModeRouteEffortLabel(route, language);
        const effortText = effortLabel ?? "";
        const accessibilityRouteLabel = `${providerLabel}. ${modelLabel}${
          effortText ? `. ${effortText}` : ""
        }`;
        const content = (
          <View style={styles.optionContent}>
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
              <View
                style={[
                  styles.modelTextSlot,
                  compact ? styles.modelTextSlotCompact : null,
                ]}
              >
                <Text
                  style={[
                    styles.modelText,
                    compact ? styles.modelTextCompact : null,
                    { color: active ? colors.text : colors.textMuted },
                  ]}
                  numberOfLines={2}
                >
                  {modelLabel}
                </Text>
              </View>
              {effortText ? (
                <View
                  testID="response-mode-effort-footer"
                  style={[
                    styles.effortFooter,
                    compact ? styles.effortFooterCompact : null,
                  ]}
                >
                  <View
                    testID="response-mode-effort-divider"
                    style={[
                      styles.effortDivider,
                      compact ? styles.effortDividerCompact : null,
                      {
                        backgroundColor: active
                          ? colors.text
                          : colors.borderStrong,
                        opacity: active ? 0.28 : 1,
                      },
                    ]}
                  />
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
                </View>
              ) : null}
            </View>
          </View>
        );

        return (
          <Pressable
            key={id}
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
            onPress={() => onSelect(id)}
            accessibilityRole="button"
            accessibilityLabel={`${t("useResponseMode", {
              mode: accessibilityRouteLabel,
            })}`}
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
    height: 56,
    width: "100%",
    alignItems: "center",
  },
  modelRowCompact: {
    height: 46,
  },
  modelTextSlot: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modelTextSlotCompact: {
    minHeight: 28,
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
  effortDivider: {
    width: 28,
    height: 0.5,
    borderRadius: 0.5,
  },
  effortDividerCompact: {
    width: 22,
  },
  effortFooter: {
    height: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  effortFooterCompact: {
    height: 18,
    gap: 3,
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
