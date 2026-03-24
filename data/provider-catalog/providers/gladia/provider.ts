import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "gladia",
    "providerName": "Gladia",
    "categoryName": "Speech-Focused Providers",
    "hq": "FR",
    "verifiedSupport": {
      "llm": "unsupported",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.gladia.io/",
      "https://www.gladia.io/pricing",
      "https://www.gladia.io/"
    ],
    "integration": {
      "catalogType": "Fixed speech-first STT catalog",
      "coverage": "Mostly exhaustive",
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
        "tts": null,
        "stt": "Solaria-1 [solaria-1]"
      },
      "pricing": "Free plan includes ~10 hours/month. Paid plans add higher concurrency and features.",
      "limits": "Free plan: ~3 concurrent prerecorded jobs and ~1 live stream. Paid concurrency around 25 async / 30 live. Rich features like translation, PII detection, summarization, code-switching.",
      "region": "EU-based company; GDPR-friendly positioning.",
      "sttLanguages": "100+ languages with native code-switching support.",
      "ttsLanguages": null,
      "freeTier": "Yes.",
      "integrationNotes": "Good fit when multilingual STT and compliance matter, especially in EU contexts."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
