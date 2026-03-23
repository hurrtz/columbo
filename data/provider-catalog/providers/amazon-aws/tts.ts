import { defineTtsModels } from "../../definitions";
import type { CatalogTts } from "../../../../src/catalog/types";

export const tts = defineTtsModels(
[
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "tts",
    "modelId": "generative",
    "publicName": "Polly Generative",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
    "officialSources": [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
      "https://aws.amazon.com/polly/pricing/",
      "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "tts",
    "modelId": "long-form",
    "publicName": "Polly Long-Form",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
    "officialSources": [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
      "https://aws.amazon.com/polly/pricing/",
      "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "tts",
    "modelId": "neural",
    "publicName": "Polly Neural",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
    "officialSources": [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
      "https://aws.amazon.com/polly/pricing/",
      "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "tts",
    "modelId": "standard",
    "publicName": "Polly Standard",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
    "officialSources": [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
      "https://aws.amazon.com/polly/pricing/",
      "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
    ],
    "openAiCompatible": null,
    "supportsRealtime": true,
    "supportsBatch": null,
    "priceMeasurements": [
      {
        "amountUsd": 4.0,
        "unit": "million_characters",
        "sourceText": "$4/M chars"
      }
    ],
    "constraints": [],
    "languageSupport": {
      "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
      "isMultilingual": false,
      "languageCount": null,
      "voiceCount": null,
      "listedLanguages": [],
      "notes": []
    }
  }
] satisfies CatalogTts[],
);
