import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "pharia-1-llm-7b-control",
      "publicName": "Pharia-1-LLM-7B-control",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown; no current official public per-token price found.",
      "limitsSummary": "No public context window was stated in the current Pharia-1 docs I found. Streaming is demonstrated in the official Python client for this exact model ID; raw wire protocol was not explicitly documented. If this model is exposed through multimodal chat infrastructure, general PhariaInference multimodal request caps are 128 MiB combined and 4000x4000 per image, but model-specific vision enablement is deployment-dependent.",
      "regionSummary": "Commercial deployment is offered on-premise or in customer cloud/hybrid environments; the same model offering is described as geographically uniform subject to sanctions/export controls.",
      "languagesSummary": "Multilingual. Core Aleph Alpha docs emphasize optimization for German, French, and Spanish; the official Hugging Face card also lists training in English, German, French, Spanish, Italian, Portuguese, and Dutch.",
      "notes": "Native Aleph Alpha model. Treat the lowercase hyphenated modelId as canonical. Inference: streaming should be available for this model in production because the official Python client README shows complete_with_streaming with this exact model ID.",
      "officialSources": [
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-variants.html",
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/intro.html",
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-access.html",
        "https://github.com/Aleph-Alpha/aleph-alpha-client",
        "https://huggingface.co/Aleph-Alpha/Pharia-1-LLM-7B-control"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Official docs describe Pharia-1-LLM-7B as multilingual and culturally/linguistically optimized for German, French, and Spanish; the official Hugging Face card lists English, German, French, Spanish, Italian, Portuguese, and Dutch as training languages.",
        "isMultilingual": true,
        "languageCount": 7,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "French",
          "Spanish",
          "Italian",
          "Portuguese",
          "Dutch"
        ],
        "notes": [
          "optimized for German/French/Spanish",
          "no native audio output"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "pharia-1-llm-7b-control-aligned",
      "publicName": "Pharia-1-LLM-7B-control-aligned",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown; no current official public per-token price found.",
      "limitsSummary": "No public context window was stated in the current Pharia-1 docs I found. Streaming is not shown with this exact ID in the docs, but the family is served through the same current inference/client surface as the non-aligned variant.",
      "regionSummary": "Commercial deployment is offered on-premise or in customer cloud/hybrid environments; the same model offering is described as geographically uniform subject to sanctions/export controls.",
      "languagesSummary": "Multilingual. Optimized for German, French, and Spanish; the family model card also lists training in English, German, French, Spanish, Italian, Portuguese, and Dutch.",
      "notes": "Native Aleph Alpha model. Best current default for a stable chat picker. Inference: it should share the same streaming path as the control variant because both sit in the same Pharia-1 family and current APIs/SDKs are family-level.",
      "officialSources": [
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-variants.html",
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/intro.html",
        "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/model-access.html",
        "https://huggingface.co/Aleph-Alpha/Pharia-1-LLM-7B-control",
        "https://huggingface.co/Aleph-Alpha/Pharia-1-LLM-7B-control-aligned"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Official docs describe Pharia-1-LLM-7B as multilingual and culturally/linguistically optimized for German, French, and Spanish; the official Hugging Face card lists English, German, French, Spanish, Italian, Portuguese, and Dutch as training languages.",
        "isMultilingual": true,
        "languageCount": 7,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "French",
          "Spanish",
          "Italian",
          "Portuguese",
          "Dutch"
        ],
        "notes": [
          "recommended for chat-related use cases",
          "optimized for German/French/Spanish",
          "no native audio output"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "aleph-alpha",
      "providerName": "Aleph Alpha",
      "service": "llm",
      "modelId": "luminous-base",
      "publicName": "Luminous base",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown; no current official public per-token price found.",
      "limitsSummary": "Current worker documentation sets maximum_completion_tokens to 8192, marks multimodal_enabled true, and semantic_embedding_enabled true. This is a legacy Luminous-style worker path; do not assume full OpenAI-chat compatibility.",
      "regionSummary": "Available through customer-managed deployment. Dynamic model management still lists Luminous base as a currently supported Aleph Alpha model.",
      "languagesSummary": "Multilingual model trained on English, German, French, Spanish and Italian.",
      "notes": "Native Aleph Alpha legacy family. Keep available only behind advanced/live discovery in a consumer voice-first app. It remains current in deployment docs, but modern product guidance emphasizes Pharia-1 and selected Llama models.",
      "officialSources": [
        "https://docs.aleph-alpha.com/phariaai-install-config-guide/latest/configuration/worker-deployment.html",
        "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-os/model-management/dmm.html",
        "https://docs.aleph-alpha.com/phariaai-admin-guide/latest/pharia-inference/api/index.html",
        "https://github.com/Aleph-Alpha/intelligence-layer-sdk"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "maximum_completion_tokens: 8192"
        }
      ],
      "languageSupport": {
        "rawText": "Current worker deployment docs describe luminous-base as a multilingual model trained on English, German, French, Spanish and Italian.",
        "isMultilingual": true,
        "languageCount": 5,
        "voiceCount": 0,
        "listedLanguages": [
          "English",
          "German",
          "French",
          "Spanish",
          "Italian"
        ],
        "notes": [
          "legacy Aleph Alpha family",
          "semantic embeddings enabled in current worker docs",
          "no native audio output"
        ]
      }
    }
  ),
]);
