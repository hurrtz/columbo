import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "MiniMax-M2.5",
      "publicName": "MiniMax M2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 per million input tokens; $1.20 per million output tokens.",
      "limitsSummary": "160k context. Developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Listed as function-calling-capable.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "MiniMax-M2.5. Text. $0.30."
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "MiniMax-M2.5. Text. ... $1.20."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 160000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "MiniMax-M2.5 160k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "MiniMax-M2.5 60 RPM."
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 12000,
          "unit": "other",
          "scope": "account",
          "sourceText": "MiniMax-M2.5 12000 RPD."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-R1-0528",
      "publicName": "DeepSeek R1 0528",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$5.00 per million input tokens; $7.00 per million output tokens.",
      "limitsSummary": "128k context. Developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Listed as function-calling-capable.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-R1-0528. Text. $5.00."
        },
        {
          "amountUsd": 7.0,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-R1-0528. Text. ... $7.00."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-R1-0528 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "DeepSeek-R1-0528 60 RPM."
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 12000,
          "unit": "other",
          "scope": "account",
          "sourceText": "DeepSeek-R1-0528 12000 RPD."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-V3-0324",
      "publicName": "DeepSeek V3 0324",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 per million input tokens; $4.50 per million output tokens.",
      "limitsSummary": "128k context. Developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Release notes say it launched March 27, 2025 as Preview and later gained function calling on May 6, 2025.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/release-notes/SambaCloud",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-V3-0324. Text. $3.00."
        },
        {
          "amountUsd": 4.5,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-V3-0324. Text. ... $4.50."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-V3-0324 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "DeepSeek-V3-0324 60 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-V3.1",
      "publicName": "DeepSeek V3.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 per million input tokens; $4.50 per million output tokens.",
      "limitsSummary": "128k context. Developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Function calling page lists it as supported.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-V3.1. Text. $3.00."
        },
        {
          "amountUsd": 4.5,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-V3.1. Text. ... $4.50."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-V3.1 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "DeepSeek-V3.1 60 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-R1-Distill-Llama-70B",
      "publicName": "DeepSeek R1 Distill Llama 70B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.70 per million input tokens; $1.40 per million output tokens.",
      "limitsSummary": "128k context. Developer-tier 240 RPM / 48,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.7,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-R1-Distill-Llama-70B. Text. $0.70."
        },
        {
          "amountUsd": 1.4,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-R1-Distill-Llama-70B. Text. ... $1.40."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-R1-Distill-Llama-70B 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 240,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "DeepSeek-R1-Distill-Llama-70B 240 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Meta-Llama-3.3-70B-Instruct",
      "publicName": "Meta Llama 3.3 70B Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.60 per million input tokens; $1.20 per million output tokens.",
      "limitsSummary": "128k context. Developer-tier 240 RPM / 48,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Function-calling docs explicitly recommend this class over the 8B variant for conversation-plus-tool-calling use cases.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "Meta-Llama-3.3-70B-Instruct. Text. $0.60."
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "Meta-Llama-3.3-70B-Instruct. Text. ... $1.20."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Meta-Llama-3.3-70B-Instruct 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 240,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Meta-Llama-3.3-70B-Instruct 240 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-language details not enumerated in provider docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Meta-Llama-3.1-8B-Instruct",
      "publicName": "Meta Llama 3.1 8B Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.10 per million input tokens; $0.20 per million output tokens.",
      "limitsSummary": "16k context. Developer-tier 1440 RPM / 288,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Documented production model. Function-calling docs warn it is less reliable for conversation-plus-tool-calling than 70B.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "Meta-Llama-3.1-8B-Instruct. Text. $0.10."
        },
        {
          "amountUsd": 0.2,
          "unit": "million_output_tokens",
          "sourceText": "Meta-Llama-3.1-8B-Instruct. Text. ... $0.20."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Meta-Llama-3.1-8B-Instruct 16k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 1440,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Meta-Llama-3.1-8B-Instruct 1440 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "tool-calling caveat documented by provider"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-V3.1-Terminus",
      "publicName": "DeepSeek V3.1 Terminus",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 per million input tokens; $4.50 per million output tokens.",
      "limitsSummary": "128k context. Preview capacity; developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Preview only. Listed as function-calling-capable.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-V3.1-Terminus. Text. $3.00."
        },
        {
          "amountUsd": 4.5,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-V3.1-Terminus. Text. ... $4.50."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-V3.1-Terminus 128k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Preview models: 60 RPM for this model."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-V3.2",
      "publicName": "DeepSeek V3.2",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 per million input tokens; $4.50 per million output tokens.",
      "limitsSummary": "8k context.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "No provider-specific language list found.",
      "notes": "Preview only. Function-calling page lists it as supported.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-V3.2. Text. $3.00."
        },
        {
          "amountUsd": 4.5,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-V3.2. Text. ... $4.50."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "DeepSeek-V3.2 8k tokens."
        }
      ],
      "languageSupport": {
        "rawText": "No official provider-side language enumeration found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Llama-4-Maverick-17B-128E-Instruct",
      "publicName": "Llama 4 Maverick 17B 128E Instruct",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.63 per million input tokens; $1.80 per million output tokens.",
      "limitsSummary": "128k context. Vision input: up to 5 images, each <= 20 MB. Preview capacity; developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "Preview multimodal LLM. Vision docs use this as the example model. Function-calling page lists it as supported.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/vision",
        "https://docs.sambanova.ai/docs/en/features/function-calling",
        "https://sambanova.ai/blog/sambanova-partners-with-meta-to-deliver-lightning-fast-inference-on-llama-4"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.63,
          "unit": "million_input_tokens",
          "sourceText": "Llama-4-Maverick-17B-128E-Instruct. Text. $0.63."
        },
        {
          "amountUsd": 1.8,
          "unit": "million_output_tokens",
          "sourceText": "Llama-4-Maverick-17B-128E-Instruct. Text. ... $1.80."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Llama-4-Maverick-17B-128E-Instruct 128k tokens."
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 20971520,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Up to 5 images, each <= 20 MB."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal",
          "image-input-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "ALLaM-7B-Instruct-preview",
      "publicName": "ALLaM 7B Instruct Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.22 per million input tokens; $0.59 per million output tokens.",
      "limitsSummary": "4k context.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "Preview only.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.22,
          "unit": "million_input_tokens",
          "sourceText": "ALLaM-7B-Instruct-preview. Text. $0.22."
        },
        {
          "amountUsd": 0.59,
          "unit": "million_output_tokens",
          "sourceText": "ALLaM-7B-Instruct-preview. Text. ... $0.59."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "ALLaM-7B-Instruct-preview 4k tokens."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "gpt-oss-120b",
      "publicName": "GPT-OSS 120B",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.22 per million input tokens; $0.59 per million output tokens.",
      "limitsSummary": "128k context in models page; blog says 131K context length.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "Preview in model table. Function-calling docs list it as supported and recommend reasoning_effort=high for better tool-calling quality. There is a minor context-length discrepancy between docs (128k) and launch blog (131K).",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/features/function-calling",
        "https://sambanova.ai/blog/start-building-with-lightning-fast-gpt-oss-120b-on-sambacloud"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.22,
          "unit": "million_input_tokens",
          "sourceText": "gpt-oss-120b. Text. $0.22."
        },
        {
          "amountUsd": 0.59,
          "unit": "million_output_tokens",
          "sourceText": "gpt-oss-120b. Text. ... $0.59."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Models page says 128k; launch blog says full 131K context length."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "gpt-oss-120b 60 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only",
          "reasoning-effort-parameter-mentioned"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Qwen3-235B-A22B-Instruct-2507",
      "publicName": "Qwen3 235B A22B Instruct 2507",
      "aliases": [
        "Qwen3-235B"
      ],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.40 per million input tokens; $0.80 per million output tokens.",
      "limitsSummary": "64k context. Developer-tier 30 RPM / 6,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "The models page uses the full ID with suffix; the function-calling page uses the shorter 'Qwen3-235B'. Treat the full ID as canonical and the short form as alias.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "million_input_tokens",
          "sourceText": "Qwen3-235B. Text. $0.40."
        },
        {
          "amountUsd": 0.8,
          "unit": "million_output_tokens",
          "sourceText": "Qwen3-235B. Text. ... $0.80."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Qwen3-235B-A22B-Instruct-2507 64k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 30,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Qwen3-235B-A22B-Instruct-2507 30 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only",
          "alias-short-form-documented-elsewhere"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Qwen3-32B",
      "publicName": "Qwen3 32B",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.40 per million input tokens; $0.80 per million output tokens.",
      "limitsSummary": "32k context. Developer-tier 30 RPM / 6,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "Preview only. Function-calling page lists it as supported.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/features/function-calling"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "million_input_tokens",
          "sourceText": "Qwen3-32B. Text. $0.40."
        },
        {
          "amountUsd": 0.8,
          "unit": "million_output_tokens",
          "sourceText": "Qwen3-32B. Text. ... $0.80."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Qwen3-32B 32k tokens."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 30,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Qwen3-32B 30 RPM."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "Llama-3.3-Swallow-70B-Instruct-v0.4",
      "publicName": "Llama 3.3 Swallow 70B Instruct v0.4",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.60 per million input tokens; $1.20 per million output tokens.",
      "limitsSummary": "16k context. Developer-tier 60 RPM / 12,000 RPD.",
      "regionSummary": "No model-specific public region doc found.",
      "languagesSummary": "Provider docs do not enumerate languages here.",
      "notes": "Preview model now, but deprecations page says it moved from Production to Preview on June 25, 2025.",
      "officialSources": [
        "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "https://cloud.sambanova.ai/plans/pricing",
        "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "https://docs.sambanova.ai/docs/en/models/deprecations"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "Llama-3.3-Swallow-70B-Instruct-v0.4. Text. $0.60."
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "Llama-3.3-Swallow-70B-Instruct-v0.4. Text. ... $1.20."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Llama-3.3-Swallow-70B-Instruct-v0.4 16k tokens."
        }
      ],
      "languageSupport": {
        "rawText": "No provider-side enumerated language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview-only",
          "moved-from-production-to-preview"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "sambanova",
      "providerName": "Sambanova",
      "service": "llm",
      "modelId": "DeepSeek-V3.1-cb",
      "publicName": "DeepSeek V3.1 cb",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.15 per million input tokens; $0.75 per million output tokens.",
      "limitsSummary": "Not listed on the fixed models page.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Appears on the pricing page snippet but not on the fixed supported-models page I found. Treat as dynamic/live-discovery-only and do not expose in a stable picker without runtime verification.",
      "officialSources": [
        "https://cloud.sambanova.ai/plans/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "DeepSeek-V3.1-cb. Text. $0.15."
        },
        {
          "amountUsd": 0.75,
          "unit": "million_output_tokens",
          "sourceText": "DeepSeek-V3.1-cb. Text. ... $0.75."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dynamic-only",
          "not-in-fixed-model-table"
        ]
      }
    }
  ),
]);
