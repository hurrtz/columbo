import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-4.1",
      "publicName": "GPT-4.1",
      "aliases": [
        "gpt-4.1-2025-04-14"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Verified official pricing snippet shows Global pricing at $2 input / $8 output per 1M tokens; priority and batch prices are also published on the Azure pricing page.",
      "limitsSummary": "Context window 1,047,576 tokens; 128,000 for standard & provisioned managed deployments; 300,000 for batch deployments; max output 32,768 tokens.",
      "regionSummary": "See Azure models table; available in multiple Azure regions and deployment types.",
      "languagesSummary": "General multilingual LLM; no fixed locale list published.",
      "notes": "Supports text+image input, text output, chat completions, responses API, streaming, function calling, structured outputs. Published retirement replacement is gpt-5.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 2.0,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4.1-2025-04-14 Global, Input: $2."
        },
        {
          "amountUsd": 8.0,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4.1-2025-04-14 Global, ... Output: $8."
        },
        {
          "amountUsd": 1.0,
          "unit": "million_input_tokens",
          "sourceText": "Batch pricing snippet shows Input: $1."
        },
        {
          "amountUsd": 4.0,
          "unit": "million_output_tokens",
          "sourceText": "Batch pricing snippet shows Output: $4."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1047576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context window ... 1,047,576"
        },
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128,000 (standard & provisioned managed deployments)"
        },
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "300,000 (batch deployments)"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output tokens 32,768"
        }
      ],
      "languageSupport": {
        "rawText": "No fixed language table published; general-purpose multilingual model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-4.1-mini",
      "publicName": "GPT-4.1 mini",
      "aliases": [
        "gpt-4.1-mini-2025-04-14"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Verified official pricing snippet shows Global pricing at $0.40 input / $1.60 output per 1M tokens; batch Global snippet shows $0.20 / $0.80.",
      "limitsSummary": "Same documented context family as 4.1; 1,047,576 tokens context family, 128,000 standard/provisioned managed, 300,000 batch, 32,768 max output.",
      "regionSummary": "Region table published in Azure model catalog.",
      "languagesSummary": "General multilingual LLM; no fixed locale list published.",
      "notes": "Most balanced stable mobile-chat default on Azure for cost/performance. Replacement path eventually points to gpt-5-mini.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.4,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4.1-mini-2025-04-14 Global, Input: $0.40."
        },
        {
          "amountUsd": 1.6,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4.1-mini-2025-04-14 Global, ... Output: $1.60."
        },
        {
          "amountUsd": 0.2,
          "unit": "million_input_tokens",
          "sourceText": "Batch pricing snippet shows Input: $0.20."
        },
        {
          "amountUsd": 0.8,
          "unit": "million_output_tokens",
          "sourceText": "Batch pricing snippet shows Output: $0.80."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1047576,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Structured outputs ... 1,047,576"
        },
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128,000 (standard & provisioned managed deployments)"
        },
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "300,000 (batch deployments)"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max output tokens 32,768"
        }
      ],
      "languageSupport": {
        "rawText": "No fixed language table published; general-purpose multilingual model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-4.1-nano",
      "publicName": "GPT-4.1 nano",
      "aliases": [
        "gpt-4.1-nano-2025-04-14"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippets expose Regional pricing at $0.11 input / $0.44 output and Global pricing beginning at $0.10 input; retrieved snippet coverage for full Global output pricing is partial.",
      "limitsSummary": "Same 4.1 family context pattern in model catalog.",
      "regionSummary": "Region table published in Azure model catalog.",
      "languagesSummary": "General multilingual LLM; no fixed locale list published.",
      "notes": "Useful as a low-cost fallback. Pricing retrieval was partial from official snippets; treat exact non-regional pricing as low-confidence unless re-checked live at runtime.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.11,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4.1-nano-2025-04-14 Regional, Input: $0.11."
        },
        {
          "amountUsd": 0.44,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4.1-nano-2025-04-14 Regional, ... Output: $0.44."
        },
        {
          "amountUsd": 0.1,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4.1-nano-2025-04-14 Global, Input: $0.10."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "No fixed language table published; general-purpose multilingual model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-4o",
      "publicName": "GPT-4o",
      "aliases": [
        "gpt-4o-2024-11-20",
        "gpt-4o-2024-08-06",
        "gpt-4o-2024-05-13"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippets expose GPT-4o-2024-11-20 Global at $2.50 input / $10 output and Batch Global at $1.25 / $5.",
      "limitsSummary": "128K context per pricing page summary; model retirement page shows active but on a replacement path.",
      "regionSummary": "Global / Data Zone / Regional variants are priced separately.",
      "languagesSummary": "General multilingual multimodal model.",
      "notes": "Still active but not the safest long-term picker default because Azure has already published replacement paths to newer series.",
      "officialSources": [
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 2.5,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-2024-1120 Global, Input: $2.50."
        },
        {
          "amountUsd": 10.0,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4o-2024-1120 Global, ... Output: $10."
        },
        {
          "amountUsd": 1.25,
          "unit": "million_input_tokens",
          "sourceText": "Batch pricing snippet shows Input: $1.25."
        },
        {
          "amountUsd": 5.0,
          "unit": "million_output_tokens",
          "sourceText": "Batch pricing snippet shows Output: $5."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "General multilingual multimodal model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-4o-mini",
      "publicName": "GPT-4o mini",
      "aliases": [
        "gpt-4o-mini-0718"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Regional pricing at $0.165 input / $0.083 cached input / $0.66 output per 1M tokens.",
      "limitsSummary": "Pricing page summary says 128K context.",
      "regionSummary": "Global / Data Zone / Regional variants exist; static snippet recovery was partial.",
      "languagesSummary": "General multilingual multimodal model.",
      "notes": "Low-cost legacy small model; still usable, but Azure has already published replacement path to gpt-4.1-mini and a retirement path.",
      "officialSources": [
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.165,
          "unit": "million_input_tokens",
          "sourceText": "GPT-4o-mini-0718 Regional, Input: $0.165."
        },
        {
          "amountUsd": 0.66,
          "unit": "million_output_tokens",
          "sourceText": "GPT-4o-mini-0718 Regional, ... Output: $0.66."
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "General multilingual multimodal model.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-realtime",
      "publicName": "GPT-Realtime",
      "aliases": [
        "gpt-realtime-2025-08-28"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing page is public, but retrieved snippets did not expose clean exact GPT-Realtime GA amounts in this audit. Pricing is public but should be re-fetched live before hard-coding.",
      "limitsSummary": "Realtime API supports 32,000 input tokens and 4,096 output tokens.",
      "regionSummary": "Priced as a Global model line; region/deployment details remain page-driven.",
      "languagesSummary": "Realtime/audio multilingual support improved in newer 1.5 line; no fixed locale-count table retrieved for GPT-Realtime itself.",
      "notes": "Primary speech-in/speech-out Azure OpenAI model. WebRTC / SIP / WebSocket supported. Good stable realtime picker.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio-websockets",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "The Realtime API supports up to 32,000 input tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "and 4,096 output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "Realtime/audio multilingual support is documented qualitatively, not as a fixed locale table.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-realtime-mini",
      "publicName": "GPT-Realtime mini",
      "aliases": [
        "gpt-realtime-mini-2025-12-15"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Official pricing snippet exposes Global Text Input $0.60, Cached Input $0.06, Output $2.40; Audio Input $10, Cached Input $0.30, Output $20 per 1M tokens.",
      "limitsSummary": "Realtime API supports 32,000 input tokens and 4,096 output tokens.",
      "regionSummary": "Global line shown on pricing page.",
      "languagesSummary": "No fixed published locale table in retrieved docs.",
      "notes": "Best low-cost realtime picker entry on Azure OpenAI. Strong fit for mobile voice-first apps.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio",
        "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.6,
          "unit": "million_input_tokens",
          "sourceText": "GPT-realtime-mini-2025-12-15 Global, Text Input: $0.60."
        },
        {
          "amountUsd": 2.4,
          "unit": "million_output_tokens",
          "sourceText": "GPT-realtime-mini-2025-12-15 Global, ... Output: $2.40."
        },
        {
          "amountUsd": 10.0,
          "unit": "million_input_tokens",
          "sourceText": "Audio Input: $10."
        },
        {
          "amountUsd": 20.0,
          "unit": "million_output_tokens",
          "sourceText": "Audio ... Output: $20."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "The Realtime API supports up to 32,000 input tokens"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "and 4,096 output tokens"
        }
      ],
      "languageSupport": {
        "rawText": "No fixed published locale table in retrieved docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "microsoft-azure",
      "providerName": "Microsoft Azure",
      "service": "llm",
      "modelId": "gpt-realtime-1.5",
      "publicName": "GPT-Realtime 1.5",
      "aliases": [
        "gpt-realtime-1.5-2026-02-23"
      ],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing page is public, but exact 1.5 line values were not cleanly recoverable from retrieved official snippets in this audit.",
      "limitsSummary": "Sold-directly model catalog lists it as a realtime audio model with 32,000 input and 4,096 output token class.",
      "regionSummary": "Sold directly by Azure; exact region normalization should be re-fetched live before hard-coding.",
      "languagesSummary": "Azure says this line improves multilingual support, but did not publish a fixed locale count in the retrieved docs.",
      "notes": "Newest stable Azure realtime line as of 2026-03-24; good candidate for a stable picker if you can tolerate faster-moving lifecycle.",
      "officialSources": [
        "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
        "https://learn.microsoft.com/en-us/azure/foundry-classic/openai/whats-new",
        "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "Audio model for real-time audio processing. Input: 32,000 Output: 4,096"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 4096,
          "unit": "tokens",
          "scope": "session",
          "sourceText": "Output: 4,096"
        }
      ],
      "languageSupport": {
        "rawText": "Microsoft says the 1.5 line improves multilingual support.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent"
        ]
      }
    }
  ),
]);
