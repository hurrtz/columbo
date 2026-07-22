import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Keyboard, StyleSheet } from "react-native";

import {
  MainScreenStatusStrip,
  MainScreenVoiceStage,
} from "../../../src/screens/main/MainScreenVoiceStage";
import { TranslateFn } from "../../../src/screens/main/shared";
import { lightColors } from "../../../src/theme/colors";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ name }: { name: string }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `icon:${name}`);
  },
}));

jest.mock("../../../src/components/WaveformBar", () => ({
  WaveformBar: ({ statusLabel }: { statusLabel?: string }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(
      Text,
      { testID: "active-waveform" },
      statusLabel,
    );
  },
}));

jest.mock("../../../src/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const chain = {
    activeOffsetX: () => chain,
    disallowInterruption: () => chain,
    failOffsetY: () => chain,
    onEnd: () => chain,
    onFinalize: () => chain,
    onStart: () => chain,
    onUpdate: () => chain,
    simultaneousWithExternalGesture: () => chain,
  };
  return {
    Gesture: { Native: () => chain, Pan: () => chain },
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    TouchableOpacity: require("react-native").TouchableOpacity,
  };
});

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: { View },
    runOnJS: (callback: (...args: unknown[]) => unknown) => callback,
    useAnimatedStyle: (factory: () => unknown) => factory(),
    useSharedValue: (value: unknown) => ({ value }),
    withSpring: (
      value: unknown,
      _configuration: unknown,
      callback?: (finished: boolean) => void,
    ) => {
      callback?.(true);
      return value;
    },
    withTiming: (
      value: unknown,
      _configuration: unknown,
      callback?: (finished: boolean) => void,
    ) => {
      callback?.(true);
      return value;
    },
  };
});

const t = ((key: string) => {
  const copy: Record<string, string> = {
    textMessagePlaceholder: "Type a message",
    sendTextMessage: "Send message",
    showVoiceInput: "Show voice input",
    showTextInput: "Show text input",
    speechEtaCountdown: "About",
    speechEtaOvertime: "Still working",
  };
  return copy[key] ?? key;
}) as TranslateFn;

function createProps(overrides: Record<string, unknown> = {}) {
  return {
    colors: lightColors,
    inputMode: "toggle-to-talk" as const,
    isActive: false,
    onOpenStatusDetails: jest.fn(),
    onPress: jest.fn(),
    onPressIn: jest.fn(),
    onPressOut: jest.fn(),
    onSubmitTextMessage: jest.fn(),
    pipelinePhase: "idle" as const,
    showStatusStrip: false,
    statusDetail: "Ready",
    statusIndicatorTone: "muted",
    statusTitle: "Tap to speak",
    t,
    visualPhase: "idle" as const,
    ...overrides,
  };
}

