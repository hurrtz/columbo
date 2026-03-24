import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "stt",
      "modelId": "openai/gpt-4o-transcribe",
      "publicName": "GPT-4o Transcribe",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Public Replicate snippet shows 166,666 input tokens for $1, implying about $6.00 / 1M input tokens. Replicate also says the model is priced per input and output token, but I did not find a reliable output-token price in public snippets.",
      "limitsSummary": "Replicate page shows 16,000 context window and 2,000 max output tokens.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "Model-specific language list not surfaced on Replicate page. STT collection says speech-to-text models can cover 100+ languages, but that is collection-level, not a verified per-model list.",
      "notes": "Official model. Strong stable-picker STT entry. Not a realtime websocket transcription API on Replicate; use as request/response STT.",
      "officialSources": [
        "https://replicate.com/openai/gpt-4o-transcribe",
        "https://replicate.com/openai/gpt-4o-transcribe/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 6.0,
          "unit": "million_input_tokens",
          "sourceText": "166,666 input tokens for $1 (inference: about $6.00 per million input tokens)"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "16,000 context window"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 2000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "2,000 max output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No per-model language list surfaced on Replicate page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage under-documented on Replicate page",
          "collection-level STT copy mentions 100+ languages"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "stt",
      "modelId": "openai/gpt-4o-mini-transcribe",
      "publicName": "GPT-4o mini Transcribe",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Public Replicate snippet shows 333,333 input tokens for $1, implying about $3.00 / 1M input tokens. Replicate also says the model is priced per input and output token, but I did not find a reliable output-token price in public snippets.",
      "limitsSummary": "Replicate page shows 16,000 context window and 2,000 max output tokens.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "Model-specific language list not surfaced on Replicate page.",
      "notes": "Official model. Best cheap stable-picker STT entry on Replicate among the clearly documented official options I found.",
      "officialSources": [
        "https://replicate.com/openai/gpt-4o-mini-transcribe",
        "https://replicate.com/openai/gpt-4o-mini-transcribe/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "333,333 input tokens for $1 (inference: about $3.00 per million input tokens)"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "16,000 context window"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 2000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "2,000 max output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No per-model language list surfaced on Replicate page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage under-documented on Replicate page",
          "collection-level STT copy mentions 100+ languages"
        ]
      }
    }
  ),
]);
