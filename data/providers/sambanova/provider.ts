import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "sambanova",
    "providerName": "Sambanova",
    "categoryName": "AI inference platform / hosted model API",
    "hq": "Palo Alto, California, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
      "https://docs.sambanova.ai/docs/api-reference/models/get-environments-available-model-list-metadata",
      "https://cloud.sambanova.ai/plans/pricing",
      "https://docs.sambanova.ai/docs/en/models/rate-limits",
      "https://docs.sambanova.ai/docs/en/features/audio",
      "https://docs.sambanova.ai/docs/en/features/openai-compatibility",
      "https://docs.sambanova.ai/docs/en/get-started/api-keys-urls",
      "https://docs.sambanova.ai/docs/en/models/deprecations",
      "https://docs.sambanova.ai/docs/en/integrations/livekit",
      "https://docs.sambanova.ai/docs/en/integrations/pipecat",
      "https://docs.sambanova.ai/docs/en/integrations/aws",
      "https://sambanova.ai/products/sambacloud",
      "https://trust.sambanova.ai/"
    ],
    "integration": {
      "catalogType": "Hosted inference platform with a fixed docs table plus live model-discovery endpoint",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Public pay-as-you-go pricing is published per model. LLM pricing is per million input/output tokens; Whisper STT is priced per input audio hour. No public native TTS pricing found.",
      "limits": "25 API keys per user. Whisper upload limit is 25 MB. Llama-4-Maverick image input supports up to 5 images, each <= 20 MB. Developer tier has 20M tokens/day across all models; per-model RPM/RPD limits vary.",
      "region": "Public developer docs expose a global base URL (api.sambanova.ai). The only explicit regioning found in public integration docs is AWS PrivateLink in us-west-1. No public self-serve developer-region matrix found.",
      "sttLanguages": "Official docs only say Whisper-Large-v3 is multilingual; no provider-side enumerated language list found.",
      "ttsLanguages": "Unsupported natively; no public SambaNova TTS API found.",
      "freeTier": "$5 signup credit, expiring after 30 days according to current plan page. Free-tier rate limits also apply when no payment method is linked.",
      "integrationNotes": "OpenAI-compatible API with base URL https://api.sambanova.ai/v1. Use live /models discovery because the fixed docs table, pricing page, and feature pages are not perfectly aligned. Native voice support is STT-only; real-time voice examples rely on third-party TTS."
    },
    "sources": [
      {
        "url": "https://docs.sambanova.ai/docs/en/models/sambacloud-models",
        "title": "SambaCloud Models Overview and Specifications",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "limits"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/api-reference/models/get-environments-available-model-list-metadata",
        "title": "Get environment's available model list metadata",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://cloud.sambanova.ai/plans/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/models/rate-limits",
        "title": "SambaNova Model Rate Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "models"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/features/audio",
        "title": "Implement Audio-Input Features",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "languages"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/features/openai-compatibility",
        "title": "Implement OpenAI-Compatible Features",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "protocols"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/get-started/api-keys-urls",
        "title": "Manage API Keys and URLs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "limits",
          "auth"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/models/deprecations",
        "title": "SambaNova Model Deprecations",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/integrations/livekit",
        "title": "LiveKit Integration Guide",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts",
          "realtime"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/integrations/pipecat",
        "title": "Pipecat Integration Guide",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts",
          "realtime"
        ]
      },
      {
        "url": "https://docs.sambanova.ai/docs/en/integrations/aws",
        "title": "AWS PrivateLink Integration Guide",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://sambanova.ai/products/sambacloud",
        "title": "SambaCloud",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "privacy",
          "models"
        ]
      },
      {
        "url": "https://trust.sambanova.ai/",
        "title": "SambaNova Systems Trust Center",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
