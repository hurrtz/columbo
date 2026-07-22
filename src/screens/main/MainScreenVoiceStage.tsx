import React from "react";
import {
  Animated,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { WaveformBar } from "../../components/WaveformBar";
import { PipelinePhase } from "../../hooks/useVoicePipeline";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Colors } from "../../theme/colors";
import { InputMode, VoicePhaseProgress, VoiceVisualPhase } from "../../types";
import { formatLatencyCountdown } from "../../utils/latencyDisplay";

import {
  formatThinkingStatus,
  isLongRunningPhase,
  isPipelineWorking,
} from "./statusSelectors";
import { TranslateFn } from "./shared";
import { styles } from "./styles";

/**
 * Tracks how many whole seconds the pipeline has spent in a long-running phase
 * (thinking/searching/synthesizing). Resets to 0 whenever the phase leaves the
 * long-running set, and the interval is cleared on unmount.
 */
function useLongRunningElapsedSeconds(pipelinePhase: PipelinePhase): number {
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  React.useEffect(() => {
    if (!isLongRunningPhase(pipelinePhase)) {
      setElapsedSeconds(0);
      return;
    }

    setElapsedSeconds(0);
    const startedAt = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [pipelinePhase]);

  return elapsedSeconds;
}

interface MainScreenVoiceStageProps {
  colors: Colors;
  disabled?: boolean;
  inputMode: InputMode;
  isActive: boolean;
  layout?: "portrait" | "landscape";
  onOpenStatusDetails: () => void;
  onPausePlayback?: () => void | Promise<void>;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  onResumePlayback?: () => void | Promise<void>;
  onStopPlayback?: () => void | Promise<void>;
  onSubmitTextMessage?: (text: string) => void;
  pausePlaybackLabel?: string;
  phaseProgress?: VoicePhaseProgress | null;
  pipelinePhase: PipelinePhase;
  playbackActive?: boolean;
  playbackPaused?: boolean;
  resumePlaybackLabel?: string;
  showStatusStrip?: boolean;
  statusDetail: string;
  statusIndicatorTone: string;
  statusTitle: string;
  stopPlaybackLabel?: string;
  t: TranslateFn;
  visualPhase: VoiceVisualPhase;
}

function usePhaseProgressCopy(
  phaseProgress: VoicePhaseProgress | null | undefined,
  countdownLabel: string,
  overtimeLabel: string,
) {
  const [now, setNow] = React.useState(Date.now());

  React.useEffect(() => {
    if (!phaseProgress) {
      return;
    }

    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [phaseProgress?.startedAt]);

  if (!phaseProgress) {
    return null;
  }

  const countdown = formatLatencyCountdown(
    Math.max(0, now - phaseProgress.startedAt),
    phaseProgress.estimatedMs,
  );

  return `${countdown.overtime ? overtimeLabel : countdownLabel} · ${countdown.text}`;
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
      return colors.textMuted;
  }
}

interface MainScreenStatusStripProps {
  colors: Colors;
  fullWidth?: boolean;
  layout?: "portrait" | "landscape";
  onOpenStatusDetails: () => void;
  onPausePlayback?: () => void | Promise<void>;
  onResumePlayback?: () => void | Promise<void>;
  onStopPlayback?: () => void | Promise<void>;
  pausePlaybackLabel?: string;
  pipelinePhase: PipelinePhase;
  playbackActive?: boolean;
  playbackPaused?: boolean;
  resumePlaybackLabel?: string;
  statusDetail: string;
  statusIndicatorTone: string;
  statusTitle: string;
  stopPlaybackLabel?: string;
  t: TranslateFn;
}

export function MainScreenStatusStrip({
  colors,
  fullWidth = false,
  layout = "portrait",
  onOpenStatusDetails,
  onPausePlayback,
  onResumePlayback,
  onStopPlayback,
  pausePlaybackLabel = "Pause",
  pipelinePhase,
  playbackActive = false,
  playbackPaused = false,
  resumePlaybackLabel = "Resume",
  statusDetail,
  statusIndicatorTone,
  statusTitle,
  stopPlaybackLabel = "Stop",
  t,
}: MainScreenStatusStripProps) {
  const elapsedSeconds = useLongRunningElapsedSeconds(pipelinePhase);
  const workingPulse = React.useRef(new Animated.Value(1)).current;
  const pipelineWorking = isPipelineWorking(pipelinePhase);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (!pipelineWorking || reducedMotion) {
      workingPulse.stopAnimation();
      workingPulse.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(workingPulse, {
          duration: 700,
          toValue: 0.35,
          useNativeDriver: true,
        }),
        Animated.timing(workingPulse, {
          duration: 700,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [pipelineWorking, reducedMotion, workingPulse]);
  const displayedDetail = formatThinkingStatus({
    baseDetail: statusDetail,
    elapsedSeconds,
    reassurance: t("deepThinkingReassurance"),
    withElapsed: (detail, seconds) => t("thinkingElapsed", { detail, seconds }),
  });
  // Portrait: let the status strip stretch to the full content width so it
  // lines up with the route card above. Landscape keeps a tighter cap.
  const statusStripMaxWidth =
    !fullWidth && layout === "landscape" ? 320 : undefined;

  return (
    <View
      testID="main-screen-status-strip"
      style={[
        styles.statusStrip,
        layout === "landscape" ? styles.statusStripLandscape : null,
        fullWidth ? styles.statusStripFullWidth : null,
        {
          backgroundColor:
            layout === "landscape" ? "transparent" : colors.surface,
          borderColor: colors.border,
          maxWidth: statusStripMaxWidth,
          shadowColor: colors.glow,
        },
      ]}
    >
      <View style={styles.statusStripCopy}>
        <View style={styles.statusStripLead}>
          <Animated.View
            style={[
              styles.statusStripDot,
              {
                backgroundColor: getStatusIndicatorColor(
                  statusIndicatorTone,
                  colors,
                ),
                opacity: workingPulse,
                transform: [
                  {
                    scale: workingPulse.interpolate({
                      inputRange: [0.35, 1],
                      outputRange: [0.82, 1.25],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text
            testID="voice-stage-status-title"
            style={[styles.statusStripTitle, { color: colors.text }]}
          >
            {statusTitle}
          </Text>
        </View>
        <Text
          style={[styles.statusStripDetail, { color: colors.textSecondary }]}
        >
          {displayedDetail}
        </Text>
      </View>
      <View style={styles.statusStripActions}>
        {playbackActive ? (
          <>
            <TouchableOpacity
              style={[
                styles.statusStripInfoButton,
                layout === "landscape"
                  ? styles.statusStripUtilityButtonLandscape
                  : null,
                {
                  backgroundColor:
                    layout === "landscape"
                      ? "transparent"
                      : colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                void (playbackPaused
                  ? onResumePlayback?.()
                  : onPausePlayback?.());
              }}
              activeOpacity={0.85}
              accessibilityLabel={
                playbackPaused ? resumePlaybackLabel : pausePlaybackLabel
              }
              accessibilityRole="button"
            >
              <Feather
                name={playbackPaused ? "play" : "pause"}
                size={16}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusStripInfoButton,
                layout === "landscape"
                  ? styles.statusStripUtilityButtonLandscape
                  : null,
                {
                  backgroundColor:
                    layout === "landscape"
                      ? "transparent"
                      : colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                void onStopPlayback?.();
              }}
              activeOpacity={0.85}
              accessibilityLabel={stopPlaybackLabel}
              accessibilityRole="button"
            >
              <Feather name="square" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          </>
        ) : null}
        <TouchableOpacity
          style={[
            styles.statusStripInfoButton,
            layout === "landscape"
              ? styles.statusStripUtilityButtonLandscape
              : null,
            {
              backgroundColor:
                layout === "landscape" ? "transparent" : colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
          onPress={onOpenStatusDetails}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={t("statusDetails")}
        >
          <Feather name="info" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function MainScreenVoiceStage({
  colors,
  disabled = false,
  inputMode,
  isActive,
  layout = "portrait",
  onOpenStatusDetails,
  onPausePlayback,
  onPress,
  onPressIn,
  onPressOut,
  onResumePlayback,
  onStopPlayback,
  onSubmitTextMessage,
  pausePlaybackLabel,
  phaseProgress,
  pipelinePhase,
  playbackActive = false,
  playbackPaused = false,
  resumePlaybackLabel,
  showStatusStrip = true,
  statusDetail,
  statusIndicatorTone,
  statusTitle,
  stopPlaybackLabel,
  t,
  visualPhase,
}: MainScreenVoiceStageProps) {
  const [textMessage, setTextMessage] = React.useState("");
  const trimmedTextMessage = textMessage.trim();
  const hasTextMessage = trimmedTextMessage.length > 0;
  const textSubmitDisabled = disabled || isActive || !trimmedTextMessage;
  const progressCopy = usePhaseProgressCopy(
    phaseProgress,
    t("speechEtaCountdown"),
    t("speechEtaOvertime"),
  );
  const handleSubmitTextMessage = React.useCallback(() => {
    if (textSubmitDisabled || !onSubmitTextMessage) {
      return;
    }

    onSubmitTextMessage(trimmedTextMessage);
    setTextMessage("");
    Keyboard.dismiss();
  }, [onSubmitTextMessage, textSubmitDisabled, trimmedTextMessage]);

  return (
    <View
      style={[
        styles.stageBlock,
        layout === "landscape" ? styles.stageBlockLandscape : null,
      ]}
    >
      <View
        style={[
          styles.voiceDock,
          {
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ]}
      >
        {isActive || !onSubmitTextMessage ? (
          <WaveformBar
            isActive={isActive}
            phase={visualPhase}
            statusLabel={progressCopy ?? statusTitle}
            inputMode={inputMode}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
          />
        ) : (
          <View
            testID="voice-text-composer"
            style={[
              styles.voiceDockComposer,
              {
                backgroundColor: colors.surfaceElevated,
                borderColor: colors.border,
              },
            ]}
          >
            <TextInput
              testID="voice-text-input"
              value={textMessage}
              onChangeText={setTextMessage}
              placeholder={t("textMessagePlaceholder")}
              placeholderTextColor={colors.textMuted}
              editable={!disabled}
              multiline
              returnKeyType="send"
              submitBehavior="submit"
              onSubmitEditing={handleSubmitTextMessage}
              style={[styles.voiceDockInput, { color: colors.text }]}
            />
            <TouchableOpacity
              testID="voice-text-primary-action"
              accessibilityLabel={
                hasTextMessage ? t("sendTextMessage") : statusTitle
              }
              accessibilityRole="button"
              accessibilityState={{ disabled }}
              disabled={disabled}
              onPress={
                hasTextMessage
                  ? handleSubmitTextMessage
                  : inputMode === "toggle-to-talk"
                    ? onPress
                    : undefined
              }
              onPressIn={
                !hasTextMessage && inputMode === "push-to-talk"
                  ? onPressIn
                  : undefined
              }
              onPressOut={
                !hasTextMessage && inputMode === "push-to-talk"
                  ? onPressOut
                  : undefined
              }
              activeOpacity={0.8}
              style={[
                styles.voiceDockPrimaryButton,
                {
                  backgroundColor: disabled
                    ? colors.surfaceAlt
                    : colors.bubbleUser,
                },
              ]}
            >
              <Feather
                name={hasTextMessage ? "arrow-up" : "mic"}
                size={18}
                color={disabled ? colors.textMuted : colors.onAccent}
              />
            </TouchableOpacity>
          </View>
        )}
        {showStatusStrip && isActive ? (
          <MainScreenStatusStrip
            colors={colors}
            layout={layout}
            onOpenStatusDetails={onOpenStatusDetails}
            onPausePlayback={onPausePlayback}
            onResumePlayback={onResumePlayback}
            onStopPlayback={onStopPlayback}
            pausePlaybackLabel={pausePlaybackLabel}
            pipelinePhase={pipelinePhase}
            playbackActive={playbackActive}
            playbackPaused={playbackPaused}
            resumePlaybackLabel={resumePlaybackLabel}
            statusDetail={statusDetail}
            statusIndicatorTone={statusIndicatorTone}
            statusTitle={statusTitle}
            stopPlaybackLabel={stopPlaybackLabel}
            t={t}
          />
        ) : null}
      </View>
    </View>
  );
}
