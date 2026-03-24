import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "ai21-labs",
    "providerName": "AI21 Labs",
    "categoryName": "Enterprise LLM and agent platform",
    "hq": "Tel Aviv-Yafo, Israel",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "unsupported"
    },
    "officialSources": [
      "https://docs.ai21.com/home",
      "https://docs.ai21.com/docs/overview",
      "https://docs.ai21.com/docs/jamba-foundation-models",
      "https://www.ai21.com/pricing/",
      "https://docs.ai21.com/docs/usage-cost",
      "https://docs.ai21.com/docs/rate-limits",
      "https://docs.ai21.com/reference/jamba-1-6-api-ref",
      "https://docs.ai21.com/reference/jamba-api-response",
      "https://docs.ai21.com/docs/jamba-batch-api",
      "https://docs.ai21.com/docs/maestro-overview",
      "https://docs.ai21.com/reference/maestro-create-run",
      "https://docs.ai21.com/changelog",
      "https://docs.ai21.com/docs/model-availability-across-platforms",
      "https://www.ai21.com/deployment/",
      "https://docs.ai21.com/reference/authentication",
      "https://docs.ai21.com/docs/sdk",
      "https://docs.ai21.com/docs/responsible-use-1",
      "https://www.ai21.com/terms-policies/terms-of-use/",
      "https://www.ai21.com/terms-policies/privacy-policy/",
      "https://www.ai21.com/blog/introducing-jamba2/",
      "https://www.ai21.com/events/data-and-nlp-models-2025/"
    ],
    "integration": {
      "catalogType": "Fixed native Jamba catalog plus dynamic Maestro routed catalog",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": false,
      "lowConfidence": false,
      "openAiCompatible": false,
      "protocols": [
        "rest",
        "sse"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "Public pay-as-you-go pricing is documented for hosted Jamba Mini and Jamba Large on the AI21 platform. No public STT/TTS pricing exists. No public caching discount was found. Batch is documented, but public self-serve batch pricing was not found.",
      "limits": "Hosted Jamba Large and Jamba Mini are documented at 256K context, 4096 max output tokens, and 10 RPS / 200 RPM. File Library docs say 100MB per file and 1GB total, but file-count guidance conflicts between the Studio guide (50 files) and the API reference (unlimited files).",
      "region": "Public SaaS region-specific endpoints are not published in the docs reviewed. AI21 documents AI21-managed private deployment in customer VPCs and self-managed VPC/on-prem deployment. Privacy policy states personal data may be processed on servers in the United States.",
      "sttLanguages": "Unsupported; no public developer STT API was located during this audit.",
      "ttsLanguages": "Unsupported; no public developer TTS API was located during this audit.",
      "freeTier": "$10 credits for 3 months; no credit card required.",
      "integrationNotes": "Pin dated Jamba snapshot IDs in a stable picker. Treat versionless names and short aliases as moving pointers only. Do not flatten Maestro-routed third-party models into the AI21-native picker; they are dynamic and partly routed/BYOK. Hosted AI21 API is OpenAI-like but not explicitly documented as OpenAI-compatible; self-hosted vLLM deployment is OpenAI-compatible. AI21 Studio policy also requires at least 60 characters of developer-authored prompt text and harmful-content reporting once an app exceeds 100 monthly users."
    },
    "sources": [
      {
        "url": "https://docs.ai21.com/home",
        "title": "AI21 Labs Documentation \u2013 Start building your AI solution",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration",
          "speech"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/overview",
        "title": "Overview - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration",
          "protocols"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/jamba-foundation-models",
        "title": "Jamba - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "languages",
          "deprecations",
          "speech"
        ]
      },
      {
        "url": "https://www.ai21.com/pricing/",
        "title": "Pricing - Cost-Effective, Transparent Pricing for AI Products | AI21",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "freeTier"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/usage-cost",
        "title": "Pricing - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "freeTier"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/rate-limits",
        "title": "Rate Limits - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "rateLimits"
        ]
      },
      {
        "url": "https://docs.ai21.com/reference/jamba-1-6-api-ref",
        "title": "Chat request - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "limits",
          "protocols"
        ]
      },
      {
        "url": "https://docs.ai21.com/reference/jamba-api-response",
        "title": "Chat response - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "streaming",
          "protocols"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/jamba-batch-api",
        "title": "Batch API - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "batch",
          "limits"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/maestro-overview",
        "title": "Overview - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration",
          "routing"
        ]
      },
      {
        "url": "https://docs.ai21.com/reference/maestro-create-run",
        "title": "Create run - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "routing",
          "languages"
        ]
      },
      {
        "url": "https://docs.ai21.com/changelog",
        "title": "Changelog - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "routing",
          "dynamicCatalog",
          "deprecations"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/model-availability-across-platforms",
        "title": "Model Availability by Platform - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "deployment",
          "models"
        ]
      },
      {
        "url": "https://www.ai21.com/deployment/",
        "title": "AI21 Flexible AI Deployment Options",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "deployment",
          "compliance"
        ]
      },
      {
        "url": "https://docs.ai21.com/reference/authentication",
        "title": "Authentication - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth",
          "integration"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/sdk",
        "title": "SDK - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "sdk",
          "integration"
        ]
      },
      {
        "url": "https://docs.ai21.com/docs/responsible-use-1",
        "title": "Responsible Use - AI21 Labs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "integration",
          "policy",
          "limits"
        ]
      },
      {
        "url": "https://www.ai21.com/terms-policies/terms-of-use/",
        "title": "Terms of Use | AI21",
        "type": "official",
        "lastUpdated": "2025-07-29",
        "usedFor": [
          "dataUse",
          "compliance",
          "regions"
        ]
      },
      {
        "url": "https://www.ai21.com/terms-policies/privacy-policy/",
        "title": "Privacy Policy | AI21",
        "type": "official",
        "lastUpdated": "2025-07-29",
        "usedFor": [
          "regions",
          "privacy",
          "dataUse"
        ]
      },
      {
        "url": "https://www.ai21.com/blog/introducing-jamba2/",
        "title": "Introducing Jamba2: The open source model family for enterprise reliability and efficiency",
        "type": "official",
        "lastUpdated": "2026-01-08",
        "usedFor": [
          "models",
          "conflicts",
          "deployment"
        ]
      },
      {
        "url": "https://www.ai21.com/events/data-and-nlp-models-2025/",
        "title": "AI21 Labs & Data.IL: Israeli Innovation in AI & Data | AI21",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "company"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
