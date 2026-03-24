import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "cerebras",
      "providerName": "Cerebras",
      "service": "llm",
      "modelId": "llama3.1-8b",
      "publicName": "Llama 3.1 8B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.10 / 1M input tokens; $0.10 / 1M output tokens.",
      "limitsSummary": "Context: 8k free, 32k paid. Max output: 8k free/paid. Free limits: 30 RPM, 60k TPM, 1M daily tokens. Developer limits on rate-limits page: 2K RPM, 2M TPM.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "No Cerebras language list published; general Llama multilingual behavior is not enumerated in Cerebras docs.",
      "notes": "Production/shared-endpoint model. Native capabilities documented: streaming, structured outputs, tool calling, tool calling with structured outputs. Predicted Outputs page also lists llama3.1-8b, but a separate limitation block names only gpt-oss-120b and zai-glm-4.7; that inconsistency should be treated as an unresolved doc conflict.",
      "officialSources": [
        "https://inference-docs.cerebras.ai/models/llama-31-8b",
        "https://inference-docs.cerebras.ai/models/overview",
        "https://inference-docs.cerebras.ai/support/rate-limits",
        "https://inference-docs.cerebras.ai/capabilities/predicted-outputs"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10 / M tokens input"
        },
        {
          "amountUsd": 0.1,
          "unit": "million_output_tokens",
          "sourceText": "$0.10 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Free Tier 8k tokens"
        },
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Paid Tiers 32k tokens"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 8k tokens"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 30,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Free 30 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 60000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Free 60k TPM"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 2000,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "PayGo 2K RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 2000000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "PayGo 2M TPM"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from Cerebras model docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-from-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cerebras",
      "providerName": "Cerebras",
      "service": "llm",
      "modelId": "gpt-oss-120b",
      "publicName": "OpenAI GPT OSS",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.35 / 1M input tokens; $0.75 / 1M output tokens.",
      "limitsSummary": "Context: 65k free, 131k paid. Max output: 32k free, 40k paid. Free limits: 30 RPM, 64k TPM, 1M daily tokens. PayGo limits: 1K RPM, 1M TPM.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "No Cerebras language list published.",
      "notes": "Production/shared-endpoint model. Reasoning is explicitly supported. Cerebras OpenAI-compat docs note a behavioral difference: system messages are elevated to a developer-like layer for gpt-oss-120b. No provider-native aliases were documented. Do not use integration-layer aliases such as cerebras/gpt-oss-120b as canonical IDs.",
      "officialSources": [
        "https://inference-docs.cerebras.ai/models/openai-oss",
        "https://inference-docs.cerebras.ai/models/overview",
        "https://inference-docs.cerebras.ai/support/rate-limits",
        "https://inference-docs.cerebras.ai/capabilities/reasoning",
        "https://inference-docs.cerebras.ai/resources/openai"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.35,
          "unit": "million_input_tokens",
          "sourceText": "$0.35 / M tokens input"
        },
        {
          "amountUsd": 0.75,
          "unit": "million_output_tokens",
          "sourceText": "$0.75 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 65000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Free Tier 65k tokens"
        },
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 131000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Paid Tiers 131k tokens"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 32k free"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 40000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 40k paid"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 30,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Free 30 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Free 64K TPM"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 1000,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "PayGo 1K RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 1000000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "PayGo 1M TPM"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from Cerebras model docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-from-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cerebras",
      "providerName": "Cerebras",
      "service": "llm",
      "modelId": "qwen-3-235b-a22b-instruct-2507",
      "publicName": "Qwen 3 235B Instruct",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.60 / 1M input tokens; $1.20 / 1M output tokens.",
      "limitsSummary": "Context: 65k free, 131k paid. Max output: 32k free, 40k paid. Free limits: 30 RPM, 60k TPM, 1M daily tokens. PayGo limits: 250 RPM, 250k TPM.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Official page describes it as multilingual, but Cerebras does not publish a language list or count.",
      "notes": "Preview/shared-endpoint model. Official overview warns preview models should not be used in production and may be discontinued with short notice. Prompt caching is listed as supported. Reasoning is not listed on the reasoning page for Qwen, and the model page explicitly describes this as a non-thinking version.",
      "officialSources": [
        "https://inference-docs.cerebras.ai/models/qwen-3-235b-2507",
        "https://inference-docs.cerebras.ai/models/overview",
        "https://inference-docs.cerebras.ai/support/rate-limits",
        "https://inference-docs.cerebras.ai/capabilities/prompt-caching"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.60 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "$1.20 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 65000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Free Tier 65k tokens"
        },
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 131000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Paid Tiers 131k tokens"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 32k free"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 40000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 40k paid"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 30,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Free 30 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 60000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Free 60K TPM"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 250,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "PayGo 250 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 250000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "PayGo 250K TPM"
        }
      ],
      "languageSupport": {
        "rawText": "This non-thinking version offers powerful multilingual capabilities.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-described-as-multilingual",
          "no-language-list-published"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "cerebras",
      "providerName": "Cerebras",
      "service": "llm",
      "modelId": "zai-glm-4.7",
      "publicName": "Z.ai GLM 4.7",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$2.25 / 1M input tokens; $2.75 / 1M output tokens.",
      "limitsSummary": "Context: 131k published in migration guide; search snippets also imply 65k free / 131k paid on model page. Max output: 40k free/paid. Free limits: 10 RPM, 60k TPM, 1M daily tokens. PayGo limits: 500 RPM, 500k TPM.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "No Cerebras language list published.",
      "notes": "Preview/shared-endpoint model. Official overview warns preview models should not be used in production and may be discontinued with short notice. Reasoning is explicitly supported. Migration guide publishes 131,072-token context and 40k max completion tokens. Do not use integration-layer aliases such as zai-org/GLM-4.7:cerebras as canonical provider IDs.",
      "officialSources": [
        "https://inference-docs.cerebras.ai/models/zai-glm-47",
        "https://inference-docs.cerebras.ai/models/overview",
        "https://inference-docs.cerebras.ai/support/rate-limits",
        "https://inference-docs.cerebras.ai/capabilities/reasoning",
        "https://inference-docs.cerebras.ai/resources/glm-47-migration"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 2.25,
          "unit": "million_input_tokens",
          "sourceText": "$2.25 / M tokens input"
        },
        {
          "amountUsd": 2.75,
          "unit": "million_output_tokens",
          "sourceText": "$2.75 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Migration guide: Context 131,072 tokens"
        },
        {
          "metric": "other",
          "comparator": "~",
          "value": 40000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output 40k"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 10,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Free 10 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 60000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Free 60K TPM"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "PayGo 500 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 500000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "PayGo 500K TPM"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from Cerebras model docs.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-from-provider-docs"
        ]
      }
    }
  ),
]);
