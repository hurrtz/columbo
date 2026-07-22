import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../theme/ThemeContext";
import { fonts } from "../theme/typography";
import { LiveWaveform } from "./LiveWaveform";
import { NativeWaveformView } from "./NativeWaveformView";
import { supportsNativeOutputWaveformPlayback } from "../services/nativeWaveform";
import { getWaveformControlIconName } from "./waveform/phaseAppearance";
import { InputMode, VoiceVisualPhase } from "../types";
import { useWaveformVariant } from "../state/waveformFeed";

interface WaveformBarProps {
  isActive: boolean;
  phase: VoiceVisualPhase;
  statusLabel?: string;
  inputMode: InputMode;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onPress?: () => void;
}

export function WaveformBar({
  isActive,
  phase,
  statusLabel,
  inputMode,
  onPressIn,
  onPressOut,
  onPress,
}: WaveformBarProps) {
  const waveformVariant = useWaveformVariant();
  const { colors } = useTheme();
  const isSpeaking = phase === "speaking";
  const nativeWaveformChannel =
    waveformVariant === "oscilloscope"
      ? isSpeaking && supportsNativeOutputWaveformPlayback()
          ? "output"
          : null
      : null;
  const activeBackground = colors.accentSoft;
  const activeForeground = colors.accent;

  const content = (
    <View style={styles.contentRow}>
      <View
        style={[
          styles.micButton,
          {
            backgroundColor: isActive ? activeForeground : colors.text,
          },
        ]}
      >
        <Feather
          name={getWaveformControlIconName(phase)}
          size={18}
          color={isActive ? activeBackground : colors.background}
        />
      </View>
      <View style={styles.waveformWrap}>
        {isSpeaking ? (
          nativeWaveformChannel ? (
            <NativeWaveformView
              channel={nativeWaveformChannel}
              active={isActive}
              renderStyle="envelope"
              lineColor={isActive ? activeForeground : colors.accent}
              baselineColor={
                isActive ? colors.borderStrong : colors.borderStrong
              }
              lineWidth={2.2}
              style={styles.nativeWaveform}
            />
          ) : (
            <LiveWaveform
              maxHeight={waveformVariant === "oscilloscope" ? 32 : 26}
              barCount={waveformVariant === "oscilloscope" ? 64 : 28}
              barWidth={waveformVariant === "oscilloscope" ? 1.5 : 2}
              barGap={waveformVariant === "oscilloscope" ? 0.4 : 1}
              barColor={isActive ? activeForeground : colors.accent}
              barColorInactive={
                isActive ? activeForeground : colors.textMuted
              }
              isActive={isActive}
              variant={waveformVariant}
            />
          )
        ) : (
          <View style={styles.statusLabelWrap}>
            {statusLabel ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.statusLabel,
                  {
                    color: isActive ? activeForeground : colors.textSecondary,
                  },
                ]}
              >
                {statusLabel}
              </Text>
            ) : (
              <View style={styles.idleFill} />
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      testID="voice-stage-active-action"
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={statusLabel}
      onPressIn={inputMode === "push-to-talk" ? onPressIn : undefined}
      onPressOut={inputMode === "push-to-talk" ? onPressOut : undefined}
      onPress={inputMode === "toggle-to-talk" ? onPress : undefined}
      style={styles.touchable}
    >
      <View
        style={[
          styles.bar,
          {
            borderColor: isActive ? activeBackground : colors.border,
            borderWidth: 1,
            backgroundColor: isActive ? activeBackground : colors.surface,
          },
        ]}
      >
        {content}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },
  bar: {
    minHeight: 58,
    borderRadius: 14,
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
    height: 36,
  },
  idleFill: {
    flex: 1,
  },
  statusLabelWrap: {
    flex: 1,
    justifyContent: "center",
  },
  statusLabel: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.display,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
