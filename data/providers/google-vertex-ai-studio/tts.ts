import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "tts",
      "modelId": "gemini-3.1-flash-tts-preview",
      "publicName": "Gemini 3.1 Flash TTS Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "See Gemini API pricing for current TTS token rates.",
      "limitsSummary": "8,192 input tokens; 16,384 output tokens. Supports text input and audio output.",
      "regionSummary": "Available through Gemini API model endpoints; use configured regional routing where required.",
      "languagesSummary": "Uses the Gemini-TTS language/voice system.",
      "notes": "Newer low-latency Gemini TTS preview with expressive audio tags.",
      "officialSources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-tts-preview",
        "https://ai.google.dev/gemini-api/docs/models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Input token limit 8,192"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 16384,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Output token limit 16,384"
        }
      ],
      "languageSupport": {
        "rawText": "Uses the Gemini-TTS language/voice system with multilingual speech generation.",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": 30,
        "listedLanguages": [],
        "notes": [
          "preview",
          "voice-dependent",
          "expressive-audio-tags"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "tts",
      "modelId": "gemini-2.5-flash-tts",
      "publicName": "Gemini 2.5 Flash TTS",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Token-priced Gemini-TTS. Captured pricing lines show $0.50 per 1M text input tokens and $10 per 1M audio output tokens.",
      "limitsSummary": "Prompt and text fields max 4,000 bytes each, 8,000 bytes total; output audio up to about 655 seconds. Default quota snippet shows 150 QPM. Supports unary and streaming output formats.",
      "regionSummary": "Available on global, US, EU, and several APAC/regional endpoints.",
      "languagesSummary": "Gemini-TTS docs list many GA and Preview locales; release notes say 30 speakers across 80+ locales.",
      "notes": "Best default TTS picker entry for low-latency single-speaker synthesis.",
      "officialSources": [
        "https://docs.cloud.google.com/text-to-speech/docs/gemini-tts",
        "https://cloud.google.com/text-to-speech/pricing",
        "https://docs.cloud.google.com/text-to-speech/docs/endpoints",
        "https://docs.cloud.google.com/text-to-speech/quotas",
        "https://docs.cloud.google.com/text-to-speech/docs/release-notes"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "Input tokens: $0.50 per 1 million text tokens"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "Output tokens: $10.00 per 1 million audio tokens"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 4000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The size of the text field and the prompt field individually can be at most 4,000 bytes"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 8000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The total size of the prompt and text fields can be up to 8,000 bytes"
        },
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 655,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "The output audio can at most be around 655 seconds"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "<=",
          "value": 150,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "gemini-2.5-flash-tts 150 QPM"
        }
      ],
      "languageSupport": {
        "rawText": "Gemini-TTS release notes say 30 speakers in 80+ locales; docs list GA and Preview languages individually.",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": 30,
        "listedLanguages": [
          "ar-EG",
          "bn-BD",
          "nl-NL",
          "en-US",
          "fr-FR",
          "de-DE",
          "hi-IN",
          "id-ID",
          "it-IT",
          "ja-JP",
          "ko-KR",
          "mr-IN",
          "pl-PL",
          "pt-BR",
          "ro-RO",
          "ru-RU",
          "es-ES",
          "ta-IN",
          "te-IN",
          "th-TH",
          "tr-TR",
          "uk-UA",
          "vi-VN"
        ],
        "notes": [
          "voice-dependent",
          "single-speaker"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "tts",
      "modelId": "gemini-2.5-pro-tts",
      "publicName": "Gemini 2.5 Pro TTS",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public pricing for Pro TTS was not visible in the captured pricing lines; price remains unknown in this audit.",
      "limitsSummary": "Prompt and text fields max 4,000 bytes each, 8,000 bytes total; output audio up to about 655 seconds. Default quota snippet shows 125 QPM. Supports single- and multi-speaker synthesis.",
      "regionSummary": "Available on global, US, EU, and several APAC/regional endpoints.",
      "languagesSummary": "Gemini-TTS docs list many GA and Preview locales; release notes say 30 speakers across 80+ locales.",
      "notes": "Higher-control structured synthesis model. Better fit for podcasts, audiobooks, and multi-speaker flows than for default mobile assistant latency.",
      "officialSources": [
        "https://docs.cloud.google.com/text-to-speech/docs/gemini-tts",
        "https://cloud.google.com/text-to-speech/pricing",
        "https://docs.cloud.google.com/text-to-speech/docs/endpoints",
        "https://docs.cloud.google.com/text-to-speech/quotas",
        "https://docs.cloud.google.com/text-to-speech/docs/release-notes"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 4000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The size of the text field and the prompt field individually can be at most 4,000 bytes"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 8000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The total size of the prompt and text fields can be up to 8,000 bytes"
        },
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 655,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "The output audio can at most be around 655 seconds"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "<=",
          "value": 125,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "gemini-2.5-pro-tts 125 QPM"
        }
      ],
      "languageSupport": {
        "rawText": "Gemini-TTS release notes say 30 speakers in 80+ locales; docs list GA and Preview languages individually.",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": 30,
        "listedLanguages": [
          "ar-EG",
          "bn-BD",
          "nl-NL",
          "en-US",
          "fr-FR",
          "de-DE",
          "hi-IN",
          "id-ID",
          "it-IT",
          "ja-JP",
          "ko-KR",
          "mr-IN",
          "pl-PL",
          "pt-BR",
          "ro-RO",
          "ru-RU",
          "es-ES",
          "ta-IN",
          "te-IN",
          "th-TH",
          "tr-TR",
          "uk-UA",
          "vi-VN"
        ],
        "notes": [
          "voice-dependent",
          "multi-speaker-supported"
        ]
      }
    }
  ),
  providerContext.tts(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "tts",
      "modelId": "gemini-2.5-flash-lite-preview-tts",
      "publicName": "Gemini 2.5 Flash-Lite Preview TTS",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Captured pricing lines group Flash TTS and Flash-Lite Preview TTS under the same visible token prices: $0.50 per 1M text input tokens and $10 per 1M audio output tokens.",
      "limitsSummary": "Prompt and text fields max 4,000 bytes each, 8,000 bytes total; output audio up to about 655 seconds.",
      "regionSummary": "Supported in documented TTS regional endpoints.",
      "languagesSummary": "Uses the Gemini-TTS language/voice system.",
      "notes": "Preview only; do not place in stable default picker.",
      "officialSources": [
        "https://docs.cloud.google.com/text-to-speech/docs/gemini-tts",
        "https://cloud.google.com/text-to-speech/pricing",
        "https://docs.cloud.google.com/text-to-speech/docs/endpoints"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "Input tokens: $0.50 per 1 million text tokens"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "Output tokens: $10.00 per 1 million audio tokens"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 4000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The size of the text field and the prompt field individually can be at most 4,000 bytes"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 8000,
          "unit": "bytes",
          "scope": "general",
          "sourceText": "The total size of the prompt and text fields can be up to 8,000 bytes"
        },
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 655,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "The output audio can at most be around 655 seconds"
        }
      ],
      "languageSupport": {
        "rawText": "Uses the Gemini-TTS language/voice system with many GA and Preview locales.",
        "isMultilingual": true,
        "languageCount": 80,
        "voiceCount": 30,
        "listedLanguages": [],
        "notes": [
          "preview",
          "voice-dependent"
        ]
      }
    }
  ),
]);
