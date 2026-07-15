import React from "react";
import { StyleSheet } from "react-native";

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
        selected="mode-2"
        onSelect={jest.fn()}
        modes={[
          {
            id: "mode-1",
            route: {
              provider: "gemini",
              model: "gemini-live-2.5-flash-native-audio",
            },
          },
          {
            id: "mode-2",
            route: {
              provider: "gemini",
              model: "gemini-3.5-flash",
              effort: "high",
            },
          },
          {
            id: "mode-3",
            route: {
              provider: "gemini",
              model: "gemini-3.1-pro-preview",
              effort: "high",
            },
          },
        ]}
        readyModes={["mode-1", "mode-2", "mode-3"]}
      />,
    );

    expect(screen.queryByText("Chat")).toBeNull();
    expect(screen.queryByText("Reason")).toBeNull();
    expect(screen.queryByText("Research")).toBeNull();
    expect(screen.getByText("Gemini 3.5 Flash")).toBeTruthy();
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);
    const dividers = screen.getAllByTestId("response-mode-effort-divider");
    expect(dividers).toHaveLength(2);
    expect(
      dividers.map((divider) => StyleSheet.flatten(divider.props.style).height),
    ).toEqual([0.5, 0.5]);
    const effortFooters = screen.getAllByTestId("response-mode-effort-footer");
    expect(effortFooters).toHaveLength(2);
    expect(
      effortFooters.map(
        (footer) => StyleSheet.flatten(footer.props.style).height,
      ),
    ).toEqual([20, 20]);
    expect(screen.queryByText(/Effort:/)).toBeNull();
  });

  it("does not add an effort line for routes without effort metadata", () => {
    const screen = renderWithProviders(
      <ResponseModeToggle
        selected="mode-2"
        onSelect={jest.fn()}
        modes={[
          {
            id: "mode-1",
            route: { provider: "gemini", model: "gemini-2.5-flash" },
          },
          {
            id: "mode-2",
            route: { provider: "gemini", model: "gemini-2.5-flash" },
          },
        ]}
        readyModes={["mode-1", "mode-2"]}
      />,
    );

    expect(screen.queryByText(/Effort:/)).toBeNull();
    expect(screen.queryByTestId("response-mode-effort-divider")).toBeNull();
  });

  it("lays out model cards without a visible wrapper", () => {
    const screen = renderWithProviders(
      <ResponseModeToggle
        selected="mode-1"
        onSelect={jest.fn()}
        modes={[
          {
            id: "mode-1",
            route: { provider: "gemini", model: "gemini-2.5-flash" },
          },
        ]}
      />,
    );

    const wrapperStyle = StyleSheet.flatten(
      screen.getByTestId("response-mode-list").props.style,
    );

    expect(wrapperStyle.flexDirection).toBe("row");
    expect(wrapperStyle.backgroundColor).toBeUndefined();
    expect(wrapperStyle.borderWidth).toBeUndefined();
    expect(wrapperStyle.padding).toBeUndefined();
    expect(wrapperStyle.shadowOpacity).toBeUndefined();
    expect(wrapperStyle.elevation).toBeUndefined();
  });
});
