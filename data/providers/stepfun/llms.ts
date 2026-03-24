import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-3.5-flash",
      "publicName": "Step 3.5 Flash",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a50.7 / 1M input tokens uncached, \u00a50.14 / 1M cached input tokens, \u00a52.1 / 1M output tokens.",
      "limitsSummary": "Model overview lists 256K max context. General account-tier limits apply; no model-specific RPM/TPM published.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "General chat model; docs present it as multilingual but no formal language matrix published.",
      "notes": "Recommended by Stepfun for initial validation. Supports reasoning, tool calling, and web search per model overview.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/modeloverview",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/overview/quickstart"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1016,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a50.7 / 1M input tokens uncached; USD conversion is an inference using ~1 CNY = $0.1451 on 2026-03-24."
        },
        {
          "amountUsd": 0.3047,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a52.1 / 1M output tokens; USD conversion is an inference using ~1 CNY = $0.1451 on 2026-03-24."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 256000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u6700\u5927\u4e0a\u4e0b\u6587 256K"
        }
      ],
      "languageSupport": {
        "rawText": "Docs position it as a general multilingual chat model, but no formal language list is published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language matrix not formally published"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-3",
      "publicName": "Step 3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price is tiered by prompt/output size: \u00a51.5 / 1M uncached input and \u00a54 or \u00a58 / 1M output when input <=4K; \u00a54 / 1M uncached input and \u00a510 / 1M output when 4K < input <=64K.",
      "limitsSummary": "Model overview lists 64K max context.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Multimodal reasoning model with image understanding; no formal language matrix published.",
      "notes": "Model overview marks image understanding and reasoning. Pricing varies materially by prompt/output regime, so UI should display rule-based pricing instead of a single flat rate.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/modeloverview",
        "https://platform.stepfun.com/docs/zh/pricing/details"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2177,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a51.5 / 1M uncached input when input <=4K."
        },
        {
          "amountUsd": 0.5804,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a54 / 1M output when input <=4K and output <=4K."
        },
        {
          "amountUsd": 1.1608,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a58 / 1M output when input <=4K and output >4K."
        },
        {
          "amountUsd": 0.5804,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a54 / 1M uncached input when 4K < input <=64K."
        },
        {
          "amountUsd": 1.451,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a510 / 1M output when 4K < input <=64K."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u6700\u5927\u4e0a\u4e0b\u6587 64k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal",
          "image-understanding"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-2-mini",
      "publicName": "Step 2 Mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a51 / 1M uncached input, \u00a50.2 / 1M cached input, \u00a52 / 1M output.",
      "limitsSummary": "Model overview lists 32K context.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "General text model; docs describe it as multilingual but do not publish a formal language table.",
      "notes": "Docs call this the recommended Step-2 model and highlight tool calling, web search, JSON mode, and knowledge-base support.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/modeloverview",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/llm/text"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1451,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a51 / 1M uncached input."
        },
        {
          "amountUsd": 0.2902,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a52 / 1M output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u6700\u5927\u4e0a\u4e0b\u6587 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No formal language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "json-mode",
          "tool-calling",
          "knowledge-base"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-1o-audio",
      "publicName": "Step 1o Audio",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a525 / 1M uncached input, \u00a55 / 1M cached input, \u00a560 / 1M output.",
      "limitsSummary": "No public context window found. Chat API audio output supports wav in non-streaming mode and pcm in streaming mode; Realtime uses WebSocket.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs show multiple preset voice styles but do not publish a formal language matrix for this model.",
      "notes": "End-to-end audio chat model, usable via Chat API and Realtime API. Supports tool calling in docs.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/realtime",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/chat/chat-completion-create",
        "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.6275,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a525 / 1M uncached input."
        },
        {
          "amountUsd": 8.706,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a560 / 1M output."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "=",
          "value": 24000,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "In Chat streaming mode, audio output only supports pcm (24khz, mono, 16bit)."
        }
      ],
      "languageSupport": {
        "rawText": "Multiple preset voice styles are documented; no formal language coverage matrix found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "end-to-end audio",
          "tool-calling"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-audio-2",
      "publicName": "Step Audio 2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official price: \u00a510 / 1M uncached input, \u00a52 / 1M cached input, \u00a570 / 1M output.",
      "limitsSummary": "No public context window found. Realtime API supports this model over WebSocket; Chat API can return text+audio.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs say it understands Mandarin Chinese, Chinese dialects, English, and Japanese.",
      "notes": "The strongest currently documented end-to-end voice model for a voice-first app. Supports native tool calling, web search, voice cloning, emotion/prosody control, and audio understanding.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/realtime",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/chat/chat-completion-create",
        "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.451,
          "unit": "million_input_tokens",
          "sourceText": "Official price is \u00a510 / 1M uncached input."
        },
        {
          "amountUsd": 10.157,
          "unit": "million_output_tokens",
          "sourceText": "Official price is \u00a570 / 1M output."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Docs say the model can understand Mandarin Chinese, Chinese dialects, English, and Japanese.",
        "isMultilingual": true,
        "languageCount": 4,
        "voiceCount": 4,
        "listedLanguages": [
          "Mandarin Chinese",
          "Chinese dialects",
          "English",
          "Japanese"
        ],
        "notes": [
          "voice-count here refers only to the four explicitly documented built-in Chat/Reatime voices",
          "voice-cloning supported"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-audio-2-mini",
      "publicName": "Step Audio 2 Mini",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "No separate public pricing row found; likely covered operationally by realtime/chat usage, but pricing is not explicitly published in the official pricing table.",
      "limitsSummary": "Realtime-capable. In Realtime docs, built-in voices are limited to qingchunshaonv and wenrounansheng.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "Docs describe it as similar to step-audio-2 but do not publish its own formal language matrix.",
      "notes": "Good low-latency alternative to step-audio-2. Keep in stable picker only if your app wants a small/fast voice model option.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/realtime",
        "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat",
        "https://platform.stepfun.com/docs/zh/api-reference/chat/chat-completion-create"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No standalone language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 2,
        "listedLanguages": [],
        "notes": [
          "two explicitly documented built-in Realtime voices",
          "tool-calling",
          "web-search"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "stepfun",
      "providerName": "Stepfun",
      "service": "llm",
      "modelId": "step-audio-r1.1",
      "publicName": "Step Audio R1.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official pricing table marks input, cached input, and output as \u9650\u514d\u4e2d (temporarily free).",
      "limitsSummary": "Realtime-capable; no public context limit found.",
      "regionSummary": "No model-specific region controls documented.",
      "languagesSummary": "No formal language matrix published.",
      "notes": "Reasoning-focused speech model. Suitable for advanced voice agents, but temporary-free pricing and evolving positioning make it less stable for hardcoded pricing UX.",
      "officialSources": [
        "https://platform.stepfun.com/docs/zh/llm/realtime",
        "https://platform.stepfun.com/docs/zh/pricing/details",
        "https://platform.stepfun.com/docs/zh/api-reference/realtime/chat"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "No formal language matrix published.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "reasoning-first voice model",
          "pricing temporary/free"
        ]
      }
    }
  ),
]);
