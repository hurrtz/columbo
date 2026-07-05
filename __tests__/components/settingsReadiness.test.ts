import { DEFAULT_SETTINGS, Settings } from "../../src/types";
import {
  getSettingsReadiness,
  type SettingsReadinessStatus,
} from "../../src/components/settings/readiness";

function withSettings(partial: Partial<Settings>): Settings {
  return {
    ...DEFAULT_SETTINGS,
    ...partial,
  };
}

function expectStatus(
  status: SettingsReadinessStatus,
  expected: SettingsReadinessStatus["state"],
) {
  expect(status.state).toBe(expected);
}

describe("settings readiness", () => {
  it("marks the default native voice pipeline as listen-ready and search-off", () => {
    const readiness = getSettingsReadiness(DEFAULT_SETTINGS, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.listen, "ready");
    expectStatus(readiness.search, "off");
  });

  it("marks thinking broken when no response route can run", () => {
    const readiness = getSettingsReadiness(DEFAULT_SETTINGS, {
      llmProviders: [],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.think, "broken");
  });

  it("marks provider STT broken when provider STT is selected without an enabled STT provider", () => {
    const settings = withSettings({
      sttMode: "provider",
      sttProvider: null,
    });

    const readiness = getSettingsReadiness(settings, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.listen, "broken");
  });

  it("marks spoken replies off when spoken replies are disabled", () => {
    const settings = withSettings({
      spokenRepliesEnabled: false,
    });

    const readiness = getSettingsReadiness(settings, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.speak, "off");
  });

  it("marks search ready when a selected search-capable provider has credentials even if search is disabled", () => {
    const settings = withSettings({
      webSearchMode: "off",
      webSearchProvider: "openai",
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        openai: "sk-test",
      },
    });

    const readiness = getSettingsReadiness(settings, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: ["openai"],
    });

    expectStatus(readiness.search, "ready");
  });
});
