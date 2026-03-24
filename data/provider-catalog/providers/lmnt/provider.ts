import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "lmnt",
    "providerName": "LMNT",
    "categoryName": "Speech-Focused Providers",
    "hq": "US",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.lmnt.com/",
      "https://docs.lmnt.com/guides/models",
      "https://docs.lmnt.com/api-reference/account-info"
    ],
    "integration": {
      "catalogType": "TTS-first platform",
      "coverage": "Exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
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
        "llm": null,
        "tts": "Blizzard [blizzard]\nAurora (alias to Blizzard) [aurora] — Alias",
        "stt": null
      },
      "pricing": "Plan-based; account endpoint exposes character and voice limits.",
      "limits": "Real-time streaming sessions supported. Account plan determines character_limit and voice-cloning quotas.",
      "region": "LMNT cloud.",
      "sttLanguages": null,
      "ttsLanguages": "Primarily English-focused in current docs/positioning.",
      "freeTier": "Limited/free access may exist by plan, but not a broad always-on free tier statement.",
      "integrationNotes": "Simple low-latency TTS integration. One of the cleanest model catalogs because it is effectively a single production model plus alias."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
