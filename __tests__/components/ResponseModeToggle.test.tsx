import React from "react";

import { ResponseModeToggle } from "../../src/components/ResponseModeToggle";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, null, children);
  },
}));

jest.mock("../../src/components/ProviderIcon", () => ({
  ProviderIcon: ({ provider }: { provider: string }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, provider);
  },
}));

describe("ResponseModeToggle", () => {
  it("shows the effort value beneath the model name without an effort prefix", () => {
    const screen = renderWithProviders(
      <ResponseModeToggle
        selected="normal"
        onSelect={jest.fn()}
        routes={{
          quick: {
            provider: "gemini",
            model: "gemini-live-2.5-flash-native-audio",
          },
          normal: {
            provider: "gemini",
            model: "gemini-3.5-flash",
            effort: "high",
          },
          deep: {
            provider: "gemini",
            model: "gemini-3.1-pro-preview",
            effort: "high",
          },
        }}
        readyModes={["quick", "normal", "deep"]}
      />,
    );

    expect(screen.getByText("Gemini 3.5 Flash")).toBeTruthy();
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);
    expect(screen.queryByText(/Effort:/)).toBeNull();
  });

  it("does not add an effort line for routes without effort metadata", () => {
    const screen = renderWithProviders(
      <ResponseModeToggle
        selected="normal"
        onSelect={jest.fn()}
        routes={{
          quick: { provider: "gemini", model: "gemini-2.5-flash" },
          normal: { provider: "gemini", model: "gemini-2.5-flash" },
          deep: { provider: "gemini", model: "gemini-2.5-flash" },
        }}
        readyModes={["quick", "normal", "deep"]}
      />,
    );

    expect(screen.queryByText(/Effort:/)).toBeNull();
  });
});
