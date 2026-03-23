import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
{
  "modelId": "transcribe",
  "publicName": "Amazon Transcribe",
  "status": "Documented active/current",
  "limitsSummary": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits.",
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
  "constraints": [
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 80.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 8.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "concurrency",
      "comparator": "=",
      "value": 26.0,
      "unit": "count",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    }
  ],
  "languageSupport": {
    "rawText": "Transcribe supports 100+ languages/variants depending on mode.",
    "isMultilingual": true,
    "languageCount": 100,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
  providerContext.stt(
{
  "modelId": "transcribe-medical",
  "publicName": "Amazon Transcribe Medical",
  "status": "Documented active/current",
  "limitsSummary": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits.",
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
  "constraints": [
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 80.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 8.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "concurrency",
      "comparator": "=",
      "value": 26.0,
      "unit": "count",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    }
  ],
  "languageSupport": {
    "rawText": "Transcribe supports 100+ languages/variants depending on mode.",
    "isMultilingual": true,
    "languageCount": 100,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
  providerContext.stt(
{
  "modelId": "call-analytics",
  "publicName": "Call Analytics",
  "status": "Documented active/current",
  "limitsSummary": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits.",
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
  "constraints": [
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 80.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "throughput_tps",
      "comparator": "=",
      "value": 8.0,
      "unit": "tps",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    },
    {
      "metric": "concurrency",
      "comparator": "=",
      "value": 26.0,
      "unit": "count",
      "scope": "general",
      "sourceText": "Polly quotas vary by engine (e.g., ~80 TPS standard, ~8 TPS neural, ~26 concurrent long-form/generative). Transcribe quotas include job/stream TPS limits."
    }
  ],
  "languageSupport": {
    "rawText": "Transcribe supports 100+ languages/variants depending on mode.",
    "isMultilingual": true,
    "languageCount": 100,
    "voiceCount": null,
    "listedLanguages": [],
    "notes": []
  }
}
  ),
]);
