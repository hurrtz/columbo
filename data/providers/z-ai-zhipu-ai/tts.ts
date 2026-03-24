import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "tts",
      "modelId": "glm-tts",
      "publicName": "GLM-TTS",
      "aliases": [
        "GLM-TTS"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public API exists on BigModel mainland, but price was not machine-readable in the current crawl; pricing page link is provided from the model guide.",
      "limitsSummary": "Input text <= 1024 chars; stream=true supported via Event Stream; output format wav or pcm; streaming only supports pcm; encode_format base64 or hex for streaming.",
      "regionSummary": "Documented on BigModel mainland; not documented on international Z.ai.",
      "languagesSummary": "System voices are documented; explicit language list is not.",
      "notes": "Region-gated TTS picker candidate for mainland-only integration. Canonical ID is glm-tts.",
      "officialSources": [
        "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3",
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-tts",
        "https://docs.bigmodel.cn/cn/update/new-releases"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1024,
          "unit": "other",
          "scope": "general",
          "sourceText": "Maximum string length 1024"
        }
      ],
      "languageSupport": {
        "rawText": "System voices: tongtong, chuichui, xiaochen, jam, kazi, douji, luodo. Explicit language coverage not enumerated.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 7,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "language coverage not explicitly listed"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "tts",
      "modelId": "glm-tts-clone",
      "publicName": "GLM-TTS-Clone",
      "aliases": [
        "GLM-TTS-Clone"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public API exists on BigModel mainland; price not machine-readable in current crawl.",
      "limitsSummary": "Requires uploaded sample-audio file_id; sample file <= 10 MB; recommended sample duration 3-30 seconds.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Supports Mandarin and light accents per guide; intended for custom-voice cloning.",
      "notes": "Not a normal end-user picker model; keep behind advanced/custom-voice flow.",
      "officialSources": [
        "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E9%9F%B3%E8%89%B2%E5%A4%8D%E5%88%BB",
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-tts-clone",
        "https://docs.bigmodel.cn/cn/update/new-releases"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 10485760,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "sample-audio size limit not more than 10M"
        },
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 3,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Only about 3 seconds of clear speech is needed"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 30,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "recommended audio duration 3 to 30 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Supports Mandarin and light-accented speech; custom voice cloning.",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "Mandarin"
        ],
        "notes": [
          "custom voice only",
          "not for normal picker exposure"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "tts",
      "modelId": "glm-4-voice",
      "publicName": "GLM-4-Voice",
      "aliases": [
        "GLM-4-Voice"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "BigModel guide publishes RMB pricing: 80 yuan / million tokens.",
      "limitsSummary": "8K context; 4K max output.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Explicitly supports Chinese and English bilingual voice interaction.",
      "notes": "Speech-in/speech-out model, not plain TTS. Better treated as advanced voice-chat model than a simple TTS picker entry.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-4-voice"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "context window 8K"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "maximum output tokens 4K"
        }
      ],
      "languageSupport": {
        "rawText": "Supports Chinese and English bilingual speech input/output.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "voice-chat model",
          "not simple TTS"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "tts",
      "modelId": "glm-realtime-flash",
      "publicName": "GLM-Realtime-Flash",
      "aliases": [
        "GLM-Realtime-Flash",
        "glm-realtime"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "BigModel guide publishes RMB pricing: audio 0.18 yuan/minute; video 1.2 yuan/minute.",
      "limitsSummary": "WebSocket realtime API; audio-call context 8K (~20 turns expected); video-call context 32K; 2-minute conversation memory; concurrency V0/V1/V2/V3 = 5/10/15/20.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Supports realtime multilingual dialogue use cases, but full language list is not enumerated.",
      "notes": "Advanced realtime voice/video model, not a standard TTS picker entry. Canonical model ID is explicitly documented as glm-realtime-flash; the generic guide also mentions default model name glm-realtime.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-realtime",
        "https://docs.bigmodel.cn/cn/asyncapi/realtime"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 120,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "conversation memory lasts up to 2 minutes"
        },
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "audio call context 8K, estimated 20 turns"
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 5,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "V0 concurrency 5"
        }
      ],
      "languageSupport": {
        "rawText": "No complete language list captured; docs mention realtime translation and multilingual conversation use cases.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 7,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "language list not exhaustively published in captured lines"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "tts",
      "modelId": "glm-realtime-air",
      "publicName": "GLM-Realtime-Air",
      "aliases": [
        "GLM-Realtime-Air"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "BigModel guide publishes RMB pricing: audio 0.3 yuan/minute; video 2.1 yuan/minute.",
      "limitsSummary": "Same WebSocket realtime family; 32B model in guide; audio-call context 8K (~20 turns expected), video 32K.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Not exhaustively enumerated.",
      "notes": "Advanced realtime voice/video model, not a standard TTS picker entry.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-realtime",
        "https://docs.bigmodel.cn/cn/asyncapi/realtime"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "audio call context 8K, estimated 20 turns"
        }
      ],
      "languageSupport": {
        "rawText": "No complete language list captured.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 7,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "language list not exhaustively published in captured lines"
        ]
      }
    }
  ),
]);
