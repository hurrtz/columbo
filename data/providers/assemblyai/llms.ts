import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-opus-4-6",
      "publicName": "Claude Opus 4.6",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$5.00 / 1M input tokens; $25.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; context window documented only as under 200k tokens via LLM Gateway.",
      "regionSummary": "US & EU in AssemblyAI LLM Gateway.",
      "languagesSummary": "General-purpose routed LLM; language coverage not separately documented by AssemblyAI.",
      "notes": "Routed Anthropic model. Streamed SSE is not documented for Claude in AssemblyAI Gateway.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_input_tokens",
          "sourceText": "$5.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 25.0,
          "unit": "million_output_tokens",
          "sourceText": "$25.00 / 1m tokens (output)"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "~",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "currently support context windows under 200k tokens via the LLM Gateway"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown in AssemblyAI docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "routed-model",
          "language-coverage-not-normalized-by-assemblyai"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-sonnet-4-6",
      "publicName": "Claude Sonnet 4.6",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 / 1M input tokens; $15.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; other context-window details not documented.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Current routed Claude model in AssemblyAI Gateway.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$15.00 / 1m tokens (output)"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown in AssemblyAI docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "routed-model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-opus-4-5-20251101",
      "publicName": "Claude Opus 4.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$5.00 / 1M input tokens; $25.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; context window documented only as under 200k tokens via LLM Gateway.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Routed Anthropic model.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_input_tokens",
          "sourceText": "$5.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 25.0,
          "unit": "million_output_tokens",
          "sourceText": "$25.00 / 1m tokens (output)"
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "~",
          "value": 200000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "currently support context windows under 200k tokens via the LLM Gateway"
        }
      ],
      "languageSupport": {
        "rawText": "Unknown in AssemblyAI docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "routed-model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-sonnet-4-5-20250929",
      "publicName": "Claude 4.5 Sonnet",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 / 1M input tokens; $15.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; AssemblyAI examples often use this model.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Likely the safest stable Claude picker entry in AssemblyAI Gateway as of 2026-03-24.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$15.00 / 1m tokens (output)"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown in AssemblyAI docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "routed-model",
          "good-stable-picker-candidate"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-haiku-4-5-20251001",
      "publicName": "Claude 4.5 Haiku",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.00 / 1M input tokens; $5.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Pricing page calls this a legacy model, but AssemblyAI\u2019s available-model list still includes it.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "$5.00 / 1m tokens (output)"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown in AssemblyAI docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-labeled-on-pricing-page"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-opus-4-20250514",
      "publicName": "Claude 4 Opus",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$15.00 / 1M input tokens; $75.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Very expensive routed model in this gateway.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 15.0,
          "unit": "million_input_tokens",
          "sourceText": "$15.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 75.0,
          "unit": "million_output_tokens",
          "sourceText": "$75.00 / 1m tokens (output)"
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
          "routed-model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-sonnet-4-20250514",
      "publicName": "Claude 4 Sonnet",
      "aliases": [
        "anthropic/claude-sonnet-4-20250514",
        "aai.LemurModel.claude_sonnet_4_20250514"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$3.00 / 1M input tokens; $15.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Explicitly documented in LeMUR migration guide as canonical replacement for provider-prefixed/LeMUR aliases.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/migration-from-lemur"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$15.00 / 1m tokens (output)"
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
          "canonical-id-documented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "claude-3-haiku-20240307",
      "publicName": "Claude 3.0 Haiku",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.25 / 1M input tokens; $1.25 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU until retirement.",
      "languagesSummary": "Unknown.",
      "notes": "AssemblyAI docs say Anthropic will retire this model on 2026-04-20; do not use for a stable picker.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.25,
          "unit": "million_input_tokens",
          "sourceText": "$0.25 / 1m tokens (Input)"
        },
        {
          "amountUsd": 1.25,
          "unit": "million_output_tokens",
          "sourceText": "$1.25 / 1m tokens (output)"
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
          "retires-2026-04-20"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-5.2",
      "publicName": "GPT-5.2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.75 / 1M input tokens; $14.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE streaming supported on OpenAI models.",
      "regionSummary": "US only in AssemblyAI Gateway.",
      "languagesSummary": "Unknown in AssemblyAI docs.",
      "notes": "Routed OpenAI model. Not available in EU endpoint.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.75,
          "unit": "million_input_tokens",
          "sourceText": "$1.75 / 1m tokens (Input)"
        },
        {
          "amountUsd": 14.0,
          "unit": "million_output_tokens",
          "sourceText": "$14.00 / 1m tokens (output)"
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
          "openai-family",
          "sse-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-5.1",
      "publicName": "GPT-5.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.25 / 1M input tokens; $10.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE supported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Routed OpenAI model.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "$1.25 / 1m tokens (Input)"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "$10.00 / 1m tokens (output)"
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
          "openai-family",
          "sse-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-5",
      "publicName": "GPT-5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.25 / 1M input tokens; $10.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE supported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Good stable OpenAI picker candidate in AssemblyAI Gateway.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "$1.25 / 1m tokens (Input)"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "$10.00 / 1m tokens (output)"
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
          "openai-family",
          "stable-picker-candidate"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-5-mini",
      "publicName": "GPT-5 mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.25 / 1M input tokens; $2.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE supported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Cost/performance OpenAI picker candidate.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.25,
          "unit": "million_input_tokens",
          "sourceText": "$0.25 / 1m tokens (Input)"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "$2.00 / 1m tokens (output)"
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
          "openai-family",
          "sse-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-5-nano",
      "publicName": "GPT-5 nano",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.05 / 1M input tokens; $0.40 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE supported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Cheapest OpenAI-family picker candidate.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "$0.05 / 1m tokens (Input)"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "$0.40 / 1m tokens (output)"
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
          "openai-family",
          "sse-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-4.1",
      "publicName": "GPT-4.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$2.00 / 1M input tokens; $8.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; SSE supported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Still documented in AssemblyAI Gateway and supports structured outputs.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/api-reference/llm-gateway/create-chat-completion",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "$2.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "$8.00 / 1m tokens (output)"
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
          "openai-family",
          "sse-supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-oss-120b",
      "publicName": "gpt-oss-120b",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.15 / 1M input tokens; $0.60 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; AssemblyAI docs say structured outputs are not supported by gpt-oss models.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Open-weight OpenAI-family model in AssemblyAI Gateway; structured outputs unsupported.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/structured-outputs",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "$0.15 / 1m tokens (Input)"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.60 / 1m tokens (output)"
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
          "gpt-oss",
          "no-structured-outputs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gpt-oss-20b",
      "publicName": "gpt-oss-20b",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.07 / 1M input tokens; $0.30 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies; structured outputs unsupported.",
      "regionSummary": "US only.",
      "languagesSummary": "Unknown.",
      "notes": "Cheapest non-preview LLM in the gateway; lower capability tier.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/structured-outputs",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.07,
          "unit": "million_input_tokens",
          "sourceText": "$0.07 / 1m tokens (Input)"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_output_tokens",
          "sourceText": "$0.30 / 1m tokens (output)"
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
          "gpt-oss",
          "no-structured-outputs"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "chatgpt-4o",
      "publicName": "ChatGPT-4o",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$5.00 / 1M input tokens; $15.00 / 1M output tokens.",
      "limitsSummary": "AssemblyAI pricing page lists it, but LLM Gateway Overview does not list a canonical model ID for it.",
      "regionSummary": "Likely US only if available, but AssemblyAI docs do not confirm this model in the canonical list.",
      "languagesSummary": "Unknown.",
      "notes": "Do not expose in stable picker unless AssemblyAI adds it to the canonical available-model list or API returns it in live discovery.",
      "officialSources": [
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/overview"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 5.0,
          "unit": "million_input_tokens",
          "sourceText": "$5.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$15.00 / 1m tokens (output)"
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
          "pricing-page-only-conflict"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gemini-3-pro-preview",
      "publicName": "Gemini 3 Pro Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$2.00 / 1M input tokens; $12.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Preview model; avoid stable picker.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "$2.00 / 1m tokens (Input)"
        },
        {
          "amountUsd": 12.0,
          "unit": "million_output_tokens",
          "sourceText": "$12.00 / 1m tokens (output)"
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
          "preview"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gemini-3-flash-preview",
      "publicName": "Gemini 3 Flash Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.50 / 1M input tokens; $3.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Preview model; avoid stable picker.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.5,
          "unit": "million_input_tokens",
          "sourceText": "$0.50 / 1m tokens (Input)"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "$3.00 / 1m tokens (output)"
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
          "preview"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gemini-2.5-pro",
      "publicName": "Gemini 2.5 Pro",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$1.25 / 1M input tokens; $10.00 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Strong stable Gemini picker candidate.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "$1.25 / 1m tokens (Input)"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "$10.00 / 1m tokens (output)"
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
          "stable-picker-candidate"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gemini-2.5-flash",
      "publicName": "Gemini 2.5 Flash",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.30 / 1M input tokens; $2.50 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Good cost/speed Gemini picker candidate.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "$0.30 / 1m tokens (Input)"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "$2.50 / 1m tokens (output)"
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
          "stable-picker-candidate"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "llm",
      "modelId": "gemini-2.5-flash-lite",
      "publicName": "Gemini 2.5 Flash-Lite",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.10 / 1M input tokens; $0.40 / 1M output tokens.",
      "limitsSummary": "Per-model RPM applies.",
      "regionSummary": "US & EU.",
      "languagesSummary": "Unknown.",
      "notes": "Lowest-cost stable Gemini picker candidate.",
      "officialSources": [
        "https://www.assemblyai.com/docs/llm-gateway/overview",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/docs/llm-gateway/cloud-endpoints-and-data-residency"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10 / 1m tokens (Input)"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "$0.40 / 1m tokens (output)"
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
          "stable-picker-candidate"
        ]
      }
    }
  ),
]);
