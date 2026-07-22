import React from "react";
import { Linking, StyleSheet } from "react-native";
import { fireEvent } from "@testing-library/react-native";

import { ChatBubble } from "../../src/components/ChatBubble";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("ChatBubble", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("keeps web-search details collapsed until requested and opens citation links", () => {
    const openUrlSpy = jest
      .spyOn(Linking, "openURL")
      .mockResolvedValueOnce(undefined);

    const { getByLabelText, getByTestId, getByText, queryByText } =
      renderWithProviders(
        <ChatBubble
          message={{
            id: "assistant-1",
            role: "assistant",
            content: "Here is the latest context.",
            model: "claude-opus-4-6",
            provider: "anthropic",
            timestamp: "2026-03-25T12:00:00.000Z",
            metadata: {
              webSearch: {
                provider: "openai",
                model: "gpt-5.4-mini",
                query: "What changed this week?",
                summary: "Several updates shipped this week.",
                sources: [
                  {
                    title: "Release notes",
                    url: "https://example.com/release-notes",
                  },
                ],
              },
            },
          }}
        />,
      );

    expect(getByText("Web Search")).toBeTruthy();
    expect(getByText("1 source")).toBeTruthy();
    expect(queryByText("Used web search")).toBeNull();
    expect(queryByText("What changed this week?")).toBeNull();
    expect(queryByText("Several updates shipped this week.")).toBeNull();
    expect(queryByText("Sources")).toBeNull();
    expect(queryByText("Release notes")).toBeNull();
    expect(queryByText("Anthropic")).toBeNull();
    expect(getByTestId("message-timestamp-assistant-1").props.children).toMatch(
      /\d{2}.*\d{2}:\d{2}/,
    );
    expect(
      StyleSheet.flatten(
        getByTestId("web-search-references-assistant-1").props.style,
      ),
    ).toEqual(
      expect.objectContaining({
        marginTop: 14,
        marginBottom: 4,
      }),
    );

    fireEvent.press(getByLabelText("Show web search details"));

    expect(getByLabelText("Hide web search details")).toBeTruthy();
    expect(getByText("What changed this week?")).toBeTruthy();
    expect(getByText("Several updates shipped this week.")).toBeTruthy();
    expect(getByText("Sources")).toBeTruthy();
    expect(getByText("Release notes")).toBeTruthy();

    fireEvent.press(getByLabelText("Open source: Release notes"));

    expect(openUrlSpy).toHaveBeenCalledWith(
      "https://example.com/release-notes",
    );
  });

  it("does not show web-search UI for messages without search metadata", () => {
    const { queryByText } = renderWithProviders(
      <ChatBubble
        message={{
          id: "assistant-2",
          role: "assistant",
          content: "Just a normal answer.",
          model: "claude-opus-4-6",
          provider: "anthropic",
          timestamp: "2026-03-25T12:05:00.000Z",
        }}
      />,
    );

    expect(queryByText("Used web search")).toBeNull();
    expect(queryByText("Sources")).toBeNull();
  });

  it("renders user messages as full-width rows with a right-side role cue", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ChatBubble
        message={{
          id: "user-full-width",
          role: "user",
          content: "Keep both sides of the conversation readable.",
          model: null,
          provider: null,
          timestamp: "2026-07-22T10:00:00.000Z",
        }}
      />,
    );

    const rowStyle = StyleSheet.flatten(
      getByTestId("chat-message-row-user-full-width").props.style,
    );

    expect(rowStyle).toEqual(
      expect.objectContaining({
        width: "100%",
        marginBottom: 8,
        borderWidth: 1,
        borderRightWidth: 3,
      }),
    );
    expect(rowStyle.borderLeftWidth).toBeUndefined();
    expect(getByText("You")).toBeTruthy();
    expect(
      getByTestId("message-timestamp-user-full-width").props.children,
    ).toMatch(/\d{2}.*\d{2}:\d{2}/);
  });

  it("renders assistant messages as full-width rows with a left-side role cue", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ChatBubble
        message={{
          id: "assistant-full-width",
          role: "assistant",
          content: "The role remains clear without a chat bubble.",
          model: null,
          provider: null,
          timestamp: "2026-07-22T10:01:00.000Z",
        }}
      />,
    );

    const rowStyle = StyleSheet.flatten(
      getByTestId("chat-message-row-assistant-full-width").props.style,
    );

    expect(rowStyle).toEqual(
      expect.objectContaining({
        width: "100%",
        marginBottom: 8,
        borderWidth: 1,
        borderLeftWidth: 3,
      }),
    );
    expect(rowStyle.borderRightWidth).toBeUndefined();
    expect(getByText("Assistant")).toBeTruthy();
  });

  it("uses a read-only text input for direct message text selection", () => {
    const { getByTestId } = renderWithProviders(
      <ChatBubble
        selectable
        message={{
          id: "assistant-selectable",
          role: "assistant",
          content: "Select only the words you need.",
          model: "claude-opus-4-6",
          provider: "anthropic",
          timestamp: "2026-03-25T12:07:00.000Z",
        }}
      />,
    );

    expect(
      getByTestId("selectable-message-assistant-selectable").props,
    ).toEqual(
      expect.objectContaining({
        multiline: true,
        readOnly: true,
        scrollEnabled: false,
        value: "Select only the words you need.",
      }),
    );
  });

  it("shows copy, share, and speech actions only on assistant messages", () => {
    const onCopy = jest.fn();
    const onShare = jest.fn();
    const onRepeat = jest.fn();
    const assistantMessage = {
      id: "assistant-actions",
      role: "assistant" as const,
      content: "Every assistant reply keeps its actions nearby.",
      model: "grok-4.5",
      provider: "xai" as const,
      timestamp: "2026-07-22T10:02:00.000Z",
    };
    const assistant = renderWithProviders(
      <ChatBubble
        selectable
        message={assistantMessage}
        onCopy={onCopy}
        onShare={onShare}
        onRepeat={onRepeat}
      />,
    );

    fireEvent.press(assistant.getByLabelText("Copy"));
    fireEvent.press(assistant.getByLabelText("Share"));
    fireEvent.press(assistant.getByLabelText("Repeat Reply"));

    expect(onCopy).toHaveBeenCalledWith(assistantMessage);
    expect(onShare).toHaveBeenCalledWith(assistantMessage);
    expect(onRepeat).toHaveBeenCalledWith(assistantMessage);
    expect(
      StyleSheet.flatten(
        assistant.getByTestId("message-actions-assistant-actions").props.style,
      ),
    ).toEqual(
      expect.objectContaining({
        justifyContent: "flex-start",
        marginHorizontal: -12,
        marginBottom: -14,
        borderTopWidth: StyleSheet.hairlineWidth,
      }),
    );

    const user = renderWithProviders(
      <ChatBubble
        selectable
        message={{
          ...assistantMessage,
          id: "user-without-actions",
          role: "user",
          model: null,
          provider: null,
        }}
        onCopy={onCopy}
        onShare={onShare}
        onRepeat={onRepeat}
      />,
    );

    expect(user.queryByLabelText("Copy")).toBeNull();
    expect(user.queryByLabelText("Share")).toBeNull();
    expect(user.queryByLabelText("Repeat Reply")).toBeNull();
  });

  it("renders durable pipeline notices without requiring message content", () => {
    const { getByText, queryByText } = renderWithProviders(
      <ChatBubble
        message={{
          id: "assistant-3",
          role: "assistant",
          content: "",
          model: null,
          provider: null,
          timestamp: "2026-03-25T12:10:00.000Z",
          metadata: {
            notices: [
              {
                stage: "stt",
                level: "error",
                message: "OpenAI speech transcription took too long.",
                detail: "The request hit the provider timeout window.",
              },
            ],
          },
        }}
      />,
    );

    expect(getByText("Speech to Text")).toBeTruthy();
    expect(
      getByText("OpenAI speech transcription took too long."),
    ).toBeTruthy();
    expect(
      getByText("The request hit the provider timeout window."),
    ).toBeTruthy();
    expect(queryByText("Just a normal answer.")).toBeNull();
  });

  it("keeps a failed reply recoverable on the submitted user message", () => {
    const onRetry = jest.fn();
    const message = {
      id: "user-failed-reply",
      role: "user" as const,
      content: "Please keep this message.",
      model: null,
      provider: null,
      timestamp: "2026-07-21T12:10:00.000Z",
      metadata: {
        replyFailure: {
          message: "The provider rejected the credentials.",
        },
      },
    };
    const { getByLabelText, getByText } = renderWithProviders(
      <ChatBubble message={message} onRetry={onRetry} />,
    );

    expect(getByText("Reply failed")).toBeTruthy();
    expect(getByText("The provider rejected the credentials.")).toBeTruthy();
    fireEvent.press(getByLabelText("Retry reply"));

    expect(onRetry).toHaveBeenCalledWith(message);
  });

  it("keeps a failed spoken reply recoverable from the saved assistant message", () => {
    const onRepeat = jest.fn();
    const onOpenSpeakingSettings = jest.fn();
    const message = {
      id: "assistant-failed-speech",
      role: "assistant" as const,
      content: "The answer is still safely here.",
      model: "grok-4.3",
      provider: "xai" as const,
      timestamp: "2026-07-21T12:10:00.000Z",
      metadata: {
        notices: [
          {
            stage: "tts" as const,
            level: "error" as const,
            message: "The reply was saved, but it could not be spoken.",
            detail: "xAI speech output took too long.",
          },
        ],
      },
    };
    const { getByLabelText, getByText } = renderWithProviders(
      <ChatBubble
        message={message}
        onRepeat={onRepeat}
        onOpenSpeakingSettings={onOpenSpeakingSettings}
      />,
    );

    expect(getByText("The answer is still safely here.")).toBeTruthy();
    expect(
      getByText("The reply was saved, but it could not be spoken."),
    ).toBeTruthy();

    fireEvent.press(getByLabelText("Retry speech"));
    fireEvent.press(getByLabelText("Speaking settings"));

    expect(onRepeat).toHaveBeenCalledWith(message);
    expect(onOpenSpeakingSettings).toHaveBeenCalledTimes(1);
  });
});
