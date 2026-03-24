import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "groq/compound",
      "publicName": "Compound",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limitsSummary": null,
      "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "languagesSummary": null,
      "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/speech-to-text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22/M chars"
        },
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "groq/compound-mini",
      "publicName": "Compound Mini",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limitsSummary": null,
      "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "languagesSummary": null,
      "notes": "Your sheet is outdated here: Groq now has public TTS in addition to LLM hosting and Whisper STT.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/speech-to-text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22/M chars"
        },
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "dynamic",
      "publicName": "Hosted open models",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "TTS: ~$22/M chars for English Orpheus, ~$40/M chars for Arabic. STT billed per audio minute with free/dev limits. LLM pricing depends on hosted model.",
      "limitsSummary": null,
      "regionSummary": "Groq-hosted cloud; regional granularity is more limited publicly than hyperscalers.",
      "languagesSummary": null,
      "notes": "Catalog changes frequently; includes Qwen, Kimi, OSS, etc.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/text-to-speech",
        "https://console.groq.com/docs/speech-to-text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 22.0,
          "unit": "million_characters",
          "sourceText": "$22/M chars"
        },
        {
          "amountUsd": 40.0,
          "unit": "million_characters",
          "sourceText": "$40/M chars"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);
