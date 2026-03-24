import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "canopylabs/orpheus-3b-0.1-ft",
      "publicName": "Orpheus 3B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$15.00 per 1M characters.",
      "limitsSummary": "REST, SSE-like HTTP streaming, and WebSocket realtime documented. Streaming requires raw format. No hard session-length cap found.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "The /audio/speech reference enumerates en,de,fr,es,hi,it,ja,ko,nl,pl,pt,ru,sv,tr,zh as request-language options. Support remains model/voice-dependent.",
      "notes": "Strong candidate for stable picker. Voices are dynamic via /v1/voices; guide shows sample voices like tara, leah, jess, leo.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech",
        "https://docs.together.ai/reference/audio-speech",
        "https://docs.together.ai/reference/audio-speech-websocket",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_characters",
          "sourceText": "Serverless models page lists $15.00 per 1M chars."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Request parameter languages listed: en,de,fr,es,hi,it,ja,ko,nl,pl,pt,ru,sv,tr,zh.",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "de",
          "fr",
          "es",
          "hi",
          "it",
          "ja",
          "ko",
          "nl",
          "pl",
          "pt",
          "ru",
          "sv",
          "tr",
          "zh"
        ],
        "notes": [
          "voice-dependent",
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "hexgrad/Kokoro-82M",
      "publicName": "Kokoro",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$4.00 per 1M characters.",
      "limitsSummary": "REST, SSE-like HTTP streaming, and WebSocket realtime documented. Streaming requires raw format. No hard session-length cap found.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "The /audio/speech reference enumerates 15 language options, but support is model/voice-dependent.",
      "notes": "Strong candidate for stable picker. Guide shows a large dynamic voice set via /v1/voices and many sample voice names.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech",
        "https://docs.together.ai/reference/audio-speech",
        "https://docs.together.ai/reference/audio-speech-websocket",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 4.0,
          "unit": "million_characters",
          "sourceText": "Serverless models page lists $4.00 per 1M chars."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Request parameter languages listed: en,de,fr,es,hi,it,ja,ko,nl,pl,pt,ru,sv,tr,zh.",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "de",
          "fr",
          "es",
          "hi",
          "it",
          "ja",
          "ko",
          "nl",
          "pl",
          "pt",
          "ru",
          "sv",
          "tr",
          "zh"
        ],
        "notes": [
          "voice-dependent",
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "cartesia/sonic",
      "publicName": "Cartesia Sonic",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$65.00 per 1M characters.",
      "limitsSummary": "REST documented in API reference. Streaming/WebSocket support is conflicted across docs for generic sonic vs sonic-2/3.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "The /audio/speech reference enumerates 15 request-language options. Voice support is dynamic.",
      "notes": "Reference explicitly lists cartesia/sonic as a current supported TTS model. Build Tier 2+ is required for Cartesia models according to the TTS guide.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech",
        "https://docs.together.ai/reference/audio-speech",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 65.0,
          "unit": "million_characters",
          "sourceText": "Serverless models page lists Cartesia Sonic at $65.00 per 1M chars."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Request parameter languages listed: en,de,fr,es,hi,it,ja,ko,nl,pl,pt,ru,sv,tr,zh.",
        "isMultilingual": true,
        "languageCount": 15,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "de",
          "fr",
          "es",
          "hi",
          "it",
          "ja",
          "ko",
          "nl",
          "pl",
          "pt",
          "ru",
          "sv",
          "tr",
          "zh"
        ],
        "notes": [
          "voice-dependent",
          "model-dependent",
          "Build Tier 2+ per guide"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "cartesia/sonic-2",
      "publicName": "Cartesia Sonic 2",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$65.00 per 1M characters on serverless table.",
      "limitsSummary": "Guide says REST support; current /audio/speech reference does not list sonic-2 as a supported option.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Likely same request-language surface as generic TTS endpoint, but not explicitly pinned to this model.",
      "notes": "Do not use as a stable picker entry without live verification.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech",
        "https://docs.together.ai/reference/audio-speech",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 65.0,
          "unit": "million_characters",
          "sourceText": "Serverless models page lists Cartesia Sonic 2 at $65.00 per 1M chars."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown exact per-model language contract.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "availability conflict in docs"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "cartesia/sonic-3",
      "publicName": "Cartesia Sonic 3",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$65.00 per 1M characters on serverless table.",
      "limitsSummary": "Guide says REST support; current /audio/speech reference does not list sonic-3 as a supported option.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Likely same request-language surface as generic TTS endpoint, but not explicitly pinned to this model.",
      "notes": "Do not use as a stable picker entry without live verification.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech",
        "https://docs.together.ai/reference/audio-speech",
        "https://docs.together.ai/docs/serverless-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 65.0,
          "unit": "million_characters",
          "sourceText": "Serverless models page lists Cartesia Sonic 3 at $65.00 per 1M chars."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown exact per-model language contract.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "availability conflict in docs"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "deepgram/deepgram-aura-2",
      "publicName": "Deepgram Aura 2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "rime-labs/rime-arcana-v3-turbo",
      "publicName": "Rime Arcana v3 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "rime-labs/rime-arcana-v3",
      "publicName": "Rime Arcana v3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "rime-labs/rime-arcana-v2",
      "publicName": "Rime Arcana v2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "rime-labs/rime-mist-v3",
      "publicName": "Rime Mist v3",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Guide labels it Beta.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only",
          "beta"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "rime-labs/rime-mist-v2",
      "publicName": "Rime Mist v2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "tts",
      "modelId": "minimax/speech-2.6-turbo",
      "publicName": "Minimax Speech 2.6 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public pricing in sources reviewed.",
      "limitsSummary": "Dedicated endpoint only; guide says REST, Streaming, WebSocket.",
      "regionSummary": "Dedicated deployment dependent.",
      "languagesSummary": "Unknown.",
      "notes": "Dedicated-only; not suitable for default mobile app picker.",
      "officialSources": [
        "https://docs.together.ai/docs/text-to-speech"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dedicated-only"
        ]
      }
    }
  ),
]);
