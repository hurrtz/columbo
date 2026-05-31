import type { CatalogProviderId } from "../../catalog/types";
import { PROVIDER_DOCUMENTS } from "../../../data/providers";

export type RuntimeAppProviderId =
  | "openai"
  | "anthropic"
  | "alibaba-qwen-dashscope"
  | "brave"
  | "bytedance-doubao-seed"
  | "exa"
  | "firecrawl"
  | "gemini"
  | "deepseek"
  | "mistral"
  | "moonshot-ai-kimi"
  | "perplexity"
  | "serpapi"
  | "tavily"
  | "xai"

export type RuntimeLlmTransport =
  | "none"
  | "azure-openai"
  | "azure-openai-realtime"
  | "openai-compatible"
  | "openai-realtime"
  | "gemini-live"
  | "anthropic"
  | "cohere"
  | "replicate";
export type RuntimeSttTransport =
  | "none"
  | "multipart"
  | "bytedance-bigmodel-flash"
  | "google-cloud-speech-v2"
  | "openai-audio-input"
  | "xai-realtime";
export type RuntimeTtsTransport =
  | "none"
  | "binary"
  | "gemini"
  | "dashscope";
export type RuntimeTtsBinaryRequestFormat =
  | "openai-speech"
  | "xai-speech"
  | "grok-speech";
export type RuntimeLanguageHintKey = "mistral-stt-language-code";

export interface RuntimeModelSpec {
  id: string;
  fallbackName?: string;
  releaseDate?: string;
}

export interface RuntimeVoiceOption {
  id: string;
  label: string;
  localizedLabels?: Partial<Record<"de", string>>;
}

interface RuntimeLlmProviderManifest {
  support: "provider";
  transport: Exclude<RuntimeLlmTransport, "none">;
  endpoint?: string;
  defaultModel: string;
  models: RuntimeModelSpec[];
  realtimeModelIds?: string[];
  realtimeTransport?: Exclude<RuntimeLlmTransport, "none">;
}

interface RuntimeLlmDisabledManifest {
  support: "none";
  transport: "none";
  models: [];
  defaultModel?: string;
}

type RuntimeLlmManifest = RuntimeLlmProviderManifest | RuntimeLlmDisabledManifest;

interface RuntimeSttManifest {
  support: "none" | "provider";
  transport: RuntimeSttTransport;
  endpoint?: string;
  endpointBase?: string;
  defaultModel?: string;
  models: RuntimeModelSpec[];
  realtimeTransport?: Exclude<RuntimeSttTransport, "none">;
  realtimeEndpoint?: string;
  realtimeEndpointBase?: string;
  realtimeEndpointByModel?: Partial<Record<string, string>>;
  realtimeModelIds?: string[];
  languageHintKey?: RuntimeLanguageHintKey;
  languageNote?: string;
}

interface RuntimeTtsManifest {
  support: "none" | "provider";
  transport: RuntimeTtsTransport;
  endpoint?: string;
  endpointBase?: string;
  requestFormat?: RuntimeTtsBinaryRequestFormat;
  defaultModel?: string;
  models: RuntimeModelSpec[];
  defaultVoice?: string;
  voiceFallback?: string;
  voiceOptions: RuntimeVoiceOption[];
  languageNote?: string;
}

export interface RuntimeProviderManifestEntry {
  appProvider: RuntimeAppProviderId;
  catalogProviderId: CatalogProviderId;
  label: string;
  shortLabel: string;
  apiKeyPlaceholder: string;
  apiKeyHint: string;
  apiKeyUrl: string;
  llm: RuntimeLlmManifest;
  stt: RuntimeSttManifest;
  tts: RuntimeTtsManifest;
}

const WHISPER_WELL_SUPPORTED_LANGUAGES =
  "Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.";

function model(id: string, releaseDate?: string): RuntimeModelSpec {
  return releaseDate ? { id, releaseDate } : { id };
}

function namedModel(
  id: string,
  fallbackName: string,
  releaseDate?: string,
): RuntimeModelSpec {
  return releaseDate ? { id, fallbackName, releaseDate } : { id, fallbackName };
}

