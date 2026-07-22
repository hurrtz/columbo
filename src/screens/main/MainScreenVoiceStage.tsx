import React from "react";
import {
  Animated,
  Text,
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
import {
  InputSurface,
  VoiceTextInputPager,
} from "./VoiceTextInputPager";

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
  initialInputSurface?: InputSurface;
  initialTextMessage?: string;
  inputMode: InputMode;
  isActive: boolean;
  layout?: "portrait" | "landscape";
  onOpenStatusDetails: () => void;
  onInputSurfaceChange?: (surface: InputSurface) => void;
  onPausePlayback?: () => void | Promise<void>;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  onResumePlayback?: () => void | Promise<void>;
  onStopPlayback?: () => void | Promise<void>;
  onSubmitTextMessage?: (text: string) => void;
  onTextMessageChange?: (text: string) => void;
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
  initialInputSurface,
  initialTextMessage,
  inputMode,
  isActive,
  layout = "portrait",
  onOpenStatusDetails,
  onInputSurfaceChange,
  onPausePlayback,
  onPress,
  onPressIn,
  onPressOut,
  onResumePlayback,
  onStopPlayback,
  onSubmitTextMessage,
  onTextMessageChange,
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
  const progressCopy = usePhaseProgressCopy(
    phaseProgress,
    t("speechEtaCountdown"),
    t("speechEtaOvertime"),
  );

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
        {!onSubmitTextMessage ? (
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
          <VoiceTextInputPager
            colors={colors}
            disabled={disabled}
            initialSurface={initialInputSurface}
            initialTextMessage={initialTextMessage}
            inputMode={inputMode}
            isActive={isActive}
            onInputSurfaceChange={onInputSurfaceChange}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onSubmitTextMessage={onSubmitTextMessage}
            onTextMessageChange={onTextMessageChange}
            statusLabel={progressCopy ?? statusTitle}
            t={t}
            visualPhase={visualPhase}
          />
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
