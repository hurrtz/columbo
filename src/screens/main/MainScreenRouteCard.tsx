import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ResponseModeToggle } from "../../components/ResponseModeToggle";
import { ProviderIcon } from "../../components/ProviderIcon";
import { Colors } from "../../theme/colors";
import { Provider, ResponseMode, ResponseModeRoute } from "../../types";

import { TranslateFn } from "./shared";
import { styles } from "./styles";

interface MainScreenRouteCardProps {
  activeResponseMode: ResponseMode;
  availableResponseModes: ResponseMode[];
  colors: Colors;
  onOpenGroqSettings: () => void;
  onOpenWebSearchSettings: () => void;
  onSelectResponseMode: (mode: ResponseMode) => void;
  onToggleWebSearch: () => void;
  responseModes: Record<ResponseMode, ResponseModeRoute>;
  t: TranslateFn;
  webSearchEnabled: boolean;
  webSearchProvider: Provider | null;
  webSearchReady: boolean;
}

export function MainScreenRouteCard({
  activeResponseMode,
  availableResponseModes,
  colors,
  onOpenGroqSettings,
  onOpenWebSearchSettings,
  onSelectResponseMode,
  onToggleWebSearch,
  responseModes,
  t,
  webSearchEnabled,
  webSearchProvider,
  webSearchReady,
}: MainScreenRouteCardProps) {
  const badgeProvider = webSearchProvider ?? "openai";

  return (
    <View
      style={[
        styles.heroCard,
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
            selected={activeResponseMode}
            onSelect={onSelectResponseMode}
            routes={responseModes}
            readyModes={availableResponseModes}
          />
          <TouchableOpacity
            style={[
              styles.webSearchToggle,
              {
                backgroundColor: webSearchEnabled
                  ? colors.accentSoft
                  : colors.surfaceElevated,
                borderColor: webSearchEnabled ? colors.borderStrong : colors.border,
              },
            ]}
            onPress={
              webSearchReady ? onToggleWebSearch : onOpenWebSearchSettings
            }
            activeOpacity={0.88}
          >
            <View style={styles.webSearchToggleCopy}>
              <View style={styles.webSearchToggleHeader}>
                <View style={styles.webSearchToggleControl} pointerEvents="none">
                  <Switch
                    value={webSearchEnabled}
                    trackColor={{
                      false: webSearchReady ? colors.borderStrong : colors.border,
                      true: colors.accent,
                    }}
                    thumbColor={colors.surface}
                    ios_backgroundColor={
                      webSearchReady ? colors.borderStrong : colors.border
                    }
                  />
                </View>
                <Text
                  style={[styles.webSearchToggleTitle, { color: colors.text }]}
                >
                  {t("webSearch")}
                </Text>
              </View>
            </View>
            <View style={styles.webSearchProviderIcon}>
              <ProviderIcon
                provider={badgeProvider}
                color={webSearchReady ? colors.text : colors.textMuted}
                label={badgeProvider}
              />
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
          onPress={onOpenGroqSettings}
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
              <ProviderIcon provider="groq" color={colors.text} />
              <Text
                style={[styles.providerEmptyBadgeText, { color: colors.text }]}
              >
                Groq
              </Text>
            </View>
            <Feather name="arrow-up-right" size={16} color={colors.accent} />
          </View>
          <Text style={[styles.providerEmptyTitle, { color: colors.text }]}>
            {t("startWithGroq")}
          </Text>
          <Text
            style={[styles.providerEmptyText, { color: colors.textSecondary }]}
          >
            {t("groqStarterDescription")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
