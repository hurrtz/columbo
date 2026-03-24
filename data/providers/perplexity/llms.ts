import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar",
      "publicName": "Sonar",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$1 / 1M input tokens, $1 / 1M output tokens, plus request fee by search context size: $5/$8/$12 per 1K requests for low/medium/high.",
      "limitsSummary": "128K context. Tier-based RPM: 50 at Tier 0 up to 4000 at Tier 4/5. Sonar service also inherits 50MB image limit, 50MB file limit, and 30 files/request.",
      "regionSummary": "Hosted via AWS in North America; no public region selection documented.",
      "languagesSummary": "No explicit generation-language list documented. Sonar search filters can target result languages; multilingual generation support is not enumerated.",
      "notes": "Best stable low-cost native picker entry. Web-grounded, non-reasoning. OpenAI-compatible via /chat/completions alias. Supports image/file inputs and streaming.",
      "officialSources": [
        "https://docs.perplexity.ai/docs/sonar/models/sonar",
        "https://docs.perplexity.ai/docs/getting-started/pricing",
        "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
        "https://docs.perplexity.ai/docs/sonar/quickstart",
        "https://docs.perplexity.ai/docs/sonar/media",
        "https://docs.perplexity.ai/docs/resources/faq"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "Sonar input tokens: $1 per 1M."
        },
        {
          "amountUsd": 1.0,
          "unit": "million_output_tokens",
          "sourceText": "Sonar output tokens: $1 per 1M."
        },
        {
          "amountUsd": 5.0,
          "unit": "request",
          "sourceText": "Low search-context request fee is $5 per 1K requests."
        },
        {
          "amountUsd": 8.0,
          "unit": "request",
          "sourceText": "Medium search-context request fee is $8 per 1K requests."
        },
        {
          "amountUsd": 12.0,
          "unit": "request",
          "sourceText": "High search-context request fee is $12 per 1K requests."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128K context length."
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 52428800,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "Maximum file size is 50MB per file."
        },
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 52428800,
          "unit": "bytes",
          "scope": "audio",
          "sourceText": "No public audio upload support documented."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": ">=",
          "value": 50,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Tier 0 sonar RPM is 50; higher tiers are higher."
        }
      ],
      "languageSupport": {
        "rawText": "Search-language filter supports ISO 639-1 codes and up to 10 languages per request; no model-language roster is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "search-filter multilingual",
          "generation languages not enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-pro",
      "publicName": "Sonar Pro",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$3 / 1M input tokens, $15 / 1M output tokens, plus request fee by context size: $6/$10/$14 per 1K. Pro Search mode raises request fee to $14/$18/$22 per 1K.",
      "limitsSummary": "128K context. Tier-based RPM: 50 at Tier 0 up to 4000 at Tier 4/5. Inherits Sonar media/file limits.",
      "regionSummary": "Hosted via AWS in North America; no public region selection documented.",
      "languagesSummary": "No explicit generation-language list documented. Search filters can target specific result languages.",
      "notes": "Best stable premium native picker entry. Search-grounded and suitable for harder retrieval/synthesis. `search_type=pro` is documented but should be treated as a mode, not a separate picker model.",
      "officialSources": [
        "https://docs.perplexity.ai/docs/sonar/models/sonar-pro",
        "https://docs.perplexity.ai/docs/getting-started/pricing",
        "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
        "https://docs.perplexity.ai/docs/sonar/quickstart",
        "https://docs.perplexity.ai/docs/sonar/media",
        "https://docs.perplexity.ai/docs/resources/faq"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "Sonar Pro input tokens: $3 per 1M."
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "Sonar Pro output tokens: $15 per 1M."
        },
        {
          "amountUsd": 6.0,
          "unit": "request",
          "sourceText": "Fast low-context request fee is $6 per 1K."
        },
        {
          "amountUsd": 10.0,
          "unit": "request",
          "sourceText": "Fast medium-context request fee is $10 per 1K."
        },
        {
          "amountUsd": 14.0,
          "unit": "request",
          "sourceText": "Fast high-context request fee is $14 per 1K."
        },
        {
          "amountUsd": 14.0,
          "unit": "request",
          "sourceText": "Pro Search low-context request fee is $14 per 1K."
        },
        {
          "amountUsd": 18.0,
          "unit": "request",
          "sourceText": "Pro Search medium-context request fee is $18 per 1K."
        },
        {
          "amountUsd": 22.0,
          "unit": "request",
          "sourceText": "Pro Search high-context request fee is $22 per 1K."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Sonar family is documented with 128K context."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": ">=",
          "value": 50,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Tier 0 sonar-pro RPM is 50; higher tiers are higher."
        }
      ],
      "languageSupport": {
        "rawText": "Search-language filter supports ISO 639-1 codes and up to 10 languages per request; no model-language roster is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "search-filter multilingual",
          "generation languages not enumerated"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-reasoning-pro",
      "publicName": "Sonar Reasoning Pro",
      "aliases": [
        "sonar-reasoning (deprecated predecessor)"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$2 / 1M input tokens, $8 / 1M output tokens, plus request fee by context size: $6/$10/$14 per 1K.",
      "limitsSummary": "128K context. Tier-based RPM: 50 at Tier 0 up to 4000 at Tier 4/5.",
      "regionSummary": "Hosted via AWS in North America; no public region selection documented.",
      "languagesSummary": "No explicit generation-language list documented.",
      "notes": "Reasoning-capable native picker option. FAQ says Perplexity exposes CoTs for this model. Important caveat: docs say it outputs a `<think>` section and JSON structured output parsers need custom handling.",
      "officialSources": [
        "https://docs.perplexity.ai/docs/sonar/models/sonar-reasoning-pro",
        "https://docs.perplexity.ai/docs/getting-started/pricing",
        "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
        "https://docs.perplexity.ai/docs/resources/faq",
        "https://docs.perplexity.ai/docs/resources/changelog"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "Sonar Reasoning Pro input tokens: $2 per 1M."
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "Sonar Reasoning Pro output tokens: $8 per 1M."
        },
        {
          "amountUsd": 6.0,
          "unit": "request",
          "sourceText": "Low-context request fee is $6 per 1K."
        },
        {
          "amountUsd": 10.0,
          "unit": "request",
          "sourceText": "Medium-context request fee is $10 per 1K."
        },
        {
          "amountUsd": 14.0,
          "unit": "request",
          "sourceText": "High-context request fee is $14 per 1K."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128K context length."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": ">=",
          "value": 50,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Tier 0 sonar-reasoning-pro RPM is 50; higher tiers are higher."
        }
      ],
      "languageSupport": {
        "rawText": "No explicit supported-language list is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "generation languages not enumerated",
          "reasoning output formatting caveat"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-deep-research",
      "publicName": "Sonar Deep Research",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$2 / 1M input tokens, $8 / 1M output tokens, $2 / 1M citation tokens, $3 / 1M reasoning tokens, and $5 / 1K search queries.",
      "limitsSummary": "128K context. Tier-based RPM: 5 at Tier 0 up to 100 at Tier 5. Has documented async API with 7-day TTL for async jobs/results.",
      "regionSummary": "Hosted via AWS in North America; no public region selection documented.",
      "languagesSummary": "No explicit generation-language list documented.",
      "notes": "Useful for long-form research, but not a good default mobile voice-chat picker. It has a dedicated async flow and much higher latency/cost profile. Deep Research does not expose CoTs in the same way Sonar Reasoning Pro does.",
      "officialSources": [
        "https://docs.perplexity.ai/docs/sonar/models/sonar-deep-research",
        "https://docs.perplexity.ai/docs/getting-started/pricing",
        "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
        "https://docs.perplexity.ai/api-reference/async-sonar-post",
        "https://docs.perplexity.ai/docs/resources/faq"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "Input tokens: $2 per 1M."
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "Output tokens: $8 per 1M."
        },
        {
          "amountUsd": 2.0,
          "unit": "other",
          "sourceText": "Citation tokens: $2 per 1M."
        },
        {
          "amountUsd": 3.0,
          "unit": "other",
          "sourceText": "Reasoning tokens: $3 per 1M."
        },
        {
          "amountUsd": 5.0,
          "unit": "request",
          "sourceText": "Search queries: $5 per 1K."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128K context length."
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": ">=",
          "value": 5,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Tier 0 sonar-deep-research RPM is 5; higher tiers are higher."
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 7,
          "unit": "other",
          "scope": "session",
          "sourceText": "Async requests have a TTL of 7 days."
        }
      ],
      "languageSupport": {
        "rawText": "No explicit supported-language list is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "generation languages not enumerated",
          "async-oriented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "perplexity/sonar",
      "publicName": "Perplexity Sonar (Agent API)",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Agent API pricing: $0.25 / 1M input tokens, $2.50 / 1M output tokens, $0.0625 / 1M cache read tokens; tool calls priced separately.",
      "limitsSummary": "Agent API rate limits are tier-based at the API level (50/min at Tier 0 up to 2000/min at Tier 4/5). Streaming is supported across Agent API models.",
      "regionSummary": "Hosted via AWS in North America; no public region selection documented.",
      "languagesSummary": "No explicit supported-language list is published.",
      "notes": "This is not the same billing surface as Sonar API `sonar`. Use only if your app integrates Agent API specifically. Because the surrounding Agent catalog is dynamic and multi-provider, this should usually stay behind live discovery rather than a static provider-native picker.",
      "officialSources": [
        "https://docs.perplexity.ai/docs/agent-api/models",
        "https://docs.perplexity.ai/docs/agent-api/quickstart",
        "https://docs.perplexity.ai/docs/agent-api/output-control",
        "https://docs.perplexity.ai/docs/getting-started/pricing",
        "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.25,
          "unit": "million_input_tokens",
          "sourceText": "Agent model perplexity/sonar input price: $0.25 / 1M."
        },
        {
          "amountUsd": 2.5,
          "unit": "million_output_tokens",
          "sourceText": "Agent model perplexity/sonar output price: $2.50 / 1M."
        },
        {
          "amountUsd": 0.0625,
          "unit": "other",
          "sourceText": "Cache read price: $0.0625 / 1M."
        }
      ],
      "constraints": [
        {
          "metric": "rate_limit_rpm",
          "comparator": ">=",
          "value": 50,
          "unit": "requests_per_minute",
          "scope": "account",
          "sourceText": "Agent API Tier 0 is 50/min; higher tiers are higher."
        }
      ],
      "languageSupport": {
        "rawText": "No explicit supported-language list is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference",
          "dynamic routed catalog context"
        ]
      }
    }
  ),
]);
