import React from "react";
import {
  StyleProp,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ResponseModeToggle } from "../../components/ResponseModeToggle";
import {
  getResponseLengthOptions,
  getResponseToneOptions,
} from "../../components/settings/helpers";
import { PROVIDER_LABELS } from "../../constants/models";
import { type WebSearchProvider } from "../../constants/webSearch";
import { Colors } from "../../theme/colors";
import {
  AssistantResponseLength,
  AssistantResponseTone,
  ResponseMode,
  ResponseModeSelections,
} from "../../types";

import { TranslateFn } from "./shared";
import { styles } from "./styles";
import { getWebSearchToggleDisplay } from "./webSearchToggleSelectors";

interface MainScreenRouteCardProps {
  activeResponseMode: ResponseMode;
  availableResponseModes: ResponseMode[];
  compactResponseModes?: boolean;
  colors: Colors;
  onOpenSetupGuide: () => void;
  onOpenStyleSheet: () => void;
  onSelectResponseMode: (mode: ResponseMode) => void;
  onToggleWebSearchEnabled: () => void;
  responseLength: AssistantResponseLength;
  responseModes: ResponseModeSelections;
  responseTone: AssistantResponseTone;
  showStyleChip: boolean;
  style?: StyleProp<ViewStyle>;
  t: TranslateFn;
  webSearchEnabled: boolean;
  webSearchProvider: WebSearchProvider | null;
  webSearchReady: boolean;
}

export function MainScreenRouteCard({
  activeResponseMode,
  availableResponseModes,
  compactResponseModes = false,
  colors,
  onOpenSetupGuide,
  onOpenStyleSheet,
  onSelectResponseMode,
  onToggleWebSearchEnabled,
  responseLength,
  responseModes,
  responseTone,
  showStyleChip,
  style,
  t,
  webSearchEnabled,
  webSearchProvider,
  webSearchReady,
}: MainScreenRouteCardProps) {
  // The toggle only reflects an active web-search route when it is switched
  // on AND a search-capable provider is configured and ready. Web search is
  // only shown at all when a provider is ready.
  const webSearchDisplay = getWebSearchToggleDisplay({
    webSearchEnabled,
    webSearchProvider,
    webSearchReady,
    providerLabels: PROVIDER_LABELS,
    t,
  });
  const webSearchOn = webSearchDisplay.active;
  const webSearchProviderLabel = webSearchDisplay.providerLabel ?? undefined;
  const webSearchTitle = webSearchDisplay.title;

  const toneLabel =
    getResponseToneOptions(t).find((o) => o.value === responseTone)?.label ??
    responseTone;
  const lengthLabel =
    getResponseLengthOptions(t).find((o) => o.value === responseLength)
      ?.label ?? responseLength;
  // When web search shares the row, the style pill needs a compact label so
  // both controls fit; otherwise it spans the row with the fuller label.
  const styleChipLabel = webSearchReady
    ? `${toneLabel} · ${lengthLabel}`
    : t("homeStyleChipLabel", { tone: toneLabel, length: lengthLabel });
  const styleChipAccessibilityLabel = `${t("openStyleSheet")}, ${toneLabel}, ${lengthLabel}`;

  const showControlsRow = showStyleChip || webSearchReady;

  return (
    <View
      style={[
        styles.heroCard,
        style,
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
        style={styles.heroCardGlow}
      />
      {availableResponseModes.length > 0 ? (
        <ResponseModeToggle
          compact={compactResponseModes}
          selected={activeResponseMode}
          onSelect={onSelectResponseMode}
          modes={responseModes}
          readyModes={availableResponseModes}
        />
      ) : (
        <TouchableOpacity
          style={[
            styles.providerEmptyState,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
          onPress={onOpenSetupGuide}
          activeOpacity={0.9}
        >
          <View style={styles.providerEmptyHeader}>
            <View
              style={[
                styles.providerEmptyBadge,
                {
                  backgroundColor: colors.backgroundSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <Feather name="key" size={14} color={colors.text} />
            </View>
            <Feather name="arrow-up-right" size={16} color={colors.accent} />
          </View>
          <Text style={[styles.providerEmptyTitle, { color: colors.text }]}>
            {t("setupGuideConnectProviderTitle")}
          </Text>
          <Text
            style={[styles.providerEmptyText, { color: colors.textSecondary }]}
          >
            {t("setupGuideConnectProviderDescription")}
          </Text>
        </TouchableOpacity>
      )}

      {showControlsRow ? (
        <View style={styles.routeControlsRow}>
          {showStyleChip ? (
            <TouchableOpacity
              style={[
                styles.routeStyleChip,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={onOpenStyleSheet}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={styleChipAccessibilityLabel}
            >
              <View style={styles.styleChipLabelRow}>
                <Feather
                  name="sliders"
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[styles.styleChipLabel, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {styleChipLabel}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}

          {webSearchReady ? (
            <TouchableOpacity
              style={[
                styles.routeWebSearchToggle,
                {
                  backgroundColor: webSearchOn
                    ? colors.accentSoft
                    : colors.surfaceElevated,
                  borderColor: webSearchOn
                    ? colors.borderStrong
                    : colors.border,
                },
              ]}
              onPress={onToggleWebSearchEnabled}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={
                webSearchProviderLabel
                  ? `${webSearchTitle}. ${webSearchProviderLabel}`
                  : webSearchTitle
              }
            >
              <Switch
                value={webSearchOn}
                onValueChange={() => onToggleWebSearchEnabled()}
                trackColor={{
                  false: colors.border,
                  true: colors.accent,
                }}
                thumbColor={colors.surface}
              />
              <Text
                style={[styles.webSearchToggleTitle, { color: colors.text }]}
                numberOfLines={1}
              >
                {webSearchTitle}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
