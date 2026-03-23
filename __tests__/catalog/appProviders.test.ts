import {
  getCatalogConstraintsForAppProvider,
  getCatalogModelForAppProvider,
  getCatalogModelsForAppProvider,
  getCatalogProviderForAppProvider,
  getCatalogProviderIdForAppProvider,
  getCatalogRealtimeModelsForAppProvider,
  getCatalogVerifiedServiceStateForAppProvider,
  isCatalogServiceSupportedForAppProvider,
} from "../../src/catalog";
import {
  PROVIDER_CATALOG_IDS,
  PROVIDER_CATALOG_VERIFIED_SUPPORT,
  PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY,
} from "../../src/constants/models";

describe("app provider catalog bridge", () => {
  it("maps every runtime provider to a catalog provider", () => {
    expect(PROVIDER_CATALOG_IDS).toEqual({
      openai: "openai",
      anthropic: "anthropic",
      gemini: "google-vertex-ai-studio",
      cohere: "cohere",
      deepseek: "deepseek",
      groq: "groq",
      mistral: "mistral-ai",
      nvidia: "nvidia-nim",
      together: "together-ai",
      xai: "xai",
    });

    expect(getCatalogProviderIdForAppProvider("gemini")).toBe(
      "google-vertex-ai-studio",
    );
  });

  it("reads verified support states from the catalog without changing runtime support flags", () => {
    expect(getCatalogVerifiedServiceStateForAppProvider("groq", "tts")).toBe(
      "native",
    );
    expect(getCatalogVerifiedServiceStateForAppProvider("xai", "stt")).toBe(
      "unsupported",
    );
    expect(getCatalogVerifiedServiceStateForAppProvider("mistral", "stt")).toBe(
      "native",
    );

    expect(PROVIDER_CATALOG_VERIFIED_SUPPORT.groq.tts).toBe("native");
    expect(PROVIDER_CATALOG_VERIFIED_SUPPORT.xai.stt).toBe("unsupported");
  });

  it("exposes provider-level discovery hints and model accessors", () => {
    expect(PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY.groq).toBe(true);
    expect(PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY.openai).toBe(false);

    expect(getCatalogProviderForAppProvider("openai")?.providerName).toBe(
      "OpenAI",
    );
    expect(
      getCatalogModelsForAppProvider("openai", "llm").some(
        (model) => model.modelId === "gpt-5.4",
      ),
    ).toBe(true);
  });

  it("returns model-level safeguards and realtime hints for mapped providers", () => {
    const openAiModel = getCatalogModelForAppProvider(
      "openai",
      "gpt-4o-mini-transcribe",
      "stt",
    );

    expect(openAiModel?.publicName).toBe("GPT-4o Mini Transcribe");
    expect(openAiModel?.supportsRealtime).toBe(true);

    expect(
      getCatalogConstraintsForAppProvider(
        "openai",
        "gpt-4o-mini-transcribe",
        "stt",
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          metric: "file_size_bytes",
          value: 25_000_000,
        }),
      ]),
    );

    expect(
      getCatalogRealtimeModelsForAppProvider("gemini", "llm").some(
        (model) => model.modelId === "gemini-live",
      ),
    ).toBe(true);
  });

  it("supports broad capability checks for future picker and safeguard work", () => {
    expect(isCatalogServiceSupportedForAppProvider("anthropic", "tts")).toBe(false);
    expect(isCatalogServiceSupportedForAppProvider("together", "tts")).toBe(true);
    expect(isCatalogServiceSupportedForAppProvider("nvidia", "stt")).toBe(true);
  });
});
