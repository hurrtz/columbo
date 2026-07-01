import React from "react";
import { fireEvent } from "@testing-library/react-native";
import * as ReactNative from "react-native";

import { TranscriptModal } from "../../src/screens/main/TranscriptModal";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

jest.mock("@expo/vector-icons", () => ({
  Feather: () => null,
}));

jest.mock("../../src/components/ChatTranscript", () => ({
  ChatTranscript: ({ messages }: { messages: { content: string }[] }) => {
    const React = require("react");
    const { Text } = require("react-native");

    return React.createElement(Text, null, `chat:${messages.length}`);
  },
}));

jest.mock("../../src/components/WaveformBar", () => ({
  WaveformBar: ({ statusLabel }: { statusLabel: string }) => {
    const React = require("react");
    const { Text } = require("react-native");

    return React.createElement(Text, null, `wave:${statusLabel}`);
  },
}));

jest.mock("../../src/screens/main/ConversationMenu", () => ({
  ConversationMenu: () => null,
}));
const mockUseWindowDimensions = jest.spyOn(
  ReactNative,
  "useWindowDimensions",
);

const baseProps = {
  activeConversationTitle: "Landscape thread",
  activeReplayMessageId: null,
  colors: {
    background: "#101010",
    backgroundSecondary: "#161616",
    surface: "#1f1f1f",
    surfaceElevated: "#262626",
    border: "#333333",
    glow: "#000000",
    text: "#ffffff",
    textSecondary: "#dddddd",
    textMuted: "#aaaaaa",
    accent: "#66ccff",
  },
  conversationMenuVisible: false,
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
  isActive: false,
  messages: [
    {
      id: "m1",
      role: "assistant" as const,
      content: "Reply",
      timestamp: "2026-03-26T12:00:00.000Z",
    },
  ],
  onClose: jest.fn(),
  onCloseConversationMenu: jest.fn(),
  onCopyMessage: jest.fn(),
  onCopyThread: jest.fn(),
  onManageMemory: jest.fn(),
  onPress: jest.fn(),
  onPressIn: jest.fn(),
  onPressOut: jest.fn(),
  onRepeatMessage: jest.fn(),
  onShareMessage: jest.fn(),
  onShareThread: jest.fn(),
  onSubmitTextMessage: jest.fn(),
  replayPhase: "idle" as const,
  settingsShowUsageStats: true,
  t: (key: string) => key,
  toggleConversationMenu: jest.fn(),
  usageDisplay: {
    countsLabel: "1 reply",
    noteLabel: "Session scope",
    promptTokensLabel: "Prompt 100",
    replyTokensLabel: "Reply 200",
    totalTokensLabel: "Total 300",
    totalCostLabel: "$0.12",
    routes: [
      {
        key: "route-1",
        label: "Anthropic · Claude",
        value: "300 tokens · $0.12",
      },
    ],
  },
  visualPhase: "idle" as const,
  visible: true,
  waveformInputMode: "toggle-to-talk" as const,
};

describe("TranscriptModal", () => {
  beforeEach(() => {
    mockUseWindowDimensions.mockReturnValue({
      width: 390,
      height: 844,
      scale: 2,
      fontScale: 1,
    });
  });

  it("renders the portrait transcript stack", () => {
    const screen = renderWithProviders(<TranscriptModal {...baseProps} />);

    expect(screen.getByText("conversation")).toBeTruthy();
    expect(screen.getByText("Landscape thread")).toBeTruthy();
    expect(screen.getByText("wave:tapToSpeak")).toBeTruthy();
    expect(screen.getByText("estimatedUsageTitle")).toBeTruthy();
    expect(screen.getByText("chat:1")).toBeTruthy();
    expect(screen.queryByText("LOG")).toBeNull();
  });

  it("renders the landscape transcript layout", () => {
    mockUseWindowDimensions.mockReturnValue({
      width: 932,
      height: 430,
      scale: 2,
      fontScale: 1,
    });

    const screen = renderWithProviders(<TranscriptModal {...baseProps} />);

    expect(screen.getByText("Landscape thread")).toBeTruthy();
    expect(screen.getByText("wave:tapToSpeak")).toBeTruthy();
    expect(screen.getByText("estimatedUsageTitle")).toBeTruthy();
    expect(screen.getByText("Anthropic · Claude")).toBeTruthy();
  });

  it("submits trimmed text messages from the composer", () => {
    const onSubmitTextMessage = jest.fn();
    const screen = renderWithProviders(
      <TranscriptModal
        {...baseProps}
        onSubmitTextMessage={onSubmitTextMessage}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("textMessagePlaceholder"),
      "  Hello from Android  ",
    );
    fireEvent.press(screen.getByLabelText("sendTextMessage"));

    expect(onSubmitTextMessage).toHaveBeenCalledWith("Hello from Android");
    expect(screen.getByPlaceholderText("textMessagePlaceholder").props.value).toBe(
      "",
    );
  });

  it("submits text messages from the keyboard send action", () => {
    const onSubmitTextMessage = jest.fn();
    const screen = renderWithProviders(
      <TranscriptModal
        {...baseProps}
        onSubmitTextMessage={onSubmitTextMessage}
      />,
    );
    const input = screen.getByPlaceholderText("textMessagePlaceholder");

    fireEvent.changeText(input, "  Keyboard send  ");
    fireEvent(input, "submitEditing");

    expect(onSubmitTextMessage).toHaveBeenCalledWith("Keyboard send");
  });
});
