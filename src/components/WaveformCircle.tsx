import React from "react";
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Waveform } from "./Waveform";
import { styles } from "./WaveformCircle.styles";
import { NativeWaveformView } from "./NativeWaveformView";
import {
  InputMode,
  VoiceVisualPhase,
} from "../types";
import { RippleRing } from "./waveform/RippleRing";
import { useWaveformCircleAnimations } from "./waveform/useWaveformCircleAnimations";
import { useWaveformCircleState } from "./waveform/useWaveformCircleState";
import { useWaveformFrame } from "../state/waveformFeed";

interface WaveformCircleProps {
  isActive: boolean;
  disabled?: boolean;
  phase: VoiceVisualPhase;
  providerLabel: string;
  size?: number;
  inputMode: InputMode;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onPress?: () => void;
}

const BASE_SIZE = 260;
const DISABLED_GRADIENT_COLORS: [string, string, string] = [
  "rgba(148, 163, 184, 0.72)",
  "rgba(100, 116, 139, 0.82)",
  "rgba(71, 85, 105, 0.88)",
];

function scaleBy(size: number, value: number) {
  return (size / BASE_SIZE) * value;
}

export function WaveformCircle({
  isActive,
  disabled = false,
  phase,
  providerLabel: _providerLabel,
  size = BASE_SIZE,
  inputMode,
  onPressIn,
  onPressOut,
  onPress,
}: WaveformCircleProps) {
  const { metering, levels, variant: waveformVariant } = useWaveformFrame();
  const state = useWaveformCircleState({
    inputMode,
    isActive: isActive && !disabled,
    metering,
    phase,
    waveformVariant,
  });
  const animations = useWaveformCircleAnimations({
    gradientColors: disabled ? DISABLED_GRADIENT_COLORS : state.gradientColors,
    intensity: state.intensity,
    isRecording: state.isRecording,
    isSpeaking: state.isSpeaking,
    phase: state.phase,
    richMotion: state.richMotion,
    shouldAnimate: state.shouldAnimate,
    usesPreciseWaveform: state.usesPreciseWaveform,
  });
  const scale = size / BASE_SIZE;
  const outerRingSize = scaleBy(size, 244);
  const innerRingSize = scaleBy(size, 208);
  const circleSize = scaleBy(size, 188);
  const innerFrameInset = scaleBy(size, 14);
  const waveformMarginTop = scaleBy(size, 18);
  const nativeWaveformWidth = scaleBy(size, 164);
  const nativeWaveformHeight = scaleBy(size, 84);
  const backgroundInset = scaleBy(size, -30);
  const backgroundRadius = scaleBy(size, 124);
  const recordingRadius = scaleBy(size, 94);
  const coreAuraSize = scaleBy(size, 144);
  const coreAuraRadius = scaleBy(size, 72);
  const sheenWidth = scaleBy(size, 210);
  const sheenHeight = scaleBy(size, 72);
  const controlIconSize = Math.max(20, Math.round(state.controlIconSize * scale));
  const gradientColors: [string, string, string] = disabled
    ? DISABLED_GRADIENT_COLORS
    : state.gradientColors;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.staticRing,
          styles.staticRingOuter,
          {
            width: outerRingSize,
            height: outerRingSize,
            borderRadius: outerRingSize / 2,
          },
          {
            borderColor: disabled
              ? "rgba(148, 163, 184, 0.22)"
              : state.ringBorderColor,
          },
          animations.outerRingStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.staticRing,
          styles.staticRingInner,
          {
            width: innerRingSize,
            height: innerRingSize,
            borderRadius: innerRingSize / 2,
          },
          {
            borderColor: disabled
              ? "rgba(148, 163, 184, 0.28)"
              : state.innerRingBorderColor,
          },
          animations.innerRingStyle,
        ]}
      />
      <RippleRing
        delay={0}
        color={disabled ? "rgba(148, 163, 184, 0.42)" : state.ringColor}
        isActive={!disabled && state.shouldAnimate && state.isRecording}
        intensity={state.intensity}
        scale={scale}
      />
      <RippleRing
        delay={500}
        color={disabled ? "rgba(148, 163, 184, 0.42)" : state.ringColor}
        isActive={!disabled && state.shouldAnimate && state.isRecording}
        intensity={state.intensity}
        scale={scale}
      />
      <RippleRing
        delay={1000}
        color={disabled ? "rgba(148, 163, 184, 0.42)" : state.ringColor}
        isActive={!disabled && state.shouldAnimate && state.isRecording}
        intensity={state.intensity}
        scale={scale}
      />
      <View
        style={[
          styles.shadowWrap,
          disabled ? styles.disabledCircleShell : null,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            shadowColor: disabled
              ? "rgba(100, 116, 139, 0.18)"
              : state.shellShadowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: disabled ? 0.28 : isActive ? 1 : 0.55,
            shadowRadius: isActive && !disabled
              ? scaleBy(size, 28)
              : scaleBy(size, 18),
            elevation: Math.max(
              6,
              Math.round(
                isActive && !disabled ? scaleBy(size, 14) : scaleBy(size, 8),
              ),
            ),
          },
        ]}
      >
        <Animated.View style={animations.circleShellStyle}>
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.9}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPressIn={
              !disabled && inputMode === "push-to-talk" ? onPressIn : undefined
            }
            onPressOut={
              !disabled && inputMode === "push-to-talk" ? onPressOut : undefined
            }
            onPress={
              !disabled && inputMode === "toggle-to-talk" ? onPress : undefined
            }
          >
            <View
              style={[
                styles.circle,
                {
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2,
                },
              ]}
            >
            <Animated.View
              pointerEvents="none"
              style={[
                styles.backgroundGradient,
                {
                  top: backgroundInset,
                  right: backgroundInset,
                  bottom: backgroundInset,
                  left: backgroundInset,
                },
                animations.backgroundGradientStyle,
              ]}
            >
              <LinearGradient
                colors={gradientColors}
                locations={[0, 0.58, 1]}
                start={{ x: 0.12, y: 0 }}
                end={{ x: 0.88, y: 1 }}
                style={[
                  styles.backgroundGradientFill,
                  { borderRadius: backgroundRadius },
                ]}
              />
            </Animated.View>
            {animations.previousGradientColors ? (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.backgroundGradient,
                  {
                    top: backgroundInset,
                    right: backgroundInset,
                    bottom: backgroundInset,
                    left: backgroundInset,
                  },
                  animations.backgroundGradientStyle,
                  animations.previousBackgroundGradientStyle,
                ]}
              >
                <LinearGradient
                  colors={animations.previousGradientColors}
                  locations={[0, 0.58, 1]}
                  start={{ x: 0.12, y: 0 }}
                  end={{ x: 0.88, y: 1 }}
                  style={[
                    styles.backgroundGradientFill,
                    { borderRadius: backgroundRadius },
                  ]}
                />
              </Animated.View>
            ) : null}
            <Animated.View
              style={[
                styles.coreAura,
                styles.coreAuraTop,
                {
                  width: coreAuraSize,
                  height: coreAuraSize,
                  borderRadius: coreAuraRadius,
                  top: scaleBy(size, 12),
                  left: scaleBy(size, 18),
                },
                animations.topAuraStyle,
              ]}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.34)", "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.auraFill}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.coreAura,
                styles.coreAuraBottom,
                {
                  width: coreAuraSize,
                  height: coreAuraSize,
                  borderRadius: coreAuraRadius,
                  bottom: scaleBy(size, 10),
                  right: scaleBy(size, 12),
                },
                animations.bottomAuraStyle,
              ]}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.auraFill}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.sheen,
                {
                  width: sheenWidth,
                  height: sheenHeight,
                  borderRadius: sheenHeight / 2,
                  top: scaleBy(size, 24),
                  left: scaleBy(size, -4),
                },
                animations.sheenStyle,
              ]}
            >
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0)",
                  "rgba(255,255,255,0.24)",
                  "rgba(255,255,255,0)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.auraFill}
              />
            </Animated.View>
            {phase !== "idle" ? (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.recordingGradientOverlay,
                  animations.activityGradientOverlayStyle,
                ]}
              >
                <LinearGradient
                  colors={state.activityOverlayColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.recordingGradientOverlayFill,
                    { borderRadius: recordingRadius },
                  ]}
                />
              </Animated.View>
            ) : null}
            <View
              style={[
                styles.innerFrame,
                {
                  top: innerFrameInset,
                  right: innerFrameInset,
                  bottom: innerFrameInset,
                  left: innerFrameInset,
                  borderRadius: scaleBy(size, 80),
                },
                {
                  borderColor: disabled
                    ? "rgba(226, 232, 240, 0.18)"
                    : state.innerFrameBorderColor,
                },
              ]}
            />
            {state.showsStaticControlState ? (
              <Animated.View style={[styles.micIconWrap, animations.controlIconStyle]}>
                <Feather
                  name={state.controlIconName}
                  size={controlIconSize}
                  color={
                    disabled
                      ? "rgba(226, 232, 240, 0.62)"
                      : "rgba(255, 255, 255, 0.96)"
                  }
                />
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  styles.waveformWrap,
                  { marginTop: waveformMarginTop },
                  waveformVariant === "oscilloscope"
                    ? styles.waveformWrapOscilloscope
                    : null,
                  animations.waveformStyle,
                ]}
              >
                {state.nativeWaveformChannel ? (
                  <NativeWaveformView
                    channel={state.nativeWaveformChannel}
                    active={isActive}
                    lineColor="rgba(255, 255, 255, 0.95)"
                    baselineColor="rgba(255, 255, 255, 0.14)"
                    lineWidth={state.nativeWaveformChannel === "output" ? 1.8 : 1.9}
                    renderStyle={
                      state.nativeWaveformChannel === "output"
                        ? "envelope"
                        : "automatic"
                    }
                    style={[
                      styles.nativeWaveform,
                      state.nativeWaveformChannel === "output"
                        ? styles.nativeWaveformOutput
                        : styles.nativeWaveformInput,
                      {
                        width: nativeWaveformWidth,
                        height: nativeWaveformHeight,
                      },
                    ]}
                  />
                ) : (
                  <Waveform
                    metering={metering}
                    levels={levels}
                    maxHeight={
                      scale *
                      (state.showsOutputBars
                        ? 62
                        : waveformVariant === "oscilloscope"
                          ? 86
                          : state.isSpeaking
                            ? 60
                            : 66)
                    }
                    barCount={
                      state.showsOutputBars
                        ? 22
                        : waveformVariant === "oscilloscope"
                          ? 78
                          : 19
                    }
                    barWidth={
                      scale *
                      (state.showsOutputBars
                        ? 4.5
                        : waveformVariant === "oscilloscope"
                          ? 1.75
                          : 4)
                    }
                    barGap={
                      scale *
                      (state.showsOutputBars
                        ? 2.2
                        : waveformVariant === "oscilloscope"
                          ? 0.45
                          : 2)
                    }
                    barColor="rgba(255, 255, 255, 0.96)"
                    barColorInactive="rgba(255, 255, 255, 0.46)"
                    isActive={isActive}
                    variant={state.showsOutputBars ? "bars" : waveformVariant}
                  />
                )}
              </Animated.View>
            )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
