import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { WaveformCircle } from "../../components/WaveformCircle";
import { PipelinePhase } from "../../hooks/useVoicePipeline";
import { Colors } from "../../theme/colors";
import {
  InputMode,
  VoiceVisualPhase,
} from "../../types";

import { formatThinkingStatus, isLongRunningPhase } from "./statusSelectors";
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
  circleSize?: number;
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
  pausePlaybackLabel?: string;
  pipelinePhase: PipelinePhase;
  playbackActive?: boolean;
  playbackPaused?: boolean;
  providerLabel: string;
  resumePlaybackLabel?: string;
  showStatusStrip?: boolean;
  statusDetail: string;
  statusIndicatorTone: string;
  statusTitle: string;
  stopPlaybackLabel?: string;
  t: TranslateFn;
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
  const displayedDetail = formatThinkingStatus({
    baseDetail: statusDetail,
    elapsedSeconds,
    reassurance: t("deepThinkingReassurance"),
    withElapsed: (detail, seconds) =>
      t("thinkingElapsed", { detail, seconds }),
  });
  // Portrait: let the status strip stretch to the full content width so it
  // lines up with the route card above. Landscape keeps a tighter cap.
  const statusStripMaxWidth =
    !fullWidth && layout === "landscape" ? 320 : undefined;

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
          {displayedDetail}
        </Text>
      </View>
      <View style={styles.statusStripActions}>
        {playbackActive ? (
          <>
            <TouchableOpacity
              style={[
                styles.statusStripInfoButton,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                void (playbackPaused ? onResumePlayback?.() : onPausePlayback?.());
              }}
              activeOpacity={0.85}
              accessibilityLabel={
                playbackPaused ? resumePlaybackLabel : pausePlaybackLabel
              }
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
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                void onStopPlayback?.();
              }}
              activeOpacity={0.85}
              accessibilityLabel={stopPlaybackLabel}
            >
              <Feather name="square" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          </>
        ) : null}
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
    </View>
  );
}

export function MainScreenVoiceStage({
  circleSize = 260,
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
  pausePlaybackLabel,
  pipelinePhase,
  playbackActive = false,
  playbackPaused = false,
  providerLabel,
  resumePlaybackLabel,
  showStatusStrip = true,
  statusDetail,
  statusIndicatorTone,
  statusTitle,
  stopPlaybackLabel,
  t,
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
            backgroundColor: disabled ? colors.borderStrong : colors.glowStrong,
            opacity: disabled ? 0.55 : 1,
          },
        ]}
      />
      <WaveformCircle
        disabled={disabled}
        isActive={isActive}
        phase={visualPhase}
        providerLabel={providerLabel}
        size={circleSize}
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
  );
}
