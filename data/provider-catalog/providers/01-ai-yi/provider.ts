import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "01-ai-yi",
    "providerName": "01.AI (Yi)",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://www.01.ai/",
      "https://www.lingyiwanwu.com/en",
      "https://github.com/01-ai/Yi"
    ],
    "integration": {
      "catalogType": "Open-weight + enterprise platform",
      "coverage": "Low-confidence / public self-serve unclear",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": true,
      "openAiCompatible": null,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Yi 1.5 6B [yi-1.5-6b]\nYi 1.5 9B [yi-1.5-9b]\nYi 1.5 34B [yi-1.5-34b]\nYi Large [yi-large] — OpenRouter/partner visibility exists; current first-party self-serve API less clear\nWorldWise platform [worldwise] — Enterprise/platform emphasis",
        "tts": null,
        "stt": null
      },
      "pricing": "Current first-party public hosted pricing was not clearly retrievable from official sources reviewed.",
      "limits": "Provider definitely exists, but current public self-serve catalog/pricing is much less explicit than the open-weight Yi family.",
      "region": "Enterprise/platform specific; not clearly centralized publicly.",
      "sttLanguages": null,
      "ttsLanguages": null,
      "freeTier": "Not clearly documented.",
      "integrationNotes": "For production BYOK, treat 01.AI as 'exists, but manual commercial validation required' rather than plug-and-play."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
