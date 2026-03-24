import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "llm",
      "modelId": "deepseek/deepseek-v3.2",
      "publicName": "Deepseek V3.2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.269/M input, $0.1345/M cache read, $0.4/M output on Novita serverless.",
      "limitsSummary": "163,840 context; 65,536 max output on model library page.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "No official language list verified on the model page reviewed.",
      "notes": "Good candidate for a stable general-purpose picker entry. OpenAI-compatible via Novita.",
      "officialSources": [
        "https://novita.ai/models-console/model-detail/deepseek-deepseek-v3.2",
        "https://novita.ai/models",
        "https://novita.ai/docs/api-reference/model-apis-introduction"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.269,
          "unit": "million_input_tokens",
          "sourceText": "$0.269/Mt Input"
        },
        {
          "amountUsd": 0.1345,
          "unit": "other",
          "sourceText": "$0.1345/Mt Cache Read"
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "$0.4/Mt Output"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 163840,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "163840 Context"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "65536 Max Output"
        }
      ],
      "languageSupport": {
        "rawText": "Language support not clearly enumerated on the sources reviewed for this exact model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "llm",
      "modelId": "qwen/qwen3-235b-a22b-fp8",
      "publicName": "Qwen3 235B A22B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.2/M input, $0.8/M output on Novita serverless.",
      "limitsSummary": "Example shows max_tokens=20000; exact context window not visible in the page snippet reviewed.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Language coverage not explicitly enumerated in the reviewed snippet.",
      "notes": "Reasonable premium reasoning/general model for a curated picker, but full catalog still needs live discovery.",
      "officialSources": [
        "https://novita.ai/models-console/model-detail/qwen-qwen3-235b-a22b-fp8",
        "https://novita.ai/docs/api-reference/model-apis-introduction"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "Input $0.2 / M Tokens"
        },
        {
          "amountUsd": 0.8,
          "unit": "million_output_tokens",
          "sourceText": "Output $0.8 / M Tokens"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No language list verified in the reviewed source snippet.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "llm",
      "modelId": "qwen/qwen3-coder-30b-a3b-instruct",
      "publicName": "Qwen3 Coder 30B A3B Instruct",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.07/M input, $0.27/M output on Novita serverless.",
      "limitsSummary": "Page text says native context length 256K tokens, extendable to 1M with Yarn.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Language coverage not explicitly enumerated in the reviewed source.",
      "notes": "Best specialized code-model candidate for a stable picker. Page explicitly mentions tool use / OpenAI-compatible tool formats.",
      "officialSources": [
        "https://novita.ai/models-console/model-detail/qwen-qwen3-coder-30b-a3b-instruct"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.07,
          "unit": "million_input_tokens",
          "sourceText": "Input $0.07 / M Tokens"
        },
        {
          "amountUsd": 0.27,
          "unit": "million_output_tokens",
          "sourceText": "Output $0.27 / M Tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "supports a native context length of 256K tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Language list not clearly enumerated in the reviewed page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "code-specialized",
          "language list unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "llm",
      "modelId": "zai-org/glm-4.6v",
      "publicName": "GLM 4.6V",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "$0.3/M input, $0.055/M cache read, $0.9/M output on Novita serverless.",
      "limitsSummary": "Page text says 128k-token training context window; example uses max_tokens=32768.",
      "regionSummary": "No public model-specific region controls verified.",
      "languagesSummary": "Language list unknown from reviewed source.",
      "notes": "This is a multimodal LLM/VLM. Useful if the app may later expose image input.",
      "officialSources": [
        "https://novita.ai/models-console/model-detail/zai-org-glm-4.6v"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.3,
          "unit": "million_input_tokens",
          "sourceText": "Input $0.3 / M Tokens"
        },
        {
          "amountUsd": 0.055,
          "unit": "other",
          "sourceText": "Cache Read $0.055 / M Tokens"
        },
        {
          "amountUsd": 0.9,
          "unit": "million_output_tokens",
          "sourceText": "Output $0.9 / M Tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "featuring a 128k-token training context window"
        }
      ],
      "languageSupport": {
        "rawText": "Language coverage not explicitly enumerated in the reviewed page.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "vision-capable",
          "language list unknown"
        ]
      }
    }
  ),
]);
