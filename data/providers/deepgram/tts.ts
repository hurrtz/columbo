import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "tts",
      "modelId": "aura-2",
      "publicName": "Aura-2 Voice Family",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.030/1k characters PAYG, $0.027/1k characters Growth.",
      "limitsSummary": "REST practical request limit guidance 2000 chars/request; streaming throughput 2400 chars/min; active websocket timeout 60 minutes.",
      "regionSummary": "Supported on EU endpoint.",
      "languagesSummary": "English, Spanish, German, French, Dutch, Italian, Japanese. Spanish page section is marked EA.",
      "notes": "Voice IDs are the actual picker entries. Use Aura-2 as the current family; do not rely on family-only selection in UI.",
      "officialSources": [
        "https://developers.deepgram.com/docs/tts-models",
        "https://deepgram.com/pricing",
        "https://developers.deepgram.com/docs/text-to-speech-latency",
        "https://developers.deepgram.com/docs/streaming-text-to-speech",
        "https://developers.deepgram.com/reference/api-rate-limits",
        "https://developers.deepgram.com/reference/custom-endpoints"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.03,
          "unit": "other",
          "sourceText": "$0.030/1k characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 2000,
          "unit": "other",
          "scope": "general",
          "sourceText": "maximum of 2000 characters in each request"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "<=",
          "value": 2400,
          "unit": "tokens_per_minute",
          "scope": "streaming",
          "sourceText": "throughput limit is 2400 characters per minute"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 3600,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "An active websocket has a 60-minute timeout period"
        }
      ],
      "languageSupport": {
        "rawText": "Aura supports English, Spanish, German, French, Dutch, Italian, Japanese.",
        "isMultilingual": true,
        "languageCount": 7,
        "voiceCount": 91,
        "listedLanguages": [
          "en",
          "es",
          "de",
          "fr",
          "nl",
          "it",
          "ja"
        ],
        "notes": [
          "voice-id-based-picker",
          "spanish-marked-EA",
          "voice-count-is-an-inference-from-all-available-lists"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "tts",
      "modelId": "aura-1",
      "publicName": "Aura-1 Voice Family",
      "aliases": [
        "aura-asteria-en",
        "aura-luna-en",
        "aura-stella-en",
        "aura-athena-en",
        "aura-hera-en",
        "aura-orion-en",
        "aura-arcas-en",
        "aura-perseus-en",
        "aura-angus-en",
        "aura-orpheus-en",
        "aura-helios-en",
        "aura-zeus-en"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0150/1k characters PAYG, $0.0135/1k characters Growth.",
      "limitsSummary": "Same family-level TTS limits as Aura generally.",
      "regionSummary": "Supported on hosted TTS; no separate model-family region caveat found.",
      "languagesSummary": "English-only documented catalog.",
      "notes": "Still documented and still the default if no model is specified, but not the best stable picker default for new integrations.",
      "officialSources": [
        "https://developers.deepgram.com/docs/tts-models",
        "https://deepgram.com/pricing",
        "https://developers.deepgram.com/docs/text-to-speech",
        "https://developers.deepgram.com/reference/text-to-speech/speak-streaming"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.015,
          "unit": "other",
          "sourceText": "$0.0150/1k characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Aura 1: All Available English Voices",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 12,
        "listedLanguages": [
          "en"
        ],
        "notes": [
          "legacy-family-for-ui",
          "still-default-if-model-omitted",
          "voice-count-is-an-inference-from-all-available-list"
        ]
      }
    }
  ),
]);
