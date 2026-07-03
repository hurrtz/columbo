import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-3.5-flash",
      "publicName": "Gemini 3.5 Flash",
      "aliases": [
        "gemini-3-flash-preview"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "See Gemini API pricing for current token rates; the model page documents Gemini 3.5 Flash as the stable version of the Gemini 3 Flash line.",
      "limitsSummary": "1,048,576 max input tokens; 65,536 max output tokens.",
      "regionSummary": "Available through Gemini API model endpoints; use configured regional routing where required.",
      "languagesSummary": "Multimodal general-purpose LLM; no fixed language list published on the model page.",
      "notes": "Current stable Gemini 3 Flash-family picker entry. Supports the existing generateContent path for text output.",
      "officialSources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash",
        "https://ai.google.dev/gemini-api/docs/models",
        "https://ai.google.dev/gemini-api/docs/interactions-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1048576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Input token limit 1,048,576"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Output token limit 65,536"
        }
      ],
      "languageSupport": {
        "rawText": "General multimodal Gemini model; no fixed language count published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "multimodal-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-3.1-flash-lite",
      "publicName": "Gemini 3.1 Flash-Lite",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Cost-efficient Gemini 3 stable model for high-volume lightweight tasks; see Gemini API pricing for current token rates.",
      "limitsSummary": "1,048,576 max input tokens; 65,536 max output tokens.",
      "regionSummary": "Available through Gemini API model endpoints; use configured regional routing where required.",
      "languagesSummary": "Multimodal general-purpose LLM; no fixed language list published on the model page.",
      "notes": "Current stable low-latency Gemini 3 picker entry. Supports the existing generateContent path for text output.",
      "officialSources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite",
        "https://ai.google.dev/gemini-api/docs/models",
        "https://ai.google.dev/gemini-api/docs/interactions-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1048576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Input token limit 1,048,576"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Output token limit 65,536"
        }
      ],
      "languageSupport": {
        "rawText": "General multimodal Gemini model; no fixed language count published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "multimodal-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-2.5-pro",
      "publicName": "Gemini 2.5 Pro",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Standard: $1.25 per 1M input tokens up to 200k, $2.50 over 200k; $10/$15 per 1M output tokens. Flex/Batch discounts are public.",
      "limitsSummary": "1,048,576 max input tokens; 65,535 default max output tokens.",
      "regionSummary": "Regional and global Vertex endpoints; do not use global if in-region ML processing guarantees matter.",
      "languagesSummary": "Multimodal general-purpose LLM; no fixed language list published on the model page.",
      "notes": "Best stable high-capability picker entry. Supports multimodal input, function/tool use ecosystem, and batch prediction.",
      "officialSources": [
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro",
        "https://cloud.google.com/vertex-ai/generative-ai/pricing",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/batch-prediction-api",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "Input (text, image, video, audio) $1.25 <= 200K input tokens"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "Input (text, image, video, audio) $2.50 > 200K input tokens"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "Text output (response and reasoning) $10 <= 200K input tokens tier"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "Text output (response and reasoning) $15 > 200K input tokens tier"
        },
        {
          "amountUsd": 0.625,
          "unit": "million_input_tokens",
          "sourceText": "Flex/Batch input price $0.625 <= 200K input tokens"
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "Flex/Batch output price $5 <= 200K input tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1048576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum input tokens: 1,048,576"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65535,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum output tokens: 65,535 (default)"
        }
      ],
      "languageSupport": {
        "rawText": "General multimodal Gemini model; no fixed language count published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "multimodal-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-2.5-flash",
      "publicName": "Gemini 2.5 Flash",
      "aliases": [
        "gemini-2.5-flash-preview-09-2025"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Standard: $0.30 per 1M text/image/video input tokens, $1.00 per 1M audio input tokens, $2.50 per 1M text output tokens. Flex/Batch discounts are public.",
      "limitsSummary": "1,048,576 max input tokens; 65,535 default max output tokens.",
      "regionSummary": "Regional and global Vertex endpoints.",
      "languagesSummary": "Multimodal general-purpose LLM; no fixed language list published on the model page.",
      "notes": "Best default non-realtime general picker entry for mobile chat. Preview dated ID should not be the default stable picker ID.",
      "officialSources": [
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash",
        "https://cloud.google.com/vertex-ai/generative-ai/pricing",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/batch-prediction-api",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "Input (text, image, video) $0.30"
        },
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input $1"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "Text output (response and reasoning) $2.50"
        },
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "Flex/Batch input $0.15"
        },
        {
          "amountUsd": 1.25,
          "unit": "million_output_tokens",
          "sourceText": "Flex/Batch output $1.25"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1048576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum input tokens: 1,048,576"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65535,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum output tokens: 65,535 (default)"
        }
      ],
      "languageSupport": {
        "rawText": "General multimodal Gemini model; no fixed language count published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "multimodal-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-2.5-flash-lite",
      "publicName": "Gemini 2.5 Flash-Lite",
      "aliases": [
        "gemini-2.5-flash-lite-preview-09-2025"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Standard: $0.10 per 1M text/image/video input tokens, $0.30 per 1M audio input tokens, $0.40 per 1M output tokens. Flex/Batch discounts are public.",
      "limitsSummary": "1,048,576 max input tokens; 65,535 default max output tokens.",
      "regionSummary": "Regional and global Vertex endpoints.",
      "languagesSummary": "Multimodal general-purpose LLM; no fixed language list published on the model page.",
      "notes": "Good low-cost stable picker entry.",
      "officialSources": [
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-lite",
        "https://cloud.google.com/vertex-ai/generative-ai/pricing",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/batch-prediction-api",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "Input (text, image, video) $0.10"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input $0.30"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "Text output (response and reasoning) $0.40"
        },
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "Flex/Batch input $0.05"
        },
        {
          "amountUsd": 0.2,
          "unit": "million_output_tokens",
          "sourceText": "Flex/Batch output $0.2"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1048576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum input tokens: 1,048,576"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65535,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Maximum output tokens: 65,535 (default)"
        }
      ],
      "languageSupport": {
        "rawText": "General multimodal Gemini model; no fixed language count published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "multimodal-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "google-vertex-ai-studio",
      "providerName": "Google Vertex AI Studio",
      "service": "llm",
      "modelId": "gemini-live-2.5-flash-native-audio",
      "publicName": "Gemini Live 2.5 Flash Native Audio",
      "aliases": [
        "gemini-live-2.5-flash-preview-native-audio-09-2025"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Live API pricing is separate: $0.50 per 1M input text tokens, $3 per 1M input audio tokens, $3 per 1M input video/image tokens, $2 per 1M output text tokens, $12 per 1M output audio tokens.",
      "limitsSummary": "128k max input context on model page; start/manage page states all Live models have 128k context window. Default audio-only sessions 15 minutes, audio-video 2 minutes, extendable with context compression. Up to 1,000 concurrent sessions/project on PayGo.",
      "regionSummary": "Live API is a Vertex feature; use regional routing when residency matters.",
      "languagesSummary": "Native audio path documents 24 languages and 30 built-in voices.",
      "notes": "Primary voice-first picker entry. Stateful WebSocket API. Server-to-server design; Google docs recommend partner integration for direct web/mobile patterns.",
      "officialSources": [
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-live",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/start-manage-session",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/configure-language-voice",
        "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/configure-gemini-capabilities",
        "https://cloud.google.com/vertex-ai/generative-ai/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "1M input text tokens $0.5"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "1M input audio tokens $3"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "1M input video/image tokens $3"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "1M output text tokens $2"
        },
        {
          "amountUsd": 12.0,
          "unit": "million_output_tokens",
          "sourceText": "1M output audio tokens $12"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "All Gemini Live API models have a context window limit of 128k tokens"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 900,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Without compression, audio-only sessions are limited to 15 minutes"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 120,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "Without compression, audio-video sessions are limited to 2 minutes"
        },
        {
          "metric": "concurrency",
          "comparator": "<=",
          "value": 1000,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "You can have up to 1,000 concurrent sessions per project on a pay-as-you-go plan"
        }
      ],
      "languageSupport": {
        "rawText": "Gemini Live native audio supports 24 languages and 30 HD voices.",
        "isMultilingual": true,
        "languageCount": 24,
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
          "es-US",
          "ta-IN"
        ],
        "notes": [
          "voice-dependent",
          "native-audio",
          "can-switch-languages"
        ]
      }
    }
  ),
]);
