import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "../../theme/colors";
import { fonts } from "../../theme/typography";
import {
  InputMode,
  VoicePhaseProgress,
  VoiceVisualPhase,
} from "../../types";
import { formatLatencyCountdown } from "../../utils/latencyDisplay";

import { TranslateFn } from "./shared";

interface PhaseAwareVoiceActionProps {
  colors: Colors;
  inputMode: InputMode;
  onOpenStatusDetails: () => void;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  onStopPlayback?: () => void | Promise<void>;
  phaseLabel: string;
  phaseProgress?: VoicePhaseProgress | null;
  playbackActive?: boolean;
  playbackPaused?: boolean;
  recordingMaxMs: number;
  statusLabel: string;
  stopPlaybackLabel: string;
  t: TranslateFn;
  visualPhase: VoiceVisualPhase;
}

function formatClock(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes.toString().padStart(2, "0")}m`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getPhaseIcon(
  visualPhase: VoiceVisualPhase,
  playbackPaused: boolean,
): React.ComponentProps<typeof Feather>["name"] {
  switch (visualPhase) {
    case "recording":
      return "square";
    case "transcribing":
      return "file-text";
    case "searching":
      return "globe";
    case "thinking":
      return "cpu";
    case "synthesizing":
      return "headphones";
    case "speaking":
      return playbackPaused ? "play" : "pause";
    default:
      return "mic";
  }
}

function getPhaseColor(visualPhase: VoiceVisualPhase, colors: Colors) {
  switch (visualPhase) {
    case "recording":
      return colors.phaseRecordingTrack;
    case "transcribing":
      return colors.phaseTranscribing;
    case "searching":
      return colors.phaseSearching;
    case "thinking":
      return colors.phaseThinking;
    case "synthesizing":
      return colors.phaseSynthesizing;
    case "speaking":
      return colors.phaseSpeaking;
    default:
      return colors.bubbleUser;
  }
}

function usePhaseTimeLabel(
  visualPhase: VoiceVisualPhase,
  recordingMaxMs: number,
  phaseProgress?: VoicePhaseProgress | null,
) {
  const [phaseStartedAt, setPhaseStartedAt] = React.useState(Date.now());
  const [now, setNow] = React.useState(Date.now());

  React.useEffect(() => {
    const startedAt = phaseProgress?.startedAt ?? Date.now();
    setPhaseStartedAt(startedAt);
    setNow(Date.now());

    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [phaseProgress?.startedAt, visualPhase]);

  if (visualPhase === "recording") {
    return formatClock(recordingMaxMs - (now - phaseStartedAt));
  }

  if (phaseProgress) {
    return formatLatencyCountdown(
      now - phaseProgress.startedAt,
      phaseProgress.estimatedMs,
    ).text;
  }

  return `+${formatClock(now - phaseStartedAt)}`;
}

export function PhaseAwareVoiceAction({
  colors,
  inputMode,
  onOpenStatusDetails,
  onPress,
  onPressIn,
  onPressOut,
  onStopPlayback,
  phaseLabel,
  phaseProgress,
  playbackActive = false,
  playbackPaused = false,
  recordingMaxMs,
  statusLabel,
  stopPlaybackLabel,
  t,
  visualPhase,
}: PhaseAwareVoiceActionProps) {
  const recordingProgress = useSharedValue(0);
  const phaseColor = getPhaseColor(visualPhase, colors);
  const timeLabel = usePhaseTimeLabel(
    visualPhase,
    recordingMaxMs,
    phaseProgress,
  );

  React.useEffect(() => {
    cancelAnimation(recordingProgress);
    recordingProgress.value = 0;

    if (visualPhase === "recording") {
      recordingProgress.value = withTiming(1, {
        duration: Math.max(1000, recordingMaxMs),
        easing: Easing.linear,
      });
    }

    return () => cancelAnimation(recordingProgress);
  }, [recordingMaxMs, recordingProgress, visualPhase]);

  const recordingFillStyle = useAnimatedStyle(() => ({
    width: `${recordingProgress.value * 100}%`,
  }));

  return (
    <View
      testID="voice-stage-action-surface"
      style={[
        styles.surface,
        {
          backgroundColor: phaseColor,
          borderColor: phaseColor,
        },
      ]}
    >
      {visualPhase === "recording" ? (
        <Animated.View
          testID="voice-stage-recording-fill"
          style={[
            styles.recordingFill,
            { backgroundColor: colors.phaseRecording },
            recordingFillStyle,
          ]}
        />
      ) : null}

      <TouchableOpacity
        testID="voice-stage-primary-action"
        accessibilityLabel={statusLabel}
        accessibilityRole="button"
        activeOpacity={0.84}
        onPress={inputMode === "toggle-to-talk" ? onPress : undefined}
        onPressIn={inputMode === "push-to-talk" ? onPressIn : undefined}
        onPressOut={inputMode === "push-to-talk" ? onPressOut : undefined}
        style={styles.primaryAction}
      >
        <View style={[styles.phaseIcon, { backgroundColor: colors.onAccent }]}>
          <Feather
            name={getPhaseIcon(visualPhase, playbackPaused)}
            size={21}
            color={
              visualPhase === "recording" ? colors.phaseRecording : phaseColor
            }
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        testID="voice-stage-status-details"
        accessibilityLabel={t("statusDetails")}
        accessibilityRole="button"
        activeOpacity={0.76}
        onPress={onOpenStatusDetails}
        style={styles.phaseLabelButton}
      >
        <Feather name="info" size={12} color={colors.onAccent} />
        <Text
          numberOfLines={1}
          style={[styles.phaseLabel, { color: colors.onAccent }]}
        >
          {phaseLabel}
        </Text>
      </TouchableOpacity>

      {playbackActive ? (
        <TouchableOpacity
          testID="voice-stage-stop-playback"
          accessibilityLabel={stopPlaybackLabel}
          accessibilityRole="button"
          activeOpacity={0.76}
          onPress={() => {
            void onStopPlayback?.();
          }}
          style={styles.stopButton}
        >
          <Feather name="square" size={13} color={colors.onAccent} />
        </TouchableOpacity>
      ) : (
        <Text
          testID="voice-stage-phase-time"
          numberOfLines={1}
          style={[styles.phaseTime, { color: colors.onAccent }]}
        >
          {timeLabel}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    width: "100%",
    minHeight: 68,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  recordingFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  primaryAction: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  phaseIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  phaseLabelButton: {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    maxWidth: "34%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  phaseLabel: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fonts.display,
  },
  phaseTime: {
    position: "absolute",
    right: 14,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fonts.mono,
  },
  stopButton: {
    position: "absolute",
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.48)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
});
