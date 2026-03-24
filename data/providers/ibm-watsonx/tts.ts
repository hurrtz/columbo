import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "tts",
      "modelId": "en-US_VictoriaNatural",
      "publicName": "US English Victoria Natural",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official free tier and paid plan structure are public, but current crawlable official per-character rate is not fully exposed in docs.",
      "limitsSummary": "TTS GET max 8 KB total; POST max 5 KB input text body; WebSocket max 5 KB input text.",
      "regionSummary": "Voice availability is returned by GET /v1/voices; do live discovery in production.",
      "languagesSummary": "US English natural voice.",
      "notes": "IBM TTS is voice-selected; using voice IDs as picker IDs is the practical app abstraction.",
      "officialSources": [
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices",
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-service-features",
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices-list"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 8192,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "HTTP GET /v1/synthesize accepts a maximum of 8 KB of input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 5120,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "HTTP POST body max 5 KB input text; WebSocket max 5 KB input text"
        }
      ],
      "languageSupport": {
        "rawText": "US English GA natural voice.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 1,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "voice-dependent",
          "natural voice"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "tts",
      "modelId": "en-US_LisaExpressive",
      "publicName": "US English Lisa Expressive",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-character rate not cleanly exposed in current crawlable official docs.",
      "limitsSummary": "Same global TTS request-size limits as service.",
      "regionSummary": "Live-discover actual voice availability.",
      "languagesSummary": "US English expressive voice.",
      "notes": "Expressive voices have extra speaking-style features and slightly higher latency.",
      "officialSources": [
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices",
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-service-features"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "US English GA expressive voice.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 1,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "voice-dependent",
          "expressive",
          "higher latency than other voice types"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "tts",
      "modelId": "en-US_AllisonV3Voice",
      "publicName": "US English Allison V3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-character rate not cleanly exposed in current crawlable official docs.",
      "limitsSummary": "Same global TTS request-size limits as service.",
      "regionSummary": "Live-discover actual voice availability.",
      "languagesSummary": "US English enhanced neural voice.",
      "notes": "Good compatibility/fallback GA voice.",
      "officialSources": [
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "US English GA enhanced neural voice.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 1,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "voice-dependent",
          "enhanced neural"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "tts",
      "modelId": "pt-BR_CamilaNatural",
      "publicName": "Brazilian Portuguese Camila Natural",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-character rate not cleanly exposed in current crawlable official docs.",
      "limitsSummary": "Same global TTS request-size limits as service.",
      "regionSummary": "Live-discover actual voice availability.",
      "languagesSummary": "Brazilian Portuguese natural voice.",
      "notes": "Useful non-English stable picker candidate.",
      "officialSources": [
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "pt-BR GA natural voice.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 1,
        "listedLanguages": [
          "pt-BR"
        ],
        "notes": [
          "voice-dependent",
          "natural voice"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "tts",
      "modelId": "es-LA_DanielaExpressive",
      "publicName": "Latin American Spanish Daniela Expressive",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-character rate not cleanly exposed in current crawlable official docs.",
      "limitsSummary": "Same global TTS request-size limits as service.",
      "regionSummary": "Live-discover actual voice availability.",
      "languagesSummary": "Latin American Spanish expressive voice.",
      "notes": "Useful non-English expressive picker candidate.",
      "officialSources": [
        "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "es-LA GA expressive voice.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 1,
        "listedLanguages": [
          "es-LA"
        ],
        "notes": [
          "voice-dependent",
          "expressive"
        ]
      }
    }
  ),
]);
