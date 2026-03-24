import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "xiaomi-mimo",
      "providerName": "Xiaomi (MiMo)",
      "service": "tts",
      "modelId": "mimo-v2-tts",
      "publicName": "MiMo-V2-TTS",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "MiMo-V2-Pro: up to 256K context $1/M input and $3/M output; 256K-1M context $2/M input and $6/M output. Flash family is much cheaper where offered.",
      "limitsSummary": null,
      "regionSummary": "Public platform launched in March 2026; exact region/data residency details not yet well documented.",
      "languagesSummary": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
      "notes": "Your source sheet is outdated: Xiaomi now has public API models for LLM, omni multimodal, and TTS. STT is folded into Omni rather than a separate public STT product.",
      "officialSources": [
        "https://mimo.xiaomi.com/",
        "https://mimo.xiaomi.com/mimo-v2-pro",
        "https://platform.xiaomimimo.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1/M input and $3/M output"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "$1/M input and $3/M output"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "$2/M input and $6/M output"
        },
        {
          "amountUsd": 6.0,
          "unit": "million_output_tokens",
          "sourceText": "$2/M input and $6/M output"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Public marketing emphasizes speech + singing and expressive control; full language matrix should be validated live before launch.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);
