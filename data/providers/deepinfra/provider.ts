import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "deepinfra",
    "providerName": "DeepInfra",
    "categoryName": "Hosted multi-model inference platform / model marketplace",
    "hq": "Palo Alto, California, USA",
    "verifiedSupport": {
      "llm": "routed",
      "stt": "routed",
      "tts": "routed"
    },
    "officialSources": [
      "https://deepinfra.com/",
      "https://deepinfra.com/models",
      "https://deepinfra.com/docs/openai_api",
      "https://deepinfra.com/docs/deep_infra_api",
      "https://deepinfra.com/docs/advanced/rate-limits",
      "https://deepinfra.com/docs/data",
      "https://deepinfra.com/pricing",
      "https://deepinfra.com/models/automatic-speech-recognition/",
      "https://deepinfra.com/models/text-to-speech/",
      "https://deepinfra.com/docs/advanced/deprecated",
      "https://trust.deepinfra.com/",
      "https://trust.deepinfra.com/compliance",
      "https://deepinfra.com/docs/misc/subprocessors"
    ],
    "integration": {
      "catalogType": "Hosted third-party model marketplace with native DeepInfra API plus OpenAI-compatible API for LLMs/embeddings",
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
      "pricing": "Model-specific. LLMs commonly use per-million-token input/output/cached pricing; STT uses per-minute pricing; TTS uses per-million-character pricing. No single fixed provider-wide speech rate.",
      "limits": "Documented provider-wide limits include 200 concurrent requests per model by default and a 16,384 max output-token limit per request. No universal public STT/TTS file-size or duration cap verified.",
      "region": "Homepage says DeepInfra runs in US-based data centers. Public trust materials show SOC 2, ISO 27001, and GDPR references. I found no public doc promising EU data residency.",
      "sttLanguages": "Model-dependent. Whisper large-v3-turbo is multilingual; upstream model card indicates 99 languages.",
      "ttsLanguages": "Model-dependent. Qwen3-TTS documents 10 languages; Chatterbox Multilingual documents 23 languages; others vary by model.",
      "freeTier": "Unknown. No official free-tier or trial-credit page verified.",
      "integrationNotes": "Use OpenAI-compatible API only for LLMs and embeddings. Use DeepInfra native API for STT, TTS, and the broader model catalog. Treat picker inventory as curated + live-discovery rather than exhaustive."
    },
    "sources": [
      {
        "url": "https://deepinfra.com/",
        "title": "Machine Learning Models and Infrastructure | Deep Infra",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "provider",
          "regions",
          "compliance",
          "catalog"
        ]
      },
      {
        "url": "https://deepinfra.com/models",
        "title": "Models | Machine Learning Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "catalog"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/openai_api",
        "title": "OpenAI API | DeepInfra",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "protocols",
          "openai_compatibility",
          "streaming"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/deep_infra_api",
        "title": "DeepInfra API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "stt",
          "tts",
          "protocols",
          "integration"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/advanced/rate-limits",
        "title": "Rate Limits of the DeepInfra endpoints",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "rate_limits"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/advanced/max_tokens_limit",
        "title": "Understanding Max Output Tokens Limit of DeepInfra",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "llm"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/data",
        "title": "Data privacy during Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "privacy",
          "regions"
        ]
      },
      {
        "url": "https://deepinfra.com/models/automatic-speech-recognition/",
        "title": "Automatic Speech Recognition",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "models",
          "pricing"
        ]
      },
      {
        "url": "https://deepinfra.com/models/text-to-speech/",
        "title": "Text To Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "models",
          "pricing"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/advanced/deprecated",
        "title": "Deprecated models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "deprecation",
          "aliases",
          "integration"
        ]
      },
      {
        "url": "https://deepinfra.com/docs/misc/subprocessors",
        "title": "Deep Infra Subprocessors",
        "type": "official",
        "lastUpdated": "2024-09-06",
        "usedFor": [
          "regions",
          "compliance"
        ]
      },
      {
        "url": "https://trust.deepinfra.com/",
        "title": "DeepInfra Trust Center",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "compliance",
          "security"
        ]
      },
      {
        "url": "https://trust.deepinfra.com/compliance",
        "title": "Compliance frameworks followed by DeepInfra",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "compliance"
        ]
      },
      {
        "url": "https://deepinfra.com/privacy",
        "title": "DeepInfra Privacy Policy",
        "type": "official",
        "lastUpdated": "2025-05-13",
        "usedFor": [
          "privacy",
          "compliance"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
