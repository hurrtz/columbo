import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "stt",
      "modelId": "scribe_v2",
      "publicName": "Scribe v2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Business-tier starting price is $0.22 per hour. The pricing page presents this under Scribe v1/v2, not as separate v1-vs-v2 prices.",
      "limitsSummary": "Remote file must be accessible via HTTPS and be <2GB. Supports word/character timestamps, diarization up to 32 speakers, and keyterm prompting up to 100 terms.",
      "regionSummary": "No model-specific region split documented.",
      "languagesSummary": "90+ languages documented.",
      "notes": "This is the stable file/batch transcription picker. Webhook-based asynchronous processing is documented; the pricing page explicitly says STT can transcribe in bulk.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/overview/capabilities/speech-to-text",
        "https://elevenlabs.io/docs/api-reference/speech-to-text/convert",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.22,
          "unit": "hour",
          "sourceText": "Business-tier starting price: $0.22 per hour for Scribe v1 / v2."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 2147483648,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "The file size must be less than 2GB."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 32,
          "unit": "other",
          "scope": "audio",
          "sourceText": "The maximum amount of speakers that can be predicted is 32."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 100,
          "unit": "other",
          "scope": "model",
          "sourceText": "When more than 100 keyterms are provided, a minimum billable duration of 20 seconds applies per request."
        }
      ],
      "languageSupport": {
        "rawText": "Scribe v1 and v2 support 90+ languages.",
        "isMultilingual": true,
        "languageCount": 90,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "automatic-language-detection",
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "stt",
      "modelId": "scribe_v2_realtime",
      "publicName": "Scribe v2 Realtime",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Business-tier starting price is $0.39 per hour.",
      "limitsSummary": "Realtime WebSocket STT with partial and committed transcripts. Supports PCM 8kHz-48kHz and \u03bc-law. No public max session duration located in accessible docs.",
      "regionSummary": "No model-specific region split documented.",
      "languagesSummary": "90+ languages documented.",
      "notes": "Stable live-transcription picker. Best fit for low-latency voice apps and agents.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.39,
          "unit": "hour",
          "sourceText": "Business-tier starting price: $0.39 per hour for Scribe v2 Realtime."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Scribe v2 Realtime delivers state-of-the-art accuracy in over 90 languages.",
        "isMultilingual": true,
        "languageCount": 90,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "automatic-language-detection",
          "streaming-websocket"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "elevenlabs",
      "providerName": "Elevenlabs",
      "service": "stt",
      "modelId": "scribe_v1",
      "publicName": "Scribe v1",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Public pricing is grouped with Scribe v2 under a shared Scribe v1/v2 price card; no separate v1 price is published.",
      "limitsSummary": "Outclassed by v2 models. Public convert endpoint still documents scribe_v1 as an allowed value.",
      "regionSummary": "Unknown",
      "languagesSummary": "90+ languages documented.",
      "notes": "Do not expose in a stable picker unless required for backward compatibility.",
      "officialSources": [
        "https://elevenlabs.io/docs/overview/models",
        "https://elevenlabs.io/docs/api-reference/speech-to-text/convert",
        "https://elevenlabs.io/pricing/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Scribe v1 is documented as outclassed by v2 models; language coverage remains 90+ languages.",
        "isMultilingual": true,
        "languageCount": 90,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
]);
