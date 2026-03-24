import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "openai/gpt-5-mini",
      "publicName": "GPT-5 mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.25 / 1M input tokens; $2.00 / 1M output tokens on Replicate.",
      "limitsSummary": "Current version docs show max_completion_tokens in schema; version-specific defaults visible at 4096, but treat that as version-level and subject to change. Supports image input on Replicate.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No Replicate model page language whitelist found; general LLM use.",
      "notes": "Official model. Suitable stable picker entry. GPT-5 family readme describes reasoning_effort and verbosity controls. Replicate API is not OpenAI-compatible despite model family name.",
      "officialSources": [
        "https://replicate.com/openai/gpt-5-mini",
        "https://replicate.com/openai/gpt-5-mini/api",
        "https://replicate.com/openai/gpt-5-mini/versions/ee1342634b9ffcd6c76f6ea5b8f3ca0964b3eb469fc552ad937aa214e6d20636/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.25,
          "unit": "million_input_tokens",
          "sourceText": "$0.25 per million input tokens"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "$2 per million output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Version-specific schema snippet shows max_completion_tokens default 4096"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly enumerated on Replicate page",
          "text output",
          "image input supported on Replicate schema"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "openai/gpt-5-nano",
      "publicName": "GPT-5 nano",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.05 / 1M input tokens; $0.40 / 1M output tokens on Replicate.",
      "limitsSummary": "Current version docs show max_completion_tokens in schema; version-specific defaults visible at 4096, but treat that as version-level and subject to change. Supports image input on Replicate.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No Replicate model page language whitelist found; general LLM use.",
      "notes": "Official model. Strong stable-picker entry for cheapest fast chat/fallback. GPT-5 family docs on Replicate expose reasoning_effort and verbosity controls.",
      "officialSources": [
        "https://replicate.com/openai/gpt-5-nano",
        "https://replicate.com/openai/gpt-5-nano/api",
        "https://replicate.com/openai/gpt-5-nano/versions/703cfac28ed78a58835754790a4597f007adea35041bc3d4dea62689c30e3cdf/api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "$0.05 per million input tokens"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "$0.40 per million output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Version-specific schema snippet shows max_completion_tokens default 4096"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly enumerated on Replicate page",
          "text output",
          "image input supported on Replicate schema"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "anthropic/claude-4.5-haiku",
      "publicName": "Claude Haiku 4.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1 / 1M input tokens; $5 / 1M output tokens on Replicate.",
      "limitsSummary": "Replicate page explicitly shows 200K token context window.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No Replicate language whitelist found.",
      "notes": "Official model. Good stable-picker choice for fast premium chat. Search snippet shows output pricing at 200,000 output tokens per $1 (= $5/1M output tokens).",
      "officialSources": [
        "https://replicate.com/anthropic/claude-4.5-haiku"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1 per million input tokens"
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "200,000 output tokens for $1 (inference: $5 per million output tokens)"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window: 200K tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly enumerated on Replicate page",
          "text output"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "anthropic/claude-4.5-sonnet",
      "publicName": "Claude Sonnet 4.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3 / 1M input tokens; $15 / 1M output tokens on Replicate page text.",
      "limitsSummary": "No Replicate context limit surfaced in the snippets I found.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No Replicate language whitelist found.",
      "notes": "Official model. Strong stable-picker choice for high-quality general chat/coding. Pricing came from Replicate page text rather than the top pricing snippet.",
      "officialSources": [
        "https://replicate.com/anthropic/claude-4.5-sonnet",
        "https://replicate.com/anthropic/claude-4.5-sonnet/readme"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "Pricing: consistent with Claude Sonnet 4 at $3/$15 per million tokens (input/output)"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "Pricing: consistent with Claude Sonnet 4 at $3/$15 per million tokens (input/output)"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly enumerated on Replicate page",
          "text output"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "google/gemini-2.5-flash",
      "publicName": "Gemini 2.5 Flash",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 / 1M input tokens; $2.50 / 1M output tokens on Replicate.",
      "limitsSummary": "Replicate page says up to ~1 million token context. Audio, image, and video input are documented on the Replicate page.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No language list surfaced on Replicate page.",
      "notes": "Official model. Particularly relevant to voice-first apps because Replicate\u2019s model page explicitly says it accepts text, images, audio, and video as inputs.",
      "officialSources": [
        "https://replicate.com/google/gemini-2.5-flash"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "3,333,333 tokens for $1 (inference: about $0.30 per million input tokens)"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "$2.50 per million output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "~",
          "value": 1000000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Works with extremely long inputs (up to ~1 million tokens)"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal input",
          "audio input documented on Replicate page",
          "text output"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "replicate",
      "providerName": "Replicate",
      "service": "llm",
      "modelId": "openai/gpt-4o-mini",
      "publicName": "GPT-4o mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.15 / 1M input tokens; $0.60 / 1M output tokens on Replicate.",
      "limitsSummary": "No Replicate context limit surfaced in the snippets I found.",
      "regionSummary": "No model-specific regional controls publicly documented on Replicate.",
      "languagesSummary": "No Replicate language list found.",
      "notes": "Official model. Useful lower-cost fallback and multimodal option; Replicate includes it in the vision-model collection and exposes a dedicated model page.",
      "officialSources": [
        "https://replicate.com/openai/gpt-4o-mini"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "$0.15 per million input tokens"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.60 per million output tokens"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No explicit Replicate language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly enumerated on Replicate page",
          "text output"
        ]
      }
    }
  ),
]);
