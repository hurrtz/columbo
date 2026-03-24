import React from "react";
import { render } from "@testing-library/react-native";

import { ProviderSelectionGrid } from "../../src/components/settings/ProvidersSections";
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
    const screen = render(
      <ThemeProvider mode="light">
        <LocalizationProvider language="en">
          <ProviderSelectionGrid
            settings={DEFAULT_SETTINGS}
            selectedProvider="openai"
            onSelectProvider={jest.fn()}
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
  });
});
