import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-0711-preview",
      "publicName": "Kimi K2 0711 Preview",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
      "limitsSummary": null,
      "regionSummary": "Moonshot cloud; public region specifics not prominent.",
      "languagesSummary": null,
      "notes": "Good reasoning/text provider, but no native speech stack.",
      "officialSources": [
        "https://platform.moonshot.ai/",
        "https://platform.moonshot.ai/docs",
        "https://platform.moonshot.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-0905-preview",
      "publicName": "Kimi K2 0905 Preview",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
      "limitsSummary": null,
      "regionSummary": "Moonshot cloud; public region specifics not prominent.",
      "languagesSummary": null,
      "notes": "Good reasoning/text provider, but no native speech stack.",
      "officialSources": [
        "https://platform.moonshot.ai/",
        "https://platform.moonshot.ai/docs",
        "https://platform.moonshot.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-thinking",
      "publicName": "Kimi K2 Thinking",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
      "limitsSummary": null,
      "regionSummary": "Moonshot cloud; public region specifics not prominent.",
      "languagesSummary": null,
      "notes": "Good reasoning/text provider, but no native speech stack.",
      "officialSources": [
        "https://platform.moonshot.ai/",
        "https://platform.moonshot.ai/docs",
        "https://platform.moonshot.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2-turbo-preview",
      "publicName": "Kimi K2 Turbo Preview",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
      "limitsSummary": null,
      "regionSummary": "Moonshot cloud; public region specifics not prominent.",
      "languagesSummary": null,
      "notes": "Good reasoning/text provider, but no native speech stack.",
      "officialSources": [
        "https://platform.moonshot.ai/",
        "https://platform.moonshot.ai/docs",
        "https://platform.moonshot.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "moonshot-ai-kimi",
      "providerName": "Moonshot AI (Kimi)",
      "service": "llm",
      "modelId": "kimi-k2.5",
      "publicName": "Kimi K2.5",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: K2.5 cache hit $0.10/M, input $0.60/M, output $3.00/M. Some earlier K2 preview variants price near $0.60 input / $2.50 output.",
      "limitsSummary": null,
      "regionSummary": "Moonshot cloud; public region specifics not prominent.",
      "languagesSummary": null,
      "notes": "Good reasoning/text provider, but no native speech stack.",
      "officialSources": [
        "https://platform.moonshot.ai/",
        "https://platform.moonshot.ai/docs",
        "https://platform.moonshot.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        },
        {
          "amountUsd": 0.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.10/M, input $0.60/M, output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);
