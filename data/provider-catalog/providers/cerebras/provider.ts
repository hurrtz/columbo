import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "cerebras",
    "providerName": "Cerebras",
    "categoryName": "Inference Platforms",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://inference-docs.cerebras.ai/",
      "https://www.cerebras.ai/",
      "https://inference-docs.cerebras.ai/capabilities/voice-ai"
    ],
    "integration": {
      "catalogType": "Dynamic fast-LLM hosting",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Fast hosted LLM catalog [dynamic] — Examples change quickly; voice examples use external speech providers",
        "tts": null,
        "stt": null
      },
      "pricing": "Cerebras emphasizes ultra-fast LLM inference; pricing depends on model/plan.",
      "limits": "Official public docs reviewed did not show first-party native TTS/STT; voice examples pair Cerebras with third-party speech components.",
      "region": "Cerebras cloud; public region granularity limited.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "Yes: 'free to get started' style access has been promoted.",
      "integrationNotes": "Treat Cerebras as an LLM compute/inference provider, not a native speech provider."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
