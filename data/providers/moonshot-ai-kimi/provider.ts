import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "moonshot-ai-kimi",
    "providerName": "Moonshot AI (Kimi)",
    "categoryName": "LLM API provider",
    "hq": "Singapore (OpenPlatform controller per privacy policy); broader corporate HQ not verified from the official sources reviewed",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://platform.moonshot.ai/docs/overview",
      "https://platform.moonshot.ai/docs/introduction",
      "https://platform.moonshot.ai/docs/api/chat",
      "https://platform.moonshot.ai/docs/api/files",
      "https://platform.moonshot.ai/docs/api/estimate",
      "https://platform.moonshot.ai/docs/pricing/chat",
      "https://platform.moonshot.ai/docs/pricing/tools",
      "https://platform.moonshot.ai/docs/pricing/limits",
      "https://platform.moonshot.ai/docs/guide/start-using-kimi-api",
      "https://platform.moonshot.ai/docs/guide/migrating-from-openai-to-kimi",
      "https://platform.moonshot.ai/docs/guide/utilize-the-streaming-output-feature-of-kimi-api",
      "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model",
      "https://platform.moonshot.ai/docs/guide/use-official-tools",
      "https://platform.moonshot.ai/docs/agreement/userprivacy"
    ],
    "integration": {
      "catalogType": "Provider-owned fixed catalog with live-discoverable model list endpoint",
      "coverage": "Mostly exhaustive",
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
      "pricing": "Public LLM pricing is documented. kimi-k2.5: $0.10/M cached input, $0.60/M uncached input, $3.00/M output. kimi-k2 family and moonshot-v1 family also have published per-model token pricing. web-search is billed separately at $0.005 per triggered tool call on the international platform.",
      "limits": "Tiered rate limits by cumulative recharge. Minimum recharge to start: $1 on international platform. Tier0: concurrency 1, RPM 3, TPM 500,000, TPD 1,500,000. File limits: 1000 files/user, 100MB/file, 10GB total.",
      "region": "International OpenPlatform privacy policy says services are provided and controlled by MOONSHOT AI PTE. LTD. in Singapore. I did not find public data-residency guarantees or region pinning docs.",
      "sttLanguages": "No public STT API found; unknown.",
      "ttsLanguages": "No public TTS API found; unknown.",
      "freeTier": "No true free tier found. API usage requires at least $1 recharge to start; reaching $5 cumulative recharge grants a $5 voucher.",
      "integrationNotes": "Use https://api.moonshot.ai/v1 with an API key from the Kimi Open Platform. OpenAI SDKs are officially supported. Streaming is via chat.completions stream mode. For model enumeration, use GET /v1/models rather than hard-coding alone."
    },
    "sources": [
      {
        "url": "https://platform.moonshot.ai/docs/overview",
        "title": "Welcome to Kimi API Docs",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/introduction",
        "title": "Main Concepts",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/api/chat",
        "title": "Basic Information",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "models",
          "limits",
          "realtime"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/api/files",
        "title": "Files",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/api/estimate",
        "title": "Estimate Tokens",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "limits",
          "vision"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/pricing/chat",
        "title": "Model Inference Pricing Explanation",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "pricing",
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/pricing/tools",
        "title": "WebSearch Pricing",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "pricing"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/pricing/limits",
        "title": "Recharge and Rate Limits",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "limits",
          "freeTier"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/guide/start-using-kimi-api",
        "title": "Quickstart with the Kimi API",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "integration",
          "openaiCompatibility"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/guide/migrating-from-openai-to-kimi",
        "title": "Migrating from OpenAI to Kimi API",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "integration",
          "openaiCompatibility"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/guide/utilize-the-streaming-output-feature-of-kimi-api",
        "title": "Use the Streaming Feature of the Kimi API",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "realtime"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/guide/use-kimi-vision-model",
        "title": "Use the Kimi Vision Model",
        "type": "official",
        "lastUpdated": "2026-03-11",
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/guide/use-official-tools",
        "title": "How to Use Official Tools in Kimi API",
        "type": "official",
        "lastUpdated": "2026-03-20",
        "usedFor": [
          "tools"
        ]
      },
      {
        "url": "https://platform.moonshot.ai/docs/agreement/userprivacy",
        "title": "Kimi OpenPlatform Privacy Policy",
        "type": "official",
        "lastUpdated": "2025-04-30",
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
