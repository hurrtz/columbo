import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "siliconflow",
  "providerName": "SiliconFlow",
  "categoryName": "Inference Platforms",
  "hq": "CN",
  "verifiedSupport": {
    "llm": "native",
    "stt": "partial",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.siliconflow.com/",
    "https://cloud.siliconflow.com/",
    "https://www.siliconflow.com/"
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
    "regionSplitRecommended": true
  },
  "summaries": {
    "activeModels": {
      "llm": "Hosted model catalog [dynamic] — 500+ models claimed",
      "tts": "Fish Speech V1.5 [fish-speech-v1.5]\nCosyVoice2 0.5B [cosyvoice2-0.5b]\nIndexTTS-2 [indextts-2]",
      "stt": "Speech catalog [dynamic] — Speech support exists at platform level but official public STT detail was less explicit"
    },
    "pricing": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limits": "International service and China service are split across domains; exact speech quotas depend on model.",
    "region": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "sttLanguages": "Platform-level speech support exists, but verify exact model/language live before launch.",
    "ttsLanguages": "Depends on selected speech model.",
    "freeTier": "Trial credits may exist; check current dashboard.",
    "integrationNotes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Hosted model catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limitsSummary": null,
    "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "languagesSummary": null,
    "notes": "500+ models claimed",
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 7.15,
        "unit": "million_utf8_bytes",
        "sourceText": "$7.15/M UTF-8 bytes"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "service": "stt",
    "modelId": "dynamic",
    "publicName": "Speech catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limitsSummary": "International service and China service are split across domains; exact speech quotas depend on model.",
    "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "languagesSummary": "Platform-level speech support exists, but verify exact model/language live before launch.",
    "notes": "Speech support exists at platform level but official public STT detail was less explicit",
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 7.15,
        "unit": "million_utf8_bytes",
        "sourceText": "$7.15/M UTF-8 bytes"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Platform-level speech support exists, but verify exact model/language live before launch.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Platform-level speech support exists",
        "but verify exact model/language live before launch"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "service": "tts",
    "modelId": "cosyvoice2-0.5b",
    "publicName": "CosyVoice2 0.5B",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limitsSummary": null,
    "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "languagesSummary": "Depends on selected speech model.",
    "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 7.15,
        "unit": "million_utf8_bytes",
        "sourceText": "$7.15/M UTF-8 bytes"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on selected speech model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "service": "tts",
    "modelId": "fish-speech-v1.5",
    "publicName": "Fish Speech V1.5",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limitsSummary": null,
    "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "languagesSummary": "Depends on selected speech model.",
    "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 7.15,
        "unit": "million_utf8_bytes",
        "sourceText": "$7.15/M UTF-8 bytes"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on selected speech model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "siliconflow",
    "providerName": "SiliconFlow",
    "service": "tts",
    "modelId": "indextts-2",
    "publicName": "IndexTTS-2",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Fish Speech V1.5 ~$15/M UTF-8 bytes; CosyVoice2 0.5B and IndexTTS-2 ~$7.15/M UTF-8 bytes. LLM rates vary widely.",
    "limitsSummary": null,
    "regionSummary": "International services are separate from mainland-China service; exact model-level data center details not clearly published.",
    "languagesSummary": "Depends on selected speech model.",
    "notes": "Good low-cost platform, but keep .cn vs international environments distinct. STT evidence is weaker than TTS based on official docs reviewed.",
    "officialSources": [
      "https://docs.siliconflow.com/",
      "https://cloud.siliconflow.com/",
      "https://www.siliconflow.com/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 15.0,
        "unit": "million_utf8_bytes",
        "sourceText": "$15/M UTF-8 bytes"
      },
      {
        "amountUsd": 7.15,
        "unit": "million_utf8_bytes",
        "sourceText": "$7.15/M UTF-8 bytes"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on selected speech model.",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
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
