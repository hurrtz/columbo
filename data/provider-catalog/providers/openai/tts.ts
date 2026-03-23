import { defineTtsModels } from "../../definitions";
import type { CatalogTts } from "../../../../src/catalog/types";

export const tts = defineTtsModels(
[
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "gpt-4o-mini-tts",
    "publicName": "GPT-4o mini TTS",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "tts-1",
    "publicName": "TTS-1",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  },
  {
    "providerId": "openai",
    "providerName": "OpenAI",
    "service": "tts",
    "modelId": "tts-1-hd",
    "publicName": "TTS-1 HD",
    "status": "Documented active/current",
    "catalogScope": "Mostly exhaustive",
    "pricingSummary": "Examples: GPT-5.4 $2.50/M input, $15/M output; speech models use minute/character/audio pricing depending on endpoint.",
    "limitsSummary": null,
    "regionSummary": "Global by default; regional data residency endpoints available for supported models (e.g., EU/US) at premium pricing.",
    "languagesSummary": "Multilingual; docs note English-optimized voices.",
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
    "languageSupport": {
      "rawText": "Multilingual; docs note English-optimized voices.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": [
        "english-optimized"
      ]
    }
  }
] satisfies CatalogTts[],
);
