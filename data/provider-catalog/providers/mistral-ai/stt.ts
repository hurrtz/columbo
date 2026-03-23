import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
{
  "modelId": "voxtral-mini",
  "publicName": "Voxtral Mini",
  "status": "Documented active/current",
  "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
  "notes": "Audio understanding",
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
}
  ),
  providerContext.stt(
{
  "modelId": "voxtral-mini-2507",
  "publicName": "Voxtral Mini Transcribe",
  "status": "Documented active/current",
  "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
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
  ),
  providerContext.stt(
{
  "modelId": "voxtral-mini-transcribe-2",
  "publicName": "Voxtral Mini Transcribe 2",
  "status": "Documented active/current",
  "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
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
  ),
  providerContext.stt(
{
  "modelId": "voxtral-mini-transcribe-realtime-2602",
  "publicName": "Voxtral Mini Transcribe Realtime",
  "status": "Documented active/current",
  "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
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
  ),
  providerContext.stt(
{
  "modelId": "voxtral-small",
  "publicName": "Voxtral Small",
  "status": "Documented active/current",
  "limitsSummary": "Voxtral supports ~13 languages, up to ~30 min transcription / ~40 min audio understanding; realtime latency target sub-200 ms.",
  "notes": "Audio understanding",
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
  ),
]);
