import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "categoryName": "Major Western Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "integration": {
      "catalogType": "Multi-service platform",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [
        "websocket"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Azure OpenAI / Azure AI Foundry catalog [dynamic] — Includes GPT, Phi, Llama, Mistral, Cohere and partner models; use live catalog\nGPT-5 family on Azure [dynamic]\nGPT-4.1 family on Azure [dynamic]\nGPT-4o family on Azure [dynamic]\nPhi family [dynamic]",
        "tts": "Azure Speech voices [voice-based] — Service uses voice names rather than a small fixed model catalog\nCustom Neural Voice [custom]",
        "stt": "Azure Speech recognition [speech]\nAzure Whisper [whisper]\nCustom Speech [custom]"
      },
      "pricing": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
      "limits": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI.",
      "region": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
      "sttLanguages": "Broad multilingual support; Whisper plus Azure speech/custom models.",
      "ttsLanguages": "400+ voices across 140+ languages/variants.",
      "freeTier": "Yes: Azure Speech F0; separate trial/credits may apply for Azure/OpenAI subscriptions.",
      "integrationNotes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
