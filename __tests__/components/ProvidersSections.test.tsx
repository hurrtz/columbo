import React from "react";
import { StyleSheet } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import {
  ProviderApiKeyCard,
  ResponseModesSection,
  ProviderSelectionGrid,
} from "../../src/components/settings/ProvidersSections";
import { APP_PROVIDER_CATALOG_IDS } from "../../src/catalog/appProviders";
import { listCatalogProviders } from "../../src/catalog";
import { WEB_SEARCH_PROVIDER_IDS } from "../../src/constants/webSearch";
import { LocalizationProvider } from "../../src/i18n";
import { ThemeProvider } from "../../src/theme/ThemeContext";
import { DEFAULT_SETTINGS } from "../../src/types";
import { PROVIDER_ORDER } from "../../src/constants/models";

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
    const runtimeProviderIds = new Set(
      PROVIDER_ORDER.map((provider) => APP_PROVIDER_CATALOG_IDS[provider]),
    );
    const catalogOnlyCount = listCatalogProviders().filter(
      (provider) => !runtimeProviderIds.has(provider.providerId),
    ).length;
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

    expect(screen.getAllByRole("button")).toHaveLength(
      PROVIDER_ORDER.length + catalogOnlyCount,
    );

    if (catalogOnlyCount > 0) {
      expect(
        screen.getByText(
          `Showing ${catalogOnlyCount} extra catalog-only providers here for UI inspection. Only the wired providers can be configured and called right now.`,
        ),
      ).toBeTruthy();
    } else {
      expect(
        screen.queryByText(/Showing .* extra catalog-only providers here/),
      ).toBeNull();
    }

    // After the v1 scope reduction every catalog provider is also a wired
    // runtime provider, so selecting any tile reports its catalog id.
    fireEvent.press(screen.getByText("OpenAI"));
    expect(onSelectCatalogProvider).toHaveBeenCalledWith("openai");
  });

  it("can render the narrowed web-search provider matrix without catalog-only entries", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderSelectionGrid
            settings={DEFAULT_SETTINGS}
            selectedCatalogProviderId="openai"
            visibleProviders={WEB_SEARCH_PROVIDER_IDS}
            includeCatalogOnly={false}
            onSelectCatalogProvider={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByRole("button")).toHaveLength(
      WEB_SEARCH_PROVIDER_IDS.length,
    );
    expect(screen.getByText("OpenAI")).toBeTruthy();
    expect(screen.getByText("Perplexity")).toBeTruthy();
    expect(
      screen.queryByText(/Showing .* extra catalog-only providers here/),
    ).toBeNull();
  });

  it("shows provider health summary chips when a health state mapper is provided", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderSelectionGrid
            settings={DEFAULT_SETTINGS}
            selectedCatalogProviderId="openai"
            visibleProviders={["openai", "anthropic", "gemini", "xai", "mistral"]}
            includeCatalogOnly={false}
            getProviderHealthState={(provider) =>
              ({
                openai: "healthy",
                anthropic: "configured",
                gemini: "validating",
                xai: "failing",
                mistral: "unconfigured",
              })[provider] as
                | "healthy"
                | "configured"
                | "validating"
                | "failing"
                | "unconfigured"
            }
            onSelectCatalogProvider={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.queryByText("Ready 1")).toBeNull();
    expect(screen.queryByText("Configured 1")).toBeNull();
    expect(screen.getByText("Checking 1")).toBeTruthy();
    expect(screen.getByText("Failing 1")).toBeTruthy();
    expect(screen.getByText("Missing 1")).toBeTruthy();
  });

  it("reserves green container color for validated providers", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderSelectionGrid
            settings={DEFAULT_SETTINGS}
            selectedCatalogProviderId="mistral-ai"
            visibleProviders={["openai", "anthropic"]}
            includeCatalogOnly={false}
            getProviderHealthState={(provider) =>
              ({
                openai: "healthy",
                anthropic: "configured",
              })[provider] as "healthy" | "configured"
            }
            onSelectCatalogProvider={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    const openAiButton = screen.getByLabelText("Open OpenAI settings");
    const anthropicButton = screen.getByLabelText("Open Anthropic settings");

    expect(StyleSheet.flatten(openAiButton.props.style).backgroundColor).toBe(
      "#2DAD7622",
    );
    expect(StyleSheet.flatten(anthropicButton.props.style).backgroundColor).toBe(
      "#FFFDFC",
    );
    expect(screen.queryByText("check")).toBeNull();
  });
});

describe("ResponseModesSection", () => {
  it("shows an effort picker for Gemini models with thinking levels", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ResponseModesSection
            settings={{
              ...DEFAULT_SETTINGS,
              responseModes: [
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
              ],
            }}
            enabledProviders={["gemini"]}
            onUpdateResponseModeRoute={jest.fn()}
            onAddResponseMode={jest.fn()}
            onRemoveResponseMode={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByText("Effort").length).toBeGreaterThan(0);
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);
  });

  it("shows the documented thinking controls for Gemini 2.5 models", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ResponseModesSection
            settings={{
              ...DEFAULT_SETTINGS,
              responseModes: [
                {
                  id: "mode-1",
                  route: { provider: "gemini", model: "gemini-2.5-flash" },
                },
                {
                  id: "mode-2",
                  route: { provider: "gemini", model: "gemini-2.5-flash" },
                },
              ],
            }}
            enabledProviders={["gemini"]}
            onUpdateResponseModeRoute={jest.fn()}
            onAddResponseMode={jest.fn()}
            onRemoveResponseMode={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByText("Effort")).toHaveLength(2);
    expect(screen.getAllByText("Dynamic")).toHaveLength(2);
  });
});

describe("ProviderApiKeyCard", () => {
  it("shows grouped catalog model details when a catalog provider is read-only", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderApiKeyCard
            catalogProviderId="openai"
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

    expect(screen.getByText("OpenAI")).toBeTruthy();
    expect(
      screen.getByText(
        "This provider is present in the central catalog for inspection, but it is not wired into the app runtime yet.",
      ),
    ).toBeTruthy();
    expect(screen.getByText(/Limits:/)).toBeTruthy();
    expect(screen.getByText("GPT-5.5")).toBeTruthy();
    expect(screen.getByText("gpt-5.5")).toBeTruthy();
    expect(screen.getByText("GPT-4o mini Transcribe")).toBeTruthy();
    expect(screen.getByText("gpt-4o-mini-transcribe")).toBeTruthy();
    expect(screen.getByText("GPT-4o mini TTS")).toBeTruthy();
    expect(screen.getByText("gpt-4o-mini-tts")).toBeTruthy();
  });

  it("shows the catalog reference block for a wired provider as well", () => {
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderApiKeyCard
            catalogProviderId="openai"
            runtimeProvider="openai"
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

    expect(screen.getByText("OpenAI")).toBeTruthy();
    expect(screen.getByText("Credentials")).toBeTruthy();
    expect(screen.getByText("Catalog reference for this provider:")).toBeTruthy();
    expect(screen.getByText(/Limits:/)).toBeTruthy();
    expect(screen.getByText("GPT-5.5")).toBeTruthy();
    expect(screen.getByText("gpt-5.5")).toBeTruthy();
  });
});
