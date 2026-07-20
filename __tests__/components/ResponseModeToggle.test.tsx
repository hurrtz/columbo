import React from "react";
import { StyleSheet } from "react-native";

import { ResponseModeToggle } from "../../src/components/ResponseModeToggle";
import { lightColors } from "../../src/theme/colors";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, props, children);
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
              model: "gemini-3.1-flash-live-preview",
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
    expect(
      screen.getByTestId("response-mode-option-gradient-mode-2"),
    ).toBeTruthy();
    expect(
      screen.getByTestId("response-mode-model-mode-2").props.numberOfLines,
    ).toBe(2);
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

  it.each([
    { compact: false, minHeight: 88 },
    { compact: true, minHeight: 76 },
  ])(
    "shows one model as a neutral, shorter, one-line card when compact is $compact",
    ({ compact, minHeight }) => {
      const screen = renderWithProviders(
        <ResponseModeToggle
          compact={compact}
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

      const card = screen.getByTestId("response-mode-option-mode-1");
      const cardStyle = StyleSheet.flatten(card.props.style);
      const innerStyle = StyleSheet.flatten(
        screen.getByTestId("response-mode-option-inner-mode-1").props.style,
      );

      expect(card.props.onPress).toBeUndefined();
      expect(card.props.accessibilityState).toEqual({
        disabled: true,
        selected: true,
      });
      expect(cardStyle.backgroundColor).toBe(lightColors.surfaceElevated);
      expect(
        screen.queryByTestId("response-mode-option-gradient-mode-1"),
      ).toBeNull();
      expect(innerStyle.minHeight).toBe(minHeight);
      expect(
        screen.getByTestId("response-mode-model-mode-1").props.numberOfLines,
      ).toBe(1);
    },
  );
});
