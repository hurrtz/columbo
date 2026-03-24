import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "deepseek",
    "providerName": "Deepseek",
    "categoryName": "Foundation model API provider",
    "hq": "Hangzhou, China (inference from legal entity name; official privacy policy states only that the registered address is in China)",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://api-docs.deepseek.com/",
      "https://api-docs.deepseek.com/quick_start/pricing",
      "https://api-docs.deepseek.com/api/list-models",
      "https://api-docs.deepseek.com/api/create-chat-completion",
      "https://api-docs.deepseek.com/guides/thinking_mode",
      "https://api-docs.deepseek.com/guides/tool_calls",
      "https://api-docs.deepseek.com/quick_start/rate_limit",
      "https://api-docs.deepseek.com/faq",
      "https://api-docs.deepseek.com/guides/anthropic_api",
      "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html"
    ],
    "integration": {
      "catalogType": "Small hosted alias catalog with a models endpoint; canonical IDs are stable aliases that can be repointed to newer underlying model versions",
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
      "pricing": "Current official pricing page lists only deepseek-chat and deepseek-reasoner. deepseek-chat: $0.028/M input cache-hit, $0.28/M input cache-miss, $0.42/M output. deepseek-reasoner: $0.14/M input cache-hit, $0.55/M input cache-miss, $2.19/M output. Context caching is enabled by default.",
      "limits": "Current pricing page states 128K context for both public model IDs. deepseek-chat max output: default 4K, maximum 8K. deepseek-reasoner max output: default 32K, maximum 64K. Rate limits are dynamic rather than fixed. If a queued request has not started inference after 10 minutes, the server closes the connection.",
      "region": "Official privacy policy says personal data may be stored outside the user's country and that DeepSeek directly collects, processes, and stores personal data in the PRC. No public API region selector or data-residency option was found.",
      "sttLanguages": "Unsupported: no official public STT API documentation found.",
      "ttsLanguages": "Unsupported: no official public TTS API documentation found.",
      "freeTier": "Unknown for API. Open Platform terms say DeepSeek may provide free quota during internal testing or other activities and that users may request more free quota, but no standing public free-tier schedule was found.",
      "integrationNotes": "Best app integration is via OpenAI-compatible chat completions over REST, with optional SSE streaming. Anthropic-format compatibility is also documented. Use stable picker IDs deepseek-chat and deepseek-reasoner, but rely on live discovery and docs checks because these IDs are movable aliases to newer underlying versions."
    },
    "sources": [
      {
        "url": "https://api-docs.deepseek.com/",
        "title": "Your First API Call | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration",
          "protocols",
          "openai-compatibility"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/quick_start/pricing",
        "title": "Models & Pricing | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/api/list-models",
        "title": "Lists Models | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/api/create-chat-completion",
        "title": "Create Chat Completion | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "protocols",
          "tool-calling",
          "streaming"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/guides/thinking_mode",
        "title": "Thinking Mode | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": "2025-12-01",
        "usedFor": [
          "models",
          "limits",
          "tool-calling"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/guides/tool_calls",
        "title": "Tool Calls | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tool-calling",
          "limits"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/quick_start/rate_limit",
        "title": "Rate Limit | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "protocols",
          "rate-limits"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/faq",
        "title": "FAQ | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "rate-limits",
          "integration"
        ]
      },
      {
        "url": "https://api-docs.deepseek.com/guides/anthropic_api",
        "title": "Anthropic API | DeepSeek API Docs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "protocols"
        ]
      },
      {
        "url": "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html",
        "title": "DeepSeek Privacy Policy",
        "type": "official",
        "lastUpdated": "2026-02-10",
        "usedFor": [
          "regions",
          "privacy",
          "voice-input-handling"
        ]
      },
      {
        "url": "https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html",
        "title": "DeepSeek Open Platform Terms of Service",
        "type": "official",
        "lastUpdated": "2025-01-20",
        "usedFor": [
          "free-tier",
          "developer-terms"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
