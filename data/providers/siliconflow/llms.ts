import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "llm",
      "modelId": "deepseek-ai/DeepSeek-V3.2",
      "publicName": "DeepSeek-V3.2",
      "aliases": [
        "DeepSeek-V3.2"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.27 / 1M input tokens and $0.42 / 1M output tokens.",
      "limitsSummary": "164K context length, 164K max tokens on the public model page.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No official language list found on SiliconFlow's model page.",
      "notes": "Good stable general-purpose chat candidate. Public model page shows JSON Mode and Tools supported. OpenAI-compatible chat endpoint available provider-wide.",
      "officialSources": [
        "https://www.siliconflow.com/models/deepseek-v3-2",
        "https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions",
        "https://docs.siliconflow.com/en/userguide/quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.27,
          "unit": "million_input_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.27 / 0.42"
        },
        {
          "amountUsd": 0.42,
          "unit": "million_output_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.27 / 0.42"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 164000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length 164K"
        }
      ],
      "languageSupport": {
        "rawText": "No provider-published language list found on the SiliconFlow model page.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "llm",
      "modelId": "deepseek-ai/DeepSeek-R1",
      "publicName": "DeepSeek-R1",
      "aliases": [
        "DeepSeek-R1",
        "DeepSeek-R1-0528 (described as current model revision on model page)"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.50 / 1M input tokens and $2.18 / 1M output tokens.",
      "limitsSummary": "Public model page shows pricing and availability; context window is not fully visible in the captured lines here, but SiliconFlow positions it as a current serverless model.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No official SiliconFlow language list found on the model page.",
      "notes": "Reasoning-focused model page says the current served variant is DeepSeek-R1-0528. Good stable reasoning picker entry.",
      "officialSources": [
        "https://www.siliconflow.com/models/deepseek-r1",
        "https://docs.siliconflow.com/en/release-notes/overview",
        "https://docs.siliconflow.com/en/userguide/quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.5 / 2.18"
        },
        {
          "amountUsd": 2.18,
          "unit": "million_output_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.5 / 2.18"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No provider-published language list found on the SiliconFlow model page.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "llm",
      "modelId": "Qwen/Qwen3-32B",
      "publicName": "Qwen3-32B",
      "aliases": [
        "Qwen3-32B"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.14 / 1M input tokens and $0.57 / 1M output tokens.",
      "limitsSummary": "131K context length and 131K max tokens on the public model page.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "No explicit language list on the SiliconFlow model page.",
      "notes": "Attractive stable mid-price LLM for general chat. Public model page says JSON Mode and Tools are supported.",
      "officialSources": [
        "https://www.siliconflow.com/models/qwen3-32b",
        "https://docs.siliconflow.com/en/userguide/guides/function-calling",
        "https://docs.siliconflow.com/en/userguide/quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.14,
          "unit": "million_input_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.14 / 0.57"
        },
        {
          "amountUsd": 0.57,
          "unit": "million_output_tokens",
          "sourceText": "Per 1M Tokens (input/output): 0.14 / 0.57"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length 131K"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list on the SiliconFlow model page.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "llm",
      "modelId": "moonshotai/Kimi-K2.5",
      "publicName": "Kimi-K2.5",
      "aliases": [
        "Kimi-K2.5"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.23 / 1M input tokens and $3.00 / 1M output tokens.",
      "limitsSummary": "Public model page says 256K context in prose; SiliconFlow comparison page shows 262K total context and 262K max output.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "The public model page describes it as native multimodal; no exact language list is provided on SiliconFlow's page.",
      "notes": "Viable premium picker entry when multimodal/agentic capability matters. More expensive on output than the other stable candidates here.",
      "officialSources": [
        "https://www.siliconflow.com/models/kimi-k2-5",
        "https://www.siliconflow.com/models/compare/kimi-k2-instruct-vs-kimi-k2-5",
        "https://docs.siliconflow.com/en/userguide/quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.23,
          "unit": "million_input_tokens",
          "sourceText": "Input $0.23 / M Tokens"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "Output $3.0 / M Tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 262000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Comparison page shows Total Context: 262K and Max output: 262K; model page prose says 256K context"
        }
      ],
      "languageSupport": {
        "rawText": "No exact language list provided on SiliconFlow's model page.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "siliconflow",
      "providerName": "Siliconflow",
      "service": "llm",
      "modelId": "Qwen/Qwen3-Omni-30B-A3B-Instruct",
      "publicName": "Qwen3-Omni-30B-A3B-Instruct",
      "aliases": [
        "Qwen3-Omni-30B-A3B-Instruct"
      ],
      "status": "Deprecated",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "A comparison page captured $0.10 / 1M input tokens and $0.40 / 1M output tokens before deprecation.",
      "limitsSummary": "Public model page marks it Deprecated and shows 66K context length / 66K max tokens.",
      "regionSummary": "No model-specific region split found; provider-level mainland China split applies.",
      "languagesSummary": "SiliconFlow blog content described multilingual support, but the official model page itself in accessible lines did not provide a structured language list.",
      "notes": "Do not place in a stable picker. Deprecated on the public model page and also listed in March 5, 2026 release-note deprecations.",
      "officialSources": [
        "https://www.siliconflow.com/models/qwen3-omni-30b-a3b-instruct",
        "https://docs.siliconflow.com/en/release-notes/overview",
        "https://www.siliconflow.com/models/compare/qwen3-30b-a3b-vs-qwen3-omni-30b-a3b-instruct"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "Comparison page: Input $0.1 / M Tokens"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "Comparison page: Output $0.4 / M Tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 66000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length 66K"
        }
      ],
      "languageSupport": {
        "rawText": "No structured language list on the captured model page lines.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated",
          "unknown-by-provider-docs"
        ]
      }
    }
  ),
]);
