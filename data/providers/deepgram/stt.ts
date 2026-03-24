import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "flux-general-en",
      "publicName": "Flux General English",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.0077/min PAYG, $0.0065/min Growth.",
      "limitsSummary": "Streaming/turn-based only. Flux requires /v2/listen and strongly recommends 80 ms audio chunks.",
      "regionSummary": "EU endpoint supports /v2/listen but excludes Whisper only; no Flux-specific regional exclusion documented.",
      "languagesSummary": "English only (`en`).",
      "notes": "Best fit for conversational turn-taking voice agents. Do not treat as a general batch-transcription model.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://developers.deepgram.com/docs/flux/quickstart",
        "https://developers.deepgram.com/reference/api-rate-limits",
        "https://deepgram.com/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [
        {
          "amountUsd": 0.0077,
          "unit": "minute",
          "sourceText": "$0.0077/min PAYG"
        }
      ],
      "constraints": [
        {
          "metric": "stream_chunk_bytes",
          "comparator": "~",
          "value": 80,
          "unit": "other",
          "scope": "streaming",
          "sourceText": "Chunk Size: 80ms audio chunks strongly recommended"
        }
      ],
      "languageSupport": {
        "rawText": "English (all accents): en",
        "isMultilingual": false,
        "languageCount": 1,
        "voiceCount": 0,
        "listedLanguages": [
          "en"
        ],
        "notes": [
          "english-only",
          "voice-agent-optimized"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "nova-3",
      "publicName": "Nova-3 General",
      "aliases": [
        "nova-3-general"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Monolingual: $0.0077/min PAYG, $0.0065/min Growth. Multilingual: $0.0092/min PAYG, $0.0078/min Growth.",
      "limitsSummary": "Pre-recorded and streaming. Pre-recorded max file 2 GB. Requests exceeding 10 minutes of processing time may return 504.",
      "regionSummary": "Supported on EU endpoint.",
      "languagesSummary": "Broad multilingual catalog including multi plus a large language-code list.",
      "notes": "Best default Deepgram STT picker entry for general use.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://developers.deepgram.com/reference/api-rate-limits",
        "https://developers.deepgram.com/docs/pre-recorded-audio",
        "https://deepgram.com/pricing",
        "https://developers.deepgram.com/reference/custom-endpoints"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0077,
          "unit": "minute",
          "sourceText": "Nova-3 (Monolingual) $0.0077/min"
        },
        {
          "amountUsd": 0.0092,
          "unit": "minute",
          "sourceText": "Nova-3 (Multilingual) $0.0092/min"
        }
      ],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 2147483648,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "File size: Maximum 2 GB"
        },
        {
          "metric": "duration_seconds",
          "comparator": "~",
          "value": 600,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Requests exceeding 10 minutes ... return a 504"
        }
      ],
      "languageSupport": {
        "rawText": "Multilingual (English, Spanish, French, German, Hindi, Russian, Portuguese, Japanese, Italian, and Dutch): multi, plus extensive per-language code list.",
        "isMultilingual": true,
        "languageCount": 50,
        "voiceCount": 0,
        "listedLanguages": [
          "multi",
          "en",
          "es",
          "fr",
          "de",
          "hi",
          "ru",
          "pt",
          "ja",
          "it",
          "nl"
        ],
        "notes": [
          "broadest-current-general-model",
          "code-list-larger-than-marketing-count"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "nova-3-medical",
      "publicName": "Nova-3 Medical",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "No separate public line-item price found; pricing page groups Nova-3 pricing at family level.",
      "limitsSummary": "Same Nova-3 platform limits appear to apply publicly.",
      "regionSummary": "Region support not broken out separately.",
      "languagesSummary": "English variants only.",
      "notes": "Reasonable specialist picker entry if medical transcription is a first-class app use case.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://deepgram.com/pricing",
        "https://developers.deepgram.com/docs/pre-recorded-audio"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "file_size_bytes",
          "comparator": "<=",
          "value": 2147483648,
          "unit": "bytes",
          "scope": "file",
          "sourceText": "File size: Maximum 2 GB"
        }
      ],
      "languageSupport": {
        "rawText": "English: en, en-US, en-AU, en-CA, en-GB, en-IE, en-IN, en-NZ",
        "isMultilingual": false,
        "languageCount": 8,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "en-US",
          "en-AU",
          "en-CA",
          "en-GB",
          "en-IE",
          "en-IN",
          "en-NZ"
        ],
        "notes": [
          "medical-domain"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "nova-2",
      "publicName": "Nova-2 General",
      "aliases": [
        "nova-2-general"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.0058/min PAYG, $0.0047/min Growth (family-level 'Nova-1 & 2').",
      "limitsSummary": "Pre-recorded and streaming; use when needed for languages not yet in Nova-3 or filler words.",
      "regionSummary": "Supported on standard hosted platform; EU support not called out separately by model.",
      "languagesSummary": "Multilingual (English + Spanish) under multi, plus broad per-language list.",
      "notes": "Useful secondary picker entry, not best default.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://deepgram.com/pricing",
        "https://developers.deepgram.com/reference/api-rate-limits"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0058,
          "unit": "minute",
          "sourceText": "Nova-1 & 2 $0.0058/min"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multilingual (Spanish + English): multi, plus broad language list.",
        "isMultilingual": true,
        "languageCount": 30,
        "voiceCount": 0,
        "listedLanguages": [
          "multi",
          "en",
          "es",
          "zh",
          "zh-CN",
          "zh-TW",
          "fr",
          "de",
          "nl"
        ],
        "notes": [
          "fallback-for-language-gaps",
          "supports-filler-word-identification"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "nova-2-verticals",
      "publicName": "Nova-2 Vertical Variants",
      "aliases": [
        "nova-2-meeting",
        "nova-2-phonecall",
        "nova-2-finance",
        "nova-2-conversationalai",
        "nova-2-voicemail",
        "nova-2-video",
        "nova-2-medical",
        "nova-2-drivethru",
        "nova-2-automotive",
        "nova-2-atc"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "No per-variant public pricing; use family pricing unless Deepgram sales/docs state otherwise.",
      "limitsSummary": "Public docs list the variants, but app-facing differentiation is sparse.",
      "regionSummary": "Unknown.",
      "languagesSummary": "English-only for the vertical variants listed.",
      "notes": "Do not expose these in a mainstream stable picker unless your app has a vertical-specific workflow.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "English: en, en-US for the listed vertical variants.",
        "isMultilingual": false,
        "languageCount": 2,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "en-US"
        ],
        "notes": [
          "vertical-specialized"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "legacy-nova-family",
      "publicName": "Legacy Nova Family",
      "aliases": [
        "nova",
        "nova-general",
        "nova-phonecall",
        "nova-medical"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Family price grouped under 'Nova-1 & 2' on pricing page is ambiguous for old Nova; use caution.",
      "limitsSummary": "Legacy family; still documented but not the preferred picker choice.",
      "regionSummary": "Unknown.",
      "languagesSummary": "General model supports English, Spanish, Hindi-Latinized; domain variants are English-only.",
      "notes": "Treat as legacy and hide from stable picker.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "nova/nova-general: en, en-US, en-AU, en-GB, en-NZ, en-IN, es, es-419, hi-Latn; phonecall/medical: en, en-US",
        "isMultilingual": true,
        "languageCount": 9,
        "voiceCount": 0,
        "listedLanguages": [
          "en",
          "en-US",
          "en-AU",
          "en-GB",
          "en-NZ",
          "en-IN",
          "es",
          "es-419",
          "hi-Latn"
        ],
        "notes": [
          "legacy"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "legacy-enhanced-family",
      "publicName": "Legacy Enhanced Family",
      "aliases": [
        "enhanced",
        "enhanced-general",
        "enhanced-meeting",
        "enhanced-phonecall",
        "enhanced-finance"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.0165/min PAYG, $0.0136/min Growth for Enhanced family.",
      "limitsSummary": "Legacy family.",
      "regionSummary": "Unknown.",
      "languagesSummary": "General model supports a multi-language list; domain variants are English-only.",
      "notes": "Hide from stable picker unless you need keyword-boosting-era compatibility.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://deepgram.com/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0165,
          "unit": "minute",
          "sourceText": "Enhanced $0.0165/min"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "enhanced/enhanced-general supports da, nl, en, en-US, fr, de, hi, it, ja, ko, no, pl, pt, es, sv, taq, ta; domain variants English-only.",
        "isMultilingual": true,
        "languageCount": 18,
        "voiceCount": 0,
        "listedLanguages": [
          "da",
          "nl",
          "en",
          "fr",
          "de",
          "hi",
          "it",
          "ja",
          "ko",
          "no",
          "pl",
          "pt",
          "es",
          "sv",
          "taq",
          "ta"
        ],
        "notes": [
          "legacy"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "legacy-base-family",
      "publicName": "Legacy Base Family",
      "aliases": [
        "base",
        "base-general",
        "base-meeting",
        "base-phonecall",
        "base-finance",
        "base-conversationalai",
        "base-voicemail",
        "base-video"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "$0.0145/min PAYG, $0.0105/min Growth for Base family.",
      "limitsSummary": "Legacy family.",
      "regionSummary": "Unknown.",
      "languagesSummary": "General model supports a wide multilingual list; domain variants are English-only.",
      "notes": "Hide from stable picker.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://deepgram.com/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [
        {
          "amountUsd": 0.0145,
          "unit": "minute",
          "sourceText": "Base $0.0145/min"
        }
      ],
      "constraints": [],
      "languageSupport": {
        "rawText": "base/base-general supports zh, da, nl, en, fr, de, hi, id, it, ja, ko, no, pl, pt, ru, es, sv, taq, tr, uk; domain variants English-only.",
        "isMultilingual": true,
        "languageCount": 20,
        "voiceCount": 0,
        "listedLanguages": [
          "zh",
          "da",
          "nl",
          "en",
          "fr",
          "de",
          "hi",
          "id",
          "it",
          "ja",
          "ko",
          "no",
          "pl",
          "pt",
          "ru",
          "es",
          "sv",
          "taq",
          "tr",
          "uk"
        ],
        "notes": [
          "legacy"
        ]
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "deepgram",
      "providerName": "Deepgram",
      "service": "stt",
      "modelId": "whisper",
      "publicName": "Deepgram Whisper Cloud",
      "aliases": [
        "whisper-medium",
        "whisper-tiny",
        "whisper-base",
        "whisper-small",
        "whisper-large"
      ],
      "status": "Documented active/current",
      "catalogScope": "Exhaustive",
      "pricingSummary": "Public pricing page shows only concurrency, not an explicit Whisper price line in the captured official text.",
      "limitsSummary": "PAYG concurrency 5; paid-plan concurrency 15 in model docs; max long-audio processing time 20 minutes.",
      "regionSummary": "EU endpoint explicitly excludes Whisper.",
      "languagesSummary": "See available in Whisper language docs; not enumerated in the captured source.",
      "notes": "Do not expose by default; slower/scales worse than non-Whisper models.",
      "officialSources": [
        "https://developers.deepgram.com/docs/models-languages-overview",
        "https://developers.deepgram.com/docs/model",
        "https://developers.deepgram.com/reference/custom-endpoints",
        "https://deepgram.com/pricing"
      ],
      "openAiCompatible": false,
      "supportsRealtime": false,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 5,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "Up to 5 for Deepgram Whisper Cloud"
        },
        {
          "metric": "duration_seconds",
          "comparator": "<=",
          "value": 1200,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Long audio files are supported up to a maximum of 20 minutes of processing time"
        }
      ],
      "languageSupport": {
        "rawText": "Docs say 'See available' for whisper model language support.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "language-list-not-verified-in-captured-source",
          "scalability-warning"
        ]
      }
    }
  ),
]);
