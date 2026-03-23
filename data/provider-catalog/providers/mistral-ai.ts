import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "mistral-ai",
  "providerName": "Mistral AI",
  "categoryName": "Major Western Providers",
  "hq": "FR",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "unsupported"
  },
  "officialSources": [
    "https://docs.mistral.ai/getting-started/models/models_overview/",
    "https://mistral.ai/pricing",
    "https://docs.mistral.ai/capabilities/audio/"
  ],
  "integration": {
    "catalogType": "Fixed first-party catalog",
    "coverage": "Mostly exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": false,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": true,
    "protocols": [
      "sse"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Mistral Small 4 [mistral-small-2603]\nMistral Large 3 [mistral-large-2512]\nMistral Medium 3.1 [mistral-medium-2508]\nMistral Small 3.2 [mistral-small-3.2]\nMinistral 3 14B [ministral-3-14b]\nMinistral 3 8B [ministral-3-8b]\nMinistral 3 3B [ministral-3-3b]\nMagistral Medium 1.2 [magistral-medium-1.2]\nMagistral Small 1.2 [magistral-small-1.2]\nCodestral [codestral]\nDevstral 2 [devstral-2]\nOCR 3 [ocr-3]",
      "tts": null,
      "stt": "Voxtral Mini Transcribe [voxtral-mini-2507]\nVoxtral Mini Transcribe 2 [voxtral-mini-transcribe-2]\nVoxtral Mini Transcribe Realtime [voxtral-mini-transcribe-realtime-2602]\nVoxtral Mini [voxtral-mini] — Audio understanding\nVoxtral Small [voxtral-small] — Audio understanding"
    },
    "pricing": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limits": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "region": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "sttLanguages": "13 languages for Voxtral family.",
    "ttsLanguages": null,
    "freeTier": "Yes: small free/test quotas have been offered in Le Platform; check account plan.",
    "integrationNotes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "codestral",
    "publicName": "Codestral",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "codestral-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "devstral-2",
    "publicName": "Devstral 2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "magistral-medium-1.2",
    "publicName": "Magistral Medium 1.2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "magistral-medium-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "magistral-small-1.2",
    "publicName": "Magistral Small 1.2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "magistral-small-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "ministral-3-14b",
    "publicName": "Ministral 3 14B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "ministral-3-3b",
    "publicName": "Ministral 3 3B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "ministral-3-8b",
    "publicName": "Ministral 3 8B",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "ministral-8b-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "mistral-large-2512",
    "publicName": "Mistral Large 3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "mistral-large-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "mistral-medium-2508",
    "publicName": "Mistral Medium 3.1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "mistral-medium-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "mistral-small-3.2",
    "publicName": "Mistral Small 3.2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null,
    "aliases": [
      "mistral-small-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "mistral-small-2603",
    "publicName": "Mistral Small 4",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "llm",
    "modelId": "ocr-3",
    "publicName": "OCR 3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": null,
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": null,
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "stt",
    "modelId": "voxtral-mini",
    "publicName": "Voxtral Mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": "13 languages for Voxtral family.",
    "notes": "Audio understanding",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 1800.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 2400.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      }
    ],
    "languageSupport": {
      "rawText": "13 languages for Voxtral family.",
      "isMultilingual": true,
      "languageCount": 13,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    },
    "aliases": [
      "voxtral-mini-latest"
    ]
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "stt",
    "modelId": "voxtral-mini-2507",
    "publicName": "Voxtral Mini Transcribe",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": "13 languages for Voxtral family.",
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 1800.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 2400.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      }
    ],
    "languageSupport": {
      "rawText": "13 languages for Voxtral family.",
      "isMultilingual": true,
      "languageCount": 13,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "stt",
    "modelId": "voxtral-mini-transcribe-2",
    "publicName": "Voxtral Mini Transcribe 2",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": "13 languages for Voxtral family.",
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 1800.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 2400.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      }
    ],
    "languageSupport": {
      "rawText": "13 languages for Voxtral family.",
      "isMultilingual": true,
      "languageCount": 13,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "stt",
    "modelId": "voxtral-mini-transcribe-realtime-2602",
    "publicName": "Voxtral Mini Transcribe Realtime",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": "13 languages for Voxtral family.",
    "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 1800.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 2400.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      }
    ],
    "languageSupport": {
      "rawText": "13 languages for Voxtral family.",
      "isMultilingual": true,
      "languageCount": 13,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "mistral-ai",
    "providerName": "Mistral AI",
    "service": "stt",
    "modelId": "voxtral-small",
    "publicName": "Voxtral Small",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: Mistral Large 3 $0.50/M input, $1.50/M output; Medium 3.1 $0.40/$2.00; Small 4 $0.15/$0.60; Voxtral transcription from ~$0.002/min.",
    "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
    "regionSummary": "Mistral-managed cloud; regional specifics are less granular publicly than hyperscalers.",
    "languagesSummary": "13 languages for Voxtral family.",
    "notes": "Audio understanding",
    "officialSources": [
      "https://docs.mistral.ai/getting-started/models/models_overview/",
      "https://mistral.ai/pricing",
      "https://docs.mistral.ai/capabilities/audio/"
    ],
    "openAiCompatible": true,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 0.5,
        "unit": "million_input_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 1.5,
        "unit": "million_output_tokens",
        "sourceText": "$0.50/M input, $1.50/M output"
      },
      {
        "amountUsd": 0.002,
        "unit": "minute",
        "sourceText": "$0.002/min"
      }
    ],
    "constraints": [
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 1800.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      },
      {
        "metric": "duration_seconds",
        "comparator": "~",
        "value": 2400.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms."
      }
    ],
    "languageSupport": {
      "rawText": "13 languages for Voxtral family.",
      "isMultilingual": true,
      "languageCount": 13,
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
