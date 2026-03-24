import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "hyperbolic",
    "providerName": "Hyperbolic",
    "categoryName": "AI inference cloud / model hosting marketplace",
    "hq": "Irvine, California, United States",
    "verifiedSupport": {
      "llm": "native",
      "stt": "unsupported",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.hyperbolic.ai/inference/overview",
      "https://docs.hyperbolic.ai/inference/performance-limits",
      "https://docs.hyperbolic.ai/inference/audio-apis",
      "https://docs.hyperbolic.ai/general/account-management",
      "https://app.hyperbolic.ai/models",
      "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing",
      "https://docs.hyperbolic.xyz/docs/inference-api",
      "https://docs.hyperbolic.xyz/docs/rest-api",
      "https://docs.hyperbolic.xyz/docs/supported-models",
      "https://www.hyperbolic.ai/privacy"
    ],
    "integration": {
      "catalogType": "Hosted model catalog / marketplace-style inference catalog",
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
      "pricing": "Hyperbolic publishes per-model or per-category pay-as-you-go rates. LLM/VLM pricing is usually expressed as a single per-1M-token price rather than separate input/output prices. TTS is $5.00 per 1M characters. Public STT pricing is not published because STT is not yet publicly available.",
      "limits": "Basic 60 RPM; Pro 600 RPM after a $5+ deposit; Enterprise unlimited/custom. All tiers have a 600 RPM per-IP cap. Special limits are published for Llama 3.1 405B and FLUX.1-dev. TTS docs state no per-request character limit. VLM docs state max image resolution 2048x2048, JPG/PNG, 1 image/request.",
      "region": "Public docs mention global CDN / multi-region deployment, but I found no public inference-region or data-residency matrix. Treat region/data residency as unknown for app-level guarantees.",
      "sttLanguages": "Unknown / not applicable yet. Docs say Whisper STT is coming soon, not publicly released.",
      "ttsLanguages": "6 documented languages: English, Spanish, French, Chinese, Japanese, Korean. English has 4 speaker variants; other languages currently have 1 documented speaker each.",
      "freeTier": "$1 promotional inference credit is available after phone verification. Pro tier requires a $5+ deposit.",
      "integrationNotes": "Use bearer API keys from the Hyperbolic dashboard. LLM/VLM use OpenAI-compatible chat completions at https://api.hyperbolic.xyz/v1/chat/completions. TTS uses a separate endpoint at /v1/audio/generation and is not documented as OpenAI-compatible. Because the model catalog is moving and exact canonical API IDs are under-documented for some newer models, stable hardcoded pickers should be conservative and supplemented by live discovery."
    },
    "sources": [
      {
        "url": "https://docs.hyperbolic.ai/inference/overview",
        "title": "Serverless Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "stt",
          "tts",
          "regions",
          "limits"
        ]
      },
      {
        "url": "https://docs.hyperbolic.ai/inference/performance-limits",
        "title": "Performance and Limits",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "limits",
          "pricing",
          "regions"
        ]
      },
      {
        "url": "https://docs.hyperbolic.ai/inference/audio-apis",
        "title": "Audio APIs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "pricing",
          "limits"
        ]
      },
      {
        "url": "https://docs.hyperbolic.ai/general/account-management",
        "title": "Account Management",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "auth",
          "freeTier"
        ]
      },
      {
        "url": "https://app.hyperbolic.ai/models",
        "title": "AI Models & Serverless Inference",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models"
        ]
      },
      {
        "url": "https://docs.hyperbolic.xyz/docs/hyperbolic-pricing",
        "title": "AI Inference Pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "limits",
          "models",
          "tts"
        ]
      },
      {
        "url": "https://docs.hyperbolic.xyz/docs/inference-api",
        "title": "OpenAI Compatible API",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "auth",
          "protocols"
        ]
      },
      {
        "url": "https://docs.hyperbolic.xyz/docs/rest-api",
        "title": "Text Generation",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "protocols",
          "limits"
        ]
      },
      {
        "url": "https://docs.hyperbolic.xyz/docs/supported-models",
        "title": "Supported Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "tts"
        ]
      },
      {
        "url": "https://www.hyperbolic.ai/privacy",
        "title": "Privacy Policy",
        "type": "official",
        "lastUpdated": "2024-06-03",
        "usedFor": [
          "regions"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
