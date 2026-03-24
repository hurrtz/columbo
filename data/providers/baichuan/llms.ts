import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan4-Air",
      "publicName": "Baichuan4-Air",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.00098 CNY per 1K tokens combined input+output (~$0.1422 per 1M tokens, FX cross inferred from ECB 2026-03-23 references).",
      "limitsSummary": "32k context on public pricing page. No official realtime/session/file-audio limits found.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found; Baichuan family is marketed as Chinese-strong and bilingual/multilingual in various model materials, but no hosted per-model language matrix was verified.",
      "notes": "General hosted model. Candidate for stable generic picker.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.1422,
          "unit": "million_input_tokens",
          "sourceText": "0.00098\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 0.1422,
          "unit": "million_output_tokens",
          "sourceText": "0.00098\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan4-Air 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "likely Chinese-first"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan4-Turbo",
      "publicName": "Baichuan4-Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.015 CNY per 1K tokens combined input+output (~$2.1765 per 1M tokens).",
      "limitsSummary": "32k context on public pricing page. No official realtime/session/file-audio limits found.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "General hosted model. Likely stronger than Air but materially more expensive.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 2.1765,
          "unit": "million_input_tokens",
          "sourceText": "0.015\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 2.1765,
          "unit": "million_output_tokens",
          "sourceText": "0.015\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan4-Turbo 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "likely Chinese-first"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan4",
      "publicName": "Baichuan4",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.1 CNY per 1K tokens combined input+output (~$14.5102 per 1M tokens).",
      "limitsSummary": "32k context on public pricing page. No official realtime/session/file-audio limits found.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "Flagship-priced general hosted model. Safe for a premium picker entry if the app wants a 'max quality' tier.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 14.5102,
          "unit": "million_input_tokens",
          "sourceText": "0.1\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 14.5102,
          "unit": "million_output_tokens",
          "sourceText": "0.1\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan4 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "likely Chinese-first"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan3-Turbo",
      "publicName": "Baichuan3-Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.012 CNY per 1K tokens combined input+output (~$1.7412 per 1M tokens).",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "General hosted model. Sensible mid-tier stable picker candidate.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.7412,
          "unit": "million_input_tokens",
          "sourceText": "0.012\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 1.7412,
          "unit": "million_output_tokens",
          "sourceText": "0.012\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan3-Turbo 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "likely Chinese-first"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan3-Turbo-128k",
      "publicName": "Baichuan3-Turbo-128k",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.024 CNY per 1K tokens combined input+output (~$3.4825 per 1M tokens).",
      "limitsSummary": "128k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "Best verified long-context hosted option. Also the destination route for deprecated Baichuan2-Turbo-192k.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 3.4825,
          "unit": "million_input_tokens",
          "sourceText": "0.024\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 3.4825,
          "unit": "million_output_tokens",
          "sourceText": "0.024\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan3-Turbo-128k 128k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "likely Chinese-first",
          "long-context"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan2-Turbo",
      "publicName": "Baichuan2-Turbo",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.008 CNY per 1K tokens combined input+output (~$1.1608 per 1M tokens).",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "Legacy but still priced as active. Reasonable to expose only if the app wants older/cheaper legacy options.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.1608,
          "unit": "million_input_tokens",
          "sourceText": "0.008\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 1.1608,
          "unit": "million_output_tokens",
          "sourceText": "0.008\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan2-Turbo 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "legacy"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan2-53B",
      "publicName": "Baichuan2-53B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.01 CNY per 1K tokens from 00:00-08:00 and 0.02 CNY per 1K tokens from 08:00-24:00, combined input+output (~$1.4510M / ~$2.9020M per 1M tokens depending on time window).",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "No formal API language matrix found.",
      "notes": "Legacy time-of-day priced model. Poor fit for a stable consumer picker because pricing changes by clock time.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.451,
          "unit": "million_input_tokens",
          "sourceText": "00:00 ~ 8:00 0.01\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 2.902,
          "unit": "million_input_tokens",
          "sourceText": "8:00 ~ 24:00 0.02\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 1.451,
          "unit": "million_output_tokens",
          "sourceText": "00:00 ~ 8:00 0.01\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        },
        {
          "amountUsd": 2.902,
          "unit": "million_output_tokens",
          "sourceText": "8:00 ~ 24:00 0.02\u5143/\u5343tokens\uff0c\u5305\u542b\u8f93\u5165\u548c\u8f93\u51fa"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan2-53B 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-matrix-undocumented",
          "legacy",
          "time-window-pricing"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan-M2",
      "publicName": "Baichuan-M2",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.002 CNY per 1K input tokens (~$0.2902 per 1M input) and 0.02 CNY per 1K output tokens (~$2.9020 per 1M output).",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "Medical-specialized hosted model; no formal hosted language list found.",
      "notes": "Medical model, not a generic chat picker candidate.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://www.baichuan-ai.com/blog/baichuan-M2"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.2902,
          "unit": "million_input_tokens",
          "sourceText": "\u8f93\u5165\uff1a0.002\u5143/\u5343tokens"
        },
        {
          "amountUsd": 2.902,
          "unit": "million_output_tokens",
          "sourceText": "\u8f93\u51fa\uff1a0.02\u5143/\u5343tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan-M2 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "medical-specialized",
          "language-matrix-undocumented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan-M2-Plus",
      "publicName": "Baichuan-M2-Plus",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.01 CNY per 1K input tokens (~$1.4510 per 1M input) and 0.03 CNY per 1K output tokens (~$4.3531 per 1M output), with automatic medical-search billing noted separately.",
      "limitsSummary": "32k context on public pricing page. Automatic medical-search charge is separately listed.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "Medical-specialized hosted model; no formal hosted language list found.",
      "notes": "Medical model. Pricing page says medical search is automatically triggered and billed separately when calling Baichuan-M2-Plus.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://www.baichuan-ai.com/blog/baichuan-M2"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.451,
          "unit": "million_input_tokens",
          "sourceText": "\u8f93\u5165\uff1a0.01\u5143/\u5343tokens"
        },
        {
          "amountUsd": 4.3531,
          "unit": "million_output_tokens",
          "sourceText": "\u8f93\u51fa\uff1a0.03\u5143/\u5343tokens"
        },
        {
          "amountUsd": 0.0044,
          "unit": "request",
          "sourceText": "\u533b\u7597\u641c\u7d22-00:00 ~ 24:00 0.03\u5143/\u6b21"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan-M2-Plus 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "medical-specialized",
          "language-matrix-undocumented",
          "medical-search-auto-billing"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan-M3",
      "publicName": "Baichuan-M3",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.01 CNY per 1K input tokens (~$1.4510 per 1M input) and 0.03 CNY per 1K output tokens (~$4.3531 per 1M output).",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "Medical-specialized hosted model; no formal hosted language list found.",
      "notes": "Medical model, not a generic chat picker candidate. Separate open-weight model card exists for self-hosting.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://www.baichuan-ai.com/blog/baichuan-M3",
        "https://github.com/baichuan-inc/Baichuan-M3-235B/blob/main/README_en.md"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 1.451,
          "unit": "million_input_tokens",
          "sourceText": "\u8f93\u5165\uff1a0.01\u5143/\u5343tokens"
        },
        {
          "amountUsd": 4.3531,
          "unit": "million_output_tokens",
          "sourceText": "\u8f93\u51fa\uff1a0.03\u5143/\u5343tokens"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan-M3 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "medical-specialized",
          "language-matrix-undocumented"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan-M3-Plus",
      "publicName": "Baichuan-M3-Plus",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "0.005 CNY per 1K input tokens (~$0.7255 per 1M input) and 0.009 CNY per 1K output tokens (~$1.3059 per 1M output); pricing page notes medical search can be auto-triggered and separately billed.",
      "limitsSummary": "32k context on public pricing page.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "Medical-specialized hosted model; no formal hosted language list found.",
      "notes": "Medical model. Platform marketing prominently pushes this API, but it is not a general-purpose mobile chat picker default.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices",
        "https://platform.baichuan-ai.com/docs/api",
        "https://www.baichuan-ai.com/blog/baichuan-M3"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.7255,
          "unit": "million_input_tokens",
          "sourceText": "\u8f93\u5165\uff1a0.005\u5143/\u5343tokens"
        },
        {
          "amountUsd": 1.3059,
          "unit": "million_output_tokens",
          "sourceText": "\u8f93\u51fa\uff1a0.009\u5143/\u5343tokens"
        },
        {
          "amountUsd": 0.0044,
          "unit": "request",
          "sourceText": "\u533b\u7597\u641c\u7d22-00:00 ~ 24:00 0.03\u5143/\u6b21"
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Baichuan-M3-Plus 32k"
        }
      ],
      "languageSupport": {
        "rawText": "No hosted API language list verified.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "medical-specialized",
          "language-matrix-undocumented",
          "medical-search-auto-billing"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baichuan",
      "providerName": "Baichuan",
      "service": "llm",
      "modelId": "Baichuan2-Turbo-192k",
      "publicName": "Baichuan2-Turbo-192k",
      "aliases": [],
      "status": "Deprecated",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Deprecated routed alias; public pricing page says calls are routed to Baichuan3-Turbo-128k.",
      "limitsSummary": "No independent current limit should be assumed; routed to the 128k model.",
      "regionSummary": "Hosted on Baichuan\u2019s China-centered platform; no public multi-region controls found.",
      "languagesSummary": "Deprecated alias, no separate current language matrix.",
      "notes": "Public pricing page says this model was taken offline on 2024-08-16 and requests now route to Baichuan3-Turbo-128k. Do not expose in stable pickers.",
      "officialSources": [
        "https://platform.baichuan-ai.com/prices"
      ],
      "openAiCompatible": true,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Deprecated routed alias.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "deprecated",
          "routed-alias"
        ]
      }
    }
  ),
]);
