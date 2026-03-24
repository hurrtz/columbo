import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-2-lite-v1:0",
      "publicName": "Amazon Nova 2 Lite",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; Bedrock pricing page is the official source and is model/provider dependent.",
      "limitsSummary": "Canonical ID verified; detailed hard limits were not cleanly extractable from the official public crawl.",
      "regionSummary": "Widely available across many commercial AWS regions; see supported models page for the current region matrix.",
      "languagesSummary": "Multimodal model; language summary not published as a simple count in the model card excerpt retrieved here.",
      "notes": "Safe stable picker candidate for a cost-sensitive multimodal LLM entry. Do not confuse with provisioned-throughput variants such as amazon.nova-2-lite-v1:0:256k or cross-region aliases.",
      "officialSources": [
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-2-lite.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Multimodal text/image/video input with text output; no simple official language count verified in this crawl.",
        "isMultilingual": true,
        "languageCount": 0,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "model-dependent",
          "exact language count unknown"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-premier-v1:0",
      "publicName": "Amazon Nova Premier",
      "aliases": [
        "us.amazon.nova-premier-v1:0"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; official source is Amazon Bedrock pricing.",
      "limitsSummary": "1M context window; max output 10k tokens; streaming and batch inference supported.",
      "regionSummary": "Documented in us-east-1 in the Nova guide; supported models page should be treated as authoritative for current rollout.",
      "languagesSummary": "200+ supported languages in AWS\u2019s Nova guide.",
      "notes": "Canonical model ID for premium Amazon-native LLM. Keep us.amazon... as alias only.",
      "officialSources": [
        "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 1000000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 1M"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 10000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens 10K"
        }
      ],
      "languageSupport": {
        "rawText": "Supported Languages 200+",
        "isMultilingual": true,
        "languageCount": 200,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "200+-language claim from AWS guide"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-pro-v1:0",
      "publicName": "Amazon Nova Pro",
      "aliases": [
        "us.amazon.nova-pro-v1:0"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Official Bedrock pricing page is authoritative, but exact public price was not cleanly extractable in this crawl. AWS also states select Bedrock batch inference is 50% cheaper than on-demand.",
      "limitsSummary": "300k context window; max output 10k tokens; streaming and batch inference supported; fine-tuning supported.",
      "regionSummary": "Multi-region rollout documented by AWS.",
      "languagesSummary": "200+ supported languages in AWS\u2019s Nova guide.",
      "notes": "Strong general-purpose Amazon-native LLM picker entry.",
      "officialSources": [
        "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://aws.amazon.com/bedrock/pricing/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 300k"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 10000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens 10k"
        }
      ],
      "languageSupport": {
        "rawText": "Supported Languages 200+",
        "isMultilingual": true,
        "languageCount": 200,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "200+-language claim from AWS guide"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-lite-v1:0",
      "publicName": "Amazon Nova Lite",
      "aliases": [
        "us.amazon.nova-lite-v1:0"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; official source is Amazon Bedrock pricing.",
      "limitsSummary": "300k context window; max output 10k tokens; streaming and batch inference supported; fine-tuning supported.",
      "regionSummary": "Multi-region rollout documented by AWS.",
      "languagesSummary": "200+ supported languages in AWS\u2019s Nova guide.",
      "notes": "Strong lower-cost stable picker entry.",
      "officialSources": [
        "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://aws.amazon.com/bedrock/pricing/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 300000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 300k"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 10000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens 10k"
        }
      ],
      "languageSupport": {
        "rawText": "Supported Languages 200+",
        "isMultilingual": true,
        "languageCount": 200,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "200+-language claim from AWS guide"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-micro-v1:0",
      "publicName": "Amazon Nova Micro",
      "aliases": [
        "us.amazon.nova-micro-v1:0"
      ],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; official source is Amazon Bedrock pricing.",
      "limitsSummary": "128k context window; max output 10k tokens; streaming and batch inference supported; fine-tuning supported.",
      "regionSummary": "Multi-region rollout documented by AWS.",
      "languagesSummary": "200+ supported languages in AWS\u2019s Nova guide.",
      "notes": "Best fit for low-latency/basic text tasks in a stable picker.",
      "officialSources": [
        "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://aws.amazon.com/bedrock/pricing/"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "context_tokens",
          "comparator": "=",
          "value": 128000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Context Window 128k"
        },
        {
          "metric": "other",
          "comparator": "=",
          "value": 10000,
          "unit": "tokens",
          "scope": "model",
          "sourceText": "Max Output Tokens 10k"
        }
      ],
      "languageSupport": {
        "rawText": "Supported Languages 200+",
        "isMultilingual": true,
        "languageCount": 200,
        "voiceCount": 0,
        "listedLanguages": [],
        "notes": [
          "200+-language claim from AWS guide"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-2-sonic-v1:0",
      "publicName": "Amazon Nova 2 Sonic",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; official source is Amazon Bedrock pricing.",
      "limitsSummary": "Current official crawl verified the canonical ID and region availability, but not a published session-duration quota on the Nova 2 page.",
      "regionSummary": "Verified in ap-northeast-1, eu-north-1, us-east-1, and us-west-2 on the supported-models page.",
      "languagesSummary": "AWS lists 10 locales and a multilingual voice table.",
      "notes": "This is AWS\u2019s current speech-to-speech model for realtime voice conversations and is the best stable speech picker candidate.",
      "officialSources": [
        "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
        "https://docs.aws.amazon.com/nova/latest/nova2-userguide/sonic-language-support.html",
        "https://docs.aws.amazon.com/nova/latest/nova2-userguide/using-conversational-speech.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Listed locales: en-US, en-GB, en-AU, en-IN, fr-FR, it-IT, de-DE, es-US, pt-BR, hi-IN",
        "isMultilingual": true,
        "languageCount": 10,
        "voiceCount": 16,
        "listedLanguages": [
          "en-US",
          "en-GB",
          "en-AU",
          "en-IN",
          "fr-FR",
          "it-IT",
          "de-DE",
          "es-US",
          "pt-BR",
          "hi-IN"
        ],
        "notes": [
          "voice IDs repeat across some locales",
          "voiceCount is unique IDs listed on the doc page"
        ]
      }
    }
  ),
  providerContext.llm(
    {
      "providerId": "amazon-aws",
      "providerName": "Amazon AWS",
      "service": "llm",
      "modelId": "amazon.nova-sonic-v1:0",
      "publicName": "Amazon Nova Sonic",
      "aliases": [],
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Unknown from directly verifiable official crawl; official source is Amazon Bedrock pricing.",
      "limitsSummary": "AWS documents an 8 minute connection timeout and max 20 concurrent connections per customer.",
      "regionSummary": "Documented in us-east-1, eu-north-1, and ap-northeast-1 in the Nova guide.",
      "languagesSummary": "Five-language speech model: English (US, UK), French, Italian, German, Spanish.",
      "notes": "Still publicly documented, but for a new stable picker I would prefer Nova 2 Sonic over v1.",
      "officialSources": [
        "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-sonic.html"
      ],
      "openAiCompatible": false,
      "supportsRealtime": true,
      "supportsBatch": false,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "session_duration_seconds",
          "comparator": "=",
          "value": 480,
          "unit": "seconds",
          "scope": "session",
          "sourceText": "8-minute connection timeout"
        },
        {
          "metric": "concurrency",
          "comparator": "=",
          "value": 20,
          "unit": "sessions",
          "scope": "account",
          "sourceText": "maximum 20 concurrent connections per customer"
        }
      ],
      "languageSupport": {
        "rawText": "English (US, UK), French, Italian, German, Spanish",
        "isMultilingual": true,
        "languageCount": 5,
        "voiceCount": 0,
        "listedLanguages": [
          "en-US",
          "en-GB",
          "fr-FR",
          "it-IT",
          "de-DE",
          "es-*"
        ],
        "notes": [
          "v1 speech model",
          "voice count not cleanly verified in this crawl"
        ]
      }
    }
  ),
]);
