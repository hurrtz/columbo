import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "reka",
      "providerName": "Reka",
      "service": "llm",
      "modelId": "reka-core",
      "publicName": "Reka Core",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
      "limitsSummary": null,
      "regionSummary": "Reka-hosted cloud; public region details are limited.",
      "languagesSummary": null,
      "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
      "officialSources": [
        "https://www.reka.ai/",
        "https://www.reka.ai/pricing",
        "https://docs.reka.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.8,
          "unit": "million_input_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "reka",
      "providerName": "Reka",
      "service": "llm",
      "modelId": "reka-edge",
      "publicName": "Reka Edge",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
      "limitsSummary": null,
      "regionSummary": "Reka-hosted cloud; public region details are limited.",
      "languagesSummary": null,
      "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
      "officialSources": [
        "https://www.reka.ai/",
        "https://www.reka.ai/pricing",
        "https://docs.reka.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.8,
          "unit": "million_input_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
  providerContext.llm(
    {
      "providerId": "reka",
      "providerName": "Reka",
      "service": "llm",
      "modelId": "reka-flash",
      "publicName": "Reka Flash",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Examples: Spark tier about $0.05 in/out; Flash ~$0.80/M input and $2/M output; Core ~$2/$6. Audio input is billed per minute for multimodal input.",
      "limitsSummary": null,
      "regionSummary": "Reka-hosted cloud; public region details are limited.",
      "languagesSummary": null,
      "notes": "For a speech app, Reka is best treated as an LLM that can consume audio, not as a full speech provider.",
      "officialSources": [
        "https://www.reka.ai/",
        "https://www.reka.ai/pricing",
        "https://docs.reka.ai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [
        {
          "amountUsd": 0.8,
          "unit": "million_input_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        },
        {
          "amountUsd": 2.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.80/M input and $2/M output"
        }
      ],
      "constraints": [],
      "languageSupport": null
    }
  ),
]);
