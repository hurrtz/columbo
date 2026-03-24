import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import {
  ProviderApiKeyCard,
  ProviderSelectionGrid,
} from "../../src/components/settings/ProvidersSections";
import { LocalizationProvider } from "../../src/i18n";
import { ThemeProvider } from "../../src/theme/ThemeContext";
import { DEFAULT_SETTINGS } from "../../src/types";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ name }: { name: string }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, name);
  },
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

describe("ProviderSelectionGrid", () => {
  it("shows the full catalog button grid while keeping a note about catalog-only providers", () => {
    const onSelectCatalogProvider = jest.fn();
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderSelectionGrid
            settings={DEFAULT_SETTINGS}
            selectedCatalogProviderId="openai"
            onSelectCatalogProvider={onSelectCatalogProvider}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByRole("button")).toHaveLength(56);
    expect(
      screen.getByText(
        "Showing 46 extra catalog-only providers here for UI inspection. Only the wired providers can be configured and called right now.",
      ),
    ).toBeTruthy();

    fireEvent.press(screen.getByText("Z.ai / Zhipu AI"));
    expect(onSelectCatalogProvider).toHaveBeenCalledWith("z-ai-zhipu-ai");
  });
});

describe("ProviderApiKeyCard", () => {
  it("shows grouped catalog model details for a catalog-only provider", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderApiKeyCard
            catalogProviderId="z-ai-zhipu-ai"
            runtimeProvider={null}
            apiKey=""
            apiKeyVisible={false}
            secureApiKey={false}
            validationState={{ status: "idle" }}
            shouldShowValidateAction={false}
            onOpenProviderPortal={jest.fn()}
            onUpdateApiKey={jest.fn()}
            onTextInputFocus={jest.fn()}
            onToggleApiKeyVisibility={jest.fn()}
            onValidateProvider={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.getByText("Z.ai / Zhipu AI")).toBeTruthy();
    expect(
      screen.getByText(
        "This provider is present in the central catalog for inspection, but it is not wired into the app runtime yet.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("GLM-4.5")).toBeTruthy();
    expect(screen.getByText("glm-4.5")).toBeTruthy();
    expect(screen.getByText("GLM-ASR-2512")).toBeTruthy();
    expect(screen.getByText("glm-asr-2512")).toBeTruthy();
    expect(screen.getByText("No documented models.")).toBeTruthy();
  });
});
