import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "aleph-alpha",
    "providerName": "Aleph Alpha",
    "categoryName": "Major Western Providers",
    "hq": "DE",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://aleph-alpha.com/",
      "https://docs.aleph-alpha.com/",
      "https://docs.aleph-alpha.com/docs/phariaai/overview"
    ],
    "integration": {
      "catalogType": "Enterprise/private sovereign platform",
      "coverage": "Low-confidence / enterprise-only",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": true,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": true
    },
    "summaries": {
      "activeModels": {
        "llm": "Pharia-1 LLM 7B Control [pharia-1-llm-7b-control]\nLlama 3.1 8B [llama-3.1-8b] — Available in manager examples\nLlama 3.3 70B [llama-3.3-70b] — Available in manager examples\nLlama Guard 3 8B [llama-guard-3-8b] — Safety model in manager examples",
        "tts": null,
        "stt": null
      },
      "pricing": "Custom/enterprise pricing; no broad public self-serve price card located.",
      "limits": "Current public material emphasizes private deployment/sovereign AI rather than open self-serve API.",
      "region": "Customer-controlled / sovereign / on-prem / private cloud options.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "No public free tier found.",
      "integrationNotes": "Exists, but the public self-serve SaaS story is much weaker than older Luminous-era expectations. Best treated as enterprise/private infrastructure."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
