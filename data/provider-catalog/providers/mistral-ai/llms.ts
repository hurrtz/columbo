import { defineLlms } from "../../definitions";
import type { CatalogLlm } from "../../../../src/catalog/types";

export const llms = defineLlms(
[
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
] satisfies CatalogLlm[],
);
