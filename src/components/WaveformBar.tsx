import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  View,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";
import { Waveform } from "./Waveform";
import { NativeWaveformView } from "./NativeWaveformView";
import { supportsNativeOutputWaveformPlayback } from "../services/nativeWaveform";
import {
  getWaveformControlIconName,
  getWaveformPhaseGradientColors,
  isWaveformProcessingPhase,
} from "./waveform/phaseAppearance";
import {
  InputMode,
  VoiceVisualPhase,
  WaveformVisualizationVariant,
} from "../types";

interface WaveformBarProps {
  metering: number;
  levels?: number[];
  isActive: boolean;
  phase: VoiceVisualPhase;
  waveformVariant?: WaveformVisualizationVariant;
  inputMode: InputMode;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onPress?: () => void;
}

export function WaveformBar({
  metering,
  levels,
  isActive,
  phase,
  waveformVariant = "bars",
  inputMode,
  onPressIn,
  onPressOut,
  onPress,
}: WaveformBarProps) {
  const { colors, isDark } = useTheme();
  const isRecording = phase === "recording";
  const isBlockingPhase = isWaveformProcessingPhase(phase);
  const isSpeaking = phase === "speaking";
  const nativeWaveformChannel =
    Platform.OS === "ios" &&
    waveformVariant === "oscilloscope"
      ? isSpeaking && supportsNativeOutputWaveformPlayback()
          ? "output"
          : null
      : null;
  const buttonGradientColors = getWaveformPhaseGradientColors({
    colors,
    isDark,
    phase,
  });
  const micButtonBorderColor = isRecording
    ? "rgba(255, 255, 255, 0.28)"
    : isBlockingPhase || isSpeaking
      ? isDark
        ? "rgba(255, 248, 238, 0.2)"
        : "rgba(255, 255, 255, 0.26)"
      : "rgba(255, 255, 255, 0.22)";

  const content = (
    <View style={styles.contentRow}>
      <LinearGradient
        colors={buttonGradientColors}
        locations={[0, 0.58, 1]}
        start={{ x: 0.12, y: 0 }}
        end={{ x: 0.88, y: 1 }}
        style={styles.micButton}
      >
        <View
          style={[
            styles.micButtonFrame,
            { borderColor: micButtonBorderColor },
          ]}
        />
        <Feather
          name={getWaveformControlIconName(phase)}
          size={18}
          color="rgba(255, 255, 255, 0.96)"
        />
      </LinearGradient>
      <View style={styles.waveformWrap}>
        {isSpeaking ? (
          nativeWaveformChannel ? (
            <NativeWaveformView
              channel={nativeWaveformChannel}
              active={isActive}
              lineColor={isActive ? "rgba(255, 255, 255, 0.95)" : colors.accent}
              baselineColor={
                isActive ? "rgba(255, 255, 255, 0.14)" : colors.borderStrong
              }
              lineWidth={1.9}
              style={styles.nativeWaveform}
            />
          ) : (
            <Waveform
              metering={metering}
              levels={levels}
              maxHeight={waveformVariant === "oscilloscope" ? 32 : 26}
              barCount={waveformVariant === "oscilloscope" ? 64 : 28}
              barWidth={waveformVariant === "oscilloscope" ? 1.5 : 2}
              barGap={waveformVariant === "oscilloscope" ? 0.4 : 1}
              barColor={isActive ? "rgba(255, 255, 255, 0.95)" : colors.accent}
              barColorInactive={
                isActive ? "rgba(255, 255, 255, 0.55)" : colors.textMuted
              }
              isActive={isActive}
              variant={waveformVariant}
            />
          )
        ) : (
          <View style={styles.idleFill} />
        )}
      </View>
    </View>
  );

  const glowShadow = {
    shadowColor: isActive
      ? isRecording
        ? isDark
          ? "rgba(255, 122, 112, 0.34)"
          : "rgba(231, 104, 91, 0.28)"
        : isBlockingPhase
          ? isDark
            ? "rgba(241, 164, 87, 0.28)"
            : "rgba(235, 153, 74, 0.22)"
          : isSpeaking
          ? isDark
            ? "rgba(66, 201, 123, 0.28)"
            : "rgba(76, 194, 120, 0.2)"
        : colors.glow
      : "transparent",
    shadowOffset: { width: 0, height: 0 } as const,
    shadowOpacity: isActive ? 1 : 0,
    shadowRadius: isActive ? 8 : 0,
    elevation: isActive ? 4 : 0,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPressIn={inputMode === "push-to-talk" ? onPressIn : undefined}
      onPressOut={inputMode === "push-to-talk" ? onPressOut : undefined}
      onPress={inputMode === "toggle-to-talk" ? onPress : undefined}
      style={styles.touchable}
    >
      {isActive ? (
        <LinearGradient
          colors={buttonGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.bar, glowShadow]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.bar,
            glowShadow,
            {
              borderColor: colors.border,
              borderWidth: 1,
              backgroundColor: colors.surface,
            },
          ]}
        >
          {content}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },
  bar: {
    minHeight: 58,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  waveformWrap: {
    flex: 1,
    minHeight: 28,
    justifyContent: "center",
  },
  nativeWaveform: {
    width: "100%",
    height: 32,
  },
  idleFill: {
    flex: 1,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "rgba(12, 20, 33, 0.18)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  micButtonFrame: {
    position: "absolute",
    top: 4,
    right: 4,
    bottom: 4,
    left: 4,
    borderRadius: 18,
    borderWidth: 1,
  },
});
