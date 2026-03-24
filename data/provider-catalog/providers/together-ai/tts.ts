import { providerContext } from "./provider";

export const tts = providerContext.defineTtsModels([
  providerContext.tts({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "tts",
    modelId: "cartesia/sonic",
    publicName: "Cartesia Sonic",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: "Depends on model (e.g., Kokoro vs Cartesia).",
    notes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Depends on model (e.g., Kokoro vs Cartesia).",
      isMultilingual: false,
      languageCount: null,
      voiceCount: null,
      listedLanguages: ["Depends on model (e.g", "Kokoro vs Cartesia"],
      notes: [],
    },
  }),
  providerContext.tts({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "tts",
    modelId: "cartesia/sonic-2",
    publicName: "Cartesia Sonic 2",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: "Depends on model (e.g., Kokoro vs Cartesia).",
    notes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Depends on model (e.g., Kokoro vs Cartesia).",
      isMultilingual: false,
      languageCount: null,
      voiceCount: null,
      listedLanguages: ["Depends on model (e.g", "Kokoro vs Cartesia"],
      notes: [],
    },
  }),
  providerContext.tts({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "tts",
    modelId: "cartesia/sonic-3",
    publicName: "Cartesia Sonic 3",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: "Depends on model (e.g., Kokoro vs Cartesia).",
    notes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Depends on model (e.g., Kokoro vs Cartesia).",
      isMultilingual: false,
      languageCount: null,
      voiceCount: null,
      listedLanguages: ["Depends on model (e.g", "Kokoro vs Cartesia"],
      notes: [],
    },
  }),
  providerContext.tts({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "tts",
    modelId: "hexgrad/Kokoro-82M",
    publicName: "Kokoro 82M",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: "Depends on model (e.g., Kokoro vs Cartesia).",
    notes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Depends on model (e.g., Kokoro vs Cartesia).",
      isMultilingual: false,
      languageCount: null,
      voiceCount: null,
      listedLanguages: ["Depends on model (e.g", "Kokoro vs Cartesia"],
      notes: [],
    },
  }),
  providerContext.tts({
    providerId: "together-ai",
    providerName: "Together AI",
    service: "tts",
    modelId: "canopylabs/orpheus-3b-0.1-ft",
    publicName: "Orpheus 3B 0.1 FT",
    status: "Documented active/current",
    catalogScope: "Dynamic/non-exhaustive",
    pricingSummary:
      "Examples: Kokoro ~$4/M chars, Cartesia Sonic ~$65/M chars, Whisper Large v3 ~$0.0015/audio min. LLM prices vary by hosted model.",
    limitsSummary: null,
    regionSummary:
      "Together-managed cloud; region exposure is limited compared with hyperscalers.",
    languagesSummary: "Depends on model (e.g., Kokoro vs Cartesia).",
    notes:
      "Your sheet is outdated: Together now exposes both STT and TTS. Always fetch the live serverless catalog rather than hardcoding model lists.",
    officialSources: [
      "https://docs.together.ai/docs/serverless-models",
      "https://docs.together.ai/reference/audio-speech",
      "https://docs.together.ai/reference/audio-transcriptions",
    ],
    openAiCompatible: true,
    supportsRealtime: null,
    supportsBatch: true,
    priceMeasurements: [
      {
        amountUsd: 4.0,
        unit: "million_characters",
        sourceText: "$4/M chars",
      },
      {
        amountUsd: 65.0,
        unit: "million_characters",
        sourceText: "$65/M chars",
      },
      {
        amountUsd: 0.0015,
        unit: "minute",
        sourceText: "$0.0015/audio min",
      },
    ],
    constraints: [],
    languageSupport: {
      rawText: "Depends on model (e.g., Kokoro vs Cartesia).",
      isMultilingual: false,
      languageCount: null,
      voiceCount: null,
      listedLanguages: ["Depends on model (e.g", "Kokoro vs Cartesia"],
      notes: [],
    },
  }),
]);
