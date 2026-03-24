import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-5",
      "publicName": "GLM-5",
      "aliases": [
        "GLM-5"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $1 / 1M input tokens, $3.2 / 1M output tokens; cached input $0.2 / 1M.",
      "limitsSummary": "200K context; default max_tokens 65536; max output 131072.",
      "regionSummary": "Documented on both Z.ai global and BigModel mainland; canonical API ID verified on Z.ai global.",
      "languagesSummary": "English & Chinese in model overview.",
      "notes": "Canonical stable ID is lowercase glm-5. Good stable-picker candidate.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/overview/overview",
        "https://z.ai/blog/glm-5"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "GLM-5 $1 input per 1M tokens"
        },
        {
          "amountUsd": 3.2,
          "unit": "million_output_tokens",
          "sourceText": "GLM-5 $3.2 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-5 context 200K"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "max_tokens upper bound 131072; GLM-5 max output 128K"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-5-turbo",
      "publicName": "GLM-5-Turbo",
      "aliases": [
        "GLM-5-Turbo"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $1.2 / 1M input, $4 / 1M output; cached input $0.24 / 1M.",
      "limitsSummary": "200K context; default max_tokens 65536; max output 131072.",
      "regionSummary": "Documented on both stacks; launched on BigModel 2026-03-15.",
      "languagesSummary": "English & Chinese in model overview.",
      "notes": "Stable-picker candidate if you want a second flagship tier.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.bigmodel.cn/cn/update/new-releases"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.2,
          "unit": "million_input_tokens",
          "sourceText": "GLM-5-Turbo $1.2 input per 1M tokens"
        },
        {
          "amountUsd": 4.0,
          "unit": "million_output_tokens",
          "sourceText": "GLM-5-Turbo $4 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-5-Turbo context 200K"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "glm-5-turbo maximum max_tokens 131072"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.7",
      "publicName": "GLM-4.7",
      "aliases": [
        "GLM-4.7"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.6 / 1M input, $2.2 / 1M output; cached input $0.11 / 1M.",
      "limitsSummary": "200K context; default max_tokens 65536; max output 131072.",
      "regionSummary": "Documented on both stacks; official blog date 2025-12-22 on Z.ai.",
      "languagesSummary": "English & Chinese in overview.",
      "notes": "Best current stable mid/high-end picker choice.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/llm/glm-4.7",
        "https://z.ai/blog/glm-4.7"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.7 $0.6 input per 1M tokens"
        },
        {
          "amountUsd": 2.2,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.7 $2.2 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.7 context 200K"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.7 maximum output 128K / max_tokens 131072"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.7-flashx",
      "publicName": "GLM-4.7-FlashX",
      "aliases": [
        "GLM-4.7-FlashX"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.07 / 1M input, $0.4 / 1M output; cached input $0.01 / 1M.",
      "limitsSummary": "200K context; max output 128K.",
      "regionSummary": "Documented on both stacks.",
      "languagesSummary": "English & Chinese in overview.",
      "notes": "Best low-cost stable picker choice.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/llm/glm-4.7"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.07,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.7-FlashX $0.07 input per 1M tokens"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.7-FlashX $0.4 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.7-FlashX context 200K"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.6",
      "publicName": "GLM-4.6",
      "aliases": [
        "GLM-4.6"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.6 / 1M input, $2.2 / 1M output; cached input $0.11 / 1M.",
      "limitsSummary": "200K context; max output 131072.",
      "regionSummary": "Documented on both stacks.",
      "languagesSummary": "English & Chinese in overview.",
      "notes": "Usable, but overshadowed by GLM-4.7 and GLM-5 for new picker entries.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/llm/glm-4.6"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.6 $0.6 input per 1M tokens"
        },
        {
          "amountUsd": 2.2,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.6 $2.2 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.6 context 200K"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "glm-4.6 maximum max_tokens 131072"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.5",
      "publicName": "GLM-4.5",
      "aliases": [
        "GLM-4.5"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.6 / 1M input, $2.2 / 1M output; cached input $0.11 / 1M.",
      "limitsSummary": "128K context; max output 98304.",
      "regionSummary": "Documented on Z.ai global; not present in current BigModel text enum snippet.",
      "languagesSummary": "English & Chinese.",
      "notes": "Active, but no longer a first-choice new picker entry.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/llm/glm-4.5"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.5 $0.6 input per 1M tokens"
        },
        {
          "amountUsd": 2.2,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.5 $2.2 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.5 context length has been extended to 128k"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 98304,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "glm-4.5 maximum max_tokens 98304"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.5-air",
      "publicName": "GLM-4.5-Air",
      "aliases": [
        "GLM-4.5-Air"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.2 / 1M input, $1.1 / 1M output; cached input $0.03 / 1M.",
      "limitsSummary": "128K context; max output 98304.",
      "regionSummary": "Documented on both stacks.",
      "languagesSummary": "English & Chinese.",
      "notes": "Stable low-cost fallback if you prefer a 4.5-family option.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.bigmodel.cn/cn/guide/start/model-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.5-Air $0.2 input per 1M tokens"
        },
        {
          "amountUsd": 1.1,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.5-Air $1.1 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.5-Air 128K context"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 98304,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "glm-4.5-air maximum max_tokens 98304"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.5-x",
      "publicName": "GLM-4.5-X",
      "aliases": [
        "GLM-4.5-X"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $2.2 / 1M input, $8.9 / 1M output; cached input $0.45 / 1M.",
      "limitsSummary": "Max output 98304. Other limits aligned with 4.5 family in docs.",
      "regionSummary": "Documented on Z.ai global; not verified in current BigModel text enum snippet.",
      "languagesSummary": "English & Chinese.",
      "notes": "Expensive specialty tier; not recommended for default consumer picker.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.2,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.5-X $2.2 input per 1M tokens"
        },
        {
          "amountUsd": 8.9,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.5-X $8.9 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 98304,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "4.5 family maximum max_tokens 98304"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.5-airx",
      "publicName": "GLM-4.5-AirX",
      "aliases": [
        "GLM-4.5-AirX"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $1.1 / 1M input, $4.5 / 1M output; cached input $0.22 / 1M.",
      "limitsSummary": "128K context; max output 98304.",
      "regionSummary": "Documented on both stacks.",
      "languagesSummary": "English & Chinese.",
      "notes": "Region-split active model, but not a first-line picker recommendation.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.bigmodel.cn/cn/guide/start/model-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.1,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4.5-AirX $1.1 input per 1M tokens"
        },
        {
          "amountUsd": 4.5,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4.5-AirX $4.5 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.5-AirX 128K context"
        }
      ],
      "languageSupport": {
        "rawText": "English & Chinese",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Chinese"
        ],
        "notes": []
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.5-flash",
      "publicName": "GLM-4.5-Flash",
      "aliases": [
        "GLM-4.5-Flash"
      ],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global pricing page shows it as free; mainland model overview marks it as '\u5373\u5c06\u4e0b\u7ebf' (about to be taken offline).",
      "limitsSummary": "128K context; max output 98304.",
      "regionSummary": "Catalog conflict across regions.",
      "languagesSummary": "Not separately enumerated.",
      "notes": "Do not expose in stable picker.",
      "officialSources": [
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.bigmodel.cn/cn/guide/start/model-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.5-Flash supports up to 128K context"
        }
      ],
      "languageSupport": {
        "rawText": "Not separately enumerated",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated/avoid"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4-32b-0414-128k",
      "publicName": "GLM-4-32B-0414-128K",
      "aliases": [
        "GLM-4-32B-0414-128K"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Z.ai global: $0.1 / 1M input and $0.1 / 1M output.",
      "limitsSummary": "Default/max max_tokens 16384.",
      "regionSummary": "Documented on Z.ai global.",
      "languagesSummary": "Not separately enumerated in current overview snippet.",
      "notes": "Older, specialized small model. Hide by default unless user explicitly wants smallest/cheapest legacy model.",
      "officialSources": [
        "https://docs.z.ai/api-reference/llm/chat-completion",
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/overview/concept-param"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "GLM-4-32B-0414-128K $0.1 input per 1M tokens"
        },
        {
          "amountUsd": 0.1,
          "unit": "million_output_tokens",
          "sourceText": "GLM-4-32B-0414-128K $0.1 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "glm-4-32b-0414-128k default and maximum max_tokens 16384"
        }
      ],
      "languageSupport": {
        "rawText": "Not separately enumerated",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy/specialized"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4.7-flash",
      "publicName": "GLM-4.7-Flash",
      "aliases": [
        "GLM-4.7-Flash"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Listed as free in Z.ai pricing and as a free model in BigModel overview, but missing from Z.ai global chat-completions enum.",
      "limitsSummary": "200K context; 128K output in BigModel overview.",
      "regionSummary": "Documented in overview/pricing; API-enum availability conflict on international stack.",
      "languagesSummary": "Not separately enumerated.",
      "notes": "Hide by default; use only via live verification.",
      "officialSources": [
        "https://docs.z.ai/guides/overview/pricing",
        "https://docs.z.ai/guides/overview/overview",
        "https://docs.bigmodel.cn/cn/guide/start/model-overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4.7-Flash free model 200K context in BigModel overview"
        }
      ],
      "languageSupport": {
        "rawText": "Not separately enumerated",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "enum conflict; do not hard-code globally"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4-long",
      "publicName": "GLM-4-Long",
      "aliases": [
        "GLM-4-Long"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing not machine-readable in current crawl; public model overview documents 1M context / 4K max output.",
      "limitsSummary": "1M context; 4K max output.",
      "regionSummary": "BigModel mainland only in current public overview.",
      "languagesSummary": "Not separately enumerated.",
      "notes": "Not suitable for global stable picker unless you are explicitly targeting mainland BigModel catalog.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/start/model-overview",
        "https://docs.bigmodel.cn/cn/guide/models/text/glm-4-long"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1000000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-Long supports up to 1M context length"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-Long max output 4K"
        }
      ],
      "languageSupport": {
        "rawText": "Not separately enumerated",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "mainland-only documented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4-flash-250414",
      "publicName": "GLM-4-Flash-250414",
      "aliases": [
        "GLM-4-Flash-250414"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Public/free model in BigModel overview; pricing not independently verified in current crawl.",
      "limitsSummary": "128K context; 16K max output.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Multi-language support noted in overview.",
      "notes": "Do not expose in a global stable picker.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/start/model-overview",
        "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%AF%B9%E8%AF%9D%E8%A1%A5%E5%85%A8"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-Flash-250414 128K context"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-Flash-250414 16K max output"
        }
      ],
      "languageSupport": {
        "rawText": "Multi-language support",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "mainland-only documented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "z-ai-zhipu-ai",
      "providerName": "Z.ai / Zhipu AI",
      "service": "llm",
      "modelId": "glm-4-flashx-250414",
      "publicName": "GLM-4-FlashX-250414",
      "aliases": [
        "GLM-4-FlashX-250414"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing not independently verified in current crawl.",
      "limitsSummary": "128K context; 16K max output.",
      "regionSummary": "BigModel mainland only in current public docs.",
      "languagesSummary": "Not separately enumerated.",
      "notes": "Do not expose in a global stable picker.",
      "officialSources": [
        "https://docs.bigmodel.cn/cn/guide/start/model-overview",
        "https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%AF%B9%E8%AF%9D%E8%A1%A5%E5%85%A8"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-FlashX-250414 128K context"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 16000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "GLM-4-FlashX-250414 16K max output"
        }
      ],
      "languageSupport": {
        "rawText": "Not separately enumerated",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "mainland-only documented"
        ]
      }
    }
  ),
]);
