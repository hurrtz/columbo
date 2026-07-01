import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { SettingsModal } from "../../src/components/SettingsModal";
import { LocalizationProvider } from "../../src/i18n";
import { ThemeProvider } from "../../src/theme/ThemeContext";
import { DEFAULT_SETTINGS } from "../../src/types";

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

jest.mock("react-native-reanimated", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: {
      View,
    },
    useSharedValue: (value: number) => ({ value }),
    useAnimatedStyle: (factory: () => unknown) => factory(),
    withTiming: (value: number) => value,
    Easing: {
      out: (value: unknown) => value,
      ease: "ease",
    },
  };
});

jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(() => Promise.resolve([])),
}));

jest.mock("../../src/hooks/useSpeechDiagnostics", () => ({
  useSpeechDiagnostics: jest.fn(() => []),
}));

jest.mock("../../src/services/speech/diagnostics", () => ({
  clearSpeechDiagnostics: jest.fn(),
}));

jest.mock("../../src/components/ProviderIcon", () => ({
  ProviderIcon: ({
    label,
    provider,
  }: {
    label?: string;
    provider: string;
  }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, label ?? provider);
  },
}));

function renderSettingsModal(overrideProps: Partial<React.ComponentProps<typeof SettingsModal>> = {}) {
  return render(
    <ThemeProvider mode="light">
      <LocalizationProvider language="en">
        <SettingsModal
          visible
          settings={DEFAULT_SETTINGS}
          onUpdate={jest.fn()}
          onUpdateResponseModeRoute={jest.fn()}
          onUpdateProviderSttModel={jest.fn()}
          onUpdateProviderTtsModel={jest.fn()}
          onUpdateProviderTtsVoice={jest.fn()}
          onUpdateApiKey={jest.fn()}
          onPreviewVoice={jest.fn(async () => undefined)}
          onStopPreviewVoice={jest.fn(async () => undefined)}
          onValidateProvider={jest.fn(async () => undefined)}
          onValidateWebSearchProvider={jest.fn(async () => undefined)}
          onClose={jest.fn()}
          {...overrideProps}
        />
      </LocalizationProvider>
    </ThemeProvider>,
  );
}

describe("SettingsModal", () => {
  it("renders the modal shell and switches between distinct tab contents", async () => {
    const screen = renderSettingsModal();

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeTruthy();
      expect(screen.getAllByText("Credentials").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Behavior & Routes").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Voice").length).toBeGreaterThan(0);
      expect(screen.getAllByText("App").length).toBeGreaterThan(0);
      expect(screen.getByPlaceholderText("Search services")).toBeTruthy();
      expect(screen.queryByText("System Prompt")).toBeNull();
      expect(screen.queryByText("Voice Input")).toBeNull();
      expect(screen.queryByText("Theme")).toBeNull();
    });

    fireEvent.press(screen.getAllByText("Behavior & Routes")[0]);

    await waitFor(() => {
      expect(screen.getByText("System Prompt")).toBeTruthy();
      expect(screen.queryByPlaceholderText("Search services")).toBeNull();
      expect(screen.queryByText("Voice Input")).toBeNull();
      expect(screen.queryByText("Theme")).toBeNull();
    });

    fireEvent.press(screen.getAllByText("Voice")[0]);

    await waitFor(() => {
      expect(screen.getByText("Voice Input")).toBeTruthy();
      expect(screen.getByText("Voice Output")).toBeTruthy();
      expect(screen.queryByText("System Prompt")).toBeNull();
      expect(screen.queryByText("Theme")).toBeNull();
    });

    fireEvent.press(screen.getAllByText("App")[0]);

    await waitFor(() => {
      expect(screen.getByText("Theme")).toBeTruthy();
      expect(screen.getByText("Usage Stats")).toBeTruthy();
      expect(screen.queryByText("Voice Input")).toBeNull();
      expect(screen.queryByText("System Prompt")).toBeNull();
    });
  });

  it("opens the API keys tab when a focus provider is supplied", async () => {
    const screen = renderSettingsModal({ focusProvider: "openai" });

    await waitFor(() => {
      expect(screen.getByText("OpenAI")).toBeTruthy();
      expect(screen.getByText("Test key")).toBeTruthy();
      expect(screen.queryByText("System Prompt")).toBeNull();
    });
  });

  it("opens the API keys tab even when a catalog-only provider id is supplied", async () => {
    const screen = renderSettingsModal({
      focusCatalogProviderId: "ibm-watsonx",
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search services")).toBeTruthy();
      expect(screen.queryByText("System Prompt")).toBeNull();
    });
  });
});
