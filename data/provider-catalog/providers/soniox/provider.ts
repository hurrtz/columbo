import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "soniox",
    "providerName": "Soniox",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://soniox.com/docs/api-reference",
      "https://soniox.com/pricing",
      "https://soniox.com/"
    ],
    "integration": {
      "catalogType": "Speech-first STT catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": null,
      "protocols": [
        "websocket"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "activeModels": {
        "llm": null,
        "tts": null,
        "stt": "Soniox v4 Async [v4-async]\nSoniox v4 Real-Time [v4-realtime]"
      },
      "pricing": "About $0.10/hour async and $0.12/hour realtime from official pricing references.",
      "limits": "API free credits were discontinued in late 2025. Mixed-language support, speaker detection, and translation are included. Audio is not stored.",
      "region": "Global API with in-region processing / sovereign cloud options.",
      "sttLanguages": "60+ languages with mixed-language support.",
      "ttsLanguages": null,
      "freeTier": "No general API free credits now (consumer app has separate free credits).",
      "integrationNotes": "Very attractive pricing for STT. Model picker should distinguish API vs non-API free offerings so users do not assume API is free."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
