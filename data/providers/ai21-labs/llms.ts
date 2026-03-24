import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "ai21-labs",
      "providerName": "AI21 Labs",
      "service": "llm",
      "modelId": "jamba-large-1.7-2025-07",
      "publicName": "Jamba Large",
      "aliases": [
        "jamba-large",
        "jamba-large-1.7"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "AI21 pricing page lists Jamba Large at $2 / 1M input tokens and $8 / 1M output tokens on the AI21 platform. Pricing is documented at the family level rather than explicitly per dated snapshot; applied here to the current hosted snapshot.",
      "limitsSummary": "256K context, max 4096 output tokens, 10 RPS / 200 RPM. SSE token streaming is documented. Batch support exists via a separate Batch API, but current access is enterprise SaaS only.",
      "regionSummary": "Public SaaS region split is not published. AI21 documents private deployment in customer VPCs and self-managed VPC/on-prem options. Privacy policy says personal data may be processed on servers in the United States.",
      "languagesSummary": "Officially supports 9 languages: English, Spanish, French, Portuguese, Italian, Dutch, German, Arabic, Hebrew. AI21\u2019s limitations text also says the family is trained primarily on English text and is best suited to English tasks.",
      "notes": "Text-in/text-out only; no public vision or audio-input support is documented for hosted Jamba. Function calling is available. Hosted AI21 API is OpenAI-like but not explicitly documented as OpenAI-compatible. SSE streaming is documented, but no dedicated realtime WebSocket session API is documented. Batch exists but is enterprise-gated.",
      "officialSources": [
        "https://docs.ai21.com/docs/jamba-foundation-models",
        "https://www.ai21.com/pricing/",
        "https://docs.ai21.com/docs/rate-limits",
        "https://docs.ai21.com/reference/jamba-1-6-api-ref",
        "https://docs.ai21.com/reference/jamba-api-response",
        "https://docs.ai21.com/docs/function-calling",
        "https://docs.ai21.com/docs/jamba-batch-api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "AI21 pricing page lists Jamba Large at $2 per 1M input tokens."
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "AI21 pricing page lists Jamba Large at $8 per 1M output tokens."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Jamba docs list Jamba Large with a 256K token context window."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 4096,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Chat request reference says Jamba max_tokens may not exceed 4096."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "<=",
          "value": 200,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Rate-limits page lists 200 RPM for Jamba Large."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10,
          "unit": "other",
          "scope": "account",
          "sourceText": "Rate-limits page lists 10 RPS for Jamba Large."
        }
      ],
      "languageSupport": {
        "rawText": "Officially supported languages are English, Spanish, French, Portuguese, Italian, Dutch, German, Arabic, and Hebrew. AI21 also warns that the family is trained primarily on English text and is best suited to English tasks.",
        "isMultilingual": true,
        "languageCount": 9,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "French",
          "Portuguese",
          "Italian",
          "Dutch",
          "German",
          "Arabic",
          "Hebrew"
        ],
        "notes": [
          "english-optimized",
          "text-only",
          "no-audio-input",
          "no-vision-input"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ai21-labs",
      "providerName": "AI21 Labs",
      "service": "llm",
      "modelId": "jamba-mini-2-2026-01",
      "publicName": "Jamba Mini",
      "aliases": [
        "jamba-mini",
        "jamba-mini-2"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "AI21 pricing page lists Jamba Mini at $0.2 / 1M input tokens and $0.4 / 1M output tokens on the AI21 platform. Pricing is documented at the family level rather than explicitly per dated snapshot; applied here to the current hosted snapshot.",
      "limitsSummary": "256K context, max 4096 output tokens, 10 RPS / 200 RPM. SSE token streaming is documented. Batch support exists via a separate Batch API, but current access is enterprise SaaS only.",
      "regionSummary": "Public SaaS region split is not published. AI21 documents private deployment in customer VPCs and self-managed VPC/on-prem options. Privacy policy says personal data may be processed on servers in the United States.",
      "languagesSummary": "Officially supports 9 languages: English, Spanish, French, Portuguese, Italian, Dutch, German, Arabic, Hebrew. AI21\u2019s limitations text also says the family is trained primarily on English text and is best suited to English tasks.",
      "notes": "Text-in/text-out only; no public vision or audio-input support is documented for hosted Jamba. Function calling is available. Hosted AI21 API is OpenAI-like but not explicitly documented as OpenAI-compatible. SSE streaming is documented, but no dedicated realtime WebSocket session API is documented. Batch exists but is enterprise-gated.",
      "officialSources": [
        "https://docs.ai21.com/docs/jamba-foundation-models",
        "https://www.ai21.com/pricing/",
        "https://docs.ai21.com/docs/rate-limits",
        "https://docs.ai21.com/reference/jamba-1-6-api-ref",
        "https://docs.ai21.com/reference/jamba-api-response",
        "https://docs.ai21.com/docs/function-calling",
        "https://docs.ai21.com/docs/jamba-batch-api"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "AI21 pricing page lists Jamba Mini at $0.2 per 1M input tokens."
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "AI21 pricing page lists Jamba Mini at $0.4 per 1M output tokens."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Jamba docs list Jamba Mini with a 256K token context window."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 4096,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Chat request reference says Jamba max_tokens may not exceed 4096."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "<=",
          "value": 200,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Rate-limits page lists 200 RPM for Jamba Mini."
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 10,
          "unit": "other",
          "scope": "account",
          "sourceText": "Rate-limits page lists 10 RPS for Jamba Mini."
        }
      ],
      "languageSupport": {
        "rawText": "Officially supported languages are English, Spanish, French, Portuguese, Italian, Dutch, German, Arabic, and Hebrew. AI21 also warns that the family is trained primarily on English text and is best suited to English tasks.",
        "isMultilingual": true,
        "languageCount": 9,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "Spanish",
          "French",
          "Portuguese",
          "Italian",
          "Dutch",
          "German",
          "Arabic",
          "Hebrew"
        ],
        "notes": [
          "english-optimized",
          "text-only",
          "no-audio-input",
          "no-vision-input"
        ]
      }
    }
  ),
]);
