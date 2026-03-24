import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "nvidia-nim",
    "providerName": "NVIDIA (NIM)",
    "categoryName": "AI inference platform / hosted model catalog + self-hosted microservices",
    "hq": "Santa Clara, California, USA",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://docs.api.nvidia.com/nim/docs/introduction",
      "https://docs.api.nvidia.com/nim/reference/llm-apis",
      "https://docs.api.nvidia.com/nim/reference/create_chat_completion_v1_chat_completions_post",
      "https://build.nvidia.com/explore/speech",
      "https://docs.api.nvidia.com/nim/docs/product",
      "https://docs.api.nvidia.com/nim/docs/run-anywhere",
      "https://docs.nvidia.com/nim/riva/asr/latest/getting-started.html",
      "https://docs.nvidia.com/nim/riva/asr/latest/realtime-asr.html",
      "https://docs.nvidia.com/nim/riva/asr/latest/support-matrix.html",
      "https://docs.nvidia.com/nim/riva/tts/latest/getting-started.html",
      "https://docs.nvidia.com/nim/riva/tts/latest/realtime-tts.html",
      "https://docs.nvidia.com/nim/riva/tts/latest/support-matrix.html"
    ],
    "integration": {
      "catalogType": "Hosted API catalog plus downloadable/self-hosted NIM and Riva microservices",
      "coverage": "Dynamic/non-exhaustive",
      "hasDynamicCatalog": true,
      "needsLiveDiscovery": true,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [
        "rest",
        "sse",
        "websocket",
        "grpc"
      ],
      "regionSplitRecommended": false
    },
    "summaries": {
      "pricing": "No public per-token/per-minute list pricing found for hosted NIM APIs as of 2026-03-24. Official pricing docs instead say developer-program access is free for prototyping, while production requires NVIDIA AI Enterprise starting at $4,500/GPU/year (~$1/GPU/hour in cloud), priced per GPU rather than per model.",
      "limits": "LLM limits are model-specific (for example 128K or 1M context). Public speech API examples show gRPC hosted access and self-hosted HTTP/gRPC/WebSocket APIs, but NVIDIA does not publish one provider-wide file-size/duration limit page for all hosted endpoints. Several hard limits are model-specific: Magpie Zeroshot/Flow audio prompts 3-10 seconds; Magpie Multilingual concurrency changed across releases; Parakeet true-offline profile chunks long audio into <=30s segments.",
      "region": "Examined model cards commonly state Deployment Geography: Global. Self-hosting is explicitly supported for customer-controlled environments.",
      "sttLanguages": "Native NVIDIA STT is split between English-first Parakeet CTC and multilingual Canary / Parakeet RNNT. Canary currently documents 26 ASR languages and 34 AST languages in self-hosted Riva docs.",
      "ttsLanguages": "Magpie TTS Multilingual is the primary native TTS option. Latest self-hosted support matrix lists 7 languages, while a newer build model card says 9 languages; this is a live docs/catalog conflict.",
      "freeTier": "Official docs state free NVIDIA Developer Program access for prototyping and free serverless APIs for development in the API catalog.",
      "integrationNotes": "Use OpenAI-compatible chat only for LLMs. Speech is better treated as a separate adapter family using Riva conventions (gRPC/HTTP/WebSocket, language_code, voice lists, sometimes function-id on hosted gRPC). Stable picker should be curated; long-tail catalog should come from live discovery."
    },
    "sources": [
      {
        "url": "https://docs.api.nvidia.com/nim/docs/introduction",
        "title": "NIM Overview",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://docs.api.nvidia.com/nim/docs/api-quickstart",
        "title": "API Catalog Quickstart Guide",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration"
        ]
      },
      {
        "url": "https://docs.api.nvidia.com/nim/reference/llm-apis",
        "title": "LLM APIs",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "integration"
        ]
      },
      {
        "url": "https://docs.api.nvidia.com/nim/reference/create_chat_completion_v1_chat_completions_post",
        "title": "Create a chat completion",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "llm",
          "integration"
        ]
      },
      {
        "url": "https://build.nvidia.com/explore/speech",
        "title": "Explore Speech Models",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "tts",
          "models"
        ]
      },
      {
        "url": "https://docs.api.nvidia.com/nim/docs/product",
        "title": "General NIM FAQ",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "freeTier"
        ]
      },
      {
        "url": "https://docs.api.nvidia.com/nim/docs/run-anywhere",
        "title": "Run NIM Anywhere",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "regions",
          "integration"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/asr/latest/getting-started.html",
        "title": "Getting Started \u2014 NVIDIA NIM Riva ASR",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "protocols",
          "languages"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/asr/latest/realtime-asr.html",
        "title": "Realtime API Reference \u2014 NVIDIA NIM Riva ASR",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "protocols",
          "realtime"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/asr/latest/support-matrix.html",
        "title": "Support Matrix \u2014 NVIDIA NIM Riva ASR",
        "type": "official",
        "lastUpdated": "2026-03-03",
        "usedFor": [
          "stt",
          "limits",
          "languages",
          "regions"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/tts/latest/getting-started.html",
        "title": "Getting Started \u2014 NVIDIA NIM Riva TTS",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "protocols",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/tts/latest/realtime-tts.html",
        "title": "Realtime API Reference \u2014 NVIDIA NIM Riva TTS",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "protocols",
          "realtime"
        ]
      },
      {
        "url": "https://docs.nvidia.com/nim/riva/tts/latest/support-matrix.html",
        "title": "Support Matrix \u2014 NVIDIA NIM Riva TTS",
        "type": "official",
        "lastUpdated": "2026-03-03",
        "usedFor": [
          "tts",
          "limits",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://www.nvidia.com/en-us/contact/",
        "title": "Contact NVIDIA",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "hq"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
