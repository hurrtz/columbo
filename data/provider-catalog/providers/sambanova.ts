import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "sambanova",
  "providerName": "SambaNova",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.sambanova.ai/",
    "https://cloud.sambanova.ai/",
    "https://docs.sambanova.ai/cloud/api-reference/audio"
  ],
  "integration": {
    "catalogType": "Dynamic enterprise/cloud platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": true,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "SambaCloud hosted model catalog [dynamic] — Includes Llama, DeepSeek and others",
      "tts": null,
      "stt": "Whisper Large v3 [whisper-large-v3]"
    },
    "pricing": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
    "limits": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified.",
    "region": "SambaCloud / enterprise deployments; public per-model region detail limited.",
    "sttLanguages": "Multilingual via Whisper family.",
    "ttsLanguages": null,
    "freeTier": "Trial/free access may exist depending on program; verify current dashboard.",
    "integrationNotes": "Your sheet is outdated: SambaNova docs now show native audio/STT support, but still no first-party TTS verified."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "sambanova",
    "providerName": "SambaNova",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "SambaCloud hosted model catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
    "limitsSummary": null,
    "regionSummary": "SambaCloud / enterprise deployments; public per-model region detail limited.",
    "languagesSummary": null,
    "notes": "Includes Llama, DeepSeek and others",
    "officialSources": [
      "https://docs.sambanova.ai/",
      "https://cloud.sambanova.ai/",
      "https://docs.sambanova.ai/cloud/api-reference/audio"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "sambanova",
    "providerName": "SambaNova",
    "service": "stt",
    "modelId": "whisper-large-v3",
    "publicName": "Whisper Large v3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "LLM pricing varies by hosted model. Audio/STT support is exposed through OpenAI-compatible endpoints in docs.",
    "limitsSummary": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified.",
    "regionSummary": "SambaCloud / enterprise deployments; public per-model region detail limited.",
    "languagesSummary": "Multilingual via Whisper family.",
    "notes": "Your sheet is outdated: SambaNova docs now show native audio/STT support, but still no first-party TTS verified.",
    "officialSources": [
      "https://docs.sambanova.ai/",
      "https://cloud.sambanova.ai/",
      "https://docs.sambanova.ai/cloud/api-reference/audio"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "~",
        "value": 25000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "Docs mention audio-input flows with ~25 MB upload ceiling for some endpoints. No public first-party TTS was verified."
      }
    ],
    "languageSupport": {
      "rawText": "Multilingual via Whisper family.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;
