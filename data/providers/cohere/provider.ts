import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "cohere",
    "providerName": "Cohere",
    "categoryName": "Enterprise LLM API",
    "hq": "Toronto, Ontario, Canada",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.cohere.com/docs/models",
      "https://docs.cohere.com/reference/about",
      "https://docs.cohere.com/reference/list-models",
      "https://docs.cohere.com/docs/compatibility-api",
      "https://docs.cohere.com/reference/chat-stream",
      "https://docs.cohere.com/docs/rate-limits",
      "https://cohere.com/pricing",
      "https://docs.cohere.com/docs/deprecations",
      "https://cohere.com/about",
      "https://trustcenter.cohere.com/"
    ],
    "integration": {
      "catalogType": "Fixed first-party catalog with some specialized/sales-gated variants",
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
      "pricing": "Public token pricing is documented for Command A, Command R, Command R+, Command R7B, and Aya Expanse. Command A Reasoning, Command A Vision, and Command A Translate are documented as free until rate limits are reached, with production access constrained/sales-routed. Public page pricing for Embed/Rerank API consumption was not verifiable from the captured official pricing page; only Model Vault instance pricing and legacy FAQ text were clearly visible.",
      "limits": "Trial keys are free but limited to 1,000 API calls/month. Chat trial is 20 req/min per listed model; production is 500 req/min for Command A, Command R+, Command R, and Command R7B. Image-capable chat requests allow up to 20 images or 20 MB total. Embed Jobs are async batch embeddings but only for embed v3.0.",
      "region": "Public docs emphasize private deployment, VPC, and on-prem options. Trust Center states GDPR-oriented controls and a DPA, but I did not find a public API-region matrix or public data-residency-by-endpoint table.",
      "sttLanguages": "Unsupported: no public developer STT API verified.",
      "ttsLanguages": "Unsupported: no public developer TTS API verified.",
      "freeTier": "Yes. Trial API keys are created automatically, trial API calls are free, and trial usage is limited.",
      "integrationNotes": "Use Chat API for LLMs, optionally through the OpenAI compatibility base URL. Prefer canonical dated model IDs. Do not rely on deprecated aliases. Treat reasoning/vision/translate as specialized and feature-flagged. No verified public speech stack."
    },
    "sources": [
      {
        "url": "https://docs.cohere.com/docs/models",
        "title": "An Overview of Cohere's Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.cohere.com/reference/about",
        "title": "Working with Cohere's API and SDK",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.cohere.com/reference/list-models",
        "title": "List Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.cohere.com/docs/compatibility-api",
        "title": "Using Cohere models via the OpenAI SDK",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits"
        ]
      },
      {
        "url": "https://docs.cohere.com/reference/chat-stream",
        "title": "Chat with Streaming",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits"
        ]
      },
      {
        "url": "https://docs.cohere.com/docs/rate-limits",
        "title": "Different Types of API Keys and Rate Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://cohere.com/pricing",
        "title": "Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://docs.cohere.com/docs/deprecations",
        "title": "Deprecations",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://cohere.com/about",
        "title": "About Our Company",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      },
      {
        "url": "https://trustcenter.cohere.com/",
        "title": "Cohere Trust Center",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
