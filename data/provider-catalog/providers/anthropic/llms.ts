import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "anthropic",
      "providerName": "Anthropic",
      "service": "llm",
      "modelId": "claude-haiku-4-5",
      "publicName": "Claude Haiku 4.5",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonnet 4.6 $3/M input, $15/M output; see pricing page for prompt caching and batch rates.",
      "limitsSummary": null,
      "regionSummary": "Direct API is Anthropic-hosted; regional/sovereign options usually come via cloud partners (Bedrock, Vertex, Azure).",
      "languagesSummary": null,
      "notes": "Alias; dated release IDs may also appear in Models API",
      "officialSources": [
        "https://docs.anthropic.com/en/docs/about-claude/models/all-models",
        "https://www.anthropic.com/pricing#api",
        "https://docs.anthropic.com/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3/M input, $15/M output"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$3/M input, $15/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "anthropic",
      "providerName": "Anthropic",
      "service": "llm",
      "modelId": "claude-opus-4-6",
      "publicName": "Claude Opus 4.6",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonnet 4.6 $3/M input, $15/M output; see pricing page for prompt caching and batch rates.",
      "limitsSummary": null,
      "regionSummary": "Direct API is Anthropic-hosted; regional/sovereign options usually come via cloud partners (Bedrock, Vertex, Azure).",
      "languagesSummary": null,
      "notes": "Alias; dated release IDs may also appear in Models API",
      "officialSources": [
        "https://docs.anthropic.com/en/docs/about-claude/models/all-models",
        "https://www.anthropic.com/pricing#api",
        "https://docs.anthropic.com/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3/M input, $15/M output"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$3/M input, $15/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "anthropic",
      "providerName": "Anthropic",
      "service": "llm",
      "modelId": "claude-sonnet-4-6",
      "publicName": "Claude Sonnet 4.6",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Sonnet 4.6 $3/M input, $15/M output; see pricing page for prompt caching and batch rates.",
      "limitsSummary": null,
      "regionSummary": "Direct API is Anthropic-hosted; regional/sovereign options usually come via cloud partners (Bedrock, Vertex, Azure).",
      "languagesSummary": null,
      "notes": "Alias; dated release IDs may also appear in Models API",
      "officialSources": [
        "https://docs.anthropic.com/en/docs/about-claude/models/all-models",
        "https://www.anthropic.com/pricing#api",
        "https://docs.anthropic.com/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "$3/M input, $15/M output"
        },
        {
          "amountUsd": 15.0,
          "unit": "million_output_tokens",
          "sourceText": "$3/M input, $15/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);
