import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "tts",
      "modelId": "gpt-4o-mini-tts",
      "publicName": "GPT-4o mini TTS",
      "aliases": [
        "gpt-4o-mini-tts-2025-12-15"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Text Input $0.60 per 1M tokens for the 2025-12-15 line; the fetched snippet did not cleanly expose the audio-output token price.",
      "limitsSummary": "No simple fixed char/minute cap published in retrieved OpenAI TTS docs; use Azure OpenAI general audio message limits plus runtime testing.",
      "regionSummary": "Azure pricing page lists it; full region normalization remains dynamic/page-driven.",
      "languagesSummary": "Voice/language inventory is not published as a simple static table for this model. Style/tone prompting is documented.",
      "notes": "Best Azure OpenAI TTS picker entry. Prefer GA 2025-12-15 generation over the preview 2025-03-20 line retiring 2026-06-01.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/audio-completions-quickstart",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-mini-TTS-2025-12-15, Text Input: $0.60."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "You can guide the voice to speak in a specific style or tone; Azure did not publish a fixed voice-count table for this model in retrieved docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "tts",
      "modelId": "tts",
      "publicName": "TTS",
      "aliases": [
        "tts-1"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public Azure pricing page has a TTS row, but exact price extraction was incomplete in this audit.",
      "limitsSummary": "No fixed model-specific limit recovered in retrieved docs.",
      "regionSummary": "Legacy-compatible Azure OpenAI TTS option.",
      "languagesSummary": "General-purpose speech synthesis.",
      "notes": "Backward-compatibility option only. Retirement page says retirement 2026-06-18.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/openai/audio-completions-quickstart",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "General-purpose speech synthesis.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-compatible",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "tts",
      "modelId": "tts-hd",
      "publicName": "TTS HD",
      "aliases": [
        "tts-1-hd"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public Azure pricing page has a TTS HD row, but exact price extraction was incomplete in this audit.",
      "limitsSummary": "No fixed model-specific limit recovered in retrieved docs.",
      "regionSummary": "Legacy-compatible Azure OpenAI TTS option.",
      "languagesSummary": "General-purpose higher-quality speech synthesis.",
      "notes": "Backward-compatibility option only. Retirement page says retirement 2026-06-18.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/openai/audio-completions-quickstart",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "General-purpose higher-quality speech synthesis.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-compatible",
          "voice-dependent"
        ]
      }
    }
  ),
]);
