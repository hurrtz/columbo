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

import { ProviderIcon } from "../../components/ProviderIcon";
import { ResponseModeToggle } from "../../components/ResponseModeToggle";
import { PROVIDER_LABELS } from "../../constants/models";
import {
  type WebSearchMode,
  type WebSearchProvider,
} from "../../constants/webSearch";
import { Colors } from "../../theme/colors";
import { ResponseMode, ResponseModeRoute } from "../../types";

import { TranslateFn } from "./shared";
import { styles } from "./styles";

interface MainScreenRouteCardProps {
  activeResponseMode: ResponseMode;
  availableResponseModes: ResponseMode[];
  compactResponseModes?: boolean;
  colors: Colors;
  onOpenSetupGuide: () => void;
  onSelectResponseMode: (mode: ResponseMode) => void;
  onToggleWebSearchEnabled: () => void;
  responseModes: Record<ResponseMode, ResponseModeRoute>;
  style?: StyleProp<ViewStyle>;
  t: TranslateFn;
  webSearchEnabled: boolean;
  webSearchMode: WebSearchMode;
  webSearchProvider: WebSearchProvider | null;
  webSearchReady: boolean;
}

export function MainScreenRouteCard({
  activeResponseMode,
  availableResponseModes,
  compactResponseModes = false,
  colors,
  onOpenSetupGuide,
  onSelectResponseMode,
  onToggleWebSearchEnabled,
  responseModes,
  style,
  t,
  webSearchEnabled,
  webSearchMode,
  webSearchProvider,
  webSearchReady,
}: MainScreenRouteCardProps) {
  const isHighlighted = webSearchEnabled && webSearchReady;
  const webSearchTitle = `${t("webSearch")} (${t(
    webSearchMode === "on" ? "webSearchModeAlways" : "webSearchModeAuto",
  )})`;
  const webSearchProviderLabel = webSearchProvider
    ? PROVIDER_LABELS[webSearchProvider]
    : undefined;

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
        <>
          <ResponseModeToggle
            compact={compactResponseModes}
            selected={activeResponseMode}
            onSelect={onSelectResponseMode}
            routes={responseModes}
            readyModes={availableResponseModes}
          />
          <TouchableOpacity
            style={[
              styles.webSearchToggle,
              {
                backgroundColor: isHighlighted
                  ? colors.accentSoft
                  : colors.surfaceElevated,
                borderColor: isHighlighted ? colors.borderStrong : colors.border,
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
            <View style={styles.webSearchToggleCopy}>
              <View style={styles.webSearchToggleHeader}>
                <Switch
                  value={webSearchEnabled}
                  onValueChange={() => onToggleWebSearchEnabled()}
                  trackColor={{
                    false: colors.border,
                    true: colors.accent,
                  }}
                  thumbColor={colors.surface}
                />
                <Text
                  style={[styles.webSearchToggleTitle, { color: colors.text }]}
                >
                  {webSearchTitle}
                </Text>
              </View>
            </View>
            <View style={styles.webSearchProviderIcon}>
              {webSearchProvider ? (
                <ProviderIcon
                  provider={webSearchProvider}
                  color={webSearchReady ? colors.text : colors.textMuted}
                  label={webSearchProviderLabel}
                />
              ) : (
                <Feather
                  name="search"
                  size={18}
                  color={colors.textMuted}
                />
              )}
            </View>
          </TouchableOpacity>
        </>
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
    </View>
  );
}
