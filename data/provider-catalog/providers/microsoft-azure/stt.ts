import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
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
    }
  ),
  providerContext.stt(
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
    }
  ),
  providerContext.stt(
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
  ),
]);
