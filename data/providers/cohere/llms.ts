import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-a-03-2025",
      "publicName": "Command A",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$2.5 / 1M input tokens; $10 / 1M output tokens.",
      "limitsSummary": "256k context; 8k max output; Chat API; trial 20 req/min, production 500 req/min.",
      "regionSummary": "Public API plus private deployment options; no public API-region matrix found.",
      "languagesSummary": "23 languages.",
      "notes": "Best general flagship. Supports tool use, structured outputs, citations, reasoning, and image inputs.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-a",
        "https://docs.cohere.com/docs/rate-limits",
        "https://docs.cohere.com/changelog/command-a"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "$2.5 / 1M tokens input"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "$10 / 1M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 256,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 8,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command A 20 req / min trial"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command A 500 req / min production"
        }
      ],
      "languageSupport": {
        "rawText": "Trained to perform well in 23 languages.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "French",
          "Spanish",
          "Italian",
          "German",
          "Portuguese",
          "Japanese",
          "Korean",
          "Chinese",
          "Arabic",
          "Russian",
          "Polish",
          "Turkish",
          "Vietnamese",
          "Dutch",
          "Czech",
          "Indonesian",
          "Ukrainian",
          "Romanian",
          "Greek",
          "Hindi",
          "Hebrew",
          "Persian"
        ],
        "notes": [
          "multilingual",
          "supports image inputs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-r7b-12-2024",
      "publicName": "Command R7B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0375 / 1M input tokens; $0.15 / 1M output tokens.",
      "limitsSummary": "128k context; 4k max output; Chat API; trial 20 req/min, production 500 req/min.",
      "regionSummary": "Public API; docs also mention Hugging Face and on-device inference potential.",
      "languagesSummary": "Multilingual, but the model page does not publish a full language list in the captured lines.",
      "notes": "Strong low-cost/default mobile candidate. Docs explicitly position it for latency-sensitive chatbots and code assistants.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-r7b",
        "https://docs.cohere.com/docs/rate-limits",
        "https://docs.cohere.com/changelog/command-r-7b"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0375,
          "unit": "million_input_tokens",
          "sourceText": "$0.0375 / 1M tokens input"
        },
        {
          "amountUsd": 0.15,
          "unit": "million_output_tokens",
          "sourceText": "$0.15 / 1M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 128,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 4,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R7B 20 req / min trial"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R7B 500 req / min production"
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual capabilities documented, but full canonical public list not captured on the model page lines used here.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multilingual",
          "low-cost",
          "on-device mentioned"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-r-08-2024",
      "publicName": "Command R",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15 / 1M input tokens; $0.6 / 1M output tokens.",
      "limitsSummary": "128k context; 4k max output; Chat API; trial 20 req/min, production 500 req/min.",
      "regionSummary": "Public API plus private deployment options; no public API-region matrix found.",
      "languagesSummary": "Optimized for 10 key languages plus pretraining data in 13 more; effectively 23-language coverage.",
      "notes": "Useful mid-tier stable picker option. Cohere recommends Command A for most use cases.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-r",
        "https://docs.cohere.com/docs/rate-limits"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "$0.15 / 1M tokens input"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.6 / 1M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 128,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 4,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R 20 req / min trial"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R 500 req / min production"
        }
      ],
      "languageSupport": {
        "rawText": "Optimized for English, French, Spanish, Italian, German, Brazilian Portuguese, Japanese, Korean, Simplified Chinese, and Arabic; pretraining data included for 13 more languages.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "French",
          "Spanish",
          "Italian",
          "German",
          "Brazilian Portuguese",
          "Japanese",
          "Korean",
          "Simplified Chinese",
          "Arabic",
          "Russian",
          "Polish",
          "Turkish",
          "Vietnamese",
          "Dutch",
          "Czech",
          "Indonesian",
          "Ukrainian",
          "Romanian",
          "Greek",
          "Hindi",
          "Hebrew",
          "Persian"
        ],
        "notes": [
          "multilingual",
          "good value tier"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-r-plus-08-2024",
      "publicName": "Command R+",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$2.5 / 1M input tokens; $10 / 1M output tokens.",
      "limitsSummary": "128k context; 4k max output; Chat API; trial 20 req/min, production 500 req/min.",
      "regionSummary": "Public API plus private deployment options; no public API-region matrix found.",
      "languagesSummary": "Multilingual; Cohere positions it for complex RAG and multi-step tool use.",
      "notes": "Still active, but usually not needed in a stable picker if Command A is already exposed.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-r-plus",
        "https://docs.cohere.com/docs/rate-limits"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "$2.5 / 1M tokens input"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "$10 / 1M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 128,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 4,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R+ 20 req / min trial"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command R+ 500 req / min production"
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual capabilities documented on the model family pages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multilingual",
          "complex-RAG-oriented",
          "superseded by Command A for many cases"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-a-reasoning-08-2025",
      "publicName": "Command A Reasoning",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Free until rate limits are reached; production access requires sales / Model Vault path.",
      "limitsSummary": "256k context; 32k max output; trial 20 req/min; production limit not publicly self-serve.",
      "regionSummary": "Public API for evaluation; production through Model Vault / sales according to docs.",
      "languagesSummary": "23 languages.",
      "notes": "Not ideal as a default mobile picker entry because pricing is nonstandard and production access is constrained.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-a-reasoning",
        "https://docs.cohere.com/docs/rate-limits",
        "https://docs.cohere.com/changelog/2025-08-21-command-a-reasoning"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 256,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 32,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command A Reasoning 20 req / min trial"
        }
      ],
      "languageSupport": {
        "rawText": "23 languages supported.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "reasoning model",
          "production access constrained"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-a-vision-07-2025",
      "publicName": "Command A Vision",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Free until rate limits are reached; production access requires sales.",
      "limitsSummary": "128k context; 8k max output; up to 20 images/request or 20 MB total; trial 20 req/min.",
      "regionSummary": "Public API for testing; production sales-gated per docs.",
      "languagesSummary": "Officially supports English, Portuguese, Italian, French, German, and Spanish.",
      "notes": "Specialized multimodal entry. Tool use is not supported.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-a-vision",
        "https://docs.cohere.com/docs/image-inputs",
        "https://docs.cohere.com/docs/rate-limits",
        "https://docs.cohere.com/changelog/2025-07-31-command-a-vision"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 128,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 8,000 tokens"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 20971520,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "20 images per request, or 20 MB total"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 20,
          "unit": "other",
          "scope": "general",
          "sourceText": "maximum of 20 images per request"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command A Vision 20 req / min trial"
        }
      ],
      "languageSupport": {
        "rawText": "Officially supports English, Portuguese, Italian, French, German, and Spanish.",
        "isMultilingual": true,
        "languageCount": 6,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Portuguese",
          "Italian",
          "French",
          "German",
          "Spanish"
        ],
        "notes": [
          "vision model",
          "tool use unsupported",
          "image-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "command-a-translate-08-2025",
      "publicName": "Command A Translate",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Free until rate limits are reached; production access requires sales.",
      "limitsSummary": "8k context on model page, but description states 16k total split as 8k input + 8k output; trial 20 req/min.",
      "regionSummary": "Public API for use; enterprise/private deployment available.",
      "languagesSummary": "23 languages explicitly listed.",
      "notes": "Specialized translation model. Not a default chat picker entry unless the app has an explicit translation mode.",
      "officialSources": [
        "https://docs.cohere.com/docs/command-a-translate",
        "https://docs.cohere.com/docs/rate-limits",
        "https://docs.cohere.com/changelog/2025-08-28-command-a-translate"
      ],
      "openAiCompatible": true,
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
          "sourceText": "Specifications: Context Window: 8,000 tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens: 8,000 tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 20,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Command A Translate 20 req / min trial"
        }
      ],
      "languageSupport": {
        "rawText": "23 supported languages explicitly listed in docs.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "French",
          "Spanish",
          "Italian",
          "German",
          "Portuguese",
          "Japanese",
          "Korean",
          "Chinese",
          "Arabic",
          "Russian",
          "Polish",
          "Turkish",
          "Vietnamese",
          "Dutch",
          "Czech",
          "Indonesian",
          "Ukrainian",
          "Romanian",
          "Greek",
          "Hindi",
          "Hebrew",
          "Persian"
        ],
        "notes": [
          "translation-specialized"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "c4ai-aya-expanse-32b",
      "publicName": "Aya Expanse 32B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.50 / 1M input tokens; $1.50 / 1M output tokens.",
      "limitsSummary": "128k context; 4k max output.",
      "regionSummary": "Public Chat API access documented.",
      "languagesSummary": "23 languages.",
      "notes": "Viable multilingual alternative. More research-oriented brand than Command.",
      "officialSources": [
        "https://docs.cohere.com/docs/models",
        "https://cohere.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "Aya Expanse models (8B and 32B) are charged at $0.50/1M input tokens"
        },
        {
          "amountUsd": 1.5,
          "unit": "million_output_tokens",
          "sourceText": "Aya Expanse models (8B and 32B) are charged at $1.50/1M output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Model table lists 128k context"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Model table lists 4k maximum output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Serves 23 languages.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [
          "Arabic",
          "Chinese (simplified & traditional)",
          "Czech",
          "Dutch",
          "English",
          "French",
          "German",
          "Greek",
          "Hebrew",
          "Hindi",
          "Indonesian",
          "Italian",
          "Japanese",
          "Korean",
          "Persian",
          "Polish",
          "Portuguese",
          "Romanian",
          "Russian",
          "Spanish",
          "Turkish",
          "Ukrainian",
          "Vietnamese"
        ],
        "notes": [
          "research-branded multilingual model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cohere",
      "providerName": "Cohere",
      "service": "llm",
      "modelId": "c4ai-aya-vision-32b",
      "publicName": "Aya Vision 32B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Unknown public API price verified from official sources captured here.",
      "limitsSummary": "16k context; 4k max output.",
      "regionSummary": "Public Chat API access documented.",
      "languagesSummary": "23 languages.",
      "notes": "Multimodal multilingual model. Better behind live discovery or specialist mode than a default chat picker.",
      "officialSources": [
        "https://docs.cohere.com/docs/aya-vision",
        "https://docs.cohere.com/changelog/aya-vision-announcement"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "16k context length"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "4k maximum output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Serves 23 languages.",
        "isMultilingual": true,
        "languageCount": 23,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "vision model",
          "multilingual",
          "price not verified"
        ]
      }
    }
  ),
]);
