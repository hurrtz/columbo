import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  Keyboard,
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity as GestureTouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { WaveformBar } from "../../components/WaveformBar";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Colors } from "../../theme/colors";
import { textStyles } from "../../theme/typography";
import { InputMode, VoiceVisualPhase } from "../../types";

import { TranslateFn } from "./shared";

export type InputSurface = "voice" | "text";

interface VoiceTextInputPagerProps {
  colors: Colors;
  disabled: boolean;
  initialSurface?: InputSurface;
  initialTextMessage?: string;
  inputMode: InputMode;
  isActive: boolean;
  onInputSurfaceChange?: (surface: InputSurface) => void;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  onSubmitTextMessage: (text: string) => void;
  onTextMessageChange?: (text: string) => void;
  statusLabel: string;
  t: TranslateFn;
  visualPhase: VoiceVisualPhase;
}

const SURFACE_INDEX: Record<InputSurface, number> = {
  voice: 0,
  text: 1,
};

export function VoiceTextInputPager({
  colors,
  disabled,
  initialSurface = "voice",
  initialTextMessage = "",
  inputMode,
  isActive,
  onInputSurfaceChange,
  onPress,
  onPressIn,
  onPressOut,
  onSubmitTextMessage,
  onTextMessageChange,
  statusLabel,
  t,
  visualPhase,
}: VoiceTextInputPagerProps) {
  const { width: windowWidth } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const textInputRef = React.useRef<TextInput>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [activeSurface, setActiveSurface] =
    React.useState<InputSurface>(initialSurface);
  const [textFocused, setTextFocused] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState(initialTextMessage);
  const pageWidth = viewportWidth || Math.max(1, windowWidth - 32);
  const pageWidthShared = useSharedValue(pageWidth);
  const trackTranslateX = useSharedValue(0);
  const gestureStartX = useSharedValue(0);
  const activeSurfaceIndex = useSharedValue(0);
  const trimmedTextMessage = textMessage.trim();
  const hasTextMessage = trimmedTextMessage.length > 0;
  const textSubmitDisabled = disabled || isActive || !hasTextMessage;

  const focusTextInput = React.useCallback(() => {
    requestAnimationFrame(() => textInputRef.current?.focus());
  }, []);

  const applySurface = React.useCallback(
    (surface: InputSurface, focusText: boolean) => {
      setActiveSurface(surface);
      onInputSurfaceChange?.(surface);
      if (surface === "text" && focusText && !disabled && !isActive) {
        focusTextInput();
      } else if (surface === "voice") {
        Keyboard.dismiss();
      }
    },
    [disabled, focusTextInput, isActive, onInputSurfaceChange],
  );

  const handleTextMessageChange = React.useCallback(
    (text: string) => {
      setTextMessage(text);
      onTextMessageChange?.(text);
    },
    [onTextMessageChange],
  );

  const selectSurface = React.useCallback(
    (surface: InputSurface) => {
      const targetX = -SURFACE_INDEX[surface] * pageWidth;
      if (reducedMotion) {
        trackTranslateX.value = targetX;
        applySurface(surface, surface === "text");
        return;
      }

      trackTranslateX.value = withTiming(
        targetX,
        { duration: 220 },
        (finished) => {
          if (finished) {
            runOnJS(applySurface)(surface, surface === "text");
          }
        },
      );
    },
    [applySurface, pageWidth, reducedMotion, trackTranslateX],
  );

  React.useEffect(() => {
    pageWidthShared.value = pageWidth;
    activeSurfaceIndex.value = SURFACE_INDEX[activeSurface];
    trackTranslateX.value = -SURFACE_INDEX[activeSurface] * pageWidth;
  }, [
    activeSurface,
    activeSurfaceIndex,
    pageWidth,
    pageWidthShared,
    trackTranslateX,
  ]);

  React.useEffect(() => {
    if (isActive) {
      Keyboard.dismiss();
    }
  }, [isActive]);

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const nextWidth = Math.round(event.nativeEvent.layout.width);
    setViewportWidth((currentWidth) =>
      Math.abs(currentWidth - nextWidth) >= 1 ? nextWidth : currentWidth,
    );
  }, []);

  const textInputGesture = React.useMemo(
    () => Gesture.Native().disallowInterruption(false),
    [],
  );

  const panGesture = React.useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-12, 12])
        .failOffsetY([-14, 14])
        .simultaneousWithExternalGesture(textInputGesture)
        .onStart(() => {
          gestureStartX.value = trackTranslateX.value;
        })
        .onUpdate((event) => {
          const nextX = gestureStartX.value + event.translationX;
          trackTranslateX.value = Math.max(
            -pageWidthShared.value,
            Math.min(0, nextX),
          );
        })
        .onEnd((event) => {
          const projectedX = trackTranslateX.value + event.velocityX * 0.12;
          const nextSurface: InputSurface =
            projectedX <= -pageWidthShared.value / 2 ? "text" : "voice";
          const targetX = -SURFACE_INDEX[nextSurface] * pageWidthShared.value;

          if (reducedMotion) {
            trackTranslateX.value = targetX;
            runOnJS(applySurface)(nextSurface, nextSurface === "text");
            return;
          }

          trackTranslateX.value = withSpring(
            targetX,
            {
              damping: 22,
              mass: 0.72,
              stiffness: 230,
            },
            (finished) => {
              if (finished) {
                runOnJS(applySurface)(nextSurface, nextSurface === "text");
              }
            },
          );
        })
        .onFinalize((_event, success) => {
          if (success) {
            return;
          }

          const targetX =
            -activeSurfaceIndex.value * pageWidthShared.value;
          trackTranslateX.value = reducedMotion
            ? targetX
            : withSpring(targetX, {
                damping: 22,
                mass: 0.72,
                stiffness: 230,
              });
        }),
    [
      activeSurfaceIndex,
      applySurface,
      gestureStartX,
      pageWidthShared,
      reducedMotion,
      textInputGesture,
      trackTranslateX,
    ],
  );

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: trackTranslateX.value }],
  }));

  const handleSubmitTextMessage = React.useCallback(() => {
    if (textSubmitDisabled) {
      return;
    }

    onSubmitTextMessage(trimmedTextMessage);
    setTextMessage("");
    onTextMessageChange?.("");
    Keyboard.dismiss();
  }, [
    onSubmitTextMessage,
    onTextMessageChange,
    textSubmitDisabled,
    trimmedTextMessage,
  ]);

  if (isActive) {
    return (
      <WaveformBar
        isActive
        phase={visualPhase}
        statusLabel={statusLabel}
        inputMode={inputMode}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      />
    );
  }

  return (
    <View style={localStyles.root}>
      <View
        testID="voice-text-input-viewport"
        onLayout={handleLayout}
        style={localStyles.viewport}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            testID="voice-text-input-pager"
            style={[
              localStyles.track,
              { width: pageWidth * 2 },
              trackAnimatedStyle,
            ]}
          >
            <View
              accessibilityElementsHidden={activeSurface !== "voice"}
              importantForAccessibility={
                activeSurface === "voice" ? "yes" : "no-hide-descendants"
              }
              style={[localStyles.page, { width: pageWidth }]}
            >
              <GestureTouchableOpacity
                testID="voice-input-surface"
                accessibilityLabel={statusLabel}
                accessibilityRole="button"
                accessibilityState={{ disabled }}
                activeOpacity={0.84}
                disabled={disabled}
                onPress={inputMode === "toggle-to-talk" ? onPress : undefined}
                onPressIn={
                  inputMode === "push-to-talk" ? onPressIn : undefined
                }
                onPressOut={
                  inputMode === "push-to-talk" ? onPressOut : undefined
                }
                style={[
                  localStyles.voiceSurface,
                  {
                    backgroundColor: disabled
                      ? colors.surfaceAlt
                      : colors.bubbleUser,
                    borderColor: disabled ? colors.border : colors.bubbleUser,
                  },
                ]}
              >
                <View
                  style={[
                    localStyles.voiceIcon,
                    {
                      backgroundColor: disabled
                        ? colors.surfaceElevated
                        : colors.onAccent,
                    },
                  ]}
                >
                  <Feather
                    name="mic"
                    size={22}
                    color={disabled ? colors.textMuted : colors.accent}
                  />
                </View>
              </GestureTouchableOpacity>
            </View>

            <View
              accessibilityElementsHidden={activeSurface !== "text"}
              importantForAccessibility={
                activeSurface === "text" ? "yes" : "no-hide-descendants"
              }
              style={[localStyles.page, { width: pageWidth }]}
            >
              <View
                testID="text-input-surface"
                style={[
                  localStyles.textSurface,
                  {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: textFocused
                      ? colors.accent
                      : colors.borderStrong,
                    shadowColor: textFocused ? colors.glowStrong : colors.glow,
                  },
                ]}
              >
                <GestureDetector gesture={textInputGesture}>
                  <Animated.View style={localStyles.textInputWrap}>
                    <TextInput
                      ref={textInputRef}
                      testID="voice-text-input"
                      value={textMessage}
                      onBlur={() => setTextFocused(false)}
                      onChangeText={handleTextMessageChange}
                      onFocus={() => setTextFocused(true)}
                      placeholder={t("textMessagePlaceholder")}
                      placeholderTextColor={colors.textMuted}
                      editable={!disabled}
                      multiline
                      returnKeyType="send"
                      submitBehavior="submit"
                      onSubmitEditing={handleSubmitTextMessage}
                      style={[localStyles.textInput, { color: colors.text }]}
                    />
                  </Animated.View>
                </GestureDetector>
                <TouchableOpacity
                  testID="voice-text-primary-action"
                  accessibilityLabel={t("sendTextMessage")}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: textSubmitDisabled }}
                  disabled={textSubmitDisabled}
                  onPress={handleSubmitTextMessage}
                  activeOpacity={0.8}
                  style={[
                    localStyles.sendButton,
                    {
                      backgroundColor: textSubmitDisabled
                        ? colors.surfaceAlt
                        : colors.bubbleUser,
                    },
                  ]}
                >
                  <Feather
                    name="arrow-up"
                    size={19}
                    color={
                      textSubmitDisabled ? colors.textMuted : colors.onAccent
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={localStyles.pageIndicators}>
        {(["voice", "text"] as const).map((surface) => {
          const selected = activeSurface === surface;
          return (
            <TouchableOpacity
              key={surface}
              testID={`show-${surface}-input`}
              accessibilityLabel={
                surface === "voice"
                  ? t("showVoiceInput")
                  : t("showTextInput")
              }
              accessibilityRole="button"
              accessibilityState={{ selected }}
              activeOpacity={0.7}
              onPress={() => selectSurface(surface)}
              style={localStyles.pageIndicatorTarget}
            >
              <View
                style={[
                  localStyles.pageIndicator,
                  selected
                    ? localStyles.pageIndicatorSelected
                    : localStyles.pageIndicatorIdle,
                  {
                    backgroundColor: selected
                      ? colors.accent
                      : colors.borderStrong,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    width: "100%",
    gap: 2,
  },
  viewport: {
    width: "100%",
    overflow: "hidden",
  },
  track: {
    flexDirection: "row",
  },
  page: {
    justifyContent: "center",
  },
  voiceSurface: {
    width: "100%",
    minHeight: 68,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  voiceIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  textSurface: {
    width: "100%",
    minHeight: 68,
    maxHeight: 116,
    borderRadius: 15,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 16,
    paddingRight: 9,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  textInput: {
    ...textStyles.body,
    flex: 1,
    minHeight: 24,
    maxHeight: 96,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  textInputWrap: {
    flex: 1,
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  pageIndicators: {
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  pageIndicatorTarget: {
    width: 28,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  pageIndicator: {
    height: 4,
    borderRadius: 2,
  },
  pageIndicatorSelected: {
    width: 16,
  },
  pageIndicatorIdle: {
    width: 5,
  },
});
