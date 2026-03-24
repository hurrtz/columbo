import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "baichuan",
    "providerName": "Baichuan",
    "categoryName": "Foundation model provider",
    "hq": "Beijing, China",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://platform.baichuan-ai.com/docs/api",
      "https://platform.baichuan-ai.com/docs/text-Embedding",
      "https://platform.baichuan-ai.com/docs/file",
      "https://platform.baichuan-ai.com/docs/knowledgeBase",
      "https://platform.baichuan-ai.com/docs/assistants",
      "https://platform.baichuan-ai.com/docs/errCode",
      "https://platform.baichuan-ai.com/prices",
      "https://platform.baichuan-ai.com/article/privacy-agreement",
      "https://policy.baichuan-ai.com/mobile/sdk",
      "https://github.com/baichuan-inc/Baichuan-M3-235B/blob/main/README_en.md"
    ],
    "integration": {
      "catalogType": "Fixed hosted model catalog plus separate open-weight releases",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Hosted chat models are billed from the public prices page. Medical models use separate input/output prices; general models use combined token pricing. Search enhancement is billed separately at 0.03 CNY/request, medical search at 0.03 CNY/request. Embeddings are 0.0005 CNY per 1K tokens. Assistants API is listed as temporarily free.",
      "limits": "Verified limits are sparse. Confirmed: 50 MB max per uploaded document; knowledge-base storage cap 5 GB per user; embeddings rate limit 60 records/min for non-enterprise and 120 records/min for enterprise-certified accounts. Hosted context lengths shown publicly are mostly 32k, with 128k for Baichuan3-Turbo-128k.",
      "region": "China-centered service. Platform privacy policy identifies Beijing headquarters and PRC-law governance. No public multi-region deployment or customer-selectable data residency controls were found.",
      "sttLanguages": "Unsupported: no public Baichuan STT API documentation found.",
      "ttsLanguages": "Unsupported: no public Baichuan TTS API documentation found.",
      "freeTier": "Public pricing page says users registered from 2024-05-22 onward receive 80 CNY promotional credit valid for 3 months; Assistants API is marked temporarily free.",
      "integrationNotes": "Bearer API key auth. Hosted endpoints are OpenAI-shaped (/v1/chat/completions, /v1/embeddings), and ecosystem integrations treat them as OpenAI-compatible, but Baichuan\u2019s own docs do not prominently publish a formal compatibility statement. Tool-related fields and retrieval/web-search integration are documented. No verified WebSocket/gRPC/realtime speech APIs."
    },
    "sources": [
      {
        "url": "https://platform.baichuan-ai.com/docs/api",
        "title": "Baichuan API docs - chat/completions",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "llm",
          "auth",
          "tools"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/docs/text-Embedding",
        "title": "Baichuan embeddings API docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "auth"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/docs/file",
        "title": "Baichuan file API docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "files"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/docs/knowledgeBase",
        "title": "Baichuan knowledge base docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "retrieval",
          "files"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/docs/assistants",
        "title": "Baichuan assistants API docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "assistants",
          "auth"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/docs/errCode",
        "title": "Baichuan error codes",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "rate_limits",
          "auth"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/prices",
        "title": "Baichuan pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "limits",
          "deprecations",
          "free_tier"
        ]
      },
      {
        "url": "https://platform.baichuan-ai.com/article/privacy-agreement",
        "title": "Baichuan platform privacy policy",
        "type": "official",
        "lastUpdated": "2023-09-25",
        "usedFor": [
          "regions",
          "hq",
          "compliance"
        ]
      },
      {
        "url": "https://policy.baichuan-ai.com/mobile/sdk",
        "title": "Baixiaoying app third-party SDK list",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts",
          "speech"
        ]
      },
      {
        "url": "https://github.com/baichuan-inc/Baichuan-M3-235B/blob/main/README_en.md",
        "title": "Baichuan-M3-235B README",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "self_hosting",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://docs.langchain.com/oss/python/integrations/chat/baichuan",
        "title": "LangChain Chat with baichuan-192k integration",
        "type": "secondary",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "openai_compatibility"
        ]
      },
      {
        "url": "https://docs.console.zenlayer.com/api/compute/aig/dialogue-generation/baichuan-chat-completion",
        "title": "Zenlayer Baichuan AI API reference",
        "type": "secondary",
        "lastUpdated": "2025-03-04",
        "usedFor": [
          "openai_compatibility",
          "model_catalog_crosscheck"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
