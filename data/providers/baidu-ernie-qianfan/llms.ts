import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-5.0",
      "publicName": "ERNIE 5.0",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.006/1k input and \u00a50.024/1k output for input <=32k; \u00a50.01/1k input and \u00a50.04/1k output for 32k<input<=128k.",
      "limitsSummary": "128k context, 119k max input, 65,536 max output, chain-of-thought length 60k in thinking table, RPM 60, TPM 150,000.",
      "regionSummary": "No Qianfan-specific residency statement verified in reviewed public docs; provider HQ Beijing.",
      "languagesSummary": "No model-specific language list found; ERNIE is positioned as broad general-purpose multimodal model.",
      "notes": "Documented as flagship native multimodal model. Public docs position ERNIE 5.0 as native omni-modal, but the reviewed API docs do not clearly document public audio-input request shape for this model; treat audio-input API support as unknown.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.8706,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.006/\u5343tokens input for <=32k input (USD inferred using 1 CNY \u2248 0.1451 USD on 2026-03-24)."
        },
        {
          "amountUsd": 3.4824,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.024/\u5343tokens output for <=32k input (USD inferred using 1 CNY \u2248 0.1451 USD on 2026-03-24)."
        },
        {
          "amountUsd": 1.451,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.01/\u5343tokens input for 32k<input<=128k (USD inferred using 1 CNY \u2248 0.1451 USD on 2026-03-24)."
        },
        {
          "amountUsd": 5.804,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.04/\u5343tokens output for 32k<input<=128k (USD inferred using 1 CNY \u2248 0.1451 USD on 2026-03-24)."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u4e0a\u4e0b\u6587\u957f\u5ea6 128k"
        },
        {
          "metric": "context_tokens",
          "comparator": "<=",
          "value": 119000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u6700\u5927\u8f93\u5165 119k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "\u6700\u5927\u8f93\u51fa [1,65536]"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 60"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 150000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 150000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit model language list found in reviewed docs.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "multimodal",
          "public audio-input support not clearly documented",
          "inference: broad multilingual capability likely but not verified here"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-5.0-thinking-preview",
      "publicName": "ERNIE 5.0 Thinking Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Same public pricing band as ERNIE 5.0 on the reviewed pricing pages.",
      "limitsSummary": "128k context, 119k max input, 65,536 max output, CoT length 60k, RPM 60, TPM 150,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Preview. Do not place in a stable picker when ernie-5.0 is available.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.8706,
          "unit": "million_input_tokens",
          "sourceText": "Uses ERNIE 5.0 pricing band, input <=32k."
        },
        {
          "amountUsd": 3.4824,
          "unit": "million_output_tokens",
          "sourceText": "Uses ERNIE 5.0 pricing band, output <=32k."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 60"
        }
      ],
      "languageSupport": {
        "rawText": "Not explicitly documented in reviewed sources.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-x1.1",
      "publicName": "ERNIE X1.1",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "The reviewed pricing table explicitly prices ernie-x1.1-preview at \u00a50.001/1k input and \u00a50.004/1k output. I did not find a separate ernie-x1.1 non-preview line, so pricing for the stable ID is unverified.",
      "limitsSummary": "64k context, 55k max input, 65,536 max output, CoT length 64k, RPM 300, TPM 300,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Recommended stable reasoning model. Public pricing was verified for preview variant only; stable-ID price should be treated as unknown unless confirmed in console or later docs.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/product-s/qianfan_home",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "64k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 55000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "55k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 65536,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[1,65536] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 300,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 300"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 300000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "reasoning model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-x1.1-preview",
      "publicName": "ERNIE X1.1 Preview",
      "aliases": [],
      "status": "Preview",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.001/1k input, \u00a50.004/1k output, plus \u00a50.004 per search-enhancement trigger.",
      "limitsSummary": "64k context, 55k max input, 65,536 max output, CoT length 64k, RPM 60, TPM 60,000 in model list.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Preview; useful for experiments but not for a stable picker.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.1451,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.001/\u5343tokens input."
        },
        {
          "amountUsd": 0.5804,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.004/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 64000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "64k"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 60"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 60000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 60000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "preview",
          "reasoning model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-x1-turbo-32k",
      "publicName": "ERNIE X1 Turbo 32K",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.001/1k input and \u00a50.004/1k output; batch price \u00a50.0004/1k input and \u00a50.0016/1k output in reviewed pricing table.",
      "limitsSummary": "32k context, 23k max input, 28,160 max output, CoT length 28k, RPM 900, TPM 300,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Reasoning model with materially higher throughput than preview.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.1451,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.001/\u5343tokens input."
        },
        {
          "amountUsd": 0.5804,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.004/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 32000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "32k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 23000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "23k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 28160,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[1,28160] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 900,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 900"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 300000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "reasoning model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-4.5-turbo-128k",
      "publicName": "ERNIE 4.5 Turbo 128K",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.0008/1k input, \u00a50.0032/1k output, \u00a50.0002/1k cache hit, and \u00a50.004 per search trigger.",
      "limitsSummary": "128k context, 123k max input, 12,288 max output, RPM 5,000, TPM 400,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "No explicit list found.",
      "notes": "Best stable low-cost general text model in current Baidu-native lineup for most mobile chat use cases.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.1161,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.0008/\u5343tokens input."
        },
        {
          "amountUsd": 0.4643,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.0032/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 123000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "123k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 12288,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[2,12288] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 5000,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 5000"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 400000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 400000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "text model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-4.5-turbo-vl",
      "publicName": "ERNIE 4.5 Turbo VL",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.003/1k input, \u00a50.009/1k output, \u00a50.00075/1k cache hit.",
      "limitsSummary": "128k context, 123k max input, 16,384 max output in model list entry, RPM 1,000, TPM 200,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Supports text, image, video according to AI Studio docs; no verified audio-input docs reviewed.",
      "notes": "Best Baidu-native multimodal picker entry for image-enabled chat. Keep preview variant hidden.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home",
        "https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.4353,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.003/\u5343tokens input."
        },
        {
          "amountUsd": 1.3059,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.009/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 123000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "123k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 16384,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[2,16384] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 1000,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 1000"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 200000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 200000"
        }
      ],
      "languageSupport": {
        "rawText": "AI Studio docs list supported modalities as Text, Image, Video.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "vision model",
          "video-listed",
          "audio-input not verified"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-4.5-21b-a3b",
      "publicName": "ERNIE 4.5 21B A3B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.0005/1k input and \u00a50.002/1k output; batch price \u00a50.0002/1k input and \u00a50.0008/1k output.",
      "limitsSummary": "128k context, 120k max input, 8,192 max output, RPM 120, TPM 150,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "No explicit list found.",
      "notes": "Baidu open-source family API exposure. Strong candidate for a budget picker.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0726,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.0005/\u5343tokens input."
        },
        {
          "amountUsd": 0.2902,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.002/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 120000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "120k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 8192,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[1,8192] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 120,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 120"
        },
        {
          "metric": "rate_limit_tpm",
          "comparator": "=",
          "value": 150000,
          "unit": "tokens_per_minute",
          "scope": "model",
          "sourceText": "TPM = 150000"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "budget text model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-4.5-21b-a3b-thinking",
      "publicName": "ERNIE 4.5 21B A3B Thinking",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.0005/1k input and \u00a50.002/1k output.",
      "limitsSummary": "128k context, 96k max input, 32,768 max output, CoT default 4k / 32k listed, RPM 60, TPM 150,000.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Unknown.",
      "notes": "Good low-cost reasoning entry; safer for stable picker than preview/latest/exp variants elsewhere.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/doc/qianfan/s/Kmh4stnjp"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0726,
          "unit": "million_input_tokens",
          "sourceText": "\u00a50.0005/\u5343tokens input."
        },
        {
          "amountUsd": 0.2902,
          "unit": "million_output_tokens",
          "sourceText": "\u00a50.002/\u5343tokens output."
        }
      ],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "128k"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 96000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "96k max input"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 32768,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "[1,32768] max output"
        },
        {
          "metric": "rate_limit_rpm",
          "comparator": "=",
          "value": 60,
          "unit": "requests_per_minute",
          "scope": "model",
          "sourceText": "RPM = 60"
        }
      ],
      "languageSupport": {
        "rawText": "No explicit language list found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "reasoning model"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "llm",
      "modelId": "ernie-4.5-vl-28b-a3b",
      "publicName": "ERNIE 4.5 VL 28B A3B",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "\u00a50.001/1k input and \u00a50.004/1k output in text-generation pricing table; product page separately shows \u00a50.001/1k input and \u00a50.01/1k output. Output-price conflict exists.",
      "limitsSummary": "Model list page shows 32k context, 30k max input, 8,192 max output; AI Studio multimodal list shows 128k/123k/[2,12288] in a different table. Limits conflict across docs.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Text + image supported; product page says thinking/non-thinking switch supported.",
      "notes": "Document conflict. Good candidate only if you can verify live console behavior; otherwise prefer ernie-4.5-turbo-vl for stable picker.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43",
        "https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya",
        "https://cloud.baidu.com/product-s/qianfan_home",
        "https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multimodal model with image support; exact supported language list not found.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "vision model",
          "doc conflicts on limits and output price"
        ]
      }
    }
  ),
]);
