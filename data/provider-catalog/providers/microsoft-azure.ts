import type {
  CatalogLlm,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../../src/catalog/types";

const provider = {
  "providerId": "microsoft-azure",
  "providerName": "Microsoft Azure",
  "categoryName": "Major Western Providers",
  "hq": "US",
  "verifiedSupport": {
    "llm": "native",
    "stt": "native",
    "tts": "native"
  },
  "officialSources": [
    "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
    "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
    "https://learn.microsoft.com/azure/ai-services/speech-service/"
  ],
  "integration": {
    "catalogType": "Multi-service platform",
    "coverage": "Dynamic/non-exhaustive",
    "hasDynamicCatalog": false,
    "needsLiveDiscovery": true,
    "supportsSpeech": true,
    "lowConfidence": false,
    "openAiCompatible": null,
    "protocols": [
      "websocket"
    ],
    "regionSplitRecommended": false
  },
  "summaries": {
    "activeModels": {
      "llm": "Azure OpenAI / Azure AI Foundry catalog [dynamic] — Includes GPT, Phi, Llama, Mistral, Cohere and partner models; use live catalog\nGPT-5 family on Azure [dynamic]\nGPT-4.1 family on Azure [dynamic]\nGPT-4o family on Azure [dynamic]\nPhi family [dynamic]",
      "tts": "Azure Speech voices [voice-based] — Service uses voice names rather than a small fixed model catalog\nCustom Neural Voice [custom]",
      "stt": "Azure Speech recognition [speech]\nAzure Whisper [whisper]\nCustom Speech [custom]"
    },
    "pricing": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limits": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI.",
    "region": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "sttLanguages": "Broad multilingual support; Whisper plus Azure speech/custom models.",
    "ttsLanguages": "400+ voices across 140+ languages/variants.",
    "freeTier": "Yes: Azure Speech F0; separate trial/credits may apply for Azure/OpenAI subscriptions.",
    "integrationNotes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring."
  }
} satisfies CatalogProvider;

const llms = [
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "llm",
    "modelId": "dynamic",
    "publicName": "Azure OpenAI / Azure AI Foundry catalog",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": null,
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": null,
    "notes": "Includes GPT, Phi, Llama, Mistral, Cohere and partner models; use live catalog",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": null
  }
] satisfies CatalogLlm[];

const stt = [
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "stt",
    "modelId": "speech",
    "publicName": "Azure Speech recognition",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI.",
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": "Broad multilingual support; Whisper plus Azure speech/custom models.",
    "notes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring.",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 300000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "duration_seconds",
        "comparator": "<=",
        "value": 7200.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 3600.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      }
    ],
    "languageSupport": {
      "rawText": "Broad multilingual support; Whisper plus Azure speech/custom models.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "stt",
    "modelId": "whisper",
    "publicName": "Azure Whisper",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI.",
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": "Broad multilingual support; Whisper plus Azure speech/custom models.",
    "notes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring.",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 300000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "duration_seconds",
        "comparator": "<=",
        "value": 7200.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 3600.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      }
    ],
    "languageSupport": {
      "rawText": "Broad multilingual support; Whisper plus Azure speech/custom models.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "stt",
    "modelId": "custom",
    "publicName": "Custom Speech",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI.",
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": "Broad multilingual support; Whisper plus Azure speech/custom models.",
    "notes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring.",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [
      {
        "metric": "file_size_bytes",
        "comparator": "<=",
        "value": 300000000.0,
        "unit": "bytes",
        "scope": "file",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "duration_seconds",
        "comparator": "<=",
        "value": 7200.0,
        "unit": "seconds",
        "scope": "audio",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      },
      {
        "metric": "session_duration_seconds",
        "comparator": "~",
        "value": 3600.0,
        "unit": "seconds",
        "scope": "session",
        "sourceText": "Speech preview docs cite <300 MB and <120 min/file for some batch flows. Voice Live sessions max ~60 min/connection. Model retirement cadence matters on Azure OpenAI."
      }
    ],
    "languageSupport": {
      "rawText": "Broad multilingual support; Whisper plus Azure speech/custom models.",
      "isMultilingual": true,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogStt[];

const tts = [
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "tts",
    "modelId": "voice-based",
    "publicName": "Azure Speech voices",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": null,
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": "400+ voices across 140+ languages/variants.",
    "notes": "Service uses voice names rather than a small fixed model catalog",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "400+ voices across 140+ languages/variants.",
      "isMultilingual": true,
      "languageCount": 140,
      "voiceCount": 400,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "service": "tts",
    "modelId": "custom",
    "publicName": "Custom Neural Voice",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Azure OpenAI pricing depends on selected partner model and region. Azure Speech has F0 (free) and S0 paid tiers; voice and STT pricing vary by feature/region.",
    "limitsSummary": null,
    "regionSummary": "Region-specific Azure deployment; customer chooses region where offered. Speech/LLM availability is not uniform across all Azure regions.",
    "languagesSummary": "400+ voices across 140+ languages/variants.",
    "notes": "Treat Azure OpenAI and Azure Speech as separate product surfaces under one billing umbrella. Add model retirement monitoring.",
    "officialSources": [
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
      "https://learn.microsoft.com/azure/ai-services/speech-service/"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": true,
    "priceMeasurements": [],
    "constraints": [],
    "languageSupport": {
      "rawText": "400+ voices across 140+ languages/variants.",
      "isMultilingual": true,
      "languageCount": 140,
      "voiceCount": 400,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[];

export default {
  provider,
  llms,
  stt,
  tts,
} satisfies CatalogProviderDocument;
