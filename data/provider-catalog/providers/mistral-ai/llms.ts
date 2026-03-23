import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
{
  "modelId": "codestral",
  "publicName": "Codestral",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "devstral-2",
  "publicName": "Devstral 2",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
  ),
  providerContext.llm(
{
  "modelId": "magistral-medium-1.2",
  "publicName": "Magistral Medium 1.2",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "magistral-small-1.2",
  "publicName": "Magistral Small 1.2",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "ministral-3-14b",
  "publicName": "Ministral 3 14B",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
  ),
  providerContext.llm(
{
  "modelId": "ministral-3-3b",
  "publicName": "Ministral 3 3B",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
  ),
  providerContext.llm(
{
  "modelId": "ministral-3-8b",
  "publicName": "Ministral 3 8B",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "mistral-large-2512",
  "publicName": "Mistral Large 3",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "mistral-medium-2508",
  "publicName": "Mistral Medium 3.1",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "mistral-small-3.2",
  "publicName": "Mistral Small 3.2",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
}
  ),
  providerContext.llm(
{
  "modelId": "mistral-small-2603",
  "publicName": "Mistral Small 4",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
  ),
  providerContext.llm(
{
  "modelId": "ocr-3",
  "publicName": "OCR 3",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Your source sheet is outdated here: Mistral now has native audio/STT via Voxtral, but still no public native TTS.",
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
  ),
]);
