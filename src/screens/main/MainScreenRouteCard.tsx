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
import { getWebSearchToggleDisplay } from "./webSearchToggleSelectors";

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
  // The toggle only reflects an active web-search route when it is switched
  // on AND a search-capable provider is configured and ready. Otherwise we
  // present an honest "off" state with no provider logo.
  const webSearchDisplay = getWebSearchToggleDisplay({
    webSearchEnabled,
    webSearchMode,
    webSearchProvider,
    webSearchReady,
    providerLabels: PROVIDER_LABELS,
    t,
  });
  const webSearchOn = webSearchDisplay.active;
  const webSearchProviderLabel = webSearchDisplay.providerLabel ?? undefined;
  const webSearchTitle = webSearchDisplay.title;

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
          routes={responseModes}
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

      <TouchableOpacity
        style={[
          styles.webSearchToggle,
          {
            backgroundColor: webSearchOn
              ? colors.accentSoft
              : colors.surfaceElevated,
            borderColor: webSearchOn ? colors.borderStrong : colors.border,
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
              value={webSearchOn}
              onValueChange={() => onToggleWebSearchEnabled()}
              trackColor={{
                false: colors.border,
                true: colors.accent,
              }}
              thumbColor={colors.surface}
            />
            <Text style={[styles.webSearchToggleTitle, { color: colors.text }]}>
              {webSearchTitle}
            </Text>
          </View>
        </View>
        <View style={styles.webSearchProviderIcon}>
          {webSearchOn && webSearchProvider ? (
            <ProviderIcon
              provider={webSearchProvider}
              color={colors.text}
              label={webSearchProviderLabel}
            />
          ) : (
            <Feather name="search" size={18} color={colors.textMuted} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
