import { defineLlms } from "../../definitions";
import type { CatalogLlm } from "../../../../src/catalog/types";

export const llms = defineLlms(
[
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.nova-lite-v1:0",
    "publicName": "Amazon Nova Lite",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.nova-micro-v1:0",
    "publicName": "Amazon Nova Micro",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.nova-premier-v1:0",
    "publicName": "Amazon Nova Premier",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.nova-pro-v1:0",
    "publicName": "Amazon Nova Pro",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
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
    "languageSupport": null
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.nova-sonic-v1:0",
    "publicName": "Amazon Nova Sonic",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
    "notes": "Speech-capable",
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
    "languageSupport": null
  },
  {
    "providerId": "amazon-aws",
    "providerName": "Amazon AWS",
    "service": "llm",
    "modelId": "amazon.titan-*",
    "publicName": "Amazon Titan family",
    "status": "Documented active/current",
    "catalogScope": "Dynamic/non-exhaustive",
    "pricingSummary": "Polly: Standard $4/M chars, Neural $16/M, Generative $30/M, Long-Form $100/M. Transcribe billed per second (15-second minimum). Bedrock pricing varies by model.",
    "limitsSummary": null,
    "regionSummary": "Region-specific across AWS regions. Bedrock, Polly, and Transcribe each have separate regional availability matrices.",
    "languagesSummary": null,
    "notes": "First-party family; plus 100+ third-party Bedrock models",
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
    "languageSupport": null
  }
] satisfies CatalogLlm[],
);
