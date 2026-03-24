import type { CatalogProviderId } from "../../catalog/types";

export type RuntimeAppProviderId =
  | "openai"
  | "anthropic"
  | "gemini"
  | "cohere"
  | "deepseek"
  | "groq"
  | "mistral"
  | "nvidia"
  | "together"
  | "xai";

export type RuntimeLlmTransport =
  | "openai-compatible"
  | "anthropic"
  | "cohere";
export type RuntimeSttTransport = "none" | "multipart" | "gemini";
export type RuntimeTtsTransport = "none" | "binary" | "gemini";
export type RuntimeTtsBinaryRequestFormat =
  | "openai-speech"
  | "together-speech"
  | "xai-speech";
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

interface RuntimeLlmManifest {
  transport: RuntimeLlmTransport;
  endpoint?: string;
  defaultModel: string;
  models: RuntimeModelSpec[];
}

interface RuntimeSttManifest {
  support: "none" | "provider";
  transport: RuntimeSttTransport;
  endpoint?: string;
  endpointBase?: string;
  defaultModel?: string;
  models: RuntimeModelSpec[];
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

export const RUNTIME_PROVIDER_ORDER = [
  "openai",
  "anthropic",
  "gemini",
  "xai",
  "groq",
  "deepseek",
  "mistral",
  "cohere",
  "together",
  "nvidia",
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
      "Unlocks OpenAI models and OpenAI-hosted speech when you choose provider STT or TTS.",
    apiKeyUrl: "https://platform.openai.com/settings/organization/api-keys",
    llm: {
      transport: "openai-compatible",
      endpoint: "https://api.openai.com/v1/chat/completions",
      defaultModel: "gpt-5.4",
      models: [
        model("gpt-5.4", "2026-03-01"),
        model("gpt-5.4-mini"),
        model("gpt-5.4-nano"),
        namedModel("gpt-5.4-pro", "GPT-5.4 Pro"),
        namedModel("gpt-5.2", "GPT-5.2"),
        namedModel("gpt-5.1", "GPT-5.1"),
        namedModel("gpt-5", "GPT-5"),
        namedModel("gpt-5-mini", "GPT-5 Mini", "2025-08-07"),
        namedModel("gpt-5-nano", "GPT-5 Nano"),
        model("o3", "2025-04-16"),
        namedModel("o3-pro", "o3 Pro"),
        model("o4-mini", "2025-04-16"),
        namedModel("o3-mini", "o3 Mini"),
        namedModel("o1", "o1"),
        namedModel("o1-mini", "o1 Mini (Deprecated)"),
        namedModel("o1-preview", "o1 Preview (Deprecated)"),
        namedModel("gpt-4.5-preview", "GPT-4.5 Preview (Deprecated)"),
        model("gpt-4.1", "2025-04-14"),
        model("gpt-4.1-mini", "2025-04-14"),
        model("gpt-4.1-nano", "2025-04-14"),
        namedModel("gpt-4o", "GPT-4o"),
        namedModel("gpt-4o-mini", "GPT-4o Mini"),
        namedModel("gpt-4-turbo", "GPT-4 Turbo"),
        namedModel("gpt-4", "GPT-4"),
        namedModel("gpt-3.5-turbo", "GPT-3.5 Turbo"),
      ],
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.openai.com/v1/audio/transcriptions",
      defaultModel: "gpt-4o-mini-transcribe",
      models: [
        namedModel("gpt-4o-transcribe", "GPT-4o Transcribe"),
        namedModel("gpt-4o-mini-transcribe", "GPT-4o Mini Transcribe"),
        namedModel("whisper-1", "Whisper-1"),
      ],
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
      transport: "anthropic",
      defaultModel: "claude-sonnet-4-6",
      models: [
        namedModel("claude-opus-4-6", "Claude Opus 4.6"),
        namedModel("claude-sonnet-4-6", "Claude Sonnet 4.6"),
        namedModel("claude-haiku-4-5-20251001", "Claude Haiku 4.5", "2025-10-01"),
        namedModel("claude-opus-4-5-20251101", "Claude Opus 4.5", "2025-11-01"),
        namedModel("claude-sonnet-4-5-20250929", "Claude Sonnet 4.5", "2025-09-29"),
        namedModel("claude-opus-4-1-20250805", "Claude Opus 4.1", "2025-08-05"),
        namedModel("claude-opus-4-20250522", "Claude Opus 4", "2025-05-22"),
        namedModel("claude-sonnet-4-20250514", "Claude Sonnet 4", "2025-05-14"),
        namedModel("claude-3-haiku-20240307", "Claude 3 Haiku", "2024-03-07"),
      ],
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
  gemini: {
    appProvider: "gemini",
    catalogProviderId: "google-vertex-ai-studio",
    label: "Google",
    shortLabel: "GOOGLE",
    apiKeyPlaceholder: "AIza...",
    apiKeyHint:
      "Unlocks Gemini models plus Google-hosted speech features through the Gemini API.",
    apiKeyUrl: "https://aistudio.google.com/app/apikey",
    llm: {
      transport: "openai-compatible",
      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      defaultModel: "gemini-2.5-flash",
      models: [
        model("gemini-3.1-pro-preview"),
        model("gemini-3.1-flash-lite-preview"),
        namedModel("gemini-3-flash-preview", "Gemini 3 Flash Preview"),
        model("gemini-2.5-pro"),
        model("gemini-2.5-flash"),
        namedModel("gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite"),
        model("gemini-2.0-flash"),
        model("gemini-2.0-flash-lite"),
      ],
    },
    stt: {
      support: "provider",
      transport: "gemini",
      endpointBase: "https://generativelanguage.googleapis.com/v1beta/models",
      defaultModel: "gemini-2.5-flash",
      models: [
        namedModel("gemini-3.1-pro-preview", "Gemini 3.1 Pro Preview"),
        namedModel("gemini-3.1-flash-lite-preview", "Gemini 3.1 Flash-Lite Preview"),
        namedModel("gemini-3-flash-preview", "Gemini 3 Flash Preview"),
        namedModel("gemini-2.5-pro", "Gemini 2.5 Pro"),
        namedModel("gemini-2.5-flash", "Gemini 2.5 Flash"),
        namedModel("gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite"),
        namedModel("gemini-2.0-flash", "Gemini 2.0 Flash"),
        namedModel("gemini-2.0-flash-lite", "Gemini 2.0 Flash-Lite"),
      ],
      languageNote:
        "Gemini audio understanding is multilingual, but Google does not publish a compact supported-language table for this transcription path. It is a broad general-purpose transcription route rather than a dedicated telephony STT API.",
    },
    tts: {
      support: "provider",
      transport: "gemini",
      endpointBase: "https://generativelanguage.googleapis.com/v1beta/models",
      defaultModel: "gemini-2.5-flash-preview-tts",
      defaultVoice: "Kore",
      voiceFallback: "alloy",
      models: [
        namedModel("gemini-2.5-flash-preview-tts", "Gemini 2.5 Flash Preview TTS"),
        namedModel("gemini-2.5-pro-preview-tts", "Gemini 2.5 Pro Preview TTS"),
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
    apiKeyHint: "Unlocks Grok models from xAI.",
    apiKeyUrl: "https://console.x.ai/team/default/api-keys",
    llm: {
      transport: "openai-compatible",
      endpoint: "https://api.x.ai/v1/chat/completions",
      defaultModel: "grok-4",
      models: [
        namedModel("grok-4", "Grok 4"),
        namedModel("grok-4-1-fast-reasoning", "Grok 4.1 Fast Reasoning"),
        namedModel("grok-4-1-fast-non-reasoning", "Grok 4.1 Fast Non-Reasoning"),
        model("grok-code-fast-1"),
        namedModel("grok-3", "Grok 3"),
        namedModel("grok-3-fast", "Grok 3 Fast"),
        namedModel("grok-3-mini", "Grok 3 Mini"),
      ],
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.x.ai/v1/audio/speech",
      requestFormat: "xai-speech",
      defaultModel: "grok-tts-mini",
      defaultVoice: "ara",
      voiceFallback: "alloy",
      models: [namedModel("grok-tts-mini", "Grok TTS Mini")],
      voiceOptions: [
        voice("eve", "Eve · Energetic", { de: "Eve · Energetisch" }),
        voice("ara", "Ara · Warm", { de: "Ara · Warm" }),
        voice("rex", "Rex · Confident", { de: "Rex · Souveraen" }),
        voice("sal", "Sal · Balanced", { de: "Sal · Ausgewogen" }),
        voice("leo", "Leo · Authoritative", { de: "Leo · Autoritaer" }),
      ],
      languageNote:
        "xAI TTS currently supports Arabic, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Thai, Turkish, Vietnamese, and Chinese.",
    },
  },
  groq: {
    appProvider: "groq",
    catalogProviderId: "groq",
    label: "Groq",
    shortLabel: "GROQ",
    apiKeyPlaceholder: "gsk_...",
    apiKeyHint:
      "Groq offers a free tier and unlocks fast hosted inference models.",
    apiKeyUrl: "https://console.groq.com/keys",
    llm: {
      transport: "openai-compatible",
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      defaultModel: "llama-3.3-70b-versatile",
      models: [
        model("groq/compound"),
        model("groq/compound-mini"),
        namedModel("meta-llama/llama-4-maverick-17b-128e-instruct", "Llama 4 Maverick"),
        namedModel("meta-llama/llama-4-scout-17b-16e-instruct", "Llama 4 Scout"),
        namedModel("llama-3.3-70b-versatile", "Llama 3.3 70B Versatile"),
        namedModel("llama-3.1-8b-instant", "Llama 3.1 8B Instant"),
        namedModel("openai/gpt-oss-120b", "GPT-OSS 120B"),
        namedModel("openai/gpt-oss-20b", "GPT-OSS 20B"),
        namedModel("moonshotai/kimi-k2-instruct-0905", "Kimi K2 Instruct"),
        namedModel("qwen/qwen3-32b", "Qwen3 32B"),
      ],
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.groq.com/openai/v1/audio/transcriptions",
      defaultModel: "whisper-large-v3-turbo",
      models: [
        namedModel("whisper-large-v3-turbo", "Whisper Large v3 Turbo"),
        namedModel("whisper-large-v3", "Whisper Large v3"),
      ],
      languageNote: `The app uses whisper-large-v3-turbo here. Groq documents it as multilingual. For the Whisper family, a published well-supported language set is: ${WHISPER_WELL_SUPPORTED_LANGUAGES} If multilingual accuracy matters more than speed, Groq recommends whisper-large-v3 over the turbo variant.`,
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
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
      transport: "openai-compatible",
      endpoint: "https://api.deepseek.com/chat/completions",
      defaultModel: "deepseek-chat",
      models: [model("deepseek-chat"), model("deepseek-reasoner")],
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
      transport: "openai-compatible",
      endpoint: "https://api.mistral.ai/v1/chat/completions",
      defaultModel: "mistral-medium-latest",
      models: [
        namedModel("mistral-large-latest", "Mistral Large 3"),
        namedModel("mistral-medium-latest", "Mistral Medium 3"),
        namedModel("magistral-medium-latest", "Magistral Medium"),
        namedModel("magistral-small-latest", "Magistral Small"),
        namedModel("mistral-small-latest", "Mistral Small 3.1"),
        namedModel("ministral-8b-latest", "Ministral 8B"),
        namedModel("open-mistral-nemo", "Mistral Nemo"),
        namedModel("codestral-latest", "Codestral 2"),
      ],
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.mistral.ai/v1/audio/transcriptions",
      defaultModel: "voxtral-mini-latest",
      languageHintKey: "mistral-stt-language-code",
      models: [namedModel("voxtral-mini-latest", "Voxtral Mini Latest")],
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
  cohere: {
    appProvider: "cohere",
    catalogProviderId: "cohere",
    label: "Cohere",
    shortLabel: "COHERE",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Cohere command models.",
    apiKeyUrl: "https://dashboard.cohere.com/api-keys",
    llm: {
      transport: "cohere",
      defaultModel: "command-a-03-2025",
      models: [
        namedModel("command-a-03-2025", "Command A"),
        namedModel("command-a-reasoning-08-2025", "Command A Reasoning"),
        namedModel("command-a-vision-07-2025", "Command A Vision"),
        namedModel("command-r7b-12-2024", "Command R7B"),
        namedModel("command-r-plus-08-2024", "Command R+"),
        namedModel("command-r-08-2024", "Command R"),
      ],
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
  together: {
    appProvider: "together",
    catalogProviderId: "together-ai",
    label: "Together",
    shortLabel: "TOGETHER",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Together-hosted open models.",
    apiKeyUrl: "https://api.together.ai/settings/api-keys",
    llm: {
      transport: "openai-compatible",
      endpoint: "https://api.together.xyz/v1/chat/completions",
      defaultModel: "openai/gpt-oss-20b",
      models: [
        namedModel("MiniMaxAI/MiniMax-M2.5", "MiniMax M2.5"),
        namedModel("Qwen/Qwen3.5-397B-A17B", "Qwen3.5 397B A17B"),
        namedModel("Qwen/Qwen3-235B-A22B-FP8", "Qwen3 235B"),
        namedModel("Qwen/Qwen3.5-9B", "Qwen3.5 9B"),
        namedModel("openai/gpt-oss-20b", "GPT-OSS 20B"),
        namedModel("openai/gpt-oss-120b", "GPT-OSS 120B"),
        namedModel("moonshotai/Kimi-K2.5", "Kimi K2.5"),
        namedModel("deepseek-ai/DeepSeek-V3.1", "DeepSeek V3.1"),
        namedModel("deepseek-ai/DeepSeek-R1", "DeepSeek R1"),
        namedModel("meta-llama/Llama-3.3-70B-Instruct-Turbo", "Llama 3.3 70B Turbo"),
        namedModel("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", "Llama 3.1 8B Turbo"),
        namedModel("meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", "Llama 4 Maverick"),
        namedModel("Qwen/Qwen3-Next-80B-A3B-Instruct", "Qwen3 Next 80B"),
        namedModel("Qwen/Qwen3-Coder-Next-FP8", "Qwen3 Coder Next"),
      ],
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.together.xyz/v1/audio/transcriptions",
      defaultModel: "openai/whisper-large-v3",
      models: [
        namedModel("openai/whisper-large-v3", "Whisper Large v3"),
        namedModel("mistralai/Voxtral-Mini-3B-2507", "Voxtral Mini 3B"),
      ],
      languageNote: `The current integration uses openai/whisper-large-v3. It is multilingual and accepts ISO 639-1 language hints. A published well-supported language set for Whisper is: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.together.xyz/v1/audio/speech",
      requestFormat: "together-speech",
      defaultModel: "hexgrad/Kokoro-82M",
      defaultVoice: "af_alloy",
      voiceFallback: "alloy",
      models: [namedModel("hexgrad/Kokoro-82M", "Kokoro 82M")],
      voiceOptions: [
        voice("af_heart", "af_heart"),
        voice("af_alloy", "af_alloy"),
        voice("af_aoede", "af_aoede"),
        voice("af_bella", "af_bella"),
        voice("af_jessica", "af_jessica"),
        voice("af_kore", "af_kore"),
        voice("af_nicole", "af_nicole"),
        voice("af_nova", "af_nova"),
        voice("af_river", "af_river"),
        voice("af_sarah", "af_sarah"),
        voice("af_sky", "af_sky"),
        voice("am_adam", "am_adam"),
        voice("am_echo", "am_echo"),
        voice("am_eric", "am_eric"),
        voice("am_fenrir", "am_fenrir"),
        voice("am_liam", "am_liam"),
      ],
      languageNote:
        "The current Together TTS route is configured for English, Spanish, French, German, Italian, Portuguese, Hindi, Japanese, Korean, and Chinese. Voice availability is model-specific.",
    },
  },
  nvidia: {
    appProvider: "nvidia",
    catalogProviderId: "nvidia-nim",
    label: "NVIDIA",
    shortLabel: "NVIDIA",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks NVIDIA hosted models.",
    apiKeyUrl: "https://build.nvidia.com",
    llm: {
      transport: "openai-compatible",
      endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
      defaultModel: "nvidia/llama-3.3-nemotron-super-49b-v1.5",
      models: [
        namedModel("nvidia/llama-3.3-nemotron-super-49b-v1.5", "Llama 3.3 Nemotron Super 49B"),
        namedModel("nvidia/llama-3.1-nemotron-ultra-253b-v1", "Llama 3.1 Nemotron Ultra 253B"),
        namedModel("nvidia/llama-3.1-nemotron-nano-8b-v1", "Llama 3.1 Nemotron Nano 8B"),
      ],
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
};

export type RuntimeProviderManifest = typeof RUNTIME_PROVIDER_MANIFEST;
