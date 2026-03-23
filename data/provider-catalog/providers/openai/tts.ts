import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
{
  "modelId": "gpt-4o-mini-tts",
  "publicName": "GPT-4o mini TTS",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
  providerContext.tts(
{
  "modelId": "tts-1",
  "publicName": "TTS-1",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
  providerContext.tts(
{
  "modelId": "tts-1-hd",
  "publicName": "TTS-1 HD",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Strongest single-vendor native speech stack for text, STT, TTS, and realtime speech-to-speech. Distinguish model ID from voice selection.",
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
  ),
]);
