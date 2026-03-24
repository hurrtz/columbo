import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "llm",
      "modelId": "openai/gpt-oss-20b",
      "publicName": "gpt-oss-20b",
      "aliases": [
        "openai/gpt-oss-20b:fastest",
        "openai/gpt-oss-20b:cheapest",
        "openai/gpt-oss-20b:preferred"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Routed pricing varies by provider. Current visible routed floor on 2026-03-24 is $0.04 / 1M input tokens and $0.15 / 1M output tokens (Novita). Other visible routes are higher.",
      "limitsSummary": "Current visible routed context is 131072 tokens across listed providers on Hugging Face's supported-models page.",
      "regionSummary": "Routed provider region/residency not publicly guaranteed by Hugging Face; unknown.",
      "languagesSummary": "Language coverage not explicitly documented on the model card excerpt I verified.",
      "notes": "Canonical base ID is the repo slug. Provider/policy suffixes are routing selectors, not separate base models. OpenAI-compatible chat and Responses APIs are supported at provider level. Model card says this smaller variant is for lower latency/local or specialized use cases and supports reasoning levels and tool use.",
      "officialSources": [
        "https://huggingface.co/openai/gpt-oss-20b",
        "https://huggingface.co/inference/models",
        "https://huggingface.co/docs/inference-providers/tasks/chat-completion",
        "https://huggingface.co/docs/inference-providers/guides/responses-api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.04,
          "unit": "million_input_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.04 / 1M input tokens."
        },
        {
          "amountUsd": 0.15,
          "unit": "million_output_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.15 / 1M output tokens."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Visible routed rows for gpt-oss-20b on the supported-models page show 131,072 context."
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from the model card excerpts I verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly verified from sources used",
          "text-only LLM"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "llm",
      "modelId": "openai/gpt-oss-120b",
      "publicName": "gpt-oss-120b",
      "aliases": [
        "openai/gpt-oss-120b:fastest",
        "openai/gpt-oss-120b:cheapest",
        "openai/gpt-oss-120b:preferred"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Routed pricing varies by provider. Current visible routed floor on 2026-03-24 is $0.05 / 1M input tokens and $0.25 / 1M output tokens (Novita).",
      "limitsSummary": "Current visible routed context is 131072 tokens across listed providers on Hugging Face's supported-models page.",
      "regionSummary": "Routed provider region/residency not publicly guaranteed by Hugging Face; unknown.",
      "languagesSummary": "Language coverage not explicitly documented on the model card excerpt I verified.",
      "notes": "Canonical base ID is the repo slug. Provider/policy suffixes are routing selectors, not separate base models. Model card positions this as the production/general-purpose high-reasoning variant and notes harmony-format usage.",
      "officialSources": [
        "https://huggingface.co/openai/gpt-oss-120b",
        "https://huggingface.co/inference/models",
        "https://huggingface.co/docs/inference-providers/tasks/chat-completion",
        "https://huggingface.co/docs/inference-providers/guides/responses-api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.05,
          "unit": "million_input_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.05 / 1M input tokens."
        },
        {
          "amountUsd": 0.25,
          "unit": "million_output_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.25 / 1M output tokens."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Visible routed rows for gpt-oss-120b on the supported-models page show 131,072 context."
        }
      ],
      "languageSupport": {
        "rawText": "Unknown from the model card excerpts I verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language coverage not explicitly verified from sources used",
          "text-only LLM"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "llm",
      "modelId": "meta-llama/Llama-3.3-70B-Instruct",
      "publicName": "Llama-3.3-70B-Instruct",
      "aliases": [
        "meta-llama/Llama-3.3-70B-Instruct:fastest",
        "meta-llama/Llama-3.3-70B-Instruct:cheapest",
        "meta-llama/Llama-3.3-70B-Instruct:preferred"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Routed pricing varies by provider. Current visible routed floor on 2026-03-24 is $0.14 / 1M input tokens and $0.40 / 1M output tokens (Novita).",
      "limitsSummary": "The model card documents 128k context; Hugging Face's routed supported-models page currently shows 131072 context on listed routes.",
      "regionSummary": "Routed provider region/residency not publicly guaranteed by Hugging Face; unknown.",
      "languagesSummary": "Model card explicitly lists English, German, French, Italian, Portuguese, Hindi, Spanish, and Thai.",
      "notes": "Useful multilingual text model for a stable picker. Canonical base ID is the repo slug; provider/policy suffixes are selectors.",
      "officialSources": [
        "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
        "https://huggingface.co/inference/models",
        "https://huggingface.co/docs/inference-providers/tasks/chat-completion",
        "https://huggingface.co/docs/inference-providers/guides/responses-api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.14,
          "unit": "million_input_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.14 / 1M input tokens."
        },
        {
          "amountUsd": 0.4,
          "unit": "million_output_tokens",
          "sourceText": "Current cheapest visible routed row on 2026-03-24 is Novita at $0.40 / 1M output tokens."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 131072,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Visible routed rows for Llama-3.3-70B-Instruct on the supported-models page show 131,072 context."
        }
      ],
      "languageSupport": {
        "rawText": "Supported languages: English, German, French, Italian, Portuguese, Hindi, Spanish, and Thai.",
        "isMultilingual": true,
        "languageCount": 8,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "French",
          "Italian",
          "Portuguese",
          "Hindi",
          "Spanish",
          "Thai"
        ],
        "notes": [
          "text-only LLM",
          "explicitly multilingual"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "hugging-face-inference-api",
      "providerName": "Hugging Face Inference API",
      "service": "llm",
      "modelId": "katanemo/Arch-Router-1.5B",
      "publicName": "Arch-Router-1.5B",
      "aliases": [
        "katanemo/Arch-Router-1.5B:hf-inference"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "No public token pricing verified. Native hf-inference pricing is documented generically as compute-time \u00d7 hardware price.",
      "limitsSummary": "No public context-window value verified from Hugging Face's supported-models page or model card excerpts I used.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "This is a routing model, not a general-purpose assistant model. The current public `text-generation + hf-inference` filtered catalog shows only this native LLM route. It should generally be hidden from end-user pickers.",
      "officialSources": [
        "https://huggingface.co/katanemo/Arch-Router-1.5B",
        "https://huggingface.co/models?inference_provider=hf-inference&pipeline_tag=text-generation",
        "https://huggingface.co/docs/inference-providers/providers/hf-inference",
        "https://huggingface.co/docs/inference-providers/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Unknown from the sources used.",
        "isMultilingual": false,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "routing-specialized model",
          "not suitable as a normal chat picker entry"
        ]
      }
    }
  ),
]);
