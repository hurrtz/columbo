import { defineLlms } from "../../definitions";
import type { CatalogLlm } from "../../../../src/catalog/types";

export const llms = defineLlms(
[
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-realtime-1.5",
    "publicName": "GPT Realtime 1.5",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Realtime text+audio",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1",
    "publicName": "GPT-4.1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1-mini",
    "publicName": "GPT-4.1 mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-4.1-nano",
    "publicName": "GPT-4.1 nano",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4",
    "publicName": "GPT-5.4",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4-mini",
    "publicName": "GPT-5.4 mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "gpt-5.4-nano",
    "publicName": "GPT-5.4 nano",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "o3",
    "publicName": "o3",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "llm",
    "modelId": "o4-mini",
    "publicName": "o4-mini",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": null,
    "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
    "officialSources": [
      "https://platform.openai.com/docs/models",
      "https://openai.com/api/pricing/",
      "https://platform.openai.com/docs/guides/speech-to-text"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [
      {
        "amountUsd": 2.5,
        "unit": "million_input_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      },
      {
        "amountUsd": 15.0,
        "unit": "million_output_tokens",
        "sourceText": "$2.50/M input, $15/M output"
      }
    ],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[],
);