function voice(
  id: string,
  label: string,
  localizedLabels?: RuntimeVoiceOption["localizedLabels"],
): RuntimeVoiceOption {
  return localizedLabels ? { id, label, localizedLabels } : { id, label };
}

const DEEPGRAM_TTS_VOICE_OPTIONS: RuntimeVoiceOption[] = [
  voice("aura-2-thalia-en", "Aura 2 · Thalia"),
  voice("aura-2-asteria-en", "Aura 2 · Asteria"),
  voice("aura-2-apollo-en", "Aura 2 · Apollo"),
  voice("aura-2-helena-en", "Aura 2 · Helena"),
  voice("aura-2-viktoria-de", "Aura 2 · Viktoria"),
  voice("aura-2-linnea-de", "Aura 2 · Linnea"),
  voice("aura-2-sophia-de", "Aura 2 · Sophia"),
  voice("aura-2-casper-de", "Aura 2 · Casper"),
  voice("aura-2-julian-de", "Aura 2 · Julian"),
  voice("aura-2-lukas-de", "Aura 2 · Lukas"),
  voice("aura-2-julius-de", "Aura 2 · Julius"),
  voice("aura-2-adele-fr", "Aura 2 · Adele"),
  voice("aura-2-marcel-fr", "Aura 2 · Marcel"),
  voice("aura-2-daan-nl", "Aura 2 · Daan"),
  voice("aura-2-fenna-nl", "Aura 2 · Fenna"),
  voice("aura-2-isa-nl", "Aura 2 · Isa"),
  voice("aura-2-ruben-nl", "Aura 2 · Ruben"),
  voice("aura-2-saar-nl", "Aura 2 · Saar"),
  voice("aura-2-sem-nl", "Aura 2 · Sem"),
  voice("aura-2-sophie-nl", "Aura 2 · Sophie"),
  voice("aura-2-viggo-nl", "Aura 2 · Viggo"),
  voice("aura-2-luna-es", "Aura 2 · Luna"),
  voice("aura-2-seraphina-es", "Aura 2 · Seraphina"),
  voice("aura-2-celeste-es", "Aura 2 · Celeste"),
  voice("aura-2-estrella-es", "Aura 2 · Estrella"),
  voice("aura-2-orfeo-es", "Aura 2 · Orfeo"),
  voice("aura-2-selene-es", "Aura 2 · Selene"),
  voice("aura-2-omara-es", "Aura 2 · Omara"),
  voice("aura-2-bruno-es", "Aura 2 · Bruno"),
  voice("aura-2-javier-es", "Aura 2 · Javier"),
  voice("aura-2-jorge-es", "Aura 2 · Jorge"),
  voice("aura-2-hector-es", "Aura 2 · Hector"),
  voice("aura-2-raquel-es", "Aura 2 · Raquel"),
  voice("aura-2-teresa-es", "Aura 2 · Teresa"),
  voice("aura-2-tomas-es", "Aura 2 · Tomas"),
  voice("aura-2-valeria-es", "Aura 2 · Valeria"),
  voice("aura-2-alvaro-es", "Aura 2 · Alvaro"),
  voice("aura-2-lucia-es", "Aura 2 · Lucia"),
  voice("aura-2-stella-it", "Aura 2 · Stella"),
  voice("aura-2-ginevra-it", "Aura 2 · Ginevra"),
  voice("aura-2-luna-it", "Aura 2 · Luna"),
  voice("aura-2-seneca-it", "Aura 2 · Seneca"),
  voice("aura-2-orfeo-it", "Aura 2 · Orfeo"),
  voice("aura-2-virgilio-it", "Aura 2 · Virgilio"),
  voice("aura-2-beatrice-it", "Aura 2 · Beatrice"),
  voice("aura-2-diana-it", "Aura 2 · Diana"),
  voice("aura-2-marcello-it", "Aura 2 · Marcello"),
  voice("aura-2-carlo-it", "Aura 2 · Carlo"),
  voice("aura-2-himari-ja", "Aura 2 · Himari"),
  voice("aura-2-keita-ja", "Aura 2 · Keita"),
  voice("aura-2-aoi-ja", "Aura 2 · Aoi"),
  voice("aura-2-naoki-ja", "Aura 2 · Naoki"),
  voice("aura-2-yuki-ja", "Aura 2 · Yuki"),
  voice("aura-asteria-en", "Aura 1 · Asteria"),
  voice("aura-luna-en", "Aura 1 · Luna"),
  voice("aura-orion-en", "Aura 1 · Orion"),
  voice("aura-zeus-en", "Aura 1 · Zeus"),
];

