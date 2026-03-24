import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "stt",
      "modelId": "gpt-4o-transcribe",
      "publicName": "GPT-4o Transcribe",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Text Input $2.50, Text Output $10, Audio Input $6 per 1M tokens.",
      "limitsSummary": "Model catalog shows 25 MB max request audio file size; API reference lists it as a current transcription model option.",
      "regionSummary": "Azure model catalog / pricing page only; region availability not fully normalized in one static STT table.",
      "languagesSummary": "Language hint accepted via ISO-639-1; no fixed Azure language-count table for this specific model was retrieved.",
      "notes": "Preview line with retirement date 2026-06-01; do not use as the only stable STT picker entry.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/reference-preview",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-Transcribe, Text Input: $2.50."
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4o-Transcribe, ... Output: $10."
        },
        {
          "amountUsd": 6.0,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input: $6."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "Speech-to-text model powered by GPT-4o. 25 MB"
        }
      ],
      "languageSupport": {
        "rawText": "API accepts language in ISO-639-1; Azure did not publish a simple fixed language list for this specific model in retrieved docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "stt",
      "modelId": "gpt-4o-mini-transcribe",
      "publicName": "GPT-4o mini Transcribe",
      "aliases": [
        "gpt-4o-mini-transcribe-2025-12-15"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Text Input $1.25, Text Output $5, Audio Input $3 per 1M tokens for the 2025-12-15 GA line.",
      "limitsSummary": "Model catalog shows 25 MB max audio file size. API reference accepts both versionless and versioned forms.",
      "regionSummary": "Region availability is not surfaced in one simple STT-specific table.",
      "languagesSummary": "Language hint accepted via ISO-639-1; no fixed Azure language-count page for this specific model was retrieved.",
      "notes": "Best stable Azure OpenAI STT default. Prefer the GA 2025-12-15 generation over the retiring 2025-03-20 preview generation.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/reference-preview",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-mini-transcribe-2025-12-15, Text Input: $1.25."
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4o-mini-transcribe-2025-12-15, ... Output: $5."
        },
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input: $3."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "Speech-to-text model powered by GPT-4o mini. 25 MB"
        }
      ],
      "languageSupport": {
        "rawText": "API accepts ISO-639-1 language hints; no simple fixed language count published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "stt",
      "modelId": "gpt-4o-transcribe-diarize",
      "publicName": "GPT-4o Transcribe Diarize",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Text Input $2.50, Text Output $10, Audio Input $6 per 1M tokens.",
      "limitsSummary": "Model catalog shows 25 MB max audio file size.",
      "regionSummary": "Region availability not presented in one STT-specific static table.",
      "languagesSummary": "No fixed locale list published for this specific model in retrieved docs.",
      "notes": "Useful when diarization is required. GA line with published retirement date 2027-04-16.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/reference-preview",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-transcribe-diarize, Text Input: $2.50."
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4o-transcribe-diarize, ... Output: $10."
        },
        {
          "amountUsd": 6.0,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input: $6."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "Speech-to-text model with automatic speech recognition. 25 MB"
        }
      ],
      "languageSupport": {
        "rawText": "No fixed locale list published for this model in retrieved docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "stt",
      "modelId": "whisper",
      "publicName": "Whisper",
      "aliases": [
        "whisper-1"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Azure pricing page lists Whisper speech-model pricing, but retrieved exact dollar amounts were not cleanly recovered in the main en-US fetch.",
      "limitsSummary": "Model catalog lists 25 MB max request audio file size. API reference lists whisper-1 as a current transcription option.",
      "regionSummary": "Legacy-compatible Azure OpenAI transcription option.",
      "languagesSummary": "General-purpose speech recognition; no fixed Azure count retrieved here.",
      "notes": "Backward-compatibility option only. Retirement page says no earlier than 2026-06-18 retirement.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/reference-preview",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 26214400,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "General-purpose speech recognition model. 25 MB"
        }
      ],
      "languageSupport": {
        "rawText": "General-purpose speech recognition model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-compatible"
        ]
      }
    }
  ),
]);
