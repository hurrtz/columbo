import React from "react";

import { fireEvent } from "@testing-library/react-native";

import { SetupGuideModal } from "../../src/components/SetupGuideModal";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ name }: { name: string }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, name);
  },
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, null, children);
  },
}));

const defaultProps = {
  visible: true,
  step: "provider" as const,
  providerOptions: [{ label: "OpenAI", value: "openai" as const }],
  selectedProvider: "openai" as const,
  selectedProviderApiKey: "",
  currentValidationState: { status: "idle" as const },
  resolvedRoutes: {
    llm: {
      enabled: false,
      provider: "openai" as const,
      model: "gpt-4.1-mini",
    },
    stt: {
      enabled: true,
      kind: "system" as const,
    },
    tts: {
      enabled: false,
      kind: "disabled" as const,
    },
    webSearch: {
      available: false,
      provider: null,
    },
  },
  voiceTest: {
    phase: "idle" as const,
    transcript: "",
    reply: "",
    errorMessage: null,
    isRecording: false,
    isBusy: false,
    hasCompleted: false,
  },
  onSelectProvider: jest.fn(),
  onChangeProviderApiKey: jest.fn(),
  onDismiss: jest.fn(),
  onBack: jest.fn(),
  onContinueFromIntro: jest.fn(),
  onValidateProviderKey: jest.fn(),
  onContinueFromProvider: jest.fn(),
  onVoiceTestAction: jest.fn(),
  onResetVoiceTest: jest.fn(),
  onContinueFromVoiceTest: jest.fn(),
  onFinish: jest.fn(),
  onOpenSettings: jest.fn(),
};

describe("SetupGuideModal", () => {
  it("uses an eye button to reveal and hide the API key", () => {
    const screen = renderWithProviders(
      <SetupGuideModal
        {...defaultProps}
        selectedProviderApiKey="sk-test-secret"
      />,
    );
    let input = screen.getByDisplayValue("sk-test-secret");

    expect(input.props.secureTextEntry).toBe(true);

    fireEvent(input, "focus");
    input = screen.getByDisplayValue("sk-test-secret");
    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(screen.getByLabelText("Show key"));
    input = screen.getByDisplayValue("sk-test-secret");
    expect(input.props.secureTextEntry).toBe(false);
    expect(screen.getByLabelText("Hide key")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Hide key"));
    input = screen.getByDisplayValue("sk-test-secret");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("does not show missing API key guidance before validation is attempted", () => {
    const screen = renderWithProviders(<SetupGuideModal {...defaultProps} />);

    expect(
      screen.queryByText("Add an API key to continue, or cancel the setup guide."),
    ).toBeNull();
  });

  it("lets the disabled-looking validate button report a missing API key", () => {
    const onValidateProviderKey = jest.fn();
    const screen = renderWithProviders(
      <SetupGuideModal
        {...defaultProps}
        onValidateProviderKey={onValidateProviderKey}
      />,
    );

    fireEvent.press(screen.getByText("Validate key"));

    expect(onValidateProviderKey).toHaveBeenCalledTimes(1);
  });

  it("shows attempted missing API key guidance above the provider footer", () => {
    const screen = renderWithProviders(
      <SetupGuideModal
        {...defaultProps}
        currentValidationState={{
          status: "error",
          provider: "openai",
          apiKey: "",
          model: "gpt-4.1-mini",
          message: "Add an API key to continue, or cancel the setup guide.",
        }}
      />,
    );

    expect(
      screen.getByText("Add an API key to continue, or cancel the setup guide."),
    ).toBeTruthy();
  });

  it("lets validate report a missing provider", () => {
    const onValidateProviderKey = jest.fn();
    const screen = renderWithProviders(
      <SetupGuideModal
        {...defaultProps}
        selectedProvider={null}
        onValidateProviderKey={onValidateProviderKey}
      />,
    );

    fireEvent.press(screen.getByText("Validate key"));

    expect(onValidateProviderKey).toHaveBeenCalledTimes(1);
  });
});
