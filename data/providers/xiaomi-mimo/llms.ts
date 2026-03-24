import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "xiaomi-mimo",
      "providerName": "Xiaomi Mimo",
      "service": "llm",
      "modelId": "mimo-v2-flash",
      "publicName": "MiMo-V2-Flash",
      "aliases": [
        "MiMo-V2-Flash",
        "xiaomi_mimo/mimo-v2-flash",
        "xiaomimimo/mimo-v2-flash",
        "xiaomi/mimo-v2-flash"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Secondary-reported overseas API pricing: $0.10 / 1M input tokens, $0.01 / 1M cached input tokens, $0.30 / 1M output tokens. Earlier official Xiaomi blog snippet also said limited-time free.",
      "limitsSummary": "Official open-weight model page states 256K context length. Streaming is supported in LiteLLM integration docs.",
      "regionSummary": "No API-region split documentation found.",
      "languagesSummary": "General multilingual text model; official open-weight README reports multilingual benchmark coverage but no API language matrix.",
      "notes": "Best-supported stable API ID in public integrations. Canonical lower-case ID is inferred from LiteLLM and provider integrations; Xiaomi\u2019s own crawlable API docs do not expose a cleaner machine-readable model list.",
      "officialSources": [
        "https://mimo.xiaomi.com/blog/mimo-v2-flash",
        "https://github.com/XiaomiMiMo/MiMo-V2-Flash"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "overseas input: $0.1 / M tokens"
        },
        {
          "amountUsd": 0.01,
          "unit": "million_input_tokens",
          "sourceText": "overseas cached input: $0.01 / M tokens"
        },
        {
          "amountUsd": 0.3,
          "unit": "million_output_tokens",
          "sourceText": "overseas output: $0.3 / M tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "context window supports up to 256k length"
        }
      ],
      "languageSupport": {
        "rawText": "Official open-weight README reports multilingual evaluation including GlobalMMLU and INCLUDE, but no API language list.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "no public API language matrix found"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "xiaomi-mimo",
      "providerName": "Xiaomi Mimo",
      "service": "llm",
      "modelId": "mimo-v2-pro",
      "publicName": "MiMo-V2-Pro",
      "aliases": [
        "MiMo-V2-Pro"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official pricing: up to 256K context is $1 / 1M input and $3 / 1M output; 256K-1M context is $2 / 1M input and $6 / 1M output; cache read $0.20 / $0.40; cache write temporarily free.",
      "limitsSummary": "Official 1M-token context support.",
      "regionSummary": "No API-region split documentation found.",
      "languagesSummary": "No official API language list; positioned as flagship foundation model for agent workloads.",
      "notes": "Publicly API-accessible on Xiaomi\u2019s platform. Exact lowercase API model ID is a strong inference from Xiaomi naming conventions, but Xiaomi\u2019s crawlable docs did not expose a machine-readable model list.",
      "officialSources": [
        "https://mimo.xiaomi.com/mimo-v2-pro",
        "https://platform.xiaomimimo.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "MiMo-V2-Pro (up to 256K) $1"
        },
        {
          "amountUsd": 3.0,
          "unit": "million_output_tokens",
          "sourceText": "MiMo-V2-Pro (up to 256K) $3"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "MiMo-V2-Pro (256K-1M) $2"
        },
        {
          "amountUsd": 6.0,
          "unit": "million_output_tokens",
          "sourceText": "MiMo-V2-Pro (256K-1M) $6"
        },
        {
          "amountUsd": 0.2,
          "unit": "other",
          "sourceText": "Cache Read $0.20 per million tokens"
        },
        {
          "amountUsd": 0.4,
          "unit": "other",
          "sourceText": "Cache Read $0.40 per million tokens"
        },
        {
          "amountUsd": 0.0,
          "unit": "other",
          "sourceText": "MiMo Cache Write is temporarily free"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1000000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "supports up to 1M-token context"
        }
      ],
      "languageSupport": {
        "rawText": "No official API language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage undocumented in public API pages"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "xiaomi-mimo",
      "providerName": "Xiaomi Mimo",
      "service": "llm",
      "modelId": "mimo-v2-omni",
      "publicName": "MiMo-V2-Omni",
      "aliases": [
        "MiMo-V2-Omni"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Secondary-reported pricing: $0.40 / 1M input and $2 / 1M output, with 256K context. I did not find the same pricing table on a crawlable Xiaomi page.",
      "limitsSummary": "Officially supports image, video, audio, and text input; Xiaomi claims over 10 hours of continuous audio understanding.",
      "regionSummary": "No API-region split documentation found.",
      "languagesSummary": "No dedicated public STT language matrix found.",
      "notes": "Use as multimodal LLM, not as a clean standalone STT SKU. It clearly handles audio input, but Xiaomi has not publicly documented a dedicated transcription API surface.",
      "officialSources": [
        "https://mimo.xiaomi.com/mimo-v2-omni",
        "https://platform.xiaomimimo.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "million_input_tokens",
          "sourceText": "secondary reports quote MiMo-V2-Omni input pricing at $0.4 per million tokens"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "secondary reports quote MiMo-V2-Omni output pricing at $2 per million tokens"
        }
      ],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": ">=",
          "value": 36000,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "natively supports over 10 hours of continuous audio understanding"
        }
      ],
      "languageSupport": {
        "rawText": "No public standalone transcription language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "audio understanding present",
          "not a documented standalone STT model"
        ]
      }
    }
  ),
]);
