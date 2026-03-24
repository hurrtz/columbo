import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "deepseek",
      "providerName": "Deepseek",
      "service": "llm",
      "modelId": "deepseek-chat",
      "publicName": "DeepSeek Chat",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.028/M input cache-hit, $0.28/M input cache-miss, $0.42/M output.",
      "limitsSummary": "128K context. Default max output 4K, maximum 8K.",
      "regionSummary": "No region selector documented. Privacy policy says data may be processed/stored in the PRC.",
      "languagesSummary": "No official per-language list. Multilingual general LLM, but no API language matrix is published.",
      "notes": "Canonical stable public ID. Official docs say it currently maps to DeepSeek-V3.2 non-thinking mode. Can also enable thinking via the thinking parameter on chat completions. Supports JSON output, tool calls, chat prefix completion beta, and FIM beta.",
      "officialSources": [
        "https://api-docs.deepseek.com/",
        "https://api-docs.deepseek.com/quick_start/pricing",
        "https://api-docs.deepseek.com/api/create-chat-completion",
        "https://api-docs.deepseek.com/guides/thinking_mode",
        "https://api-docs.deepseek.com/guides/tool_calls"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.028,
          "unit": "million_input_tokens",
          "sourceText": "1M INPUT TOKENS (CACHE HIT) $0.028"
        },
        {
          "amountUsd": 0.28,
          "unit": "million_input_tokens",
          "sourceText": "1M INPUT TOKENS (CACHE MISS) $0.28"
        },
        {
          "amountUsd": 0.42,
          "unit": "million_output_tokens",
          "sourceText": "1M OUTPUT TOKENS $0.42"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "CONTEXT LENGTH 128K"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "MAX OUTPUT DEFAULT: 4K"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 8000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "MAXIMUM: 8K"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 128,
          "unit": "other",
          "scope": "model",
          "sourceText": "A max of 128 functions are supported."
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 600,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "If the request has not started inference after 10 minutes, the server will close the connection."
        }
      ],
      "languageSupport": {
        "rawText": "No official API language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list unknown",
          "no speech output",
          "general multilingual LLM inferred from product positioning, not from a formal API language matrix"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepseek",
      "providerName": "Deepseek",
      "service": "llm",
      "modelId": "deepseek-reasoner",
      "publicName": "DeepSeek Reasoner",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.14/M input cache-hit, $0.55/M input cache-miss, $2.19/M output.",
      "limitsSummary": "128K context. Default max output 32K, maximum 64K. Thinking output is exposed via reasoning_content.",
      "regionSummary": "No region selector documented. Privacy policy says data may be processed/stored in the PRC.",
      "languagesSummary": "No official per-language list. Multilingual general LLM, but no API language matrix is published.",
      "notes": "Canonical stable public ID. Official docs say it currently maps to DeepSeek-V3.2 thinking mode. Supports JSON output, tool calls, chat prefix completion beta. FIM beta is not supported. Several generation controls are ignored or unsupported in thinking mode.",
      "officialSources": [
        "https://api-docs.deepseek.com/",
        "https://api-docs.deepseek.com/quick_start/pricing",
        "https://api-docs.deepseek.com/guides/thinking_mode",
        "https://api-docs.deepseek.com/api/create-chat-completion"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.14,
          "unit": "million_input_tokens",
          "sourceText": "1M INPUT TOKENS (CACHE HIT) $0.14"
        },
        {
          "amountUsd": 0.55,
          "unit": "million_input_tokens",
          "sourceText": "1M INPUT TOKENS (CACHE MISS) $0.55"
        },
        {
          "amountUsd": 2.19,
          "unit": "million_output_tokens",
          "sourceText": "1M OUTPUT TOKENS $2.19"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "CONTEXT LENGTH 128K"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "max_tokens: Default to 32K"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "max_tokens: maximum to 64K"
        },
        {
          "metric": "session_duration_seconds",
          "comparator": "<=",
          "value": 600,
          "unit": "seconds",
          "scope": "streaming",
          "sourceText": "If the request has not started inference after 10 minutes, the server will close the connection."
        }
      ],
      "languageSupport": {
        "rawText": "No official API language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list unknown",
          "no speech output",
          "reasoning model with exposed reasoning_content"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "deepseek",
      "providerName": "Deepseek",
      "service": "llm",
      "modelId": "deepseek-coder",
      "publicName": "DeepSeek Coder (legacy alias)",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Unknown",
      "pricingSummary": "Unknown current pricing; not listed on the current supported-model pricing page.",
      "limitsSummary": "Unknown current limits; historical docs tied it to merged V2.5 behavior.",
      "regionSummary": "Same provider-level region/privacy caveats apply if still accepted.",
      "languagesSummary": "Not applicable beyond general code/text use.",
      "notes": "Historical public alias. On 2024-09-05 DeepSeek documented that deepseek-coder and deepseek-chat both pointed to DeepSeek-V2.5 for backward compatibility. It is not listed on the current pricing page that the docs identify as the source for currently supported models, so it should not be exposed in a stable picker.",
      "officialSources": [
        "https://api-docs.deepseek.com/updates",
        "https://api-docs.deepseek.com/quick_start/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Legacy alias; current support unclear.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "legacy alias",
          "do not expose in stable picker"
        ]
      }
    }
  ),
]);
