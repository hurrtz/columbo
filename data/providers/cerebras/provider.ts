import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "cerebras",
    "providerName": "Cerebras",
    "categoryName": "LLM inference provider",
    "hq": "Sunnyvale, California, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://inference-docs.cerebras.ai/introduction",
      "https://inference-docs.cerebras.ai/resources/openai",
      "https://inference-docs.cerebras.ai/models/overview",
      "https://inference-docs.cerebras.ai/support/rate-limits",
      "https://www.cerebras.ai/pricing",
      "https://inference-docs.cerebras.ai/api-reference/models/public-models",
      "https://inference-docs.cerebras.ai/integrations/livekit",
      "https://inference-docs.cerebras.ai/integrations/cartesia",
      "https://inference-docs.cerebras.ai/integrations/elevenlabs",
      "https://trust.cerebras.ai/"
    ],
    "integration": {
      "catalogType": "Fixed public shared catalog plus dynamic dedicated endpoints",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Public self-serve pricing is documented only for LLMs. No public native STT/TTS pricing was found. Llama 3.1 8B: $0.10/$0.10 per 1M input/output tokens. GPT OSS 120B: $0.35/$0.75. Qwen 3 235B Instruct: $0.60/$1.20. Z.ai GLM 4.7: $2.25/$2.75.",
      "limits": "Model-specific RPM/TPM limits. Free tier includes daily/hourly caps; self-serve paid tier uses pay-as-you-go and removes hourly/daily restrictions. Batch upload files up to 200 MB, JSONL only, 24h completion window, 7-day retention by default.",
      "region": "No public region-specific API base URLs or customer-selectable region controls were found. Company materials describe capacity in the US, Canada, and Europe, but not API-level region pinning.",
      "sttLanguages": "Unsupported natively. Unknown for routed partners because those are third-party services, not Cerebras-native API features.",
      "ttsLanguages": "Unsupported natively. Unknown for routed partners because those are third-party services, not Cerebras-native API features.",
      "freeTier": "Yes. Free API access is public. Pricing page advertises free access; model docs and rate-limit docs document free-tier context and limits.",
      "integrationNotes": "Use canonical model IDs exactly as documented. Do not expose prefixed integration aliases such as cerebras/gpt-oss-120b, cerebras:gpt-oss-120b, or zai-org/GLM-4.7:cerebras as native IDs. Treat dedicated-endpoint model IDs as tenant-specific dynamic IDs."
    },
    "sources": [
      {
        "url": "https://inference-docs.cerebras.ai/introduction",
        "title": "Cerebras Inference: Build with the Speed of Cerebras",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "openai",
          "protocols"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/resources/openai",
        "title": "OpenAI Compatibility",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "openai",
          "auth"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/models/overview",
        "title": "Supported Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "status",
          "catalog"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/api-reference/models/public-models",
        "title": "Public models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog",
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/support/rate-limits",
        "title": "Rate Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://www.cerebras.ai/pricing",
        "title": "Developer tier Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "freeTier"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/capabilities/streaming",
        "title": "Streaming Responses",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "realtime",
          "protocols"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/integrations/flutterflow",
        "title": "Get Started with FlutterFlow",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "protocols",
          "realtime"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/integrations/livekit",
        "title": "Get Started with LiveKit",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "speech",
          "integration"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/integrations/cartesia",
        "title": "Get Started with Cartesia",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "speech",
          "integration"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/api-reference/file/upload-file",
        "title": "Upload file",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/api-reference/batch/retrieve-batch",
        "title": "Retrieve batch",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://inference-docs.cerebras.ai/api-reference/batch/retrieve-batch-results",
        "title": "Retrieve batch results",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://trust.cerebras.ai/",
        "title": "Cerebras Systems Trust Center",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://www.cerebras.ai/customer-spotlights/national-center-for-supercomputing-applications",
        "title": "National Center for Supercomputing Applications",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "hq"
        ]
      },
      {
        "url": "https://www.cerebras.ai/press-release/cerebras-announces-six-new-ai-datacenters-across-north-america-and-europe-to-deliver-industry-s",
        "title": "Cerebras Announces Six New AI Datacenters Across North America and Europe",
        "type": "official",
        "lastUpdated": "2025-03-11",
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
