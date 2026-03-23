import { providerContext } from "./provider";

export const llms = providerContext.defineLlms([
  providerContext.llm(
{
  "modelId": "amazon.nova-lite-v1:0",
  "publicName": "Amazon Nova Lite",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
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
  ),
  providerContext.llm(
{
  "modelId": "amazon.nova-micro-v1:0",
  "publicName": "Amazon Nova Micro",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
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
  ),
  providerContext.llm(
{
  "modelId": "amazon.nova-premier-v1:0",
  "publicName": "Amazon Nova Premier",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
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
  ),
  providerContext.llm(
{
  "modelId": "amazon.nova-pro-v1:0",
  "publicName": "Amazon Nova Pro",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Separate Bedrock model selection from Polly/Transcribe. Bedrock is dynamic; fetch live supported-model lists rather than hardcoding.",
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
  ),
  providerContext.llm(
{
  "modelId": "amazon.nova-sonic-v1:0",
  "publicName": "Amazon Nova Sonic",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "Speech-capable",
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
  ),
  providerContext.llm(
{
  "modelId": "amazon.titan-*",
  "publicName": "Amazon Titan family",
  "status": "Documented active/current",
  "limitsSummary": null,
  "notes": "First-party family; plus 100+ third-party Bedrock models",
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
  ),
]);
