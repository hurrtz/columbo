import {
  clearProviderTtsVoiceCatalogCache,
  fetchDynamicProviderTtsVoiceOptions,
  getDynamicProviderTtsVoiceOptions,
  providerHasDynamicTtsVoiceCatalog,
} from "../../src/services/tts/voiceCatalog";

global.fetch = jest.fn();

describe("tts voice catalog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearProviderTtsVoiceCatalogCache();
  });

  it("returns an empty dynamic list for providers without a dynamic catalog", async () => {
    await expect(
      fetchDynamicProviderTtsVoiceOptions({
        provider: "openai",
        apiKey: "sk-test",
      }),
    ).resolves.toEqual([]);

    expect(getDynamicProviderTtsVoiceOptions("openai")).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("reports that no core provider exposes a dynamic voice catalog", () => {
    expect(providerHasDynamicTtsVoiceCatalog("openai")).toBe(false);
    expect(providerHasDynamicTtsVoiceCatalog("gemini")).toBe(false);
    expect(providerHasDynamicTtsVoiceCatalog("xai")).toBe(false);
  });
});
