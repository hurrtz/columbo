import { renderHook, waitFor } from "@testing-library/react-native";

import { useSettingsNormalization } from "../../src/components/settings/useSettingsNormalization";
import { DEFAULT_SETTINGS } from "../../src/types";

describe("useSettingsNormalization", () => {
  it("promotes native STT mode to provider when a provider is available in settings", async () => {
    const onUpdate = jest.fn();
    const settings = {
      ...DEFAULT_SETTINGS,
      sttMode: "native" as const,
      sttProvider: null,
    };

    renderHook(() =>
      useSettingsNormalization({
        visible: true,
        settings,
        enabledProviders: [],
        enabledSttProviders: ["openai"],
        enabledTtsProviders: [],
        language: "en",
        onUpdate,
      }),
    );

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        sttMode: "provider",
        sttProvider: "openai",
      });
    });
  });

  it("promotes non-provider TTS mode to provider when a provider is available in settings", async () => {
    const onUpdate = jest.fn();
    const settings = {
      ...DEFAULT_SETTINGS,
      ttsMode: "native" as const,
      ttsProvider: null,
    };

    renderHook(() =>
      useSettingsNormalization({
        visible: true,
        settings,
        enabledProviders: [],
        enabledSttProviders: [],
        enabledTtsProviders: ["openai"],
        language: "en",
        onUpdate,
      }),
    );

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        ttsMode: "provider",
        ttsProvider: "openai",
      });
    });
  });

  it("batches settings repair updates into one patch", async () => {
    const onUpdate = jest.fn();
    const settings = {
      ...DEFAULT_SETTINGS,
      sttProvider: "anthropic",
      ttsProvider: "anthropic",
      providerSttModels: {
        ...DEFAULT_SETTINGS.providerSttModels,
        openai: "invalid-stt-model",
      },
      providerTtsModels: {
        ...DEFAULT_SETTINGS.providerTtsModels,
        openai: "invalid-tts-model",
      },
      providerTtsVoices: {
        ...DEFAULT_SETTINGS.providerTtsVoices,
        openai: "invalid-voice",
      },
      responseModes: {
        quick: { provider: "anthropic", model: "claude-sonnet-4-6" },
        normal: { provider: "anthropic", model: "claude-sonnet-4-6" },
        deep: { provider: "anthropic", model: "claude-sonnet-4-6" },
      },
    };

    renderHook(() =>
      useSettingsNormalization({
        visible: true,
        settings,
        enabledProviders: ["openai"],
        enabledSttProviders: ["openai"],
        enabledTtsProviders: ["openai"],
        language: "en",
        onUpdate,
      }),
    );

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        sttProvider: "openai",
        ttsProvider: "openai",
        providerTtsModels: expect.objectContaining({
          openai: "gpt-4o-mini-tts",
        }),
        providerTtsVoices: expect.objectContaining({
          openai: "alloy",
        }),
        responseModes: {
          quick: { provider: "openai", model: "gpt-5.5" },
          normal: { provider: "openai", model: "gpt-5.5" },
          deep: { provider: "openai", model: "gpt-5.5" },
        },
      }),
    );
  });
});
