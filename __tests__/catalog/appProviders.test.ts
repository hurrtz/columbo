import {
  getAppProviderForCatalogProviderId,
  getCatalogConstraintsForAppProvider,
  getCatalogModelForAppProvider,
  getCatalogModelsForAppProvider,
  getCatalogProviderForAppProvider,
  getCatalogProviderIdForAppProvider,
  getCatalogRealtimeModelsForAppProvider,
  getCatalogVerifiedServiceStateForAppProvider,
  isCatalogServiceSupportedForAppProvider,
  isCatalogProviderId,
  listCatalogProviderIds,
} from "../../src/catalog";
import {
  PROVIDER_CATALOG_IDS,
  PROVIDER_CATALOG_VERIFIED_SUPPORT,
  PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY,
} from "../../src/constants/models";

describe("app provider catalog bridge", () => {
  it("maps every runtime provider to a catalog provider", () => {
    expect(PROVIDER_CATALOG_IDS).toEqual({
      "01-ai-yi": "01-ai-yi",
      openai: "openai",
      "microsoft-azure": "microsoft-azure",
      "aleph-alpha": "aleph-alpha",
      anthropic: "anthropic",
      assemblyai: "assemblyai",
      "ai21-labs": "ai21-labs",
      "alibaba-qwen-dashscope": "alibaba-qwen-dashscope",
      baichuan: "baichuan",
      "baidu-ernie-qianfan": "baidu-ernie-qianfan",
      "bytedance-doubao-seed": "bytedance-doubao-seed",
      deepgram: "deepgram",
      elevenlabs: "elevenlabs",
      "fish-audio": "fish-audio",
      gemini: "google-vertex-ai-studio",
      cerebras: "cerebras",
      cohere: "cohere",
      deepinfra: "deepinfra",
      deepseek: "deepseek",
      "fireworks-ai": "fireworks-ai",
      groq: "groq",
      "hugging-face-inference-api": "hugging-face-inference-api",
      hyperbolic: "hyperbolic",
      "ibm-watsonx": "ibm-watsonx",
      mistral: "mistral-ai",
      minimax: "minimax",
      "moonshot-ai-kimi": "moonshot-ai-kimi",
      nvidia: "nvidia-nim",
      "novita-ai": "novita-ai",
      perplexity: "perplexity",
      replicate: "replicate",
      sambanova: "sambanova",
      siliconflow: "siliconflow",
      stepfun: "stepfun",
      together: "together-ai",
      xai: "xai",
      "xiaomi-mimo": "xiaomi-mimo",
      "z-ai-zhipu-ai": "z-ai-zhipu-ai",
    });

    expect(getCatalogProviderIdForAppProvider("01-ai-yi")).toBe("01-ai-yi");
    expect(getCatalogProviderIdForAppProvider("aleph-alpha")).toBe("aleph-alpha");
    expect(getCatalogProviderIdForAppProvider("microsoft-azure")).toBe(
      "microsoft-azure",
    );
    expect(getCatalogProviderIdForAppProvider("gemini")).toBe(
      "google-vertex-ai-studio",
    );
    expect(getAppProviderForCatalogProviderId("01-ai-yi")).toBe("01-ai-yi");
    expect(getAppProviderForCatalogProviderId("aleph-alpha")).toBe("aleph-alpha");
    expect(getAppProviderForCatalogProviderId("microsoft-azure")).toBe(
      "microsoft-azure",
    );
    expect(getAppProviderForCatalogProviderId("openai")).toBe("openai");
    expect(getAppProviderForCatalogProviderId("assemblyai")).toBe("assemblyai");
    expect(getAppProviderForCatalogProviderId("baidu-ernie-qianfan")).toBe(
      "baidu-ernie-qianfan",
    );
    expect(getAppProviderForCatalogProviderId("deepgram")).toBe("deepgram");
    expect(getAppProviderForCatalogProviderId("elevenlabs")).toBe("elevenlabs");
    expect(getAppProviderForCatalogProviderId("fish-audio")).toBe("fish-audio");
    expect(getAppProviderForCatalogProviderId("ibm-watsonx")).toBe(
      "ibm-watsonx",
    );
    expect(getAppProviderForCatalogProviderId("replicate")).toBe("replicate");
    expect(getAppProviderForCatalogProviderId("xiaomi-mimo")).toBe("xiaomi-mimo");
    expect(isCatalogProviderId("google-vertex-ai-studio")).toBe(true);
    expect(isCatalogProviderId("not-a-provider")).toBe(false);
    expect(listCatalogProviderIds()).toContain("xiaomi-mimo");
    expect(listCatalogProviderIds()).toContain("z-ai-zhipu-ai");
    expect(listCatalogProviderIds()).toContain("ibm-watsonx");
  });

  it("reads verified support states from the catalog without changing runtime support flags", () => {
    expect(getCatalogVerifiedServiceStateForAppProvider("groq", "tts")).toBe(
      "native",
    );
    expect(getCatalogVerifiedServiceStateForAppProvider("xai", "stt")).toBe(
      "partial",
    );
    expect(getCatalogVerifiedServiceStateForAppProvider("mistral", "stt")).toBe(
      "native",
    );

    expect(PROVIDER_CATALOG_VERIFIED_SUPPORT.groq.tts).toBe("native");
    expect(PROVIDER_CATALOG_VERIFIED_SUPPORT.xai.stt).toBe("partial");
  });

  it("exposes provider-level discovery hints and model accessors", () => {
    expect(PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY.groq).toBe(true);
    expect(PROVIDER_NEEDS_LIVE_MODEL_DISCOVERY.openai).toBe(true);

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

    expect(openAiModel?.publicName).toBe("GPT-4o mini Transcribe");
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
        (model) => model.modelId === "gemini-live-2.5-flash-native-audio",
      ),
    ).toBe(true);
  });

  it("supports broad capability checks for future picker and safeguard work", () => {
    expect(isCatalogServiceSupportedForAppProvider("anthropic", "tts")).toBe(false);
    expect(isCatalogServiceSupportedForAppProvider("together", "tts")).toBe(true);
    expect(isCatalogServiceSupportedForAppProvider("nvidia", "stt")).toBe(true);
  });
});
