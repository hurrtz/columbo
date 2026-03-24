import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar",
      "publicName": "Sonar",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonar $1/M input and $1/M output plus search-request fees; Sonar Pro $3/$15; Reasoning Pro $2/$8; Deep Research adds citation/search fees.",
      "limitsSummary": null,
      "regionSummary": "Perplexity-managed cloud; region specifics not prominently documented.",
      "languagesSummary": null,
      "notes": "Good retrieval/search LLM option, but no native TTS/STT. Budget for search query fees separately from tokens.",
      "officialSources": [
        "https://docs.perplexity.ai/getting-started/models",
        "https://docs.perplexity.ai/guides/pricing",
        "https://docs.perplexity.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1/M input and $1/M output"
        },
        {
          "amountUsd": 1.0,
          "unit": "million_output_tokens",
          "sourceText": "$1/M input and $1/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-deep-research",
      "publicName": "Sonar Deep Research",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonar $1/M input and $1/M output plus search-request fees; Sonar Pro $3/$15; Reasoning Pro $2/$8; Deep Research adds citation/search fees.",
      "limitsSummary": null,
      "regionSummary": "Perplexity-managed cloud; region specifics not prominently documented.",
      "languagesSummary": null,
      "notes": "Good retrieval/search LLM option, but no native TTS/STT. Budget for search query fees separately from tokens.",
      "officialSources": [
        "https://docs.perplexity.ai/getting-started/models",
        "https://docs.perplexity.ai/guides/pricing",
        "https://docs.perplexity.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1/M input and $1/M output"
        },
        {
          "amountUsd": 1.0,
          "unit": "million_output_tokens",
          "sourceText": "$1/M input and $1/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-pro",
      "publicName": "Sonar Pro",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonar $1/M input and $1/M output plus search-request fees; Sonar Pro $3/$15; Reasoning Pro $2/$8; Deep Research adds citation/search fees.",
      "limitsSummary": null,
      "regionSummary": "Perplexity-managed cloud; region specifics not prominently documented.",
      "languagesSummary": null,
      "notes": "Good retrieval/search LLM option, but no native TTS/STT. Budget for search query fees separately from tokens.",
      "officialSources": [
        "https://docs.perplexity.ai/getting-started/models",
        "https://docs.perplexity.ai/guides/pricing",
        "https://docs.perplexity.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1/M input and $1/M output"
        },
        {
          "amountUsd": 1.0,
          "unit": "million_output_tokens",
          "sourceText": "$1/M input and $1/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "perplexity",
      "providerName": "Perplexity",
      "service": "llm",
      "modelId": "sonar-reasoning-pro",
      "publicName": "Sonar Reasoning Pro",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonar $1/M input and $1/M output plus search-request fees; Sonar Pro $3/$15; Reasoning Pro $2/$8; Deep Research adds citation/search fees.",
      "limitsSummary": null,
      "regionSummary": "Perplexity-managed cloud; region specifics not prominently documented.",
      "languagesSummary": null,
      "notes": "Good retrieval/search LLM option, but no native TTS/STT. Budget for search query fees separately from tokens.",
      "officialSources": [
        "https://docs.perplexity.ai/getting-started/models",
        "https://docs.perplexity.ai/guides/pricing",
        "https://docs.perplexity.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "$1/M input and $1/M output"
        },
        {
          "amountUsd": 1.0,
          "unit": "million_output_tokens",
          "sourceText": "$1/M input and $1/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);
