import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "rev-ai",
      "providerName": "Rev.ai",
      "service": "stt",
      "modelId": "reverb",
      "publicName": "Reverb",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Speech pricing varies by deployment/model; human transcription is priced separately from ASR.",
      "limitsSummary": "Multipart uploads <2 GB. Many languages allow up to ~17h file duration; Telugu noted lower (~6h).",
      "regionSummary": "US and EU deployment options exist.",
      "languagesSummary": "Broad multilingual support; exact matrix is model/deployment dependent.",
      "notes": "Useful if you want both ASR and optional human transcription workflows in one vendor.",
      "officialSources": [
        "https://docs.rev.ai/",
        "https://www.rev.ai/pricing",
        "https://www.rev.ai/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Broad multilingual support; exact matrix is model/deployment dependent.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "rev-ai",
      "providerName": "Rev.ai",
      "service": "stt",
      "modelId": "low_cost",
      "publicName": "Reverb Turbo / Low Cost",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Speech pricing varies by deployment/model; human transcription is priced separately from ASR.",
      "limitsSummary": "Multipart uploads <2 GB. Many languages allow up to ~17h file duration; Telugu noted lower (~6h).",
      "regionSummary": "US and EU deployment options exist.",
      "languagesSummary": "Broad multilingual support; exact matrix is model/deployment dependent.",
      "notes": "US deployment naming",
      "officialSources": [
        "https://docs.rev.ai/",
        "https://www.rev.ai/pricing",
        "https://www.rev.ai/"
      ],
      "openAiCompatible": null,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [],
      "languageSupport": {
        "rawText": "Broad multilingual support; exact matrix is model/deployment dependent.",
        "isMultilingual": true,
        "languageCount": null,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);
