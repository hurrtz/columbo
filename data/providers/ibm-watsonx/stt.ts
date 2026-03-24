import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "stt",
      "modelId": "en-US",
      "publicName": "English (US) Large Speech Model",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-minute price not cleanly verifiable from current official crawlable docs; free tier is public.",
      "limitsSummary": "STT sync HTTP up to 100 MB; WebSocket max 100 MB per send and 4 MB frame size; no low_latency for large speech models.",
      "regionSummary": "IBM Cloud support date shown as 2024-05-20 on large-speech language page.",
      "languagesSummary": "English US large speech locale model.",
      "notes": "Prefer this over older en-US_BroadbandModel. Cleaner stable picker entry than legacy model families.",
      "officialSources": [
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-summary",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-http",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-websockets"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 104857600,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "Submit a maximum of 100 MB"
        },
        {
          "metric": "stream_chunk_bytes",
          "comparator": "<=",
          "value": 4194304,
          "unit": "bytes",
          "scope": "streaming",
          "sourceText": "WebSocket interface imposes a maximum frame size of 4 MB"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 30,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Session timeout occurs if the service receives no data or sends no interim results for 30 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Locale model en-US.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "large speech model",
          "low_latency unsupported for large speech models"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "stt",
      "modelId": "fr-FR",
      "publicName": "French (France) Large Speech Model",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-minute price unknown from current official crawlable docs.",
      "limitsSummary": "Large speech model family uses standard STT HTTP/WebSocket limits.",
      "regionSummary": "IBM Cloud support date shown as 2024-05-20 on large-speech page.",
      "languagesSummary": "French (France).",
      "notes": "Good stable picker locale entry.",
      "officialSources": [
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-summary"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Locale model fr-FR.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "fr-FR"
        ],
        "notes": [
          "large speech model"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "stt",
      "modelId": "de-DE",
      "publicName": "German Large Speech Model",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-minute price unknown from current official crawlable docs.",
      "limitsSummary": "Large speech model family uses standard STT HTTP/WebSocket limits.",
      "regionSummary": "IBM Cloud support date shown as 2024-11-19 on large-speech page.",
      "languagesSummary": "German.",
      "notes": "Good stable picker locale entry.",
      "officialSources": [
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-release-notes"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Locale model de-DE.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "de-DE"
        ],
        "notes": [
          "large speech model"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "stt",
      "modelId": "es-MX",
      "publicName": "Spanish (Mexico) Large Speech Model",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-minute price unknown from current official crawlable docs.",
      "limitsSummary": "Large speech model family uses standard STT HTTP/WebSocket limits.",
      "regionSummary": "IBM Cloud support date shown as 2024-06-18 on large-speech page.",
      "languagesSummary": "Spanish (Mexico).",
      "notes": "Large-speech locale picker is cleaner than legacy Latin-American fallbacks when available.",
      "officialSources": [
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Locale model es-MX.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "es-MX"
        ],
        "notes": [
          "large speech model"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "stt",
      "modelId": "en-US_Multimedia",
      "publicName": "English (US) Next-generation Multimedia",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Paid per-minute price unknown from current official crawlable docs.",
      "limitsSummary": "Supports low_latency; next-generation family does not support acoustic customization, keywords, processing_metrics or word_alternatives_threshold.",
      "regionSummary": "IBM docs treat it as GA.",
      "languagesSummary": "English (US), multimedia-oriented 16 kHz+ audio.",
      "notes": "Useful fallback when you need low_latency behavior or media-specific routing; not as clean as locale-only large speech picker.",
      "officialSources": [
        "https://ondeck.console.cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng",
        "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-summary"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Next-generation multimedia model en-US_Multimedia.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "en-US"
        ],
        "notes": [
          "multimedia",
          "low_latency supported"
        ]
      }
    }
  ),
]);
