import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
    {
      "providerId": "bytedance-doubao-seed",
      "providerName": "ByteDance (Doubao/Seed)",
      "service": "tts",
      "modelId": "unknown",
      "publicName": "Doubao Large-Model TTS",
      "aliases": [
        "RealtimeAPI"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Priced as large-model TTS service family, starting at 45 yuan / 100,000 characters (4.5 yuan / 10,000 characters) on smallest pack. No standalone public per-model pricing verified in the inspected sources.",
      "limitsSummary": "Async long-text API supports up to 100,000 characters per job; generated audio retained on server for 7 days. Streaming and non-streaming variants are documented; WebSocket and HTTP/SSE are both used across TTS APIs. WebSocket only.",
      "regionSummary": "Public endpoint uses openspeech.bytedance.com.",
      "languagesSummary": "Mode- and voice-dependent. Explicit language options documented include zh-cn, en, ja, es-mx, id, pt-br, and for some cloned voices de and fr. Supports Chinese and English.",
      "notes": "No stable public OpenAI-style model ID was verified. Integrate by app/token/cluster/voice rather than model picker ID. Voice picker is more appropriate than model picker. This is speech-to-speech realtime capability, not a normal fixed TTS picker model. Keep behind a feature flag or separate realtime voice mode. Merged research variants: Doubao Large-Model TTS; Doubao End-to-End Realtime Voice API.",
      "officialSources": [
        "https://www.volcengine.com/docs/6561/1257543",
        "https://www.volcengine.com/docs/6561/1829010",
        "https://www.volcengine.com/docs/6561/1257544",
        "https://www.volcengine.com/docs/6561/1359370",
        "https://www.volcengine.com/docs/6561/1594356"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 65.25,
          "unit": "million_characters",
          "sourceText": "\u5927\u6a21\u578b\u8bed\u97f3\u5408\u6210 45\u5143/10\u4e07\u5b57\u7b26 on smallest pack; converted to 450\u5143/\u767e\u4e07\u5b57\u7b26, then to USD at ~0.145 USD/CNY."
        }
      ],
      "constraints": [
        {
          "metric": "other",
          "comparator": "<=",
          "value": 100000,
          "unit": "other",
          "scope": "general",
          "sourceText": "\u5f02\u6b65\u6267\u884c\u957f\u6587\u672c\u4efb\u52a1\uff0c\u6700\u5927\u5355\u6b21\u53ef\u6267\u884c\u7684\u6587\u672c\u957f\u5ea6\u4e3a10\u4e07\u5b57\u7b26."
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 1,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "Currently only supports WebSocket protocol."
        }
      ],
      "languageSupport": {
        "rawText": "explicit_language supports zh-cn, en, ja, es-mx, id, pt-br; some cloned voice modes also support de and fr. Supports Chinese and English only.",
        "isMultilingual": true,
        "languageCount": 8,
        "voiceCount": 0,
        "listedLanguages": [
          "zh-cn",
          "en",
          "ja",
          "es-mx",
          "id",
          "pt-br",
          "de",
          "fr",
          "Chinese",
          "English"
        ],
        "notes": [
          "voice-dependent",
          "mode-dependent",
          "use voice discovery instead of fixed model IDs",
          "speech-to-speech",
          "not a standard TTS model picker entry"
        ]
      }
    }
  ),
]);
