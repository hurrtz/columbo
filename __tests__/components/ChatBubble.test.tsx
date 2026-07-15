import React from "react";
import { Linking } from "react-native";
import { fireEvent } from "@testing-library/react-native";

import { ChatBubble } from "../../src/components/ChatBubble";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({
    children,
  }: {
    children?: React.ReactNode;
  }) => children ?? null,
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("ChatBubble", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders web-search attribution and opens citation links", () => {
    const openUrlSpy = jest
      .spyOn(Linking, "openURL")
      .mockResolvedValueOnce(undefined);

    const { getByLabelText, getByText } = renderWithProviders(
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

    expect(getByText("Used web search")).toBeTruthy();
    expect(getByText("Several updates shipped this week.")).toBeTruthy();
    expect(getByText("Sources")).toBeTruthy();
    expect(getByText("Release notes")).toBeTruthy();

    fireEvent.press(getByLabelText("Open source: Release notes"));

    expect(openUrlSpy).toHaveBeenCalledWith("https://example.com/release-notes");
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

    expect(getByTestId("selectable-message-assistant-selectable").props).toEqual(
      expect.objectContaining({
        multiline: true,
        readOnly: true,
        scrollEnabled: false,
        value: "Select only the words you need.",
      }),
    );
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
    expect(getByText("OpenAI speech transcription took too long.")).toBeTruthy();
    expect(
      getByText("The request hit the provider timeout window."),
    ).toBeTruthy();
    expect(queryByText("Just a normal answer.")).toBeNull();
  });
});
