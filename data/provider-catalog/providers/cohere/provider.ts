import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition({
  providerId: "cohere",
  providerName: "Cohere",
  categoryName: "Major Western Providers",
  hq: "CA",
  verifiedSupport: {
    llm: "native",
    stt: "unsupported",
    tts: "unsupported",
  },
  officialSources: [
    "https://docs.cohere.com/docs/models",
    "https://cohere.com/pricing",
    "https://docs.cohere.com/",
  ],
  integration: {
    catalogType: "Fixed first-party LLM catalog",
    coverage: "Mostly exhaustive",
    hasDynamicCatalog: false,
    needsLiveDiscovery: false,
    supportsSpeech: false,
    lowConfidence: false,
    openAiCompatible: false,
    protocols: [],
    regionSplitRecommended: true,
  },
  summaries: {
    activeModels: {
      llm: "Command A [command-a] — Exact dated aliases may vary\nCommand A Translate [command-a-translate]\nCommand A Reasoning [command-a-reasoning]\nCommand A Vision [command-a-vision]\nCommand R7B [command-r7b]\nCommand R+ [command-r-plus]\nCommand R [command-r]\nCommand [command]\nAya Expanse 8B [aya-expanse-8b]\nAya Expanse 32B [aya-expanse-32b]\nAya Vision [aya-vision]",
      tts: null,
      stt: null,
    },
    pricing:
      "Examples from pricing docs: Command $1/M input, $2/M output; Command R $0.50/$1.50; Command R+ $2.50/$10; Aya Expanse $0.50/$1.50.",
    limits: "No public native TTS/STT. LLM quotas vary by plan and endpoint.",
    region:
      "Cohere-hosted; sovereign/private deployments also available through partners.",
    sttLanguages: null,
    ttsLanguages: null,
    freeTier: "Yes: trial API key available.",
    integrationNotes:
      "Useful enterprise LLM provider, but treat it as text/multimodal-only for your speech app.",
  },
});

export const providerContext = createProviderContext(providerDefinition);
