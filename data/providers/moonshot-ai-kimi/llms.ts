import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2.5",
      "publicName": "Kimi K2.5",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.10/M cached input, $0.60/M uncached input, $3.00/M output.",
      "limitsSummary": "256k context. Streaming supported. Thinking enabled by default and can be disabled per request. Some sampling params are fixed and cannot be modified.",
      "regionSummary": "No public region pinning found. Served on international platform at api.moonshot.ai.",
      "languagesSummary": "Official quickstart says Kimi is proficient in Chinese and English; broader language coverage not formally enumerated.",
      "notes": "Native multimodal model. Supports text + image + video input, tool calling, JSON mode, partial mode, context caching, and web search. Good stable picker candidate.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat",
        "https://platform.moonshot.ai/docs/guide/kimi-k2-5-quickstart",
        "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "cache hit input price"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "cache miss input price"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context 256k / 262,144 tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Quickstart system prompt says Kimi is proficient in Chinese and English conversations.",
        "isMultilingual": true,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese",
          "English"
        ],
        "notes": [
          "officially stated for chat persona, not a full language support matrix"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-0905-preview",
      "publicName": "Kimi K2 0905 Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official public pricing present on chat pricing page; search snippet did not expose a stable exact price tuple in the sources I reviewed, so treat pricing as dynamic/live-read from docs.",
      "limitsSummary": "256k context. No vision support. Preview-branded.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Latest K2 preview model before K2.5. Released 2025-09-05 per official docs. Do not treat as stable picker default because preview status is explicit in the model ID.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/guide/agent-support",
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length 256k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-0711-preview",
      "publicName": "Kimi K2 0711 Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15/M cached input, $0.60/M uncached input, $2.50/M output.",
      "limitsSummary": "128k context. No vision support.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Older preview model. Public but not suitable for a stable consumer picker.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "cache hit input price"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "cache miss input price"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context length 128k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-turbo-preview",
      "publicName": "Kimi K2 Turbo Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15/M cached input, $1.15/M uncached input, $8.00/M output.",
      "limitsSummary": "256k context. 60\u2013100 tokens/sec output speed per docs. No vision support.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Official docs say it always aligns with the latest K2 preview. Useful for live discovery, but the 'preview' suffix makes it a weak stable picker candidate.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/guide/kimi-k2-quickstart",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "cache hit input price"
        },
        {
          "amountUsd": 1.15,
          "unit": "million_input_tokens",
          "sourceText": "cache miss input price"
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context 256k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-thinking",
      "publicName": "Kimi K2 Thinking",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15/M cached input, $0.60/M uncached input, $2.50/M output.",
      "limitsSummary": "256k context. Thinking-focused. Supports multi-step tool use. No vision support.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Released 2025-11-06 per official docs. Strong candidate for an 'advanced reasoning' picker entry.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/guide/use-kimi-k2-thinking-model",
        "https://platform.moonshot.ai/docs/guide/agent-support",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "cache hit input price"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "cache miss input price"
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context 256k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-thinking-turbo",
      "publicName": "Kimi K2 Thinking Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.15/M cached input, $1.15/M uncached input, $8.00/M output.",
      "limitsSummary": "256k context. High-speed thinking model; docs describe 60\u2013100 tokens/sec class for turbo variants.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Viable curated 'fast reasoning' entry if you want a second reasoning picker option.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction",
        "https://platform.moonshot.ai/docs/guide/kimi-k2-quickstart",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.15,
          "unit": "million_input_tokens",
          "sourceText": "cache hit input price"
        },
        {
          "amountUsd": 1.15,
          "unit": "million_input_tokens",
          "sourceText": "cache miss input price"
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 262144,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context 256k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-8k",
      "publicName": "Moonshot v1 8k",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.20/M input, $2.00/M output.",
      "limitsSummary": "8192 total context/output budget envelope.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Legacy text model family; still public but superseded for most app-facing use cases.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "input price"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "8,192 tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-32k",
      "publicName": "Moonshot v1 32k",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$1.00/M input, $3.00/M output.",
      "limitsSummary": "32768 total context/output budget envelope.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Legacy text model family.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "input price"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "32,768 tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-128k",
      "publicName": "Moonshot v1 128k",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$2.00/M input, $5.00/M output.",
      "limitsSummary": "131072 total context/output budget envelope.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Legacy text model family.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/pricing/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "input price"
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "output price"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "131,072 tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-auto",
      "publicName": "Moonshot v1 Auto",
      "aliases": [],
      "status": "Unknown",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing resolution behavior not clearly documented in the sources reviewed.",
      "limitsSummary": "Model is listed in the chat API but routing behavior is not explained in the sources reviewed.",
      "regionSummary": "International platform.",
      "languagesSummary": "Unknown.",
      "notes": "I would not expose this in a stable picker because the 'auto' routing target is not explicitly documented in the reviewed sources.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/api/estimate"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "dynamic routing behavior undocumented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-8k-vision-preview",
      "publicName": "Moonshot v1 8k Vision Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Vision pricing follows the moonshot-v1 pricing family; exact token cost depends on total tokens consumed.",
      "limitsSummary": "8k context family. Accepts image input. Vision request body should stay under 100MB.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Preview vision model. Not a stable picker candidate when kimi-k2.5 exists.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "8k family"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-32k-vision-preview",
      "publicName": "Moonshot v1 32k Vision Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Vision pricing follows the moonshot-v1 pricing family; exact token cost depends on total tokens consumed.",
      "limitsSummary": "32k context family. Accepts image input. Vision request body should stay under 100MB.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Preview vision model. Not a stable picker candidate when kimi-k2.5 exists.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "32k family"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "moonshot-v1-128k-vision-preview",
      "publicName": "Moonshot v1 128k Vision Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Vision pricing follows the moonshot-v1 pricing family; exact token cost depends on total tokens consumed.",
      "limitsSummary": "128k context family. Accepts image input. Vision request body should stay under 100MB.",
      "regionSummary": "International platform.",
      "languagesSummary": "No formal language matrix found.",
      "notes": "Preview vision model. Not a stable picker candidate when kimi-k2.5 exists.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/api/chat",
        "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k family"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-latest",
      "publicName": "kimi-latest",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Deprecated; do not price or expose.",
      "limitsSummary": "Officially discontinued 2026-01-28.",
      "regionSummary": "International platform.",
      "languagesSummary": "Unknown.",
      "notes": "Do not expose. Official docs say it is no longer maintained or supported.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-thinking-preview",
      "publicName": "kimi-thinking-preview",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Deprecated; do not price or expose.",
      "limitsSummary": "Officially discontinued 2025-11-11.",
      "regionSummary": "International platform.",
      "languagesSummary": "Unknown.",
      "notes": "Do not expose. Official docs say it is no longer maintained or supported.",
      "officialSources": [
        "https://platform.moonshot.ai/docs/introduction"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated"
        ]
      }
    }
  ),
]);
