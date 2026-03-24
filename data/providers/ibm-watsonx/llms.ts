import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "ibm/granite-4-h-small",
      "publicName": "granite-4-h-small",
      "aliases": [
        "granite-4-h-small"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0000636/1K input tokens and $0.000265/1K output tokens on IBM's supported-models page.",
      "limitsSummary": "131072-token context window documented.",
      "regionSummary": "Region-dependent; IBM says model availability varies by data center.",
      "languagesSummary": "IBM describes it as multilingual dialog capable.",
      "notes": "Best current IBM-native general chat/code/tool-use model for a stable picker.",
      "officialSources": [
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 63.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.0000636 per 1,000 input tokens"
        },
        {
          "amountUsd": 265.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.000265 per 1,000 output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window 131,072"
        }
      ],
      "languageSupport": {
        "rawText": "Supports multilingual dialog according to IBM product page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multilingual"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "openai/gpt-oss-120b",
      "publicName": "gpt-oss-120b",
      "aliases": [
        "gpt-oss-120b"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.000159/1K input and $0.000636/1K output tokens on IBM's supported-models page.",
      "limitsSummary": "131072-token context window documented.",
      "regionSummary": "Region-dependent watsonx.ai availability.",
      "languagesSummary": "Language coverage not explicitly enumerated by IBM on the cited supported-models row.",
      "notes": "Public third-party model in IBM catalog. Safe picker entry if you want a large reasoning-oriented non-IBM option.",
      "officialSources": [
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 159.0,
          "unit": "million_input_tokens",
          "sourceText": "$0.000159 per 1,000 input tokens"
        },
        {
          "amountUsd": 636.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.000636 per 1,000 output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window 131,072"
        }
      ],
      "languageSupport": {
        "rawText": "IBM row does not enumerate languages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language details not enumerated by IBM in cited table"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "meta-llama/llama-3-3-70b-instruct",
      "publicName": "llama-3-3-70b-instruct",
      "aliases": [
        "llama-3-3-70b-instruct"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.0007526/1K input and $0.0007526/1K output tokens on IBM's supported-models page.",
      "limitsSummary": "131072-token context window documented.",
      "regionSummary": "Region-dependent watsonx.ai availability.",
      "languagesSummary": "IBM row does not enumerate languages; model is generally treated as multilingual, but that is not explicitly enumerated in IBM's cited row.",
      "notes": "Good high-capability open-weight option in IBM's public catalog.",
      "officialSources": [
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 752.6,
          "unit": "million_input_tokens",
          "sourceText": "$0.0007526 per 1,000 input tokens"
        },
        {
          "amountUsd": 752.6,
          "unit": "million_output_tokens",
          "sourceText": "$0.0007526 per 1,000 output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window 131,072"
        }
      ],
      "languageSupport": {
        "rawText": "IBM row does not enumerate languages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "inference: multilingual, but IBM row is not explicit"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "meta-llama/llama-4-maverick-17b-128e-instruct-fp8",
      "publicName": "llama-4-maverick-17b-128e-instruct-fp8",
      "aliases": [
        "llama-4-maverick-17b-128e-instruct-fp8"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "$0.000371/1K input and $0.001484/1K output tokens on IBM's supported-models page.",
      "limitsSummary": "131072-token context window documented.",
      "regionSummary": "Region-dependent watsonx.ai availability.",
      "languagesSummary": "IBM row does not enumerate languages.",
      "notes": "Reasonable current multimodal/open model candidate, but not IBM-native and subject to regional catalog availability.",
      "officialSources": [
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 371.0,
          "unit": "million_input_tokens",
          "sourceText": "$0.000371 per 1,000 input tokens"
        },
        {
          "amountUsd": 1484.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.001484 per 1,000 output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window 131,072"
        }
      ],
      "languageSupport": {
        "rawText": "IBM row does not enumerate languages.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language details not enumerated by IBM in cited table"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "mistralai/mistral-medium-2505",
      "publicName": "mistral-medium-2505",
      "aliases": [
        "mistral-medium-2505"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "IBM pricing page lists USD 3.00 input and USD 10.00 output per 1M tokens.",
      "limitsSummary": "Context window not verifiable from the crawlable IBM pricing snippet alone.",
      "regionSummary": "Region-dependent watsonx.ai availability.",
      "languagesSummary": "IBM pricing page does not enumerate languages in the snippet.",
      "notes": "Safe third-party picker candidate, but some metadata requires live discovery or IBM model page follow-through.",
      "officialSources": [
        "https://www.ibm.com/products/watsonx-ai/pricing",
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.0,
          "unit": "million_input_tokens",
          "sourceText": "USD 3.00 input"
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "USD 10.00 tokens output"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Language coverage not enumerated in the cited IBM pricing snippet.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "details require model card/live discovery"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "ibm-watsonx",
      "providerName": "IBM Watsonx",
      "service": "llm",
      "modelId": "ibm/granite-3-8b-instruct",
      "publicName": "granite-3-8b-instruct",
      "aliases": [
        "granite-3-8b-instruct"
      ],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Listed at $0.000212/1K input and $0.000212/1K output on supported-models page, but explicitly marked deprecated.",
      "limitsSummary": "131072-token context window documented.",
      "regionSummary": "Region-dependent watsonx.ai availability.",
      "languagesSummary": "IBM docs do not enumerate languages in the cited row.",
      "notes": "Do not expose in a stable picker; keep only for backward compatibility with existing saved configs.",
      "officialSources": [
        "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 212.0,
          "unit": "million_input_tokens",
          "sourceText": "$0.000212 per 1,000 input tokens"
        },
        {
          "amountUsd": 212.0,
          "unit": "million_output_tokens",
          "sourceText": "$0.000212 per 1,000 output tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window 131,072"
        }
      ],
      "languageSupport": {
        "rawText": "IBM row does not enumerate languages.",
        "isMultilingual": false,
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
