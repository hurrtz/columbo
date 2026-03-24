import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "openai/gpt-oss-20b",
      "publicName": "gpt-oss-20b",
      "aliases": [
        "gpt-oss-20b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.04 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,069 on model page. General provider limits apply.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Exact API model string is visible in the model page snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/gpt-oss-20b",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.04,
          "unit": "other",
          "sourceText": "$0.04 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131069,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131069"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "gpt-oss-120b",
      "publicName": "gpt-oss-120b",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,072 on model page. Exact API model string was not visible in retrieved snippet.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/gpt-oss-120b",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "other",
          "sourceText": "GPT OSS 120B (FP8): $0.3 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131072"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen3-Next-80B-A3B-Thinking",
      "publicName": "Qwen3-Next-80B-A3B-Thinking",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 262,144 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/qwen3-next-80b-a3b-thinking",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "other",
          "sourceText": "Qwen 3 Next 80B A3b Thinking: $0.3 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 262144"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen3-Next-80B-A3B-Instruct",
      "publicName": "Qwen3-Next-80B-A3B-Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 262,141 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/qwen3-next-80b-a3b-instruct",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "other",
          "sourceText": "Qwen 3 Next 80B A3b Instruct: $0.3 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262141,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 262141"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen3-Coder-480B-A35B-Instruct",
      "publicName": "Qwen3-Coder-480B-A35B-Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$2.00 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 262,144 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/qwen3-coder-480b-a35b-instruct",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "other",
          "sourceText": "Qwen 3 Coder 480B A35B (FP8): $2 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 262144"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen3-8B",
      "publicName": "Qwen3-8B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Model page exists in catalog, but retrieval timed out and public price was not found in current official pricing docs.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Catalog description says it is optimized for multilingual capabilities.",
      "notes": "Inference: the catalog entry is public, but exact API ID, price, and context window were not fully retrievable.",
      "officialSources": [
        "https://app.hyperbolic.ai/models",
        "https://app.hyperbolic.ai/models/qwen3-8b"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Supports dual thinking modes ... optimized for multilingual capabilities.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "DeepSeek-R1-0528",
      "publicName": "DeepSeek-R1-0528",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 163,840 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/deepseek-r1-0528",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "other",
          "sourceText": "DeepSeek R1 0528 (FP8): $3 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 163840,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 163840"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "DeepSeek-V3-0324",
      "publicName": "DeepSeek-V3-0324",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.25 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,069 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/deepseek-v3-0324",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "other",
          "sourceText": "DeepSeek V3 0324 (FP8): $1.25 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131069,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131069"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "deepseek-ai/DeepSeek-R1",
      "publicName": "DeepSeek-R1",
      "aliases": [
        "DeepSeek-R1"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$2.00 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,069 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Exact slash-style model ID is documented through Hyperbolic\u2019s Hugging Face integration page.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/deepseek-r1",
        "https://docs.hyperbolic.xyz/docs/huggingface",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "other",
          "sourceText": "DeepSeek R1 (FP8): $2 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131069,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131069"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "DeepSeek-V3",
      "publicName": "DeepSeek-V3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.25 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,069 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/deepseek-v3",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.25,
          "unit": "other",
          "sourceText": "DeepSeek V3 (FP8): $0.25 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131069,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131069"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Llama-3.3-70B-Instruct",
      "publicName": "Llama-3.3-70B-Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.40 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Context length 131,069 on model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Inference: model identifier comes from official catalog page title/URL, not a visible API request snippet.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/llama-3-3-70b-instruct",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "other",
          "sourceText": "Llama 3.3 70B (FP8): $0.4 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131069,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 131069"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "meta-llama/Meta-Llama-3.1-8B",
      "publicName": "Llama 3.1 8B",
      "aliases": [
        "Llama 3.1 8B",
        "llama31-8b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.10 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "No context length visible on retrieved model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Slash-style alias inferred from older Llama 3.1 naming examples in Hyperbolic docs; exact 8B request example not shown on retrieved page.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/llama31-8b",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing",
        "https://docs.hyperbolic.ai/inference/overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "other",
          "sourceText": "Llama 3.1 8B (FP8): $0.1 per 1M tokens"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Llama 3.1 405B BASE",
      "publicName": "Llama 3.1 405B BASE",
      "aliases": [
        "Llama-3.1-405B-BASE"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$4.00 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "Model-specific rate limit exists for 405B family: Basic 5/min, Pro 120/min. No context length visible on retrieved base-model page.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "This is a base completion model, not an instruct/chat model. Better hidden from normal consumer pickers.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/llama31-405b-base-bf-16",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing",
        "https://docs.hyperbolic.ai/inference/performance-limits"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 4.0,
          "unit": "other",
          "sourceText": "Llama 3.1 405B parameters BASE (BF16): $4 per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 5,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "Llama 3.1 405B 5/min 120/min"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "base-model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "meta-llama/Meta-Llama-3.1-70B-Instruct",
      "publicName": "Llama 3.1 70B Instruct",
      "aliases": [
        "meta-llama/Meta-Llama-3-70B-Instruct"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.40 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "No model-specific context listed in current docs retrieved here; general provider limits apply.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "This exact slash-style model ID is directly documented in current quick-start / overview examples. The older non-3.1 variant also appears in legacy docs and should be treated as an alias/legacy example, not preferred.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/overview",
        "https://docs.hyperbolic.xyz/docs/inference-api",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "other",
          "sourceText": "Llama 3.1 70B (FP8): $0.4 per 1M tokens"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen/Qwen3-VL-32B-Thinking",
      "publicName": "Qwen/Qwen3-VL-32B-Thinking",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown.",
      "limitsSummary": "Context length 32,768 on model page. VLM global limits also apply: JPG/PNG, max 2048x2048, 1 image/request.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Catalog-visible VLM, but no public price found in the official pricing pages I could verify.",
      "officialSources": [
        "https://app.hyperbolic.ai/models/qwen-qwen3-vl-32b-thinking",
        "https://docs.hyperbolic.ai/inference/vlm-apis"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length: 32768"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "file",
          "sourceText": "Images per request: 1"
        }
      ],
      "languageSupport": {
        "rawText": "No model-specific language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16",
      "publicName": "NVIDIA-Nemotron-Nano-12B-v2-VL-BF16",
      "aliases": [
        "NVIDIA Nemotron Nano 12B v2 VL"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.20 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "VLM global limits apply: JPG/PNG, max 2048x2048, 1 image/request.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Exact model ID is published in the VLM docs.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/vlm-apis",
        "https://app.hyperbolic.ai/models/nvidia-nemotron-nano-12b-v2-vl-bf16",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "other",
          "sourceText": "NVIDIA Nemotron Nano 12B v2 VL ... $0.20/M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "~",
          "value": 0,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Supported formats: JPG, PNG; Maximum resolution: 2048x2048 pixels; Images per request: 1"
        }
      ],
      "languageSupport": {
        "rawText": "No language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal",
          "document-intelligence"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen/Qwen2.5-VL-72B-Instruct",
      "publicName": "Qwen2.5-VL-72B-Instruct",
      "aliases": [
        "Qwen2-5-VL-72B-Instruct"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.60 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "VLM global limits apply: JPG/PNG, max 2048x2048, 1 image/request.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Best-quality VLM per Hyperbolic\u2019s own recommendation.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/vlm-apis",
        "https://app.hyperbolic.ai/models/qwen2-5-vl-72b-instruct",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "other",
          "sourceText": "Qwen2.5-VL-72B-Instruct ... $0.60/M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "file",
          "sourceText": "Images per request: 1"
        }
      ],
      "languageSupport": {
        "rawText": "No language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "Qwen/Qwen2.5-VL-7B-Instruct",
      "publicName": "Qwen2.5-VL-7B-Instruct",
      "aliases": [
        "Qwen2-5-VL-7B-Instruct"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.20 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "VLM global limits apply: JPG/PNG, max 2048x2048, 1 image/request.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Balanced-cost VLM per Hyperbolic\u2019s own recommendation.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/vlm-apis",
        "https://app.hyperbolic.ai/models/qwen2-5-vl-7b-instruct",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "other",
          "sourceText": "Qwen2.5-VL-7B-Instruct ... $0.20/M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "file",
          "sourceText": "Images per request: 1"
        }
      ],
      "languageSupport": {
        "rawText": "No language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hyperbolic",
      "providerName": "Hyperbolic",
      "service": "llm",
      "modelId": "mistralai/Pixtral-12B-2409",
      "publicName": "Pixtral-12B",
      "aliases": [
        "Pixtral 12B"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.10 per 1M tokens total; no separate input/output price published.",
      "limitsSummary": "VLM global limits apply: JPG/PNG, max 2048x2048, 1 image/request.",
      "regionSummary": "No model-specific region info published.",
      "languagesSummary": "Unknown.",
      "notes": "Budget VLM per Hyperbolic\u2019s own recommendation.",
      "officialSources": [
        "https://docs.hyperbolic.ai/inference/vlm-apis",
        "https://app.hyperbolic.ai/models/pixtral-12b",
        "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "other",
          "sourceText": "Pixtral 12B ... $0.10/M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "file",
          "sourceText": "Images per request: 1"
        }
      ],
      "languageSupport": {
        "rawText": "No language list published.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal"
        ]
      }
    }
  ),
]);
