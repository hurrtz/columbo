import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "stt",
      "modelId": "/audio/transcriptions",
      "publicName": "Audio Transcriptions API",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
      "limitsSummary": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
      "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
      "languagesSummary": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
      "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
      "officialSources": [
        "https://novita.ai/docs/api-reference",
        "https://novita.ai/models",
        "https://novita.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Depends on chosen STT model (e.g",
          "GLM-ASR multilingual"
        ],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "novita-ai",
      "providerName": "Novita AI",
      "service": "stt",
      "modelId": "glm-asr-2512",
      "publicName": "GLM-ASR-2512",
      "status": "Documented active/current",
      "catalogScope": "Dynamic/non-exhaustive",
      "pricingSummary": "Varies by model/service. Pricing page is service-specific and changes frequently.",
      "limitsSummary": "TTS marketing highlights <300 ms latency; exact quotas depend on chosen model and plan.",
      "regionSummary": "Novita-managed cloud; detailed region mapping is not prominently centralized.",
      "languagesSummary": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
      "notes": "Your source sheet is outdated: Novita now has explicit TTS and STT APIs, not just LLM/image hosting.",
      "officialSources": [
        "https://novita.ai/docs/api-reference",
        "https://novita.ai/models",
        "https://novita.ai/pricing"
      ],
      "openAiCompatible": true,
      "supportsRealtime": null,
      "supportsBatch": null,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Depends on chosen STT model (e.g., GLM-ASR multilingual).",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [
          "Depends on chosen STT model (e.g",
          "GLM-ASR multilingual"
        ],
        "notes": []
      }
    }
  ),
]);
