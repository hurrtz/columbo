import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { WaveformCircle } from "../../components/WaveformCircle";
import { Colors } from "../../theme/colors";
import {
  InputMode,
  VoiceVisualPhase,
  WaveformVisualizationVariant,
} from "../../types";

import { styles } from "./styles";

interface MainScreenVoiceStageProps {
  circleSize?: number;
  colors: Colors;
  inputMode: InputMode;
  isActive: boolean;
  layout?: "portrait" | "landscape";
  metering: number;
  onOpenStatusDetails: () => void;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  providerLabel: string;
  signalLevels: number[] | undefined;
  signalWaveformVariant: WaveformVisualizationVariant;
  showStatusStrip?: boolean;
  statusDetail: string;
  statusIndicatorTone: string;
  statusTitle: string;
  visualPhase: VoiceVisualPhase;
}

function getStatusIndicatorColor(statusIndicatorTone: string, colors: Colors) {
  switch (statusIndicatorTone) {
    case "danger":
      return colors.danger;
    case "accent":
      return colors.accent;
    case "muted":
      return colors.textMuted;
    case "success":
      return colors.success;
    default:
      return colors.accentWarm;
  }
}

interface MainScreenStatusStripProps {
  colors: Colors;
  fullWidth?: boolean;
  layout?: "portrait" | "landscape";
  onOpenStatusDetails: () => void;
  statusDetail: string;
  statusIndicatorTone: string;
  statusTitle: string;
}

export function MainScreenStatusStrip({
  colors,
  fullWidth = false,
  layout = "portrait",
  onOpenStatusDetails,
  statusDetail,
  statusIndicatorTone,
  statusTitle,
}: MainScreenStatusStripProps) {
  const statusStripMaxWidth = fullWidth
    ? undefined
    : layout === "landscape"
      ? 320
      : 360;

  return (
    <View
      style={[
        styles.statusStrip,
        layout === "landscape" ? styles.statusStripLandscape : null,
        fullWidth ? styles.statusStripFullWidth : null,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          maxWidth: statusStripMaxWidth,
          shadowColor: colors.glow,
        },
      ]}
    >
      <View style={styles.statusStripCopy}>
        <View style={styles.statusStripLead}>
          <View
            style={[
              styles.statusStripDot,
              {
                backgroundColor: getStatusIndicatorColor(
                  statusIndicatorTone,
                  colors,
                ),
              },
            ]}
          />
          <Text style={[styles.statusStripTitle, { color: colors.text }]}>
            {statusTitle}
          </Text>
        </View>
        <Text
          style={[styles.statusStripDetail, { color: colors.textSecondary }]}
        >
          {statusDetail}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusStripInfoButton,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
          },
        ]}
        onPress={onOpenStatusDetails}
        activeOpacity={0.85}
      >
        <Feather name="info" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

export function MainScreenVoiceStage({
  circleSize = 260,
  colors,
  inputMode,
  isActive,
  layout = "portrait",
  metering,
  onOpenStatusDetails,
  onPress,
  onPressIn,
  onPressOut,
  providerLabel,
  signalLevels,
  signalWaveformVariant,
  showStatusStrip = true,
  statusDetail,
  statusIndicatorTone,
  statusTitle,
  visualPhase,
}: MainScreenVoiceStageProps) {
  const haloSize = Math.round(circleSize * 1.08);

  return (
    <View
      style={[
        styles.stageBlock,
        layout === "landscape" ? styles.stageBlockLandscape : null,
      ]}
    >
      <View
        style={[
          styles.stageHalo,
          {
            width: haloSize,
            height: haloSize,
            borderRadius: haloSize / 2,
            backgroundColor: colors.glowStrong,
          },
        ]}
      />
      <WaveformCircle
        metering={metering}
        levels={signalLevels}
        isActive={isActive}
        phase={visualPhase}
        providerLabel={providerLabel}
        size={circleSize}
        waveformVariant={signalWaveformVariant}
        inputMode={inputMode}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      />
      {showStatusStrip ? (
        <MainScreenStatusStrip
          colors={colors}
          layout={layout}
          onOpenStatusDetails={onOpenStatusDetails}
          statusDetail={statusDetail}
          statusIndicatorTone={statusIndicatorTone}
          statusTitle={statusTitle}
        />
      ) : null}
    </View>
  );
}
