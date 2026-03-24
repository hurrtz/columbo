import { providerContext } from "./provider";

export const stt = providerContext.defineSttModels([
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "slam-1",
      "publicName": "Slam-1",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing varies by speech model and add-on intelligence features. New accounts have commonly received ~$50 credits.",
      "limitsSummary": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS.",
      "regionSummary": "AssemblyAI cloud; region controls more limited than hyperscalers.",
      "languagesSummary": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
      "notes": "Speech-language model / transcript intelligence",
      "officialSources": [
        "https://www.assemblyai.com/docs",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "=",
          "value": 300.0,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS."
        }
      ],
      "languageSupport": {
        "rawText": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "streaming",
      "publicName": "Streaming Transcriber",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing varies by speech model and add-on intelligence features. New accounts have commonly received ~$50 credits.",
      "limitsSummary": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS.",
      "regionSummary": "AssemblyAI cloud; region controls more limited than hyperscalers.",
      "languagesSummary": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
      "notes": "Streaming model family",
      "officialSources": [
        "https://www.assemblyai.com/docs",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "=",
          "value": 300.0,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS."
        }
      ],
      "languageSupport": {
        "rawText": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-3",
      "publicName": "Universal-3",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing varies by speech model and add-on intelligence features. New accounts have commonly received ~$50 credits.",
      "limitsSummary": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS.",
      "regionSummary": "AssemblyAI cloud; region controls more limited than hyperscalers.",
      "languagesSummary": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
      "notes": "Excellent STT + audio intelligence provider, but not a TTS provider. Keep summarization/analysis add-ons separate from core transcription in your schema.",
      "officialSources": [
        "https://www.assemblyai.com/docs",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "=",
          "value": 300.0,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS."
        }
      ],
      "languageSupport": {
        "rawText": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
  providerContext.stt(
    {
      "providerId": "assemblyai",
      "providerName": "AssemblyAI",
      "service": "stt",
      "modelId": "universal-3-nano",
      "publicName": "Universal-3 Nano",
      "status": "Documented active/current",
      "catalogScope": "Mostly exhaustive",
      "pricingSummary": "Pricing varies by speech model and add-on intelligence features. New accounts have commonly received ~$50 credits.",
      "limitsSummary": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS.",
      "regionSummary": "AssemblyAI cloud; region controls more limited than hyperscalers.",
      "languagesSummary": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
      "notes": "Excellent STT + audio intelligence provider, but not a TTS provider. Keep summarization/analysis add-ons separate from core transcription in your schema.",
      "officialSources": [
        "https://www.assemblyai.com/docs",
        "https://www.assemblyai.com/pricing",
        "https://www.assemblyai.com/"
      ],
      "openAiCompatible": true,
      "supportsRealtime": true,
      "supportsBatch": true,
      "priceMeasurements": [],
      "constraints": [
        {
          "metric": "duration_seconds",
          "comparator": "=",
          "value": 300.0,
          "unit": "seconds",
          "scope": "audio",
          "sourceText": "Docs cite rate/request ceilings (e.g., 20,000 requests per 5 minutes). Language and diarization coverage differs by feature. No public native TTS."
        }
      ],
      "languageSupport": {
        "rawText": "99 languages for Universal batch; fewer for some streaming/intelligence features.",
        "isMultilingual": true,
        "languageCount": 99,
        "voiceCount": null,
        "listedLanguages": [],
        "notes": []
      }
    }
  ),
]);
