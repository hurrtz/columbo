import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-speech-02-hd",
      "publicName": "MiniMax Speech-02 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$80 / 1M characters.",
      "limitsSummary": "Sync TTS; <=10,000 chars/request; 100+ system/cloned voices; streaming supported; output URL valid 24h when URL output is used.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Speech-02 changelog says 32 languages; endpoint docs expose a long language_boost list.",
      "notes": "Safe stable TTS picker entry.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-hd",
        "https://novita.ai/pricing",
        "https://novita.ai/docs/changelog/07-07-25--11-07-25"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 80.0,
          "unit": "million_characters",
          "sourceText": "MiniMax speech-02-hd ... $80 /1M characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "maximum input length of 10,000 characters per request"
        }
      ],
      "languageSupport": {
        "rawText": "Speech-02 features powerful generalization capabilities ... speech across 32 languages; endpoint docs also list language_boost values.",
        "isMultilingual": true,
        "languageCount": 32,
        "voiceCount": 100,
        "listedLanguages": [
          "Chinese",
          "English",
          "Arabic",
          "Russian",
          "Spanish",
          "French",
          "Portuguese",
          "German",
          "Japanese",
          "Korean",
          "Thai",
          "Hindi",
          "Tamil",
          "Afrikaans"
        ],
        "notes": [
          "voice-dependent",
          "100+ voices",
          "language count from changelog"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-speech-02-turbo",
      "publicName": "MiniMax Speech-02 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$48 / 1M characters.",
      "limitsSummary": "Sync TTS <=10,000 chars/request. Async long-TTS docs say up to 1,000,000 chars per request, but one field description on the async page says maximum text length 50,000 chars. 100+ system/cloned voices. Streaming supported. Audio URL valid 24h.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Speech-02 changelog says 32 languages.",
      "notes": "Likely the best low-cost/default TTS picker entry. There is a public doc conflict on async text-length limits.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-turbo",
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-02-turbo-async",
        "https://novita.ai/pricing",
        "https://novita.ai/docs/changelog/07-07-25--11-07-25"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 48.0,
          "unit": "million_characters",
          "sourceText": "MiniMax speech-02-turbo ... $48 /1M characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "maximum input length of 10,000 characters per request"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1000000,
          "unit": "other",
          "scope": "model",
          "sourceText": "maximum limit of 1 million characters per request for text input"
        }
      ],
      "languageSupport": {
        "rawText": "Speech-02 ... speech across 32 languages.",
        "isMultilingual": true,
        "languageCount": 32,
        "voiceCount": 100,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "100+ voices",
          "async limit conflict in docs"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-speech-2.6-hd",
      "publicName": "MiniMax Speech-2.6 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$100 / 1M characters.",
      "limitsSummary": "<10,000 chars/request; sync streaming supported; async variant also documented.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Docs explicitly say broader coverage with 40 languages.",
      "notes": "Higher-cost successor line to Speech-02; safe stable picker candidate if multilingual quality matters more than price.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.6-hd",
        "https://novita.ai/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 100.0,
          "unit": "million_characters",
          "sourceText": "MiniMax speech-2.6-hd ... $100 /1M characters"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "The text to be synthesized. The length must be less than 10,000 characters."
        }
      ],
      "languageSupport": {
        "rawText": "broader coverage with 40 languages",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "voice-dependent",
          "voice count not verified"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-speech-2.6-turbo",
      "publicName": "MiniMax Speech-2.6 Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$60 / 1M characters.",
      "limitsSummary": "Public endpoint exists, but I did not verify a full page with numeric limits beyond family-level patterns.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Likely same family-level multilingual positioning as 2.6 HD, but exact turbo page details were not fully verified.",
      "notes": "Usable but less well-verified than 2.6 HD from the sources reviewed.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.6-turbo",
        "https://novita.ai/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 60.0,
          "unit": "million_characters",
          "sourceText": "MiniMax speech-2.6-turbo ... $60 /1M characters"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Family-level multilingual support inferred from 2.6 line; exact turbo language docs not fully verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "voice-dependent"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-speech-2.8-hd",
      "publicName": "MiniMax Speech 2.8 HD",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official public pricing not verified on the pricing page reviewed.",
      "limitsSummary": "<10,000 chars/request; if text >3000 chars, streaming recommended; language_boost list exposed; supports streaming.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Long language_boost list is exposed, but no official numeric language count was verified.",
      "notes": "Technically attractive, but missing public pricing makes it weaker for a stable consumer-facing picker.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-speech-2.8-hd"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10000,
          "unit": "other",
          "scope": "model",
          "sourceText": "length limit is less than 10000 characters"
        }
      ],
      "languageSupport": {
        "rawText": "language_boost supports Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Persian, Slovak, Swedish, Croatian, Filipino, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Tamil, Afrikaans, auto",
        "isMultilingual": true,
        "languageCount": 40,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "Chinese,Yue",
          "English",
          "Arabic",
          "Russian",
          "Spanish",
          "French",
          "Portuguese",
          "German",
          "Turkish",
          "Dutch",
          "Ukrainian",
          "Vietnamese",
          "Indonesian",
          "Japanese",
          "Italian",
          "Korean",
          "Thai",
          "Polish",
          "Romanian",
          "Greek",
          "Czech",
          "Finnish",
          "Hindi",
          "Bulgarian",
          "Danish",
          "Hebrew",
          "Malay",
          "Persian",
          "Slovak",
          "Swedish",
          "Croatian",
          "Filipino",
          "Hungarian",
          "Norwegian",
          "Slovenian",
          "Catalan",
          "Nynorsk",
          "Tamil",
          "Afrikaans"
        ],
        "notes": [
          "voice-dependent",
          "language count inferred from listed options"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "glm-tts",
      "publicName": "GLM Text to Speech",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official public pricing not verified.",
      "limitsSummary": "Input length 0-1024; response format wav/pcm; fixed system voice list plus cloned voices.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Voice list is documented; language coverage is not clearly enumerated.",
      "notes": "Useful fallback/simple TTS option, but much tighter length limit than MiniMax.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-glm-tts"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 1024,
          "unit": "other",
          "scope": "model",
          "sourceText": "The text to convert to speech Length limit: 0 - 1024"
        }
      ],
      "languageSupport": {
        "rawText": "System voices include tongtong, chuichui, xiaochen, jam, kazi, douji, luodo.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 7,
        "listedLanguages": [],
        "notes": [
          "voice list documented",
          "language list unknown"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "txt2speech",
      "publicName": "Legacy Text to Speech",
      "aliases": [
        "async/txt2speech",
        "Novita AI Text-To-Speech API"
      ],
      "status": "Unknown",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing not verified.",
      "limitsSummary": "Async REST endpoint exists; old voice page claims <300 ms latency.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Voice page visibly lists English, Chinese, Japanese.",
      "notes": "Do not use for a stable picker unless you need backward compatibility. Prefer newer model-specific TTS endpoints.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-txt2speech",
        "https://novita.ai/models/voices"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Support Languages: English, Chinese, Japanese",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese",
          "Japanese"
        ],
        "notes": [
          "legacy endpoint",
          "voice page marketing surface"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "tts",
      "modelId": "minimax-voice-cloning",
      "publicName": "MiniMax Quick Voice Cloning",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "No explicit public voice-cloning price verified for MiniMax on the pricing page reviewed.",
      "limitsSummary": "Audio format mp3/m4a/wav; duration 10s to 5m; file size <=20 MB; cloned voice deleted if not used within 168h.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Language coverage not clearly enumerated.",
      "notes": "Not a regular TTS picker entry; better treated as advanced/custom-voice workflow.",
      "officialSources": [
        "https://novita.ai/docs/api-reference/model-apis-minimax-voice-cloning"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 10,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "duration ... at least 10 seconds"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 300,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "no more than 5 minutes"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 20971520,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "file size must not exceed 20 MB"
        }
      ],
      "languageSupport": {
        "rawText": "Language coverage not clearly enumerated.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "custom voice workflow"
        ]
      }
    }
  ),
]);
