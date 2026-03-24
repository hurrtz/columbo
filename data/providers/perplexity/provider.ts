import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "perplexity",
    "providerName": "Perplexity",
    "categoryName": "Web-grounded LLM and search platform",
    "hq": "Unknown",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.perplexity.ai/docs/getting-started/overview",
      "https://docs.perplexity.ai/docs/sonar/models",
      "https://docs.perplexity.ai/docs/getting-started/pricing",
      "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
      "https://docs.perplexity.ai/docs/sonar/openai-compatibility",
      "https://docs.perplexity.ai/docs/agent-api/quickstart",
      "https://docs.perplexity.ai/docs/agent-api/models",
      "https://docs.perplexity.ai/docs/resources/privacy-security",
      "https://docs.perplexity.ai/docs/resources/faq",
      "https://docs.perplexity.ai/docs/resources/feature-roadmap",
      "https://docs.perplexity.ai/docs/sonar/quickstart",
      "https://docs.perplexity.ai/docs/sonar/media",
      "https://docs.perplexity.ai/docs/search/quickstart",
      "https://docs.perplexity.ai/docs/search/filters/language-filter",
      "https://docs.perplexity.ai/docs/resources/changelog",
      "https://docs.perplexity.ai/docs/admin/api-key-management"
    ],
    "integration": {
      "catalogType": "Hybrid: fixed native Sonar catalog plus routed Agent API marketplace",
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
      "pricing": "Native Sonar API pricing is public and fixed by model; Search API is $5/1K requests; Agent API is routed pass-through pricing for currently listed provider models and is updated monthly. No public STT/TTS pricing because no shipped STT/TTS API is documented.",
      "limits": "128K context on Sonar family; 50MB image limit; 50MB file limit; max 30 files/request; max 30 returned images/response; search-language filter max 10 languages; search-domain filter max 20 entries; rate limits depend on usage tier.",
      "region": "API compute is documented as AWS in North America. No public regional deployment or data-residency selection is documented.",
      "sttLanguages": "Unsupported: no public STT API documented.",
      "ttsLanguages": "Unsupported: no public TTS API documented.",
      "freeTier": "No official free-trial or free-credit program was verified. Tier 0 exists with limited access, but the docs frame usage around prepaid API credits.",
      "integrationNotes": "Use Sonar for stable provider-native pickers. Use Agent API only behind live discovery because the routed third-party model list and pricing can change monthly. OpenAI compatibility exists, but Sonar and Agent use different canonical endpoints and response shapes."
    },
    "sources": [
      {
        "url": "https://docs.perplexity.ai/docs/getting-started/overview",
        "title": "Overview - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/sonar/models",
        "title": "Models - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/getting-started/pricing",
        "title": "Pricing - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers",
        "title": "Rate Limits & Usage Tiers - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/sonar/openai-compatibility",
        "title": "OpenAI SDK Compatibility - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/agent-api/quickstart",
        "title": "Agent API - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/agent-api/models",
        "title": "Models - Perplexity (Agent API)",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/resources/privacy-security",
        "title": "Privacy & Security - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/resources/faq",
        "title": "Frequently Asked Questions - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "limits",
          "pricing"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/resources/feature-roadmap",
        "title": "API Roadmap - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/sonar/quickstart",
        "title": "Sonar API - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/sonar/media",
        "title": "Media & Attachments - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/search/quickstart",
        "title": "Perplexity Search API - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/search/filters/language-filter",
        "title": "Search Language Filter - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/resources/changelog",
        "title": "Changelog - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.perplexity.ai/docs/admin/api-key-management",
        "title": "API Key Management - Perplexity",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
