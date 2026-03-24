import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "llm",
      "modelId": "moonshotai/Kimi-K2.5",
      "publicName": "Kimi K2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.50 / 1M input tokens; $2.80 / 1M output tokens.",
      "limitsSummary": "262144 context tokens documented on serverless models page.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown exact language count. Multimodal/vision capability documented.",
      "notes": "Together-recommended for chat, reasoning, coding agents, and vision. Supports instant and thinking modes within one model family.",
      "officialSources": [
        "https://docs.together.ai/docs/serverless-models",
        "https://docs.together.ai/docs/recommended-models",
        "https://docs.together.ai/docs/kimi-k2.5-quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "Serverless models page lists $0.50 input pricing."
        },
        {
          "amountUsd": 2.8,
          "unit": "million_output_tokens",
          "sourceText": "Serverless models page lists $2.80 output pricing."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Serverless models page lists context length 262144."
        }
      ],
      "languageSupport": {
        "rawText": "Kimi K2.5 is documented as a native multimodal model with vision and language understanding.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "vision-capable",
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "llm",
      "modelId": "openai/gpt-oss-20b",
      "publicName": "GPT-OSS 20B",
      "aliases": [
        "gpt-oss-20B"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.05 / 1M input tokens; $0.20 / 1M output tokens.",
      "limitsSummary": "128000 context tokens documented on serverless models page.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown exact language count.",
      "notes": "Together-recommended 'Small & Fast' option. Changelog and quickstart use the canonical lowercase namespaced ID.",
      "officialSources": [
        "https://docs.together.ai/docs/serverless-models",
        "https://docs.together.ai/docs/recommended-models",
        "https://docs.together.ai/docs/gpt-oss",
        "https://docs.together.ai/docs/changelog"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "Serverless models page lists $0.05 input pricing."
        },
        {
          "amountUsd": 0.2,
          "unit": "million_output_tokens",
          "sourceText": "Serverless models page lists $0.20 output pricing."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Serverless models page lists context length 128000."
        }
      ],
      "languageSupport": {
        "rawText": "No exact Together language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "llm",
      "modelId": "openai/gpt-oss-120b",
      "publicName": "GPT-OSS 120B",
      "aliases": [
        "gpt-oss-120B"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.15 / 1M input tokens; $0.60 / 1M output tokens.",
      "limitsSummary": "128000 context tokens documented on serverless models page.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown exact language count.",
      "notes": "Together-recommended 'Medium General Purpose' option.",
      "officialSources": [
        "https://docs.together.ai/docs/serverless-models",
        "https://docs.together.ai/docs/recommended-models",
        "https://docs.together.ai/docs/gpt-oss",
        "https://docs.together.ai/docs/changelog"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "Serverless models page lists $0.15 input pricing."
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "Serverless models page lists $0.60 output pricing."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Serverless models page lists context length 128000."
        }
      ],
      "languageSupport": {
        "rawText": "No exact Together language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "llm",
      "modelId": "zai-org/GLM-5",
      "publicName": "GLM-5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.00 / 1M input tokens; $3.20 / 1M output tokens.",
      "limitsSummary": "202752 context tokens documented on serverless models page.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown exact language count.",
      "notes": "Together-recommended for function calling.",
      "officialSources": [
        "https://docs.together.ai/docs/serverless-models",
        "https://docs.together.ai/docs/recommended-models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "Serverless models page lists $1.00 input pricing."
        },
        {
          "amountUsd": 3.2,
          "unit": "million_output_tokens",
          "sourceText": "Serverless models page lists $3.20 output pricing."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 202752,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Serverless models page lists context length 202752."
        }
      ],
      "languageSupport": {
        "rawText": "No exact Together language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "exact language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "together-ai",
      "providerName": "Together AI",
      "service": "llm",
      "modelId": "MiniMaxAI/MiniMax-M2.5",
      "publicName": "MiniMax M2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 / 1M input tokens; $0.06 / 1M cached input tokens; $1.20 / 1M output tokens.",
      "limitsSummary": "228700 context tokens documented on serverless models page.",
      "regionSummary": "No per-model region split documented.",
      "languagesSummary": "Unknown exact language count.",
      "notes": "Cached-input discount is explicit and public.",
      "officialSources": [
        "https://docs.together.ai/docs/serverless-models",
        "https://docs.together.ai/docs/changelog"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "Serverless models page lists $0.30 input pricing."
        },
        {
          "amountUsd": 0.06,
          "unit": "million_input_tokens",
          "sourceText": "Cached input tokens are billed at $0.06 per 1M."
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "Serverless models page lists $1.20 output pricing."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 228700,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Serverless models page lists context length 228700."
        }
      ],
      "languageSupport": {
        "rawText": "No exact Together language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "exact language list unknown"
        ]
      }
    }
  ),
]);
