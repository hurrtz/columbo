import * as SecureStore from "expo-secure-store";

import { RUNTIME_PROVIDER_IDS } from "../../src/constants/providers/runtimeState";
import { loadStoredApiKeys } from "../../src/hooks/settings/storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

describe("settings storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("limits concurrent SecureStore reads while loading every provider key", async () => {
    let activeReads = 0;
    let maximumConcurrentReads = 0;

    (SecureStore.getItemAsync as jest.Mock).mockImplementation(
      async (key: string) => {
        activeReads += 1;
        maximumConcurrentReads = Math.max(
          maximumConcurrentReads,
          activeReads,
        );
        await Promise.resolve();
        activeReads -= 1;
        return key.endsWith(".xai") ? " xai-key " : null;
      },
    );

    const apiKeys = await loadStoredApiKeys();

    expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(
      RUNTIME_PROVIDER_IDS.length,
    );
    expect(maximumConcurrentReads).toBe(3);
    expect(apiKeys.xai).toBe("xai-key");
  });

  it("keeps successfully loaded keys when one SecureStore read fails", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    (SecureStore.getItemAsync as jest.Mock).mockImplementation(
      async (key: string) => {
        if (key.endsWith(".anthropic")) {
          throw new Error("Keychain unavailable");
        }

        if (key.endsWith(".openai")) {
          return "openai-key";
        }

        if (key.endsWith(".xai")) {
          return "xai-key";
        }

        return null;
      },
    );

    await expect(loadStoredApiKeys()).resolves.toEqual(
      expect.objectContaining({
        anthropic: "",
        openai: "openai-key",
        xai: "xai-key",
      }),
    );
    expect(consoleError).toHaveBeenCalledWith(
      "[settings-storage] failed to load API key for anthropic",
      expect.any(Error),
    );

    consoleError.mockRestore();
  });

  it("persists the legacy Grok key under xAI after loading it", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockImplementation(
      async (key: string) =>
        key === "columbo.provider_key.grok" ? " legacy-xai-key " : null,
    );

    const apiKeys = await loadStoredApiKeys();

    expect(apiKeys.xai).toBe("legacy-xai-key");
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "columbo.provider_key.xai",
      "legacy-xai-key",
    );
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      "columbo.provider_key.grok",
    );
  });
});
