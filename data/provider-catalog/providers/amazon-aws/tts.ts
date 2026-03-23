import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts(
{
  "modelId": "generative",
  "publicName": "Polly Generative",
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
  "languageSupport": {
    "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "isMultilingual": false,
    "languageCount": null,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
  providerContext.tts(
{
  "modelId": "long-form",
  "publicName": "Polly Long-Form",
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
  "languageSupport": {
    "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "isMultilingual": false,
    "languageCount": null,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
  providerContext.tts(
{
  "modelId": "neural",
  "publicName": "Polly Neural",
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
  "languageSupport": {
    "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "isMultilingual": false,
    "languageCount": null,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
  providerContext.tts(
{
  "modelId": "standard",
  "publicName": "Polly Standard",
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
  "languageSupport": {
    "rawText": "Polly supports dozens of languages (~36+ depending on engine/voice).",
    "isMultilingual": false,
    "languageCount": null,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
]);
