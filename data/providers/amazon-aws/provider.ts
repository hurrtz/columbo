import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "categoryName": "Cloud AI platform",
    "hq": "Seattle, Washington, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
      "https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html",
      "https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html",
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html",
      "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-mantle.html",
      "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
      "https://docs.aws.amazon.com/nova/latest/nova2-userguide/sonic-language-support.html",
      "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",
      "https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html",
      "https://docs.aws.amazon.com/general/latest/gr/transcribe.html",
      "https://aws.amazon.com/transcribe/pricing/",
      "https://docs.aws.amazon.com/polly/latest/dg/what-is.html",
      "https://docs.aws.amazon.com/polly/latest/dg/available-voices.html",
      "https://docs.aws.amazon.com/polly/latest/dg/limits.html",
      "https://aws.amazon.com/polly/pricing/"
    ],
    "integration": {
      "catalogType": "Hybrid: fixed first-party services plus dynamic Bedrock model marketplace",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "websocket"
      ],
      "regionSplitRecommended": true
    },
    "summaries": {
      "pricing": "Bedrock pricing is provider/model-specific and should be treated as live data; AWS publicly states select Bedrock batch inference is 50% cheaper than on-demand. Transcribe is billed by audio seconds/minutes, with official pricing tables split by batch/streaming and feature tier. Polly pricing is explicit: Standard $4/1M chars, Neural $16/1M, Generative $30/1M, Long-form $100/1M.",
      "limits": "Bedrock quotas are account/region/model dependent. Transcribe publishes hard limits such as 2 GB max file size, 4 hour max audio length, 25 concurrent streams, and 25 TPS on stream-start APIs. Polly publishes 3,000 billed chars (6,000 total) per SynthesizeSpeech call, 10-minute output limit, and engine-specific TPS/concurrency quotas.",
      "region": "Bedrock supports In-Region, Geographic cross-Region, and Global cross-Region routing with different data-residency implications. Transcribe and Polly are regional AWS services with region-specific endpoints and availability.",
      "sttLanguages": "Amazon Transcribe is multilingual and publishes a language/features matrix rather than a simple stable count. Batch and streaming language coverage differ by feature.",
      "ttsLanguages": "Amazon Polly publishes a voice table by language/locale and engine support; voice availability is engine-dependent.",
      "freeTier": "Polly has a documented free tier by engine. Current Bedrock and Transcribe service-specific free entitlements were not cleanly verifiable from the official crawl; treat as unknown unless re-checked live.",
      "integrationNotes": "Use canonical Bedrock model IDs for stable picker entries and keep inference-profile aliases separate. Do not model Transcribe or Polly as LLM-like model catalogs. Treat OpenAI compatibility as Bedrock-only and partial."
    },
    "sources": [
      {
        "url": "https://ir.aboutamazon.com/faqs/default.aspx",
        "title": "Amazon IR FAQ",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "provider"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html",
        "title": "Models at a glance - Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "catalog",
          "limits"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "title": "Supported foundation models in Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "regions"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html",
        "title": "Model lifecycle - Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "deprecations"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html",
        "title": "API compatibility - Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "openai-compatibility",
          "models"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-mantle.html",
        "title": "Generate responses using OpenAI APIs - Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "openai-compatibility",
          "protocols",
          "auth"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html",
        "title": "Regional availability - Amazon Bedrock",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",
        "title": "What is Amazon Transcribe?",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "pricing"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html",
        "title": "Supported languages and language-specific features - Amazon Transcribe",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "languages"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/general/latest/gr/transcribe.html",
        "title": "Amazon Transcribe endpoints and quotas",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "regions"
        ]
      },
      {
        "url": "https://aws.amazon.com/transcribe/pricing/",
        "title": "Amazon Transcribe Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/polly/latest/dg/what-is.html",
        "title": "What is Amazon Polly?",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/polly/latest/dg/available-voices.html",
        "title": "Available voices - Amazon Polly",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://docs.aws.amazon.com/polly/latest/dg/limits.html",
        "title": "Quotas in Amazon Polly",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits"
        ]
      },
      {
        "url": "https://aws.amazon.com/polly/pricing/",
        "title": "Amazon Polly Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "tts",
          "freeTier"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
