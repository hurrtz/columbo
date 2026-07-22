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

const t = ((key: string) => {
  const copy: Record<string, string> = {
    textMessagePlaceholder: "Type a message",
    sendTextMessage: "Send message",
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

  it("uses one trailing action that switches from microphone to send", () => {
    const dismissKeyboard = jest
      .spyOn(Keyboard, "dismiss")
      .mockImplementation(() => undefined);
    const onPress = jest.fn();
    const onSubmitTextMessage = jest.fn();
    const screen = render(
      <MainScreenVoiceStage
        {...createProps({ onPress, onSubmitTextMessage })}
      />,
    );

    const input = screen.getByPlaceholderText("Type a message");
    expect(StyleSheet.flatten(input.props.style)).toEqual(
      expect.objectContaining({
        minHeight: 20,
        paddingVertical: 0,
        textAlignVertical: "center",
      }),
    );
    expect(screen.getByLabelText("Tap to speak")).toBeTruthy();
    expect(screen.getByText("icon:mic")).toBeTruthy();
    expect(
      StyleSheet.flatten(
        screen.getByTestId("voice-text-primary-action").props.style,
      ).backgroundColor,
    ).toBe(lightColors.bubbleUser);

    fireEvent.press(screen.getByTestId("voice-text-primary-action"));
    expect(onPress).toHaveBeenCalledTimes(1);

    fireEvent.changeText(input, "  Hello Columbo  ");
    expect(screen.getByLabelText("Send message")).toBeTruthy();
    expect(screen.getByText("icon:arrow-up")).toBeTruthy();

    fireEvent.press(screen.getByTestId("voice-text-primary-action"));
    expect(onSubmitTextMessage).toHaveBeenCalledWith("Hello Columbo");
    expect(dismissKeyboard).toHaveBeenCalledTimes(1);
    expect(input.props.value).toBe("");
    expect(screen.getByLabelText("Tap to speak")).toBeTruthy();
    dismissKeyboard.mockRestore();
  });

  it("preserves push-to-talk press boundaries on the shared action", () => {
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

    const action = screen.getByTestId("voice-text-primary-action");
    fireEvent(action, "pressIn");
    fireEvent(action, "pressOut");
    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it("replaces the composer with the live waveform while active", () => {
    const screen = render(
      <MainScreenVoiceStage {...createProps({ isActive: true })} />,
    );

    expect(screen.getByTestId("active-waveform")).toBeTruthy();
    expect(screen.queryByPlaceholderText("Type a message")).toBeNull();
  });
});
