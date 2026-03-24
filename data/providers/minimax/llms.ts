import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.7",
      "publicName": "MiniMax M2.7",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.30/M input tokens, $1.20/M output tokens; prompt caching read $0.06/M, write $0.375/M.",
      "limitsSummary": "204,800-token context; ~60 tps output speed guidance; 500 RPM / 20,000,000 TPM account rate limit.",
      "regionSummary": "Use api.minimax.io internationally or api.minimaxi.com in China for compatible APIs.",
      "languagesSummary": "General multilingual text model; official docs emphasize multilingual programming and broad complex-task support, but no enumerated language list.",
      "notes": "Best flagship general text model for stable picker. OpenAI-compatible and Anthropic-compatible. Prefer over deprecated direct text endpoint.",
      "officialSources": [
        "https://platform.minimax.io/docs/api-reference/text-openai-api",
        "https://platform.minimax.io/docs/guides/text-generation",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "MiniMax-M2.7 $0.3 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "MiniMax-M2.7 $1.2 / M tokens output"
        },
        {
          "amountUsd": 0.06,
          "unit": "other",
          "sourceText": "Prompt caching read $0.06 / M tokens"
        },
        {
          "amountUsd": 0.375,
          "unit": "other",
          "sourceText": "Prompt caching write $0.375 / M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 204800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 204,800"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Text API ... 500 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 20000000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Text API ... 20,000,000 TPM"
        }
      ],
      "languageSupport": {
        "rawText": "Official docs describe multilingual programming support but do not enumerate supported languages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "no enumerated language list"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.7-highspeed",
      "publicName": "MiniMax M2.7 Highspeed",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Main pay-as-you-go page: $0.60/M input and $2.40/M output. Anthropic caching page conflicts on input price.",
      "limitsSummary": "204,800-token context; ~100 tps output speed guidance; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list; positioned as same capability as M2.7 with faster inference.",
      "notes": "Suitable for stable picker where low latency matters. Price conflict: main pricing page shows $0.60/M input; Anthropic caching page shows $0.30/M input. Use main pricing page.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/text-generation",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/api-reference/anthropic-api-compatible-cache",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "Main pay-as-you-go page lists $0.6 / M tokens input"
        },
        {
          "amountUsd": 2.4,
          "unit": "million_output_tokens",
          "sourceText": "Main pay-as-you-go page lists $2.4 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 204800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 204,800"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 500,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Text API ... 500 RPM"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 20000000,
          "unit": "tokens_per_minute",
          "scope": "account",
          "sourceText": "Text API ... 20,000,000 TPM"
        }
      ],
      "languageSupport": {
        "rawText": "Same capability as M2.7, faster inference.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "same-capability-faster-variant"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.5",
      "publicName": "MiniMax M2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.30/M input, $1.20/M output; prompt caching read $0.03/M, write $0.375/M.",
      "limitsSummary": "204,800-token context; ~60 tps; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list.",
      "notes": "Strong value model; good stable picker entry.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/text-generation",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "$0.3 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "$1.2 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 204800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 204,800"
        }
      ],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
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
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.5-highspeed",
      "publicName": "MiniMax M2.5 Highspeed",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.60/M input, $2.40/M output.",
      "limitsSummary": "204,800-token context; ~100 tps; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list.",
      "notes": "Latency-oriented variant of M2.5.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/text-generation",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.6 / M tokens input"
        },
        {
          "amountUsd": 2.4,
          "unit": "million_output_tokens",
          "sourceText": "$2.4 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 204800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 204,800"
        }
      ],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "same-capability-faster-variant"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "M2-her",
      "publicName": "MiniMax M2-her",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.30/M input, $1.20/M output; no prompt caching pricing documented on the main pay-as-you-go page.",
      "limitsSummary": "64K context window; exposed through chat.completions-style calls.",
      "regionSummary": "OpenAI-compatible path documented.",
      "languagesSummary": "Dialogue model; no enumerated language list.",
      "notes": "Specialized roleplay/dialogue model. Good advanced picker entry, not the default general assistant model.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/text-chat",
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/models-intro"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "M2-her $0.3 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "M2-her $1.2 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "M2-her 64 K"
        }
      ],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dialogue-specialized",
          "roleplay-oriented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.1",
      "publicName": "MiniMax M2.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.30/M input, $1.20/M output.",
      "limitsSummary": "204,800-token context; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list.",
      "notes": "Publicly documented and priced, but older than M2.5/M2.7; hide from default stable picker unless legacy compatibility matters.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "$0.3 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "$1.2 / M tokens output"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-but-still-public"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2.1-highspeed",
      "publicName": "MiniMax M2.1 Highspeed",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.60/M input, $2.40/M output.",
      "limitsSummary": "204,800-token context; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list.",
      "notes": "Publicly documented and priced, but legacy relative to M2.5/M2.7.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.6 / M tokens input"
        },
        {
          "amountUsd": 2.4,
          "unit": "million_output_tokens",
          "sourceText": "$2.4 / M tokens output"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-but-still-public"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "minimax",
      "providerName": "Minimax",
      "service": "llm",
      "modelId": "MiniMax-M2",
      "publicName": "MiniMax M2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.30/M input, $1.20/M output.",
      "limitsSummary": "204,800-token context; 500 RPM / 20,000,000 TPM.",
      "regionSummary": "Same region split as other text models.",
      "languagesSummary": "No enumerated language list.",
      "notes": "Still public and priced, but older; keep behind advanced/legacy toggle.",
      "officialSources": [
        "https://platform.minimax.io/docs/guides/pricing-paygo",
        "https://platform.minimax.io/docs/guides/rate-limits",
        "https://platform.minimax.io/docs/release-notes/models"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "$0.3 / M tokens input"
        },
        {
          "amountUsd": 1.2,
          "unit": "million_output_tokens",
          "sourceText": "$1.2 / M tokens output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 204800,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "MiniMax-M2 204,800 context window"
        }
      ],
      "languageSupport": {
        "rawText": "No official enumerated language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy-but-still-public"
        ]
      }
    }
  ),
]);
