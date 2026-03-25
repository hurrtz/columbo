import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ResponseModeToggle } from "../../components/ResponseModeToggle";
import { ProviderIcon } from "../../components/ProviderIcon";
import { type WebSearchMode } from "../../constants/webSearch";
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
  onSelectWebSearchMode: (mode: WebSearchMode) => void;
  responseModes: Record<ResponseMode, ResponseModeRoute>;
  t: TranslateFn;
  webSearchMode: WebSearchMode;
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
  onSelectWebSearchMode,
  responseModes,
  t,
  webSearchMode,
  webSearchProvider,
  webSearchReady,
}: MainScreenRouteCardProps) {
  const badgeProvider = webSearchProvider ?? "openai";
  const modeOptions: WebSearchMode[] = ["off", "auto", "on"];
  const isHighlighted = webSearchMode !== "off" && webSearchReady;

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
          <View
            style={[
              styles.webSearchToggle,
              {
                backgroundColor: isHighlighted
                  ? colors.accentSoft
                  : colors.surfaceElevated,
                borderColor: isHighlighted ? colors.borderStrong : colors.border,
              },
            ]}
          >
            <View style={styles.webSearchToggleCopy}>
              <View style={styles.webSearchToggleHeader}>
                <Text
                  style={[styles.webSearchToggleTitle, { color: colors.text }]}
                >
                  {t("webSearch")}
                </Text>
              </View>
              <View style={styles.webSearchModeRow}>
                {modeOptions.map((mode) => {
                  const active = webSearchMode === mode;

                  return (
                    <TouchableOpacity
                      key={mode}
                      style={[
                        styles.webSearchModeButton,
                        {
                          backgroundColor: active
                            ? colors.accentSoft
                            : colors.surface,
                          borderColor: active ? colors.accent : colors.border,
                        },
                      ]}
                      onPress={() => onSelectWebSearchMode(mode)}
                      activeOpacity={0.88}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                      accessibilityLabel={t("setWebSearchMode", {
                        mode: t(
                          mode === "off"
                            ? "webSearchModeOff"
                            : mode === "auto"
                              ? "webSearchModeAuto"
                              : "webSearchModeOn",
                        ),
                      })}
                    >
                      <Text
                        style={[
                          styles.webSearchModeButtonText,
                          {
                            color: active ? colors.accent : colors.textSecondary,
                          },
                        ]}
                      >
                        {t(
                          mode === "off"
                            ? "webSearchModeOff"
                            : mode === "auto"
                              ? "webSearchModeAuto"
                              : "webSearchModeOn",
                        )}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <TouchableOpacity
              style={styles.webSearchProviderIcon}
              onPress={onOpenWebSearchSettings}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel={t("openWebSearchSettings")}
            >
              <ProviderIcon
                provider={badgeProvider}
                color={webSearchReady ? colors.text : colors.textMuted}
                label={badgeProvider}
              />
            </TouchableOpacity>
          </View>
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
