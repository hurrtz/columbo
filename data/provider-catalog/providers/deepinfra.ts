import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "deepinfra",
  "providerName": "DeepInfra",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://deepinfra.com/docs",
    "https://deepinfra.com/models",
    "https://deepinfra.com/"
  ],
  "integration": {
    "catalogType": "Dynamic hosting platform",
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
      "llm": "Hosted open/partner model catalog [dynamic]",
      "tts": "Qwen3 TTS [Qwen/Qwen3-TTS]\nTTS catalog [dynamic]",
      "stt": "Whisper Large [openai/whisper-large]\nASR catalog [dynamic]"
    },
    "pricing": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limits": "Catalog is dynamic; speech model capabilities and quotas differ by hosted model.",
    "region": "Public model-level region/data center detail is limited.",
    "sttLanguages": "Depends on chosen hosted model (e.g., Whisper multilingual).",
    "ttsLanguages": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
    "freeTier": "Small trial/free usage may exist depending on account state; verify current policy.",
    "integrationNotes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Hosted open/partner model catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limitsSummary": null,
    "regionSummary": "Public model-level region/data center detail is limited.",
    "languagesSummary": null,
    "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "service": "stt",
    "modelId": "dynamic",
    "publicName": "ASR catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limitsSummary": "Catalog is dynamic; speech model capabilities and quotas differ by hosted model.",
    "regionSummary": "Public model-level region/data center detail is limited.",
    "languagesSummary": "Depends on chosen hosted model (e.g., Whisper multilingual).",
    "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen hosted model (e.g., Whisper multilingual).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen hosted model (e.g",
        "Whisper multilingual"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "service": "stt",
    "modelId": "openai/whisper-large",
    "publicName": "Whisper Large",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limitsSummary": "Catalog is dynamic; speech model capabilities and quotas differ by hosted model.",
    "regionSummary": "Public model-level region/data center detail is limited.",
    "languagesSummary": "Depends on chosen hosted model (e.g., Whisper multilingual).",
    "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen hosted model (e.g., Whisper multilingual).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen hosted model (e.g",
        "Whisper multilingual"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "service": "tts",
    "modelId": "Qwen/Qwen3-TTS",
    "publicName": "Qwen3 TTS",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limitsSummary": null,
    "regionSummary": "Public model-level region/data center detail is limited.",
    "languagesSummary": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
    "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
      "isMultilingual": true,
      "languageCount": 10,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen hosted model (e.g",
        "Qwen3-TTS supports ~10 languages"
      ],
      "notes": []
    }
  },
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "service": "tts",
    "modelId": "dynamic",
    "publicName": "TTS catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Varies by model page. Example speech prices depend on chosen hosted model.",
    "limitsSummary": null,
    "regionSummary": "Public model-level region/data center detail is limited.",
    "languagesSummary": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
    "notes": "Your sheet is outdated here: DeepInfra now exposes TTS and speech-recognition categories at platform level.",
    "officialSources": [
      "https://deepinfra.com/docs",
      "https://deepinfra.com/models",
      "https://deepinfra.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on chosen hosted model (e.g., Qwen3-TTS supports ~10 languages).",
      "isMultilingual": true,
      "languageCount": 10,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on chosen hosted model (e.g",
        "Qwen3-TTS supports ~10 languages"
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
