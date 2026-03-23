import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "lemonfox-ai",
  "providerName": "Lemonfox.ai",
  "categoryName": "Speech-Focused Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "unsupported",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.lemonfox.ai/",
    "https://lemonfox.ai/",
    "https://lemonfox.ai/pricing"
  ],
  "integration": {
    "catalogType": "Budget speech platform",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": null,
      "tts": "Lemonfox TTS [tts] — Public docs are less granular on named TTS models",
      "stt": "Whisper Large v3 [whisper-large-v3]"
    },
    "pricing": "Examples: $5/month includes ~30h STT or ~2M TTS chars; extra ~$0.50 per 1M credits = ~3h STT or ~200k TTS chars. STT also promoted at ~$0.50 per 3 hours.",
    "limits": "Language support is broad for STT, but public model granularity is lighter than larger vendors.",
    "region": "Cloud provider; public region detail sparse.",
    "sttLanguages": "100+ languages.",
    "ttsLanguages": "Public marketing suggests multilingual TTS, but exact official language matrix needs live validation.",
    "freeTier": "Yes: first month free.",
    "integrationNotes": "Useful budget option, but metadata is relatively coarse. You may need more manual validation before exposing advanced controls."
  }
} satisfies CatalogProvider;

const llms = [] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "lemonfox-ai",
    "providerName": "Lemonfox.ai",
    "service": "stt",
    "modelId": "whisper-large-v3",
    "publicName": "Whisper Large v3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: $5/month includes ~30h STT or ~2M TTS chars; extra ~$0.50 per 1M credits = ~3h STT or ~200k TTS chars. STT also promoted at ~$0.50 per 3 hours.",
    "limitsSummary": "Language support is broad for STT, but public model granularity is lighter than larger vendors.",
    "regionSummary": "Cloud provider; public region detail sparse.",
    "languagesSummary": "100+ languages.",
    "notes": "Useful budget option, but metadata is relatively coarse. You may need more manual validation before exposing advanced controls.",
    "officialSources": [
      "https://docs.lemonfox.ai/",
      "https://lemonfox.ai/",
      "https://lemonfox.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "100+ languages.",
      "isMultilingual": true,
      "languageCount": 100,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "lemonfox-ai",
    "providerName": "Lemonfox.ai",
    "service": "tts",
    "modelId": "tts",
    "publicName": "Lemonfox TTS",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: $5/month includes ~30h STT or ~2M TTS chars; extra ~$0.50 per 1M credits = ~3h STT or ~200k TTS chars. STT also promoted at ~$0.50 per 3 hours.",
    "limitsSummary": null,
    "regionSummary": "Cloud provider; public region detail sparse.",
    "languagesSummary": "Public marketing suggests multilingual TTS, but exact official language matrix needs live validation.",
    "notes": "Public docs are less granular on named TTS models",
    "officialSources": [
      "https://docs.lemonfox.ai/",
      "https://lemonfox.ai/",
      "https://lemonfox.ai/pricing"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Public marketing suggests multilingual TTS, but exact official language matrix needs live validation.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Public marketing suggests multilingual TTS",
        "but exact official language matrix needs live validation"
      ],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;
