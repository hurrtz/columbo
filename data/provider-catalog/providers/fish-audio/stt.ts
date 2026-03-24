import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "fish-audio",
      "providerName": "Fish Audio",
      "service": "stt",
      "modelId": "/v1/asr",
      "publicName": "Fish Audio ASR",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "TTS about $15/M UTF-8 bytes; STT about $0.36/hour.",
      "limitsSummary": "Voice/model creation and cloning supported. Community voice ecosystem is large.",
      "regionSummary": "Fish Audio cloud; region detail limited.",
      "languagesSummary": "Public ASR exists; exact official language matrix should be validated live.",
      "notes": "Your sheet is outdated: Fish Audio now has a public STT endpoint, not just TTS.",
      "officialSources": [
        "https://docs.fish.audio/",
        "https://fish.audio/",
        "https://docs.fish.audio/api-reference"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_utf8_bytes",
          "sourceText": "$15/M UTF-8 bytes"
        },
        {
          "amountUsd": 0.36,
          "unit": "hour",
          "sourceText": "$0.36/hour"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Public ASR exists; exact official language matrix should be validated live.",
        "isMultilingual": false,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);
