import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "llm",
      "modelId": "zai-org/GLM-4.7-Flash",
      "publicName": "GLM-4.7-Flash",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.06 / 1M input tokens, $0.40 / 1M output tokens, $0.01 / 1M cached input tokens.",
      "limitsSummary": "202,752 context tokens shown on model page; provider-wide 16,384 max output tokens per request still applies.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific regional residency promise found.",
      "languagesSummary": "Model page does not enumerate languages; multilingual capability is not fully specified there.",
      "notes": "Public model page explicitly marks JSON and Function support. Good stable low-cost general picker candidate.",
      "officialSources": [
        "https://deepinfra.com/zai-org/GLM-4.7-Flash",
        "https://deepinfra.com/zai-org/GLM-4.7-Flash/versions",
        "https://deepinfra.com/docs/advanced/max_tokens_limit"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.06,
          "unit": "million_input_tokens",
          "sourceText": "$0.06 in / 1M tokens"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "$0.40 out / 1M tokens"
        },
        {
          "amountUsd": 0.01,
          "unit": "million_input_tokens",
          "sourceText": "$0.01 cached / 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 202752,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "202,752"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "general",
          "sourceText": "maximum output token limit of 16384 tokens per request"
        }
      ],
      "languageSupport": {
        "rawText": "Model page does not list languages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference: likely multilingual but not explicitly enumerated on DeepInfra page"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "llm",
      "modelId": "deepseek-ai/DeepSeek-V3.2",
      "publicName": "DeepSeek-V3.2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.26 / 1M input tokens, $0.38 / 1M output tokens, $0.13 / 1M cached input tokens.",
      "limitsSummary": "Catalog shows 160k context; provider-wide 16,384 max output tokens per request documented separately.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific regional residency promise found.",
      "languagesSummary": "No enumerated language list found on DeepInfra model page.",
      "notes": "Strong flagship option with lower output pricing than several peers. Good stable premium/general picker candidate.",
      "officialSources": [
        "https://deepinfra.com/deepseek-ai/DeepSeek-V3.2",
        "https://deepinfra.com/models",
        "https://deepinfra.com/docs/advanced/max_tokens_limit"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.26,
          "unit": "million_input_tokens",
          "sourceText": "$0.26 in / 1M tokens"
        },
        {
          "amountUsd": 0.38,
          "unit": "million_output_tokens",
          "sourceText": "$0.38 out / 1M tokens"
        },
        {
          "amountUsd": 0.13,
          "unit": "million_input_tokens",
          "sourceText": "$0.13 cached / 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 160000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "fp4 160k"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "general",
          "sourceText": "maximum output token limit of 16384 tokens per request"
        }
      ],
      "languageSupport": {
        "rawText": "Language list not enumerated on DeepInfra model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage unspecified on DeepInfra page"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "llm",
      "modelId": "Qwen/Qwen3-Max",
      "publicName": "Qwen3-Max",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.20 / 1M input tokens, $6.00 / 1M output tokens, $0.24 / 1M cached input tokens.",
      "limitsSummary": "256,000 context tokens shown on model page; provider-wide 16,384 max output tokens per request documented separately.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific residency promise found.",
      "languagesSummary": "Model page claims multilingual understanding but does not list languages.",
      "notes": "Public page marks JSON and Function support. Strong premium picker entry; more expensive than flash/economy options.",
      "officialSources": [
        "https://deepinfra.com/Qwen/Qwen3-Max",
        "https://deepinfra.com/Qwen/Qwen3-Max/versions",
        "https://deepinfra.com/docs/advanced/max_tokens_limit"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 1.2,
          "unit": "million_input_tokens",
          "sourceText": "$1.20 in / 1M tokens"
        },
        {
          "amountUsd": 6.0,
          "unit": "million_output_tokens",
          "sourceText": "$6.00 out / 1M tokens"
        },
        {
          "amountUsd": 0.24,
          "unit": "million_input_tokens",
          "sourceText": "$0.24 cached / 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "256,000"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "general",
          "sourceText": "maximum output token limit of 16384 tokens per request"
        }
      ],
      "languageSupport": {
        "rawText": "The latest flagship model in the Qwen family ... multilingual understanding.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multilingual but languages not enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepinfra",
      "providerName": "DeepInfra",
      "service": "llm",
      "modelId": "nvidia/Nemotron-3-Nano-30B-A3B",
      "publicName": "Nemotron-3-Nano-30B-A3B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.05 / 1M input tokens and $0.20 / 1M output tokens on the model page opened; the broader catalog snippet showed $0.10/$0.50 earlier, so the dedicated model page is better evidence.",
      "limitsSummary": "No context value visible on the dedicated excerpt I opened; provider-wide 16,384 max output tokens per request documented separately.",
      "regionSummary": "Runs on DeepInfra infrastructure; no model-specific residency promise found.",
      "languagesSummary": "Language list not enumerated on opened model page.",
      "notes": "There is a pricing conflict between the main models page snippet and the dedicated model page. I use the dedicated model page as authoritative.",
      "officialSources": [
        "https://deepinfra.com/nvidia/Nemotron-3-Nano-30B-A3B",
        "https://deepinfra.com/models",
        "https://deepinfra.com/docs/advanced/max_tokens_limit"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "$0.05 in / 1M tokens"
        },
        {
          "amountUsd": 0.2,
          "unit": "million_output_tokens",
          "sourceText": "$0.20 out / 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "general",
          "sourceText": "maximum output token limit of 16384 tokens per request"
        }
      ],
      "languageSupport": {
        "rawText": "No language list found on opened page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage unspecified"
        ]
      }
    }
  ),
]);
