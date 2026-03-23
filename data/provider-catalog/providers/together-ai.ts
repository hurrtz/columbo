import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "together-ai",
  "providerName": "Together AI",
  "categoryName": "Inference Platforms",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://docs.together.ai/docs/serverless-models",
    "https://docs.together.ai/reference/audio-speech",
    "https://docs.together.ai/reference/audio-transcriptions"
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
      "llm": "Serverless model catalog [dynamic] — 100+ open-source/partner models; use live serverless catalog",
      "tts": "Orpheus 3B 0.1 FT [canopylabs/orpheus-3b-0.1-ft]\nKokoro 82M [hexgrad/Kokoro-82M]\nCartesia Sonic 3 [cartesia/sonic-3]\nCartesia Sonic 2 [cartesia/sonic-2]\nCartesia Sonic [cartesia/sonic]",
      "stt": "Whisper Large v3 [openai/whisper-large-v3]\nParakeet TDT 0.6B v3 [nvidia/parakeet-tdt-0.6b-v3]"
    },
    "pricing": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limits": "Dynamic catalog and prices change often. Validate per-model concurrency and context windows at runtime.",
    "region": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "sttLanguages": "Depends on model (e.g., Whisper multilingual, Parakeet family).",
    "ttsLanguages": "Depends on model (e.g., Kokoro vs Cartesia).",
    "freeTier": "Free/test access may be available depending on account plan; not uniform across all models.",
    "integrationNotes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Serverless model catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": null,
    "notes": "100+ open-source/partner models; use live serverless catalog",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "stt",
    "modelId": "nvidia/parakeet-tdt-0.6b-v3",
    "publicName": "Parakeet TDT 0.6B v3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": "Dynamic catalog and prices change often. Validate per-model concurrency and context windows at runtime.",
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Whisper multilingual, Parakeet family).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Whisper multilingual, Parakeet family).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Whisper multilingual",
        "Parakeet family"
      ],
      "notes": []
    }
  },
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "stt",
    "modelId": "openai/whisper-large-v3",
    "publicName": "Whisper Large v3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": "Dynamic catalog and prices change often. Validate per-model concurrency and context windows at runtime.",
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Whisper multilingual, Parakeet family).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Whisper multilingual, Parakeet family).",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Whisper multilingual",
        "Parakeet family"
      ],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "tts",
    "modelId": "cartesia/sonic",
    "publicName": "Cartesia Sonic",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Kokoro vs Cartesia).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Kokoro vs Cartesia).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Kokoro vs Cartesia"
      ],
      "notes": []
    }
  },
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "tts",
    "modelId": "cartesia/sonic-2",
    "publicName": "Cartesia Sonic 2",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Kokoro vs Cartesia).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Kokoro vs Cartesia).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Kokoro vs Cartesia"
      ],
      "notes": []
    }
  },
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "tts",
    "modelId": "cartesia/sonic-3",
    "publicName": "Cartesia Sonic 3",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Kokoro vs Cartesia).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Kokoro vs Cartesia).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Kokoro vs Cartesia"
      ],
      "notes": []
    }
  },
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "tts",
    "modelId": "hexgrad/Kokoro-82M",
    "publicName": "Kokoro 82M",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Kokoro vs Cartesia).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Kokoro vs Cartesia).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Kokoro vs Cartesia"
      ],
      "notes": []
    }
  },
  {
    "providerId": "together-ai",
    "providerName": "Together AI",
    "service": "tts",
    "modelId": "canopylabs/orpheus-3b-0.1-ft",
    "publicName": "Orpheus 3B 0.1 FT",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    "limitsSummary": null,
    "regionSummary": "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    "languagesSummary": "Depends on model (e.g., Kokoro vs Cartesia).",
    "notes": "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    "officialSources": [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions"
    ],
    "openAiCompatible": true,
    "supportsRealtime": null,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      },
      {
        "amountUsd": 65.0,
        "unit": "million_characters",
        "sourceText": "$65/M chars"
      },
      {
        "amountUsd": 0.0015,
        "unit": "minute",
        "sourceText": "$0.0015/audio min"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Depends on model (e.g., Kokoro vs Cartesia).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [
        "Depends on model (e.g",
        "Kokoro vs Cartesia"
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