function searchOnlyProviderEntry(params: {
  appProvider: RuntimeAppProviderId;
  label: string;
  shortLabel: string;
  apiKeyPlaceholder: string;
  apiKeyHint: string;
  apiKeyUrl: string;
}): RuntimeProviderManifestEntry {
  return {
    appProvider: params.appProvider,
    catalogProviderId: params.appProvider,
    label: params.label,
    shortLabel: params.shortLabel,
    apiKeyPlaceholder: params.apiKeyPlaceholder,
    apiKeyHint: params.apiKeyHint,
    apiKeyUrl: params.apiKeyUrl,
    llm: {
      support: "none",
      transport: "none",
      models: [],
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  };
}

function getCatalogProviderDocument(providerId: CatalogProviderId) {
  return PROVIDER_DOCUMENTS.find(
    (document) => document.provider.providerId === providerId,
  );
}

function getCatalogServiceModels(
  providerId: CatalogProviderId,
  service: "llm" | "stt" | "tts",
) {
  const document = getCatalogProviderDocument(providerId);

  if (!document) {
    return [];
  }

  if (service === "llm") {
    return document.llms;
  }

  if (service === "stt") {
    return document.stt;
  }

  return document.tts;
}

function catalogModelSpecs(
  providerId: CatalogProviderId,
  service: "llm" | "stt" | "tts",
  excludeModelIds: string[] = [],
): RuntimeModelSpec[] {
  const excluded = new Set(excludeModelIds);

  return getCatalogServiceModels(providerId, service)
    .filter((model) => !excluded.has(model.modelId))
    .map((model) => namedModel(model.modelId, model.publicName));
}

export const RUNTIME_PROVIDER_ORDER = [
  "openai",
  "anthropic",
  "alibaba-qwen-dashscope",
  "brave",
  "bytedance-doubao-seed",
  "exa",
  "firecrawl",
  "gemini",
  "xai",
  "deepseek",
  "mistral",
  "moonshot-ai-kimi",
  "perplexity",
  "serpapi",
  "tavily",
] as const satisfies readonly RuntimeAppProviderId[];

export const RUNTIME_PROVIDER_MANIFEST: Record<
  RuntimeAppProviderId,
  RuntimeProviderManifestEntry
> = {
  openai: {
    appProvider: "openai",
    catalogProviderId: "openai",
    label: "OpenAI",
    shortLabel: "OPENAI",
    apiKeyPlaceholder: "sk-...",
    apiKeyHint:
      "Unlocks OpenAI models, OpenAI-hosted speech, and OpenAI web search.",
    apiKeyUrl: "https://platform.openai.com/settings/organization/api-keys",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.openai.com/v1/chat/completions",
      defaultModel: "gpt-5.5",
      realtimeModelIds: ["gpt-realtime-1.5", "gpt-realtime-mini"],
      models: [
        model("gpt-5.5", "2026-04-23"),
        model("gpt-5.4", "2026-03-01"),
        model("gpt-5.4-mini", "2026-03-17"),
        model("gpt-5.4-nano", "2026-03-17"),
        model("gpt-4.1", "2025-04-14"),
        model("gpt-4.1-mini", "2025-04-14"),
        model("gpt-4.1-nano", "2025-04-14"),
        namedModel("gpt-realtime-1.5", "GPT-Realtime-1.5"),
        namedModel("gpt-realtime-mini", "GPT-Realtime-mini"),
      ],
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.openai.com/v1/audio/transcriptions",
      defaultModel: "gpt-4o-mini-transcribe",
      models: catalogModelSpecs("openai", "stt"),
      languageNote: `OpenAI currently exposes gpt-4o-transcribe, gpt-4o-mini-transcribe, and whisper-1 for speech-to-text. OpenAI's published well-supported language set is: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.openai.com/v1/audio/speech",
      requestFormat: "openai-speech",
      defaultModel: "gpt-4o-mini-tts",
      defaultVoice: "alloy",
      voiceFallback: "alloy",
      models: [
        namedModel("gpt-4o-mini-tts", "GPT-4o Mini TTS"),
        namedModel("tts-1", "tts-1"),
        namedModel("tts-1-hd", "tts-1-hd"),
      ],
      voiceOptions: [
        voice("alloy", "Alloy"),
        voice("ash", "Ash"),
        voice("ballad", "Ballad"),
        voice("cedar", "Cedar"),
        voice("coral", "Coral"),
        voice("echo", "Echo"),
        voice("fable", "Fable"),
        voice("marin", "Marin"),
        voice("onyx", "Onyx"),
        voice("nova", "Nova"),
        voice("sage", "Sage"),
        voice("shimmer", "Shimmer"),
        voice("verse", "Verse"),
      ],
      languageNote:
        "OpenAI currently exposes gpt-4o-mini-tts, tts-1, and tts-1-hd. OpenAI does not publish a compact well-supported language list for TTS in the same way it does for STT, and notes that the voices are optimized for English.",
    },
  },
  anthropic: {
    appProvider: "anthropic",
    catalogProviderId: "anthropic",
    label: "Anthropic",
    shortLabel: "ANTHROPIC",
    apiKeyPlaceholder: "sk-ant-...",
    apiKeyHint: "Unlocks Anthropic models in the main stage.",
    apiKeyUrl: "https://platform.claude.com/settings/keys",
    llm: {
      support: "provider",
      transport: "anthropic",
      defaultModel: "claude-sonnet-4-6",
      models: catalogModelSpecs("anthropic", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  "alibaba-qwen-dashscope": {
    appProvider: "alibaba-qwen-dashscope",
    catalogProviderId: "alibaba-qwen-dashscope",
    label: "Alibaba / Qwen",
    shortLabel: "QWEN",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Qwen hosted models through DashScope's OpenAI-compatible chat API.",
    apiKeyUrl:
      "https://www.alibabacloud.com/help/en/model-studio/compatibility-of-openai-with-dashscope",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      defaultModel: "qwen3.5-flash",
      models: [
        model("qwen3.5-plus"),
        model("qwen-plus"),
        model("qwen3.5-flash"),
        model("qwen-flash"),
        model("qwen3-max"),
        model("qwen3-omni-flash-realtime"),
      ],
    },
    stt: {
      support: "provider",
      transport: "openai-audio-input",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      defaultModel: "qwen3-asr-flash",
      models: [model("qwen3-asr-flash")],
      languageNote:
        "DashScope STT is limited to the simple Qwen3-ASR-Flash short-file transcription route. Long-file async transcription and realtime WebSocket ASR stay catalog-only to keep the app on straightforward BYOK flows.",
    },
    tts: {
      support: "provider",
      transport: "dashscope",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      defaultModel: "qwen3-tts-flash",
      defaultVoice: "Cherry",
      voiceFallback: "Cherry",
      models: [
        namedModel("qwen3-tts-flash", "Qwen3-TTS-Flash"),
        namedModel("qwen3-tts-instruct-flash", "Qwen3-TTS-Instruct-Flash"),
      ],
      voiceOptions: [voice("Cherry", "Cherry")],
      languageNote:
        "DashScope TTS is limited to the standard non-realtime Qwen3-TTS-Flash families with the default Cherry voice. Realtime TTS rows stay catalog-only to keep the app on straightforward BYOK flows.",
    },
  },
  brave: searchOnlyProviderEntry({
    appProvider: "brave",
    label: "Brave",
    shortLabel: "BRAVE",
    apiKeyPlaceholder: "BSA...",
    apiKeyHint:
      "Unlocks Brave Search web results through Brave's independent search index API.",
    apiKeyUrl: "https://api-dashboard.search.brave.com/app/keys",
  }),
  "bytedance-doubao-seed": {
    appProvider: "bytedance-doubao-seed",
    catalogProviderId: "bytedance-doubao-seed",
    label: "ByteDance",
    shortLabel: "DOUBAO",
    apiKeyPlaceholder: "Ark key or Ark|App|Access|Resource",
    apiKeyHint:
      "Unlocks Volcengine Ark chat models and Doubao Speech STT. Supported formats: <ark-api-key> for chat, <app-key>|<access-key> or <app-key>|<access-key>|<resource-id> for speech, or <ark-api-key>|<app-key>|<access-key>|<resource-id> to use both.",
    apiKeyUrl: "https://www.volcengine.com/docs/82379/1298459",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      defaultModel: "doubao-seed-2-0-lite-260215",
      models: catalogModelSpecs("bytedance-doubao-seed", "llm"),
    },
    stt: {
      support: "provider",
      transport: "bytedance-bigmodel-flash",
      endpoint: "https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash",
      defaultModel: "bigmodel",
      models: catalogModelSpecs("bytedance-doubao-seed", "stt"),
      languageNote:
        "Doubao Speech STT is wired through the one-shot bigmodel flash recognition route. The app sends local recordings as base64 audio with the speech credential format <app-key>|<access-key> or the combined Ark plus speech format.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  exa: searchOnlyProviderEntry({
    appProvider: "exa",
    label: "Exa",
    shortLabel: "EXA",
    apiKeyPlaceholder: "exa_...",
    apiKeyHint:
      "Unlocks Exa's search API for semantic web retrieval with extracted page text.",
    apiKeyUrl: "https://dashboard.exa.ai/api-keys",
  }),
  firecrawl: searchOnlyProviderEntry({
    appProvider: "firecrawl",
    label: "Firecrawl",
    shortLabel: "FIRECRAWL",
    apiKeyPlaceholder: "fc-...",
    apiKeyHint:
      "Unlocks Firecrawl search for live web results with optional extracted page content.",
    apiKeyUrl: "https://www.firecrawl.dev/app/api-keys",
  }),
  gemini: {
    appProvider: "gemini",
    catalogProviderId: "google-vertex-ai-studio",
    label: "Google",
    shortLabel: "GOOGLE",
    apiKeyPlaceholder: "AIza...|project-id|access-token|us",
    apiKeyHint:
      "Use AI Studio as AIza... for Gemini chat and TTS, Google Cloud Speech STT as <project-id>|<access-token>|<location>, or combine both as AIza...|<project-id>|<access-token>|<location>.",
    apiKeyUrl: "https://aistudio.google.com/app/apikey",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      defaultModel: "gemini-2.5-flash",
      realtimeModelIds: ["gemini-live-2.5-flash-native-audio"],
      realtimeTransport: "gemini-live",
      models: [
        model("gemini-live-2.5-flash-native-audio"),
        model("gemini-2.5-pro"),
        model("gemini-2.5-flash"),
        model("gemini-2.5-flash-lite"),
      ],
    },
    stt: {
      support: "provider",
      transport: "google-cloud-speech-v2",
      defaultModel: "chirp_3",
      models: catalogModelSpecs("google-vertex-ai-studio", "stt"),
      languageNote:
        "Google Cloud Speech-to-Text is a separate credential path from the Gemini AI Studio key. Use <project-id>|<access-token>|<location> for STT-only, or combine it with AI Studio as AIza...|<project-id>|<access-token>|<location>.",
    },
    tts: {
      support: "provider",
      transport: "gemini",
      endpointBase: "https://generativelanguage.googleapis.com/v1beta/models",
      defaultModel: "gemini-2.5-flash-preview-tts",
      defaultVoice: "Kore",
      voiceFallback: "Kore",
      models: [
        namedModel(
          "gemini-2.5-flash-preview-tts",
          "Gemini 2.5 Flash Preview TTS",
        ),
        namedModel(
          "gemini-2.5-pro-preview-tts",
          "Gemini 2.5 Pro Preview TTS",
        ),
      ],
      voiceOptions: [
        voice("Zephyr", "Zephyr · Bright", { de: "Zephyr · Klar" }),
        voice("Puck", "Puck · Upbeat", { de: "Puck · Schwungvoll" }),
        voice("Charon", "Charon · Informative", { de: "Charon · Informativ" }),
        voice("Kore", "Kore · Firm", { de: "Kore · Bestimmt" }),
        voice("Fenrir", "Fenrir · Excitable", { de: "Fenrir · Temperamentvoll" }),
        voice("Leda", "Leda · Youthful", { de: "Leda · Jugendlich" }),
        voice("Orus", "Orus · Firm", { de: "Orus · Bestimmt" }),
        voice("Aoede", "Aoede · Breezy", { de: "Aoede · Leicht" }),
        voice("Callirrhoe", "Callirrhoe · Easy-going", { de: "Callirrhoe · Gelassen" }),
        voice("Autonoe", "Autonoe · Bright", { de: "Autonoe · Klar" }),
        voice("Enceladus", "Enceladus · Breathy", { de: "Enceladus · Hauchig" }),
        voice("Iapetus", "Iapetus · Clear", { de: "Iapetus · Klar" }),
        voice("Umbriel", "Umbriel · Easy-going", { de: "Umbriel · Gelassen" }),
        voice("Algieba", "Algieba · Smooth", { de: "Algieba · Sanft" }),
        voice("Despina", "Despina · Smooth", { de: "Despina · Sanft" }),
        voice("Erinome", "Erinome · Clear", { de: "Erinome · Klar" }),
        voice("Algenib", "Algenib · Gravelly", { de: "Algenib · Rau" }),
        voice("Rasalgethi", "Rasalgethi · Informative", { de: "Rasalgethi · Informativ" }),
        voice("Laomedeia", "Laomedeia · Upbeat", { de: "Laomedeia · Schwungvoll" }),
        voice("Achernar", "Achernar · Soft", { de: "Achernar · Weich" }),
        voice("Alnilam", "Alnilam · Firm", { de: "Alnilam · Bestimmt" }),
        voice("Schedar", "Schedar · Even", { de: "Schedar · Gleichmaessig" }),
        voice("Gacrux", "Gacrux · Mature", { de: "Gacrux · Reif" }),
        voice("Pulcherrima", "Pulcherrima · Forward", { de: "Pulcherrima · Direkt" }),
        voice("Achird", "Achird · Friendly", { de: "Achird · Freundlich" }),
        voice("Zubenelgenubi", "Zubenelgenubi · Casual", { de: "Zubenelgenubi · Locker" }),
        voice("Vindemiatrix", "Vindemiatrix · Gentle", { de: "Vindemiatrix · Sanft" }),
        voice("Sadachbia", "Sadachbia · Lively", { de: "Sadachbia · Lebhaft" }),
        voice("Sadaltager", "Sadaltager · Knowledgeable", { de: "Sadaltager · Kenntnisreich" }),
        voice("Sulafat", "Sulafat · Warm", { de: "Sulafat · Warm" }),
      ],
      languageNote:
        "Gemini TTS currently supports Arabic, Bengali, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Mandarin Chinese, Polish, Portuguese, Romanian, Russian, Spanish, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, and Vietnamese.",
    },
  },
  xai: {
    appProvider: "xai",
    catalogProviderId: "xai",
    label: "xAI",
    shortLabel: "XAI",
    apiKeyPlaceholder: "xai-...",
    apiKeyHint: "Unlocks Grok models plus xAI voice APIs.",
    apiKeyUrl: "https://console.x.ai/team/default/api-keys",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.x.ai/v1/chat/completions",
      defaultModel: "grok-4.3",
      models: catalogModelSpecs("xai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "xai-realtime",
      endpoint: "wss://api.x.ai/v1/realtime",
      defaultModel: "voice-agent-api",
      models: catalogModelSpecs("xai", "stt"),
      languageNote:
        "xAI speech input is wired through the Voice Agent realtime WebSocket. SchnackAI streams recorded audio as PCM 16 kHz input and consumes the completed transcription event without requesting an assistant response.",
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.x.ai/v1/tts",
      requestFormat: "grok-speech",
      defaultModel: "grok-tts",
      defaultVoice: "ara",
      voiceFallback: "ara",
      models: catalogModelSpecs("xai", "tts"),
      voiceOptions: [
        voice("ara", "Ara · Warm", { de: "Ara · Warm" }),
        voice("eve", "Eve · Energetic", { de: "Eve · Energetisch" }),
        voice("leo", "Leo · Authoritative", { de: "Leo · Autoritaer" }),
        voice("rex", "Rex · Bold", { de: "Rex · Kraeftig" }),
        voice("sal", "Sal · Smooth", { de: "Sal · Sanft" }),
      ],
      languageNote:
        "xAI TTS supports auto-detect plus 20 languages/locale variants including English, Arabic (EG/SA/AE), Bengali, Simplified Chinese, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese (BR/PT), Russian, Spanish (MX/ES), Turkish, and Vietnamese. Inline expressive tags are supported: [laugh], [sigh], [pause], <whisper>.",
    },
  },
  deepseek: {
    appProvider: "deepseek",
    catalogProviderId: "deepseek",
    label: "DeepSeek",
    shortLabel: "DEEPSEEK",
    apiKeyPlaceholder: "sk-...",
    apiKeyHint: "Unlocks DeepSeek chat and reasoning models.",
    apiKeyUrl: "https://platform.deepseek.com/api_keys",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.deepseek.com/chat/completions",
      defaultModel: "deepseek-chat",
      models: catalogModelSpecs("deepseek", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  mistral: {
    appProvider: "mistral",
    catalogProviderId: "mistral-ai",
    label: "Mistral",
    shortLabel: "MISTRAL",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Mistral hosted models.",
    apiKeyUrl: "https://console.mistral.ai/api-keys",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.mistral.ai/v1/chat/completions",
      defaultModel: "mistral-medium-latest",
      models: catalogModelSpecs("mistral-ai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.mistral.ai/v1/audio/transcriptions",
      defaultModel: "voxtral-mini-latest",
      languageHintKey: "mistral-stt-language-code",
      models: [
        namedModel("voxtral-mini-latest", "Voxtral Mini Latest"),
      ],
      languageNote:
        "The current Voxtral transcription route is documented for English, Spanish, French, Portuguese, Hindi, German, Dutch, and Italian.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  "moonshot-ai-kimi": {
    appProvider: "moonshot-ai-kimi",
    catalogProviderId: "moonshot-ai-kimi",
    label: "Moonshot",
    shortLabel: "MOONSHOT",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Kimi models through Moonshot's OpenAI-compatible API.",
    apiKeyUrl: "https://platform.moonshot.ai/docs/guide/start-using-kimi-api",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.moonshot.ai/v1/chat/completions",
      defaultModel: "kimi-k2.5",
      models: catalogModelSpecs("moonshot-ai-kimi", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  perplexity: {
    appProvider: "perplexity",
    catalogProviderId: "perplexity",
    label: "Perplexity",
    shortLabel: "PERPLEXITY",
    apiKeyPlaceholder: "pplx-...",
    apiKeyHint:
      "Unlocks Perplexity Sonar models and Perplexity web-grounded search through the Sonar API.",
    apiKeyUrl: "https://docs.perplexity.ai/docs/sonar/quickstart",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.perplexity.ai/chat/completions",
      defaultModel: "sonar",
      models: catalogModelSpecs("perplexity", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  serpapi: searchOnlyProviderEntry({
    appProvider: "serpapi",
    label: "SerpApi",
    shortLabel: "SERPAPI",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks SerpApi's structured Google search results API for fresh web retrieval.",
    apiKeyUrl: "https://serpapi.com/manage-api-key",
  }),
  tavily: searchOnlyProviderEntry({
    appProvider: "tavily",
    label: "Tavily",
    shortLabel: "TAVILY",
    apiKeyPlaceholder: "tvly-...",
    apiKeyHint:
      "Unlocks Tavily's search API for ranked results, snippets, and answer-oriented search.",
    apiKeyUrl: "https://app.tavily.com/home",
  }),
};

export type RuntimeProviderManifest = typeof RUNTIME_PROVIDER_MANIFEST;
