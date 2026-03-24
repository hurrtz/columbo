import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "microsoft-azure",
    "providerName": "Microsoft Azure",
    "categoryName": "Cloud AI platform / managed inference provider",
    "hq": "Redmond, Washington, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
      "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/reference",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio-websockets",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/quotas-limits",
      "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
      "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text",
      "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech",
      "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support",
      "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/regions",
      "https://azure.microsoft.com/en-us/pricing/details/speech/"
    ],
    "integration": {
      "catalogType": "Azure-curated model catalog plus separate dynamic Foundry partner/community catalogs; Azure Speech voice inventory is region-dynamic",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Azure OpenAI pricing is public but JS-heavy; several exact values are observable in official pricing snippets (for example GPT-4.1 global $2 input / $8 output per 1M tokens; GPT-4.1-mini global $0.40 / $1.60; GPT-4o-mini global $0.15 / $0.60; GPT-4o-transcribe audio input $6 and text input/output $2.50/$10; GPT-4o-mini-transcribe-2025-12-15 audio input $3 and text input/output $1.25/$5). Azure Speech pricing is separately metered; verified snippet values include real-time STT $1/hour, fast transcription $0.36/hour, standard neural TTS $15 per 1M characters.",
      "limits": "Azure OpenAI: realtime 32,000 input tokens and 4,096 output tokens; audio message size 20 MB; speech-to-text model catalog entries show 25 MB max audio file size; Batch input file size 200 MB or 1 GB with BYOS. Azure Speech limits are feature- and tier-specific and region-dependent.",
      "region": "Azure OpenAI uses Global / Data Zone / Regional deployment distinctions. Azure Speech states data is processed only in the region of the Speech resource. Region split is worth exposing in provider metadata.",
      "sttLanguages": "Azure Speech has broad multilingual coverage via a large locale table. Azure OpenAI transcribe endpoints accept ISO-639-1 language hints, but Azure does not present a simple fixed language-count page for the OpenAI transcribe models. Treat Azure Speech locale coverage as canonical and Azure OpenAI STT language coverage as model-specific/partially documented.",
      "ttsLanguages": "Azure Speech has broad multilingual TTS with region-specific voice inventory and a voices-list endpoint. Azure OpenAI TTS (gpt-4o-mini-tts, tts, tts-hd) is documented, but voice and locale inventory is not presented as a fixed static catalog in the same way; treat voice discovery as dynamic.",
      "freeTier": "Azure free-services page advertises 5 audio hours/month for real-time Speech to Text and 0.5M characters/month for standard neural Text to Speech. Azure OpenAI free credits exist through general Azure free account offers, not as a standing per-model always-free tier in the retrieved documentation.",
      "integrationNotes": "Use Azure OpenAI v1 as the main LLM/audio integration surface. Use Azure Speech for broad STT/TTS locale and voice coverage. Keep preview/retiring Azure OpenAI audio models out of stable pickers. Fetch Speech voices live per region. Prefer Entra ID where supported; API keys are also supported."
    },
    "sources": [
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "title": "Foundry Models sold directly by Azure",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "regions"
        ]
      },
      {
        "url": "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "title": "Azure OpenAI Service pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "regions"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/reference",
        "title": "Azure OpenAI in Microsoft Foundry Models REST API reference",
        "type": "official",
        "lastUpdated": "2026-02-27",
        "usedFor": [
          "auth",
          "api"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle",
        "title": "Azure OpenAI in Microsoft Foundry Models v1 API",
        "type": "official",
        "lastUpdated": "2026-03-09",
        "usedFor": [
          "api",
          "integration",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio",
        "title": "Use the GPT Realtime API for speech and audio with Azure OpenAI",
        "type": "official",
        "lastUpdated": "2026-02-27",
        "usedFor": [
          "realtime",
          "limits",
          "protocols"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio-websockets",
        "title": "Use the GPT Realtime API via WebSockets",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "protocols"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/quotas-limits",
        "title": "Azure OpenAI in Microsoft Foundry Models quotas and limits",
        "type": "official",
        "lastUpdated": "2026-02-27",
        "usedFor": [
          "limits",
          "rate_limits",
          "batch"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "title": "Azure OpenAI in Microsoft Foundry Model Retirements",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text",
        "title": "Speech to text overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "batch",
          "realtime"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech",
        "title": "Text to speech API reference (REST)",
        "type": "official",
        "lastUpdated": "2025-10-21",
        "usedFor": [
          "tts",
          "voices",
          "auth"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support",
        "title": "Language and Voice Support for Azure Speech",
        "type": "official",
        "lastUpdated": "2026-02-09",
        "usedFor": [
          "stt",
          "tts",
          "languages"
        ]
      },
      {
        "url": "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/regions",
        "title": "Supported regions for Azure Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "data_residency",
          "speech"
        ]
      },
      {
        "url": "https://azure.microsoft.com/en-us/pricing/details/speech/",
        "title": "Azure Speech in Foundry Tools pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://azure.microsoft.com/en-us/pricing/free-services",
        "title": "Explore Free Azure Services",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "free_tier"
        ]
      },
      {
        "url": "https://www.microsoft.com/en-us/about/office-locations",
        "title": "Microsoft Office Locations",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "hq"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
