import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition({
  providerId: "xai",
  providerName: "xAI",
  categoryName: "Major Western Providers",
  hq: "US",
  verifiedSupport: {
    llm: "native",
    stt: "unsupported",
    tts: "native",
  },
  officialSources: [
    "https://docs.x.ai/",
    "https://x.ai/api",
    "https://docs.x.ai/docs/models",
  ],
  integration: {
    catalogType: "Fixed first-party LLM + voice APIs",
    coverage: "Mostly exhaustive",
    hasDynamicCatalog: false,
    needsLiveDiscovery: false,
    supportsSpeech: true,
    lowConfidence: false,
    openAiCompatible: true,
    protocols: ["grpc", "rest", "websocket"],
    regionSplitRecommended: false,
  },
  summaries: {
    activeModels: {
      llm: "Grok 4.20 [grok-4.20]\nGrok 4 0709 [grok-4-0709]\nGrok Code Fast 1 [grok-code-fast-1]\nGrok 4 Fast [grok-4-fast]\nGrok 4.1 Fast [grok-4-1-fast]\nGrok 4 Fast Non-Reasoning [grok-4-fast-non-reasoning]\nGrok 4.1 Fast Non-Reasoning [grok-4-1-fast-non-reasoning]",
      tts: "xAI TTS API [voice-based] — Public docs expose TTS voices rather than multiple named TTS model IDs\nVoice Agent API [voice-agent] — Session-based voice stack",
      stt: null,
    },
    pricing:
      "TTS API: $4.20/M chars. Voice Agent API: $0.05/min. LLM pricing varies by Grok model.",
    limits:
      "TTS max 15,000 chars/request. Voice Agent max 30 min/session, 100 concurrent sessions/team.",
    region:
      "Voice Agent docs point to us-east-1 and region-specific endpoint format <region>.api.x.ai; generic global endpoint api.x.ai also documented.",
    sttLanguages: null,
    ttsLanguages: "20 languages.",
    freeTier: "No clear permanent free tier documented.",
    integrationNotes:
      "Public standalone STT endpoint was not verified. Treat xAI as LLM+TTS unless you use the bundled Voice Agent flow.",
  },
});

export const providerContext = createProviderContext(providerDefinition);