describe("MainScreenVoiceStage composer", () => {
  it("keeps the landscape status surface full width with horizontal padding", () => {
    const screen = render(
      <MainScreenStatusStrip
        colors={lightColors}
        fullWidth
        layout="landscape"
        onOpenStatusDetails={jest.fn()}
        pipelinePhase="idle"
        statusDetail="30 messages"
        statusIndicatorTone="muted"
        statusTitle="Tap to speak"
        t={t}
      />,
    );

    expect(
      StyleSheet.flatten(
        screen.getByTestId("main-screen-status-strip").props.style,
      ),
    ).toEqual(
      expect.objectContaining({
        alignSelf: "stretch",
        backgroundColor: "transparent",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingLeft: 16,
        paddingRight: 8,
        width: "100%",
      }),
    );
    expect(
      StyleSheet.flatten(screen.getByLabelText("statusDetails").props.style),
    ).toEqual(
      expect.objectContaining({
        backgroundColor: "transparent",
        borderWidth: 0,
      }),
    );
  });

  it("starts with a prominent full-width voice surface", () => {
    const onPress = jest.fn();
    const screen = render(
      <MainScreenVoiceStage {...createProps({ onPress })} />,
    );

    expect(screen.getByTestId("voice-input-surface")).toBeTruthy();
    expect(screen.getByLabelText("Tap to speak")).toBeTruthy();
    expect(screen.queryByText("Tap to speak")).toBeNull();
    expect(screen.getByText("icon:mic")).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByTestId("voice-input-surface").props.style),
    ).toEqual(
      expect.objectContaining({
        backgroundColor: lightColors.bubbleUser,
        minHeight: 68,
        width: "100%",
      }),
    );
    expect(
      screen.getByLabelText("Show voice input").props.accessibilityState,
    ).toEqual({ selected: true });

    fireEvent.press(screen.getByTestId("voice-input-surface"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("moves to a visually separate full-width text composer", () => {
    const screen = render(<MainScreenVoiceStage {...createProps()} />);
    fireEvent(screen.getByTestId("voice-text-input-viewport"), "layout", {
      nativeEvent: { layout: { width: 320 } },
    });

    fireEvent.press(screen.getByLabelText("Show text input"));

    expect(
      screen.getByLabelText("Show text input").props.accessibilityState,
    ).toEqual({ selected: true });
    expect(
      StyleSheet.flatten(screen.getByTestId("text-input-surface").props.style),
    ).toEqual(
      expect.objectContaining({
        minHeight: 68,
        width: "100%",
      }),
    );
  });

  it("submits text without turning the text composer into a voice control", () => {
    const dismissKeyboard = jest
      .spyOn(Keyboard, "dismiss")
      .mockImplementation(() => undefined);
    const onSubmitTextMessage = jest.fn();
    const screen = render(
      <MainScreenVoiceStage
        {...createProps({ onSubmitTextMessage })}
      />,
    );

    fireEvent.press(screen.getByLabelText("Show text input"));
    const input = screen.getByPlaceholderText("Type a message");
    expect(StyleSheet.flatten(input.props.style)).toEqual(
      expect.objectContaining({
        minHeight: 24,
        paddingVertical: 0,
        textAlignVertical: "center",
      }),
    );
    expect(
      screen.getByLabelText("Send message").props.accessibilityState,
    ).toEqual({ disabled: true });
    expect(screen.getByText("icon:arrow-up")).toBeTruthy();
    expect(
      StyleSheet.flatten(
        screen.getByTestId("voice-text-primary-action").props.style,
      ).backgroundColor,
    ).toBe(lightColors.surfaceAlt);

    fireEvent.changeText(input, "  Hello Columbo  ");
    expect(screen.getByLabelText("Send message")).toBeTruthy();
    expect(screen.getByText("icon:arrow-up")).toBeTruthy();

    fireEvent.press(screen.getByTestId("voice-text-primary-action"));
    expect(onSubmitTextMessage).toHaveBeenCalledWith("Hello Columbo");
    expect(dismissKeyboard).toHaveBeenCalledTimes(1);
    expect(input.props.value).toBe("");
    dismissKeyboard.mockRestore();
  });

  it("preserves push-to-talk press boundaries on the voice surface", () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const screen = render(
      <MainScreenVoiceStage
        {...createProps({
          inputMode: "push-to-talk",
          onPressIn,
          onPressOut,
        })}
      />,
    );

    const action = screen.getByTestId("voice-input-surface");
    fireEvent(action, "pressIn");
    fireEvent(action, "pressOut");
    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it("preserves an unfinished text draft while the pipeline is active", () => {
    const props = createProps();
    const screen = render(<MainScreenVoiceStage {...props} />);
    fireEvent.press(screen.getByLabelText("Show text input"));
    fireEvent.changeText(
      screen.getByPlaceholderText("Type a message"),
      "Keep this draft",
    );

    screen.rerender(<MainScreenVoiceStage {...props} isActive />);
    expect(screen.getByTestId("active-waveform")).toBeTruthy();

    screen.rerender(<MainScreenVoiceStage {...props} isActive={false} />);
    expect(screen.getByPlaceholderText("Type a message").props.value).toBe(
      "Keep this draft",
    );
    expect(
      screen.getByLabelText("Show text input").props.accessibilityState,
    ).toEqual({ selected: true });
  });

  it("restores the selected surface and draft after a layout remount", () => {
    let rememberedSurface: "voice" | "text" = "voice";
    let rememberedDraft = "";
    const firstScreen = render(
      <MainScreenVoiceStage
        {...createProps({
          onInputSurfaceChange: (surface: "voice" | "text") => {
            rememberedSurface = surface;
          },
          onTextMessageChange: (text: string) => {
            rememberedDraft = text;
          },
        })}
      />,
    );
    fireEvent.press(firstScreen.getByLabelText("Show text input"));
    fireEvent.changeText(
      firstScreen.getByPlaceholderText("Type a message"),
      "Survive rotation",
    );
    firstScreen.unmount();

    const secondScreen = render(
      <MainScreenVoiceStage
        {...createProps({
          initialInputSurface: rememberedSurface,
          initialTextMessage: rememberedDraft,
        })}
      />,
    );

    expect(
      secondScreen.getByLabelText("Show text input").props.accessibilityState,
    ).toEqual({ selected: true });
    expect(
      secondScreen.getByPlaceholderText("Type a message").props.value,
    ).toBe("Survive rotation");
  });

  it("replaces the composer with the live waveform while active", () => {
    const screen = render(
      <MainScreenVoiceStage {...createProps({ isActive: true })} />,
    );

    expect(screen.getByTestId("active-waveform")).toBeTruthy();
    expect(screen.queryByPlaceholderText("Type a message")).toBeNull();
  });
});
