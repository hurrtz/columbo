import { createProviderContext, defineProviderDefinition } from "../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "ibm-watsonx",
    "providerName": "IBM Watsonx",
    "categoryName": "Enterprise AI platform with native LLMs plus separate IBM Cloud speech APIs",
    "hq": "Armonk, New York, United States",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models",
      "https://www.ibm.com/products/watsonx-ai/pricing",
      "https://www.ibm.com/docs/en/watsonx/saas?topic=models-model-gateway-preview",
      "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-service-features",
      "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-http",
      "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-websockets",
      "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-summary",
      "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-data-security",
      "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-service-features",
      "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices",
      "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices-list",
      "https://www.ibm.com/products/cloud/free",
      "https://www.ibm.com/products/text-to-speech",
      "https://www.ibm.com/products/speech-to-text"
    ],
    "integration": {
      "catalogType": "Mixed: fixed native watsonx.ai catalog + dynamic gateway preview + dynamic speech voice listing",
      "coverage": "Mostly exhaustive",
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
      "pricing": "watsonx.ai LLM pricing is public and model-specific. Speech free-tier quotas are public, but paid STT/TTS unit pricing is not cleanly verifiable from current crawlable official docs; IBM product pages confirm free tiers and plan structure.",
      "limits": "watsonx.ai model limits vary by model; common current context windows are 131072 tokens for several flagship models. STT sync HTTP max audio is 100 MB; STT WebSocket max audio per send is 100 MB and max frame size is 4 MB. TTS input limits are 8 KB total for GET, 5 KB text body for POST, and 5 KB text for WebSocket.",
      "region": "watsonx.ai model availability varies by data center location. Model Gateway preview is Toronto-only. Speech services are regional IBM Cloud instances and have separate IBM Cloud regional endpoints.",
      "sttLanguages": "Broad coverage. Large speech models are locale-style IDs such as en-US, en-GB, fr-FR, de-DE, ja-JP, pt-BR, pt-PT, es-ES, es-MX and others. Next-generation multimedia/telephony models cover additional languages including Arabic, Chinese, Czech, Dutch, Italian, Korean and more.",
      "ttsLanguages": "Voice-dependent. IBM documents Natural, Expressive neural, and Enhanced neural voices across English, Portuguese, Spanish and selected other languages; API voice list is dynamic via GET /v1/voices.",
      "freeTier": "watsonx.ai free toolbox playground: up to 300000 foundation-model tokens/month. Speech to Text: 500 minutes/month. Text to Speech: 10000 characters/month.",
      "integrationNotes": "Do not model IBM as one monolithic endpoint. Native watsonx.ai and IBM Cloud speech are separate integrations. Use canonical provider-prefixed LLM IDs from the supported-models page. Treat TTS voices as dynamic/live-discovered. Treat Model Gateway as routed preview support, not as proof that all native models are OpenAI-compatible."
    },
    "sources": [
      {
        "url": "https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models",
        "title": "Supported foundation models in watsonx.ai",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "pricing",
          "limits",
          "regions"
        ]
      },
      {
        "url": "https://www.ibm.com/products/watsonx-ai/pricing",
        "title": "watsonx.ai pricing",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "models",
          "freeTier"
        ]
      },
      {
        "url": "https://www.ibm.com/docs/en/watsonx/saas?topic=models-model-gateway-preview",
        "title": "Model gateway (preview)",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "models",
          "integration",
          "regions"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-service-features",
        "title": "Speech to Text service features",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "realtime"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-http",
        "title": "Speech to Text synchronous HTTP interface",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "batch"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-websockets",
        "title": "Speech to Text WebSocket interface",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "realtime"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-summary",
        "title": "Speech to Text parameter summary",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "stt",
          "limits",
          "features"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-data-security",
        "title": "Speech to Text data security",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "regions",
          "compliance",
          "auth"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-service-features",
        "title": "Text to Speech service features",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "limits",
          "realtime"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices",
        "title": "Text to Speech languages and voices",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "languages",
          "voices"
        ]
      },
      {
        "url": "https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices-list",
        "title": "Listing information about voices",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "tts",
          "integration",
          "dynamicCatalog"
        ]
      },
      {
        "url": "https://www.ibm.com/products/cloud/free",
        "title": "IBM Cloud Free Tier",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "freeTier",
          "stt",
          "tts"
        ]
      },
      {
        "url": "https://www.ibm.com/products/text-to-speech",
        "title": "IBM Watson Text to Speech",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "tts",
          "freeTier"
        ]
      },
      {
        "url": "https://www.ibm.com/products/speech-to-text",
        "title": "IBM Watson Speech to Text",
        "type": "official",
        "lastUpdated": null,
        "usedFor": [
          "pricing",
          "stt",
          "freeTier"
        ]
      }
    ]
  },
);

export const providerContext = createProviderContext(providerDefinition);
