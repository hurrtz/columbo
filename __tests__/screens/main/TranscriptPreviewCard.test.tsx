import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { TranscriptPreviewCard } from "../../../src/screens/main/TranscriptPreviewCard";
import { lightColors } from "../../../src/theme/colors";

jest.mock("../../../src/components/ChatTranscript", () => ({
  ChatTranscript: ({
    messageSelectionEnabled,
    onRepeatMessage,
    onShareMessage,
  }: {
    messageSelectionEnabled?: boolean;
    onRepeatMessage?: () => void;
    onShareMessage?: () => void;
  }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(
      Text,
      null,
      `actions:${Boolean(onRepeatMessage)}:${Boolean(onShareMessage)}:selection:${Boolean(messageSelectionEnabled)}`,
    );
  },
}));

describe("TranscriptPreviewCard", () => {
  it("keeps message actions on the home transcript without an expand control", () => {
    const onOpenStyleSheet = jest.fn();
    const screen = render(
      <TranscriptPreviewCard
        activeConversationId="conversation-1"
        activeConversationTitle="Current conversation"
        colors={lightColors}
        messages={[
          {
            id: "message-1",
            role: "assistant",
            content: "Reply",
            timestamp: "2026-07-21T12:00:00.000Z",
          },
        ]}
        onCopyMessage={jest.fn()}
        onRepeatMessage={jest.fn()}
        onRetryMessage={jest.fn()}
        onOpenStyleSheet={onOpenStyleSheet}
        onShareMessage={jest.fn()}
        presentation="canvas"
        showStyleControl
        showUsageStats={false}
        showWhenEmpty
        t={(key) =>
          ({
            conversation: "Conversation",
            openStyleSheet: "Open conversation settings",
          })[key] ?? key
        }
      />,
    );

    expect(screen.getByText("Current conversation")).toBeTruthy();
    expect(screen.queryByText("Conversation")).toBeNull();
    expect(screen.getByText("actions:true:true:selection:true")).toBeTruthy();
    expect(screen.queryByLabelText("showTranscript")).toBeNull();
    expect(
      StyleSheet.flatten(
        screen.getByTestId("transcript-preview-card").props.style,
      ),
    ).toEqual(
      expect.objectContaining({
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        overflow: "visible",
      }),
    );
    expect(
      StyleSheet.flatten(
        screen.getByTestId("transcript-preview-header").props.style,
      ),
    ).toEqual(
      expect.objectContaining({
        marginHorizontal: -16,
        borderTopWidth: 1,
        borderTopColor: lightColors.border,
      }),
    );
    fireEvent.press(screen.getByTestId("conversation-style-control"));

    expect(onOpenStyleSheet).toHaveBeenCalledTimes(1);
  });

  it("keeps the landscape transcript header within its pane", () => {
    const screen = render(
      <TranscriptPreviewCard
        activeConversationTitle="Current conversation"
        colors={lightColors}
        layout="landscape"
        messages={[]}
        onCopyMessage={jest.fn()}
        onRetryMessage={jest.fn()}
        showUsageStats={false}
        showWhenEmpty
        t={(key) => key}
      />,
    );

    const headerStyle = StyleSheet.flatten(
      screen.getByTestId("transcript-preview-header").props.style,
    );

    expect(headerStyle.marginHorizontal).toBeUndefined();
    expect(headerStyle.borderTopWidth).toBeUndefined();
  });
});
