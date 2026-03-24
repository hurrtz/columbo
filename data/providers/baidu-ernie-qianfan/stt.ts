import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "stt",
      "modelId": "\u77ed\u8bed\u97f3\u8bc6\u522b",
      "publicName": "Short Speech Recognition",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Priced per call, not per minute. Standard short-ASR postpaid starts at \u00a50.0034/call and tiers down to \u00a50.0011/call; packages also exist. No public per-minute price for this specific API was found.",
      "limitsSummary": "60-second max audio duration. Formats pcm/wav/amr/m4a. 16k required; 8k only for Mandarin model. Mono 16-bit.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Documented dev_pid options: 1537 Mandarin input method model, 1737 English, 1637 Cantonese, 1837 Sichuan dialect.",
      "notes": "This is a service/API, not a canonical model-ID product in the LLM sense. For app UX, expose as a speech service with language options, not as a rigid model picker ID.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-api/s/mm7viqkmz",
        "https://cloud.baidu.com/product-price/speech.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 60,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "\u5c0660\u79d2\u4ee5\u5185\u7684\u8bed\u97f3\u7cbe\u51c6\u8bc6\u522b\u4e3a\u6587\u5b57"
        }
      ],
      "languageSupport": {
        "rawText": "dev_pid defaults: 1537 Mandarin, 1737 English, 1637 Cantonese, 1837 Sichuan dialect.",
        "isMultilingual": true,
        "languageCount": 4,
        "voiceCount": 0,
        "listedLanguages": [
          "Mandarin Chinese",
          "English",
          "Cantonese",
          "Sichuan dialect"
        ],
        "notes": [
          "language is selected via dev_pid, not a stable model ID"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "stt",
      "modelId": "\u77ed\u8bed\u97f3\u8bc6\u522b\u6781\u901f\u7248",
      "publicName": "Short Speech Recognition Pro / \u6781\u901f\u7248",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Priced per call, not per minute. Postpaid starts at \u00a50.0042/call and tiers down to \u00a50.0014/call; packages also exist.",
      "limitsSummary": "60-second max audio duration. Fixed dev_pid 80001. 16k sample rate, mono, 16-bit.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Reviewed doc exposes a fixed \u6781\u901f\u7248 input-method model via dev_pid 80001; no separate multilingual list was found for this endpoint.",
      "notes": "Good for low-latency short utterances. Still not a stable 'model ID' surface; treat as service SKU.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-api/s/mm7vo6ny7",
        "https://cloud.baidu.com/product-price/speech.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 60,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "\u5c0660\u79d2\u4ee5\u5185\u7684\u8bed\u97f3\u7cbe\u51c6\u8bc6\u522b\u4e3a\u6587\u5b57"
        }
      ],
      "languageSupport": {
        "rawText": "dev_pid fixed to 80001 (\u6781\u901f\u7248\u8f93\u5165\u6cd5\u6a21\u578b).",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese input-method style model"
        ],
        "notes": [
          "fixed dev_pid 80001"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "stt",
      "modelId": "\u97f3\u9891\u6587\u4ef6\u8f6c\u5199",
      "publicName": "Audio File Transcription",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Postpaid \u00a52/hour in speech pricing page section interpreted as audio-file transcription; package pricing from \u00a50.6-1.2/hour depending bundle. Inference: approx $0.0048/min postpaid using 1 CNY\u2248$0.1451.",
      "limitsSummary": "Public audio URL required. File size <=500MB. Query up to 200 task IDs per request. Typical completion 'within 12 hours'.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Reviewed pid values: 80001 Chinese near-field, 80006 Chinese subtitle model, 1737 English.",
      "notes": "Async batch-style STT service. Best fit for long recordings and subtitle workflows.",
      "officialSources": [
        "https://cloud.baidu.com/doc/qianfan-api/s/ym7wpcama",
        "https://cloud.baidu.com/doc/qianfan-api/s/tm84h4sot",
        "https://cloud.baidu.com/product-price/speech.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0048,
          "unit": "minute",
          "sourceText": "Inference from \u00a52/hour postpaid in speech pricing page, converted at 1 CNY \u2248 0.1451 USD."
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 524288000,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "\u97f3\u9891\u5927\u5c0f\u4e0d\u8d85\u8fc7500MB"
        },
        {
          "metric": "other",
          "comparator": "<=",
          "value": 200,
          "unit": "other",
          "scope": "general",
          "sourceText": "\u5355\u6b21\u67e5\u8be2\u4efb\u52a1\u6570\u4e0d\u8d85\u8fc7200\u4e2a"
        }
      ],
      "languageSupport": {
        "rawText": "pid: 80001 Chinese near-field model, 80006 Chinese subtitle model, 1737 English.",
        "isMultilingual": true,
        "languageCount": 3,
        "voiceCount": 0,
        "listedLanguages": [
          "Chinese near-field",
          "Chinese subtitle",
          "English"
        ],
        "notes": [
          "pid-selected",
          "async task API"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "baidu-ernie-qianfan",
      "providerName": "Baidu (ERNIE / Qianfan)",
      "service": "stt",
      "modelId": "\u5b9e\u65f6\u8bed\u97f3\u8bc6\u522b-websocket API",
      "publicName": "Realtime Speech Recognition WebSocket API",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Unknown",
      "pricingSummary": "Speech pricing page has a separate realtime-ASR section billed per hour, but the exact mapping of every realtime websocket variant to that section is not fully explicit in the reviewed sources.",
      "limitsSummary": "WebSocket streaming STT. Client sends start frame, audio frames, and end frame; server returns sentence timestamps.",
      "regionSummary": "Unknown.",
      "languagesSummary": "Language coverage not fully verified in the reviewed realtime-ASR websocket doc snippet.",
      "notes": "This is the native low-latency STT surface for realtime voice apps.",
      "officialSources": [
        "https://cloud.baidu.com/doc/SPEECH/s/jlbxejt2i",
        "https://cloud.baidu.com/product-price/speech.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Not fully verified in reviewed snippet.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "websocket",
          "low-latency",
          "language list not fully verified"
        ]
      }
    }
  ),
]);
