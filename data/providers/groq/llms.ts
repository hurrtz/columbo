import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "llama-3.1-8b-instant",
      "publicName": "Llama 3.1 8B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.05 / 1M input tokens, $0.08 / 1M output tokens.",
      "limitsSummary": "131,072 context, 131,072 max completion; developer-plan row shows 250K TPM and 1K RPM.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual LLM usage not enumerated on Groq model list.",
      "notes": "Production model. Stable picker candidate.",
      "officialSources": [
        "https://console.groq.com/docs/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "$0.05 input"
        },
        {
          "amountUsd": 0.08,
          "unit": "million_output_tokens",
          "sourceText": "$0.08 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list not provider-enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "llama-3.3-70b-versatile",
      "publicName": "Llama 3.3 70B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.59 / 1M input tokens, $0.79 / 1M output tokens.",
      "limitsSummary": "131,072 context, 32,768 max completion; developer-plan row shows 300K TPM and 1K RPM.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual LLM usage not enumerated on Groq model list.",
      "notes": "Production model. Stable picker candidate.",
      "officialSources": [
        "https://console.groq.com/docs/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.59,
          "unit": "million_input_tokens",
          "sourceText": "$0.59 input"
        },
        {
          "amountUsd": 0.79,
          "unit": "million_output_tokens",
          "sourceText": "$0.79 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "32,768 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list not provider-enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "openai/gpt-oss-20b",
      "publicName": "GPT OSS 20B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.075 / 1M input tokens, $0.30 / 1M output tokens. Prompt-cached input is $0.0375 / 1M.",
      "limitsSummary": "131,072 context, 65,536 max completion; developer-plan row shows 250K TPM and 1K RPM.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual LLM usage not enumerated on Groq model list.",
      "notes": "Production model. Stable picker candidate. Groq also prices GPT-OSS built-in browser search and code execution separately on pricing page.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://groq.com/pricing",
        "https://console.groq.com/docs/batch"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.075,
          "unit": "million_input_tokens",
          "sourceText": "$0.075 input"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_output_tokens",
          "sourceText": "$0.30 output"
        },
        {
          "amountUsd": 0.0375,
          "unit": "million_input_tokens",
          "sourceText": "Cached Input Tokens $0.0375"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "65,536 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list not provider-enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "openai/gpt-oss-120b",
      "publicName": "GPT OSS 120B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15 / 1M input tokens, $0.60 / 1M output tokens. Prompt-cached input is $0.075 / 1M.",
      "limitsSummary": "131,072 context, 65,536 max completion; developer-plan row shows 250K TPM and 1K RPM.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual LLM usage not enumerated on Groq model list.",
      "notes": "Production model. Stable picker candidate. Groq spotlights it as a featured model with reasoning and built-in browser search / code execution capabilities.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://groq.com/pricing",
        "https://console.groq.com/docs/model/openai/gpt-oss-120b",
        "https://console.groq.com/docs/batch"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "$0.15 input"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.60 output"
        },
        {
          "amountUsd": 0.075,
          "unit": "million_input_tokens",
          "sourceText": "Cached Input Tokens $0.075"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "65,536 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list not provider-enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "meta-llama/llama-4-scout-17b-16e-instruct",
      "publicName": "Llama 4 Scout 17B 16E",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.11 / 1M input tokens, $0.34 / 1M output tokens.",
      "limitsSummary": "131,072 context, 8,192 max completion, 20 MB max file size; batch-supported.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual text capability not enumerated on Groq page.",
      "notes": "Preview only; supports image input up to 5 images, tool use/function calling, and JSON mode per changelog/vision docs. Good live-discovery model, not safest stable picker choice.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/model/meta-llama/llama-4-scout-17b-16e-instruct",
        "https://console.groq.com/docs/changelog",
        "https://console.groq.com/docs/batch"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.11,
          "unit": "million_input_tokens",
          "sourceText": "$0.11 input"
        },
        {
          "amountUsd": 0.34,
          "unit": "million_output_tokens",
          "sourceText": "$0.34 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "8,192 max completion tokens"
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 20971520,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "20 MB"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "vision-capable",
          "supports up to 5 images"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "moonshotai/kimi-k2-instruct-0905",
      "publicName": "Kimi K2 0905",
      "aliases": [
        "moonshotai/kimi-k2-instruct"
      ],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$1.00 / 1M input tokens, $3.00 / 1M output tokens. Deprecated predecessor alias redirected here.",
      "limitsSummary": "262,144 context on supported-models page, 16,384 max output; batch not publicly documented for this model.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual capability not enumerated on Groq page.",
      "notes": "Canonical ID is the -0905 version. Older non-suffixed ID is deprecated and documented as redirecting here.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/model/moonshotai/kimi-k2-instruct",
        "https://console.groq.com/docs/deprecations"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1.00 input"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "$3.00 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "262,144"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 16384,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "16,384 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "alias redirect documented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "qwen/qwen3-32b",
      "publicName": "Qwen3-32B",
      "aliases": [
        "qwen-qwq-32b"
      ],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.29 / 1M input tokens, $0.59 / 1M output tokens.",
      "limitsSummary": "131,072 context, 40,960 max completion; batch not publicly documented for this model.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "General multilingual capability not enumerated on Groq page.",
      "notes": "Preview only. Deprecated predecessor `qwen-qwq-32b` was replaced by this model on 2025-07-14.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/deprecations"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.29,
          "unit": "million_input_tokens",
          "sourceText": "$0.29 input"
        },
        {
          "amountUsd": 0.59,
          "unit": "million_output_tokens",
          "sourceText": "$0.59 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 40960,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "40,960 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-owned language list on supported-models page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "alias/replacement inferred from deprecation page"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "openai/gpt-oss-safeguard-20b",
      "publicName": "Safety GPT OSS 20B",
      "aliases": [
        "meta-llama/llama-guard-4-12b"
      ],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.075 / 1M input tokens, $0.30 / 1M output tokens.",
      "limitsSummary": "131,072 context, 65,536 max completion.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Moderation/safeguard model; language list not provider-enumerated.",
      "notes": "Publicly documented but not appropriate for a normal chat picker. Use only for moderation/safety workflows. Replacement for deprecated `meta-llama/llama-guard-4-12b`.",
      "officialSources": [
        "https://console.groq.com/docs/models",
        "https://console.groq.com/docs/deprecations"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.075,
          "unit": "million_input_tokens",
          "sourceText": "$0.075 input"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_output_tokens",
          "sourceText": "$0.30 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "65,536 max completion tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Safety-specific model; Groq does not provide an exhaustive language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "moderation-focused",
          "do not expose as normal chat model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "meta-llama/llama-prompt-guard-2-22m",
      "publicName": "Llama Prompt Guard 2 22M",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.03 / 1M input tokens, $0.03 / 1M output tokens.",
      "limitsSummary": "512 context, 512 max completion.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Prompt-guard model; language list not provider-enumerated.",
      "notes": "Specialized safety model; not suitable for a user-facing chat picker.",
      "officialSources": [
        "https://console.groq.com/docs/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.03,
          "unit": "million_input_tokens",
          "sourceText": "$0.03 input"
        },
        {
          "amountUsd": 0.03,
          "unit": "million_output_tokens",
          "sourceText": "$0.03 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 512,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "512"
        }
      ],
      "languageSupport": {
        "rawText": "Safety-specific model; Groq does not provide an exhaustive language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "moderation-focused",
          "do not expose as normal chat model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "groq",
      "providerName": "Groq",
      "service": "llm",
      "modelId": "meta-llama/llama-prompt-guard-2-86m",
      "publicName": "Prompt Guard 2 86M",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.04 / 1M input tokens, $0.04 / 1M output tokens.",
      "limitsSummary": "512 context, 512 max completion.",
      "regionSummary": "No model-specific public region split documented.",
      "languagesSummary": "Prompt-guard model; language list not provider-enumerated.",
      "notes": "Specialized safety model; not suitable for a user-facing chat picker.",
      "officialSources": [
        "https://console.groq.com/docs/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.04,
          "unit": "million_input_tokens",
          "sourceText": "$0.04 input"
        },
        {
          "amountUsd": 0.04,
          "unit": "million_output_tokens",
          "sourceText": "$0.04 output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 512,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "512"
        }
      ],
      "languageSupport": {
        "rawText": "Safety-specific model; Groq does not provide an exhaustive language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "moderation-focused",
          "do not expose as normal chat model"
        ]
      }
    }
  ),
]);
