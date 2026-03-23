import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { fonts } from "../../theme/typography";

interface MainScreenTopBarProps {
  colors: Colors;
  compact?: boolean;
  debugLogLabel: string;
  isDebugLogging: boolean;
  onOpenDrawer: () => void;
  onOpenSettings: () => void;
  onToggleDebugLogging: () => void;
}

export function MainScreenTopBar({
  colors,
  compact = false,
  debugLogLabel,
  isDebugLogging,
  onOpenDrawer,
  onOpenSettings,
  onToggleDebugLogging,
}: MainScreenTopBarProps) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={[
          styles.iconButton,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.glow,
          },
        ]}
        onPress={onOpenDrawer}
      >
        <Feather
          name="message-square"
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {compact ? (
        <View
          style={[
            styles.compactBrand,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.compactBrandText, { color: colors.text }]}>
            SchnackAI
          </Text>
        </View>
      ) : (
        <View style={styles.wordmark}>
          <Text style={[styles.wordmarkText, { color: colors.text }]}>
            SchnackAI
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.logButton,
            {
              backgroundColor: isDebugLogging
                ? colors.accent
                : colors.surface,
              borderColor: isDebugLogging ? colors.accent : colors.border,
              shadowColor: colors.glow,
            },
          ]}
          onPress={onToggleDebugLogging}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.logButtonText,
              {
                color: isDebugLogging ? colors.background : colors.textSecondary,
              },
            ]}
          >
            {debugLogLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              shadowColor: colors.glow,
            },
          ]}
          onPress={onOpenSettings}
        >
          <Feather name="settings" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 14,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logButton: {
    minWidth: 56,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  logButtonText: {
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    fontFamily: fonts.mono,
  },
  wordmark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  wordmarkText: {
    fontSize: 24,
    letterSpacing: 0.8,
    fontFamily: fonts.displayHeavy,
  },
  compactBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  compactBrandText: {
    fontSize: 14,
    letterSpacing: 0.6,
    fontFamily: fonts.displayHeavy,
  },
});
