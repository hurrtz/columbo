import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/kimi-k2p5",
      "publicName": "Kimi K2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.60 input / $0.10 cached input / $3.00 output per 1M tokens on serverless.",
      "limitsSummary": "262.1k token context on model page. General serverless limits apply.",
      "regionSummary": "Serverless plus on-demand deployment. Dedicated deployments can use Fireworks region system; serverless region pinning not clearly documented.",
      "languagesSummary": "General multilingual LLM; exact language count not published on the model page.",
      "notes": "Strong candidate for stable picker. Supports function calling and image input. Fine-tuning supported. Fireworks repeatedly showcases it in docs/examples.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/kimi-k2p5",
        "https://docs.fireworks.ai/guides/querying-vision-language-models",
        "https://docs.fireworks.ai/llms-full.txt",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.60 input per 1M tokens"
        },
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10 cached input per 1M tokens"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "$3.00 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262100,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length 262.1k tokens"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual text+vision model; exact supported-language list not published on the model page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "supports image input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/glm-5",
      "publicName": "GLM-5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.00 input / $0.20 cached input / $3.20 output per 1M tokens on serverless.",
      "limitsSummary": "202.8k token context on model page.",
      "regionSummary": "Serverless plus on-demand deployment.",
      "languagesSummary": "General multilingual LLM; no exact language count published on the model page.",
      "notes": "Good stable-picker candidate for high-end agentic/coding use. Function calling supported; image input not supported.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/glm-5",
        "https://docs.fireworks.ai/llms-full.txt",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1.00 input per 1M tokens"
        },
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "$0.20 cached input per 1M tokens"
        },
        {
          "amountUsd": 3.2,
          "unit": "million_output_tokens",
          "sourceText": "$3.20 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 202800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length 202.8k tokens"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual text model; exact language list/count not published on page.",
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
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/deepseek-v3p2",
      "publicName": "Deepseek v3.2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.56 input / $0.28 cached input / $1.68 output per 1M tokens on serverless.",
      "limitsSummary": "163.8k token context on model page.",
      "regionSummary": "Serverless plus on-demand deployment.",
      "languagesSummary": "General multilingual text model; exact language list/count not published on page.",
      "notes": "Good stable-picker candidate. Function calling supported. Fireworks uses this model in quickstart and reasoning examples.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/deepseek-v3p2",
        "https://docs.fireworks.ai/getting-started/quickstart",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.56,
          "unit": "million_input_tokens",
          "sourceText": "$0.56 input per 1M tokens"
        },
        {
          "amountUsd": 0.28,
          "unit": "million_input_tokens",
          "sourceText": "$0.28 cached input per 1M tokens"
        },
        {
          "amountUsd": 1.68,
          "unit": "million_output_tokens",
          "sourceText": "$1.68 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 163800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length 163.8k tokens"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual text model; exact language list/count not published on page.",
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
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/gpt-oss-120b",
      "publicName": "OpenAI gpt-oss-120b",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.15 input / $0.01 cached input / $0.60 output per 1M tokens on serverless.",
      "limitsSummary": "Model page contains a conflict: FAQ says 128K context while supported-functionality block shows 131.1k tokens.",
      "regionSummary": "Serverless plus on-demand deployment.",
      "languagesSummary": "General multilingual text model; exact language list/count not published on page.",
      "notes": "Stable-picker candidate, but record a context-window conflict. Function calling supported.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/gpt-oss-120b",
        "https://docs.fireworks.ai/getting-started/ondemand-quickstart",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "$0.15 input per 1M tokens"
        },
        {
          "amountUsd": 0.01,
          "unit": "million_input_tokens",
          "sourceText": "$0.01 cached input per 1M tokens"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.60 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "FAQ says 128K tokens; another block says 131.1k tokens"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual text model; exact language list/count not published on page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "function-calling supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/gpt-oss-20b",
      "publicName": "OpenAI gpt-oss-20b",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.07 input / $0.04 cached input / $0.30 output per 1M tokens on serverless.",
      "limitsSummary": "131.1k token context on model page.",
      "regionSummary": "Serverless plus on-demand deployment.",
      "languagesSummary": "General multilingual text model; exact language list/count not published on page.",
      "notes": "Useful low-cost stable-picker option, but model page is internally inconsistent: FAQ says function-calling support exists, while Supported Functionality says function calling not supported.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/gpt-oss-20b",
        "https://docs.fireworks.ai/llms-full.txt",
        "https://fireworks.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.07,
          "unit": "million_input_tokens",
          "sourceText": "$0.07 input per 1M tokens"
        },
        {
          "amountUsd": 0.04,
          "unit": "million_input_tokens",
          "sourceText": "$0.04 cached input per 1M tokens"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_output_tokens",
          "sourceText": "$0.30 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131100,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Length 131.1k tokens"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual text model; exact language list/count not published on page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "function-calling conflict in source"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "fireworks-ai",
      "providerName": "Fireworks AI",
      "service": "llm",
      "modelId": "accounts/fireworks/models/kimi-k2-thinking",
      "publicName": "Kimi K2 Thinking",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.60 input / $0.30 cached input / $2.50 output per 1M tokens on serverless.",
      "limitsSummary": "256k context on model page; max output 4096 tokens by default according to FAQ text.",
      "regionSummary": "Serverless plus on-demand deployment.",
      "languagesSummary": "General multilingual reasoning model; exact language count not published on page.",
      "notes": "Advanced reasoning specialist. Good for an advanced picker, but not necessary in a default mobile voice picker if Kimi K2.5 is already exposed.",
      "officialSources": [
        "https://fireworks.ai/models/fireworks/kimi-k2-thinking",
        "https://docs.fireworks.ai/guides/reasoning"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.60 input per 1M tokens"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "$0.30 cached input per 1M tokens"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "$2.50 output per 1M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "maximum context length is 256k tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "other",
          "scope": "model",
          "sourceText": "maximum output of 4096 tokens per completion by default"
        }
      ],
      "languageSupport": {
        "rawText": "General multilingual reasoning model; exact language list/count not published on page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "reasoning-specialized"
        ]
      }
    }
  ),
]);
