import { defineSttModels } from "../../definitions";
import type { CatalogStt } from "../../../../src/catalog/types";

export const stt = defineSttModels(
[
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
] satisfies CatalogStt[],
);
