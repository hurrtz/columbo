import {
  clearProviderTtsVoiceCatalogCache,
  fetchDynamicProviderTtsVoiceOptions,
  getDynamicProviderTtsVoiceOptions,
} from "../../src/services/tts/voiceCatalog";
import {
  getProviderTtsVoiceOptions,
  getTtsVoiceLabel,
} from "../../src/constants/providers/speech";

global.fetch = jest.fn();

describe("tts voice catalog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearProviderTtsVoiceCatalogCache();
  });

  it("fetches ElevenLabs voices and exposes them through provider helpers", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          voices: [
            {
              voice_id: "MF3mGyEYCl7XYWbV9V6O",
              name: "Laura",
              labels: {
                accent: "German",
                gender: "female",
              },
            },
            {
              voice_id: "21m00Tcm4TlvDq8ikWAM",
              name: "Rachel",
              labels: {
                accent: "American",
                gender: "female",
              },
            },
          ],
        }),
    });

    const voices = await fetchDynamicProviderTtsVoiceOptions({
      provider: "elevenlabs",
      apiKey: "elevenlabs-test",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.elevenlabs.io/v1/voices",
      expect.objectContaining({
        headers: {
          "xi-api-key": "elevenlabs-test",
        },
        method: "GET",
      }),
    );
    expect(voices).toEqual([
      { id: "MF3mGyEYCl7XYWbV9V6O", label: "Laura · German · female" },
      { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel · American · female" },
    ]);
    expect(getDynamicProviderTtsVoiceOptions("elevenlabs")).toEqual(voices);
    expect(getProviderTtsVoiceOptions("elevenlabs", "en")).toEqual(voices);
    expect(getTtsVoiceLabel("elevenlabs", "21m00Tcm4TlvDq8ikWAM", "en")).toBe(
      "Rachel · American · female",
    );
  });

  it("returns an empty dynamic list for non-dynamic providers", async () => {
    await expect(
      fetchDynamicProviderTtsVoiceOptions({
        provider: "openai",
        apiKey: "sk-test",
      }),
    ).resolves.toEqual([]);

    expect(getDynamicProviderTtsVoiceOptions("openai")).toEqual([]);
  });

  it("refreshes the ElevenLabs catalog when the API key changes", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            voices: [
              {
                voice_id: "voice-a",
                name: "Alpha",
              },
            ],
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            voices: [
              {
                voice_id: "voice-b",
                name: "Beta",
              },
            ],
          }),
      });

    await expect(
      fetchDynamicProviderTtsVoiceOptions({
        provider: "elevenlabs",
        apiKey: "key-a",
      }),
    ).resolves.toEqual([{ id: "voice-a", label: "Alpha" }]);

    await expect(
      fetchDynamicProviderTtsVoiceOptions({
        provider: "elevenlabs",
        apiKey: "key-b",
      }),
    ).resolves.toEqual([{ id: "voice-b", label: "Beta" }]);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(getDynamicProviderTtsVoiceOptions("elevenlabs")).toEqual([
      { id: "voice-b", label: "Beta" },
    ]);
  });
});
