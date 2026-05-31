import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "xai",
      "providerName": "xAI",
      "service": "tts",
      "modelId": "text-to-speech",
      "publicName": "Text to Speech API",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$4.20 / 1M characters.",
      "limitsSummary": "600 RPM, 10 concurrent requests/team on the dedicated model page; request text max 15,000 chars; streaming WebSocket endpoint allows up to 50 concurrent sessions/team according to the TTS guide snippet.",
      "regionSummary": "Dedicated page lists cluster us-east-1.",
      "languagesSummary": "20 listed languages/locale variants plus auto-detect; 5 voices.",
      "notes": "Use /v1/tts/voices for live voice enumeration instead of hard-coding voice metadata forever. Official docs also expose streaming TTS and voice-detail endpoints.",
      "officialSources": [
        "https://docs.x.ai/developers/models/text-to-speech",
        "https://docs.x.ai/developers/model-capabilities/audio/text-to-speech",
        "https://docs.x.ai/developers/rest-api-reference/inference/voice"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 4.2,
          "unit": "million_characters",
          "sourceText": "Per 1M characters $4.20 / 1M characters"
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 600,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Requests per minute 600 RPM"
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 10,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "Concurrent requests 10 per team"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 15000,
          "unit": "other",
          "scope": "general",
          "sourceText": "The text to convert to speech. Maximum 15,000 characters."
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 50,
          "unit": "sessions",
          "scope": "streaming",
          "sourceText": "The streaming WebSocket endpoint allows up to 50 concurrent sessions per team."
        }
      ],
      "languageSupport": {
        "rawText": "Auto-detect, English, Arabic (Egypt), Arabic (Saudi Arabia), Arabic (United Arab Emirates), Bengali, Chinese (Simplified), French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Portuguese (Portugal), Russian, Spanish (Mexico), Spanish (Spain), Turkish, Vietnamese.",
        "isMultilingual": true,
        "languageCount": 20,
        "voiceCount": 5,
        "listedLanguages": [
          "en",
          "ar-EG",
          "ar-SA",
          "ar-AE",
          "bn",
          "zh",
          "fr",
          "de",
          "hi",
          "id",
          "it",
          "ja",
          "ko",
          "pt-BR",
          "pt-PT",
          "ru",
          "es-MX",
          "es-ES",
          "tr",
          "vi"
        ],
        "notes": [
          "auto-detect supported",
          "voice-dependent",
          "five voices: eve, ara, rex, sal, leo"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "xai",
      "providerName": "xAI",
      "service": "tts",
      "modelId": "grok-tts",
      "publicName": "Grok Text-to-Speech",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$4.20 / 1M characters.",
      "limitsSummary": "600 RPM, 10 concurrent requests/team, max 15,000 characters per request. Streaming WebSocket allows up to 50 concurrent sessions/team.",
      "regionSummary": "Hosted at https://api.x.ai.",
      "languagesSummary": "20 listed languages/locale variants plus auto-detect; 5 voices.",
      "notes": "Standalone TTS endpoint POST /v1/tts with JSON body {text, voice_id, language}. Returns MP3 binary. Inline expressive tags supported: [laugh], [sigh], [pause], <whisper>. Docs do not require a model field in the request body; 'grok-tts' is used as the internal model ID.",
      "officialSources": [
        "https://docs.x.ai/developers/model-capabilities/audio/voice",
        "https://docs.x.ai/developers/rest-api-reference/inference/voice"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 4.2,
          "unit": "million_characters",
          "sourceText": "Per 1M characters $4.20 / 1M characters"
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 600,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Requests per minute 600 RPM"
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 10,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "Concurrent requests 10 per team"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 15000,
          "unit": "other",
          "scope": "general",
          "sourceText": "The text to convert to speech. Maximum 15,000 characters."
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 50,
          "unit": "sessions",
          "scope": "streaming",
          "sourceText": "The streaming WebSocket endpoint allows up to 50 concurrent sessions per team."
        }
      ],
      "languageSupport": {
        "rawText": "Auto-detect, English, Arabic (Egypt), Arabic (Saudi Arabia), Arabic (United Arab Emirates), Bengali, Chinese (Simplified), French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Portuguese (Portugal), Russian, Spanish (Mexico), Spanish (Spain), Turkish, Vietnamese.",
        "isMultilingual": true,
        "languageCount": 20,
        "voiceCount": 5,
        "listedLanguages": [
          "en",
          "ar-EG",
          "ar-SA",
          "ar-AE",
          "bn",
          "zh",
          "fr",
          "de",
          "hi",
          "id",
          "it",
          "ja",
          "ko",
          "pt-BR",
          "pt-PT",
          "ru",
          "es-MX",
          "es-ES",
          "tr",
          "vi"
        ],
        "notes": [
          "auto-detect supported",
          "five voices: ara, eve, leo, rex, sal",
          "inline expressive tags: [laugh], [sigh], [pause], <whisper>"
        ]
      }
    }
  ),
]);
