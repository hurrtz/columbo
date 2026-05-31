import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { renderHook, act } from "@testing-library/react-native";
import { useSettings } from "../../src/hooks/useSettings";
import {
  DEFAULT_SETTINGS,
  DEFAULT_ASSISTANT_INSTRUCTIONS_BY_LANGUAGE,
} from "../../src/types";
import { getAvailableResponseModes } from "../../src/utils/responseModes";
import { getCatalogModelsForAppProvider } from "../../src/catalog/appProviders";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

async function flushSettingsLoad() {
  await act(async () => {});
}

describe("useSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );
    (AsyncStorage.setItem as jest.Mock).mockImplementation(() =>
      Promise.resolve(),
    );
    (SecureStore.getItemAsync as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );
    (SecureStore.setItemAsync as jest.Mock).mockImplementation(() =>
      Promise.resolve(),
    );
    (SecureStore.deleteItemAsync as jest.Mock).mockImplementation(() =>
      Promise.resolve(),
    );
  });

  it("returns default settings when nothing is stored", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();
    expect(result.current.settings).toEqual(DEFAULT_SETTINGS);
    expect(result.current.settings.showUsageStats).toBe(false);
    expect(result.current.settings.showDebugLogButton).toBe(false);
  });

  it("loads saved settings from AsyncStorage", async () => {
    const saved = { ...DEFAULT_SETTINGS, lastProvider: "anthropic" as const };
    delete (saved as Partial<typeof saved>).setupGuideDismissed;
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(saved),
    );
    (SecureStore.getItemAsync as jest.Mock).mockImplementation(
      (key: string) => {
        const values: Record<string, string | null> = {
          "schnackai.provider_key.openai": "sk-openai",
          "schnackai.provider_key.anthropic": "sk-anthropic",
          "schnackai.provider_key.gemini": "AIza-test",
          "schnackai.provider_key.xai": "xai-test",
        };

        return Promise.resolve(values[key] ?? null);
      },
    );
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();
    expect(result.current.settings.lastProvider).toBe("anthropic");
    expect(result.current.settings.apiKeys).toEqual({
      ...DEFAULT_SETTINGS.apiKeys,
      openai: "sk-openai",
      anthropic: "sk-anthropic",
      gemini: "AIza-test",
      xai: "xai-test",
    });
    expect(result.current.settings.setupGuideDismissed).toBe(true);
  });

  it("migrates legacy ttsPlayback into replyPlayback", async () => {
    const legacyStored: Record<string, unknown> = { ...DEFAULT_SETTINGS };
    delete legacyStored.replyPlayback;
    legacyStored.ttsPlayback = "wait";
    delete legacyStored.providerTtsVoices;
    legacyStored.ttsVoice = "shimmer";

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(legacyStored),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.replyPlayback).toBe("wait");
    expect(result.current.settings.providerTtsVoices.openai).toBe("shimmer");
    expect(result.current.settings.providerTtsVoices.gemini).toBe(
      DEFAULT_SETTINGS.providerTtsVoices.gemini,
    );
  });

  it("migrates legacy active provider state into all response modes", async () => {
    const legacyStored = {
      ...DEFAULT_SETTINGS,
      lastProvider: "anthropic" as const,
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        anthropic: "claude-opus-4-6",
      },
    };

    delete (legacyStored as Partial<typeof legacyStored>).responseModes;
    delete (legacyStored as Partial<typeof legacyStored>).activeResponseMode;

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(legacyStored),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.responseModes).toEqual({
      quick: {
        provider: "anthropic",
        model: "claude-opus-4-6",
      },
      normal: {
        provider: "anthropic",
        model: "claude-opus-4-6",
      },
      deep: {
        provider: "anthropic",
        model: "claude-opus-4-6",
      },
    });
    expect(result.current.settings.activeResponseMode).toBe("normal");
  });

  it("persists settings on update", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();
    await act(async () => {
      result.current.updateSettings({ lastProvider: "anthropic" });
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"lastProvider":"anthropic"'),
    );
  });

  it("persists the usage stats visibility toggle", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateSettings({ showUsageStats: true });
    });

    expect(result.current.settings.showUsageStats).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"showUsageStats":true'),
    );
  });

  it("persists the debug log button visibility toggle", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateSettings({ showDebugLogButton: true });
    });

    expect(result.current.settings.showDebugLogButton).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"showDebugLogButton":true'),
    );
  });

  it("persists web search mode and provider settings", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateSettings({
        webSearchMode: "on",
        webSearchProvider: "openai",
        webSearchProviderSettings: {
          ...result.current.settings.webSearchProviderSettings,
          openai: {
            ...result.current.settings.webSearchProviderSettings.openai,
            searchMode: "deep",
          },
        },
      });
    });

    expect(result.current.settings.webSearchMode).toBe("on");
    expect(result.current.settings.webSearchProvider).toBe("openai");
    expect(result.current.settings.webSearchProviderSettings.openai.searchMode).toBe(
      "deep",
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"webSearchMode":"on"'),
    );
  });

  it("migrates a stored web search mode of auto to on", async () => {
    const legacyStored: Record<string, unknown> = {
      ...DEFAULT_SETTINGS,
      webSearchMode: "auto",
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(legacyStored),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.webSearchMode).toBe("on");
  });

  it("migrates a stored grok voice provider id onto xai", async () => {
    const legacyStored: Record<string, unknown> = {
      ...DEFAULT_SETTINGS,
      ttsProvider: "grok",
      sttProvider: "grok",
      providerTtsVoices: {
        ...DEFAULT_SETTINGS.providerTtsVoices,
        grok: "ara",
      },
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(legacyStored),
    );
    (SecureStore.getItemAsync as jest.Mock).mockImplementation((key: string) => {
      const values: Record<string, string | null> = {
        "schnackai.provider_key.grok": "xai-legacy-key",
      };

      return Promise.resolve(values[key] ?? null);
    });

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.ttsProvider).toBe("xai");
    expect(result.current.settings.sttProvider).toBe("xai");
    expect(result.current.settings.providerTtsVoices.xai).toBe("ara");
    expect(
      (result.current.settings.providerTtsVoices as Record<string, unknown>).grok,
    ).toBeUndefined();
    expect(result.current.settings.apiKeys.xai).toBe("xai-legacy-key");
  });

  it("resets stored stt/tts providers that are no longer supported and keeps key access safe", async () => {
    const stored = {
      ...DEFAULT_SETTINGS,
      ttsProvider: "elevenlabs",
      sttProvider: "azure",
      sttMode: "provider",
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(stored),
    );

    const { result } = renderHook(() => useSettings());

    await expect(flushSettingsLoad()).resolves.not.toThrow();

    const { settings } = result.current;
    expect(settings.ttsProvider).toBeNull();
    expect(settings.sttProvider).toBeNull();

    // Accessing apiKeys with the (now null) providers must be safe, mirroring
    // the render-time access in MainScreen that previously crashed.
    const ttsApiKey = settings.ttsProvider
      ? settings.apiKeys[settings.ttsProvider].trim()
      : "";
    const sttApiKey = settings.sttProvider
      ? settings.apiKeys[settings.sttProvider].trim()
      : "";
    expect(ttsApiKey).toBe("");
    expect(sttApiKey).toBe("");
  });

  it("does not derive response modes from a search-only provider key", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateApiKey("brave", "brave-search-key");
    });

    expect(result.current.settings.responseModes).toEqual(
      DEFAULT_SETTINGS.responseModes,
    );
    expect(getAvailableResponseModes(result.current.settings)).toEqual([]);

    // A real LLM provider key still derives usable modes afterwards.
    await act(async () => {
      result.current.updateApiKey("openai", "sk-real-llm");
    });

    expect(getAvailableResponseModes(result.current.settings)).toEqual([
      "quick",
      "normal",
      "deep",
    ]);
  });

  it("migrates legacy webSearchEnabled into webSearchMode", async () => {
    const legacyStored: Record<string, unknown> = { ...DEFAULT_SETTINGS };
    delete legacyStored.webSearchMode;
    legacyStored.webSearchEnabled = true;
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(legacyStored),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.webSearchMode).toBe("on");
  });

  it("keeps web search unselected when stored provider data is unsupported", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        ...DEFAULT_SETTINGS,
        webSearchProvider: "anthropic",
      }),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.webSearchProvider).toBeNull();
  });

  it("keeps the setup guide available for brand-new installs without keys", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.setupGuideDismissed).toBe(false);
  });

  it("switches built-in assistant instructions when the language changes", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateSettings({ language: "de" });
    });

    expect(result.current.settings.language).toBe("de");
    expect(result.current.settings.assistantInstructions).toBe(
      DEFAULT_ASSISTANT_INSTRUCTIONS_BY_LANGUAGE.de,
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"language":"de"'),
    );
  });

  it("does not overwrite custom assistant instructions on language change", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateSettings({
        assistantInstructions: "Always answer with one short sentence.",
      });
    });

    await act(async () => {
      result.current.updateSettings({ language: "de" });
    });

    expect(result.current.settings.language).toBe("de");
    expect(result.current.settings.assistantInstructions).toBe(
      "Always answer with one short sentence.",
    );
  });

  it("persists provider model selections", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateProviderModel("deepseek", "deepseek-chat");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"deepseek":"deepseek-chat"'),
    );
    expect(result.current.settings.providerModels.deepseek).toBe(
      "deepseek-chat",
    );
  });

  it("persists response mode route selections", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateResponseModeRoute("deep", {
        provider: "gemini",
        model: "gemini-2.5-pro",
      });
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining(
        '"deep":{"provider":"gemini","model":"gemini-2.5-pro"}',
      ),
    );
    expect(result.current.settings.responseModes.deep).toEqual({
      provider: "gemini",
      model: "gemini-2.5-pro",
    });
  });

  it("persists the active response mode", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateActiveResponseMode("deep");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"activeResponseMode":"deep"'),
    );
    expect(result.current.settings.activeResponseMode).toBe("deep");
  });

  it("persists provider TTS voice selections", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateProviderTtsVoice("gemini", "Aoede");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@schnackai/settings",
      expect.stringContaining('"gemini":"Aoede"'),
    );
    expect(result.current.settings.providerTtsVoices.gemini).toBe("Aoede");
  });

  it("migrates a stored local TTS mode to native and drops local voices", async () => {
    const stored = {
      ...DEFAULT_SETTINGS,
      ttsMode: "local",
      localTtsVoices: {
        en: "af_bella",
        de: "thorsten-medium",
      },
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(stored),
    );

    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(result.current.settings.ttsMode).toBe("native");
    expect(
      (result.current.settings as Record<string, unknown>).localTtsVoices,
    ).toBeUndefined();
  });

  it("persists provider api keys in SecureStore", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateApiKey("gemini", "AIza-live-key");
    });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "schnackai.provider_key.gemini",
      "AIza-live-key",
    );
    expect(result.current.settings.apiKeys.gemini).toBe("AIza-live-key");
  });

  it("exposes no usable response mode on a fresh install without keys", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    expect(getAvailableResponseModes(result.current.settings)).toEqual([]);
  });

  it("derives all three response modes from the first configured provider", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateApiKey("openai", "sk-first-provider");
    });

    const expected = getCatalogModelsForAppProvider("openai", "llm")
      .slice(0, 3)
      .map((model) => model.modelId);

    expect(result.current.settings.responseModes).toEqual({
      quick: { provider: "openai", model: expected[0] },
      normal: { provider: "openai", model: expected[1] },
      deep: { provider: "openai", model: expected[2] },
    });
    expect(getAvailableResponseModes(result.current.settings)).toEqual([
      "quick",
      "normal",
      "deep",
    ]);
  });

  it("does not overwrite derived modes when a second provider key is added", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateApiKey("openai", "sk-first-provider");
    });

    const derived = result.current.settings.responseModes;

    await act(async () => {
      result.current.updateApiKey("anthropic", "sk-second-provider");
    });

    expect(result.current.settings.responseModes).toEqual(derived);
    for (const route of Object.values(result.current.settings.responseModes)) {
      expect(route.provider).toBe("openai");
    }
  });

  it("removes provider api keys when cleared", async () => {
    const { result } = renderHook(() => useSettings());
    await flushSettingsLoad();

    await act(async () => {
      result.current.updateApiKey("deepseek", "");
    });

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      "schnackai.provider_key.deepseek",
    );
  });
});
