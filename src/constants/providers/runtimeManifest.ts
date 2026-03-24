import type { CatalogProviderId } from "../../catalog/types";
import { PROVIDER_DOCUMENTS } from "../../../data/providers";

export type RuntimeAppProviderId =
  | "01-ai-yi"
  | "openai"
  | "microsoft-azure"
  | "anthropic"
  | "assemblyai"
  | "ai21-labs"
  | "alibaba-qwen-dashscope"
  | "baichuan"
  | "baidu-ernie-qianfan"
  | "bytedance-doubao-seed"
  | "deepgram"
  | "elevenlabs"
  | "fish-audio"
  | "gemini"
  | "cerebras"
  | "cohere"
  | "deepinfra"
  | "deepseek"
  | "fireworks-ai"
  | "groq"
  | "hugging-face-inference-api"
  | "hyperbolic"
  | "mistral"
  | "minimax"
  | "moonshot-ai-kimi"
  | "nvidia"
  | "novita-ai"
  | "perplexity"
  | "sambanova"
  | "siliconflow"
  | "stepfun"
  | "together"
  | "xai"
  | "xiaomi-mimo"
  | "z-ai-zhipu-ai";

export type RuntimeLlmTransport =
  | "none"
  | "openai-compatible"
  | "azure-openai"
  | "anthropic"
  | "cohere";
export type RuntimeSttTransport =
  | "none"
  | "multipart"
  | "azure-openai"
  | "deepinfra-inference"
  | "gemini"
  | "openai-audio-input"
  | "baidu-short-speech"
  | "assemblyai-pre-recorded"
  | "deepgram-pre-recorded"
  | "fireworks-pre-recorded"
  | "fish-audio"
  | "huggingface-json"
  | "novita-json"
  | "elevenlabs";
export type RuntimeTtsTransport =
  | "none"
  | "binary"
  | "azure-openai"
  | "baidu"
  | "gemini"
  | "dashscope"
  | "deepgram"
  | "fish-audio"
  | "hyperbolic"
  | "minimax"
  | "novita"
  | "elevenlabs";
export type RuntimeTtsBinaryRequestFormat =
  | "openai-speech"
  | "together-speech"
  | "xai-speech"
  | "groq-speech"
  | "siliconflow-speech"
  | "novita-glm-speech"
  | "zai-speech";
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
  "01-ai-yi",
  "openai",
  "microsoft-azure",
  "anthropic",
  "assemblyai",
  "ai21-labs",
  "alibaba-qwen-dashscope",
  "baidu-ernie-qianfan",
  "bytedance-doubao-seed",
  "deepgram",
  "elevenlabs",
  "fish-audio",
  "gemini",
  "xai",
  "groq",
  "deepseek",
  "mistral",
  "cohere",
  "together",
  "nvidia",
  "baichuan",
  "cerebras",
  "deepinfra",
  "fireworks-ai",
  "hugging-face-inference-api",
  "hyperbolic",
  "minimax",
  "moonshot-ai-kimi",
  "novita-ai",
  "perplexity",
  "sambanova",
  "siliconflow",
  "stepfun",
  "z-ai-zhipu-ai",
  "xiaomi-mimo",
] as const satisfies readonly RuntimeAppProviderId[];

export const RUNTIME_PROVIDER_MANIFEST: Record<
  RuntimeAppProviderId,
  RuntimeProviderManifestEntry
> = {
  "01-ai-yi": {
    appProvider: "01-ai-yi",
    catalogProviderId: "01-ai-yi",
    label: "01.AI",
    shortLabel: "01.AI",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Yi chat models through 01.AI's OpenAI-compatible API surface.",
    apiKeyUrl: "https://platform.lingyiwanwu.com/docs",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.lingyiwanwu.com/v1/chat/completions",
      defaultModel: "yi-lightning",
      models: catalogModelSpecs("01-ai-yi", "llm"),
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
      support: "provider",
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
        namedModel("gpt-audio-1.5", "GPT-Audio-1.5"),
        namedModel("gpt-audio-mini", "GPT-Audio-mini"),
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
  "microsoft-azure": {
    appProvider: "microsoft-azure",
    catalogProviderId: "microsoft-azure",
    label: "Azure",
    shortLabel: "AZURE",
    apiKeyPlaceholder: "https://your-resource.openai.azure.com|api-key",
    apiKeyHint:
      "Enter your Azure OpenAI resource endpoint and API key separated by |. Model ids should match your Azure deployment names for chat and speech calls.",
    apiKeyUrl: "https://learn.microsoft.com/en-us/azure/foundry/openai/reference",
    llm: {
      support: "provider",
      transport: "azure-openai",
      defaultModel: "gpt-4.1-mini",
      models: catalogModelSpecs("microsoft-azure", "llm", [
        "gpt-realtime",
        "gpt-realtime-1.5",
        "gpt-realtime-mini",
      ]),
    },
    stt: {
      support: "provider",
      transport: "azure-openai",
      defaultModel: "gpt-4o-mini-transcribe",
      models: catalogModelSpecs("microsoft-azure", "stt"),
      languageNote:
        "Azure OpenAI STT is now wired for the non-realtime transcription models in the catalog. Azure Speech and realtime Azure audio flows remain broader than this picker and still need dedicated transports.",
    },
    tts: {
      support: "provider",
      transport: "azure-openai",
      defaultModel: "gpt-4o-mini-tts",
      defaultVoice: "alloy",
      voiceFallback: "alloy",
      models: catalogModelSpecs("microsoft-azure", "tts"),
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
        "Azure OpenAI TTS is now wired for gpt-4o-mini-tts plus the legacy tts and tts-hd models on the v1 audio/speech route. Realtime Azure voice models still need a dedicated realtime transport.",
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
  assemblyai: {
    appProvider: "assemblyai",
    catalogProviderId: "assemblyai",
    label: "AssemblyAI",
    shortLabel: "ASSEMBLY",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks AssemblyAI LLM Gateway models and AssemblyAI pre-recorded speech-to-text.",
    apiKeyUrl: "https://www.assemblyai.com/dashboard/signup",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://llm-gateway.assemblyai.com/v1/chat/completions",
      defaultModel: "claude-sonnet-4-6",
      models: catalogModelSpecs("assemblyai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "assemblyai-pre-recorded",
      endpointBase: "https://api.assemblyai.com/v2",
      defaultModel: "universal-3-pro",
      models: [
        namedModel("universal-3-pro", "Universal-3 Pro"),
        namedModel("universal-2", "Universal-2"),
      ],
      languageNote:
        "AssemblyAI is currently wired for its pre-recorded STT models universal-3-pro and universal-2. Streaming-only models like u3-rt-pro, universal-streaming-english, universal-streaming-multilingual, and whisper-rt still need a realtime transport path.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  "ai21-labs": {
    appProvider: "ai21-labs",
    catalogProviderId: "ai21-labs",
    label: "AI21",
    shortLabel: "AI21",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks AI21 Jamba chat models through the hosted Jamba API.",
    apiKeyUrl: "https://docs.ai21.com/docs/create-api-key",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.ai21.com/studio/v1/chat/completions",
      defaultModel: "jamba-mini-2-2026-01",
      models: catalogModelSpecs("ai21-labs", "llm"),
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
        "DashScope STT is currently wired only for Qwen3-ASR-Flash short-file transcription through the OpenAI-compatible endpoint. Catalog-only models like qwen3-asr-flash-filetrans and qwen3-asr-flash-realtime still need dedicated async or realtime transport support.",
    },
    tts: {
      support: "provider",
      transport: "dashscope",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      defaultModel: "qwen3-tts-flash",
      defaultVoice: "Cherry",
      voiceFallback: "Cherry",
      models: catalogModelSpecs("alibaba-qwen-dashscope", "tts", [
        "qwen3-tts-flash-realtime",
        "qwen3-tts-instruct-flash-realtime",
      ]),
      voiceOptions: [voice("Cherry", "Cherry")],
      languageNote:
        "DashScope TTS is currently wired for the non-realtime Qwen3-TTS-Flash and Qwen3-TTS-Instruct-Flash families with the default Cherry voice. The realtime Qwen TTS families still need dedicated transport and voice-surface support.",
    },
  },
  baichuan: {
    appProvider: "baichuan",
    catalogProviderId: "baichuan",
    label: "Baichuan",
    shortLabel: "BAICHUAN",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Baichuan hosted models through its OpenAI-style chat completions API.",
    apiKeyUrl: "https://platform.baichuan-ai.com/docs/api",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.baichuan-ai.com/v1/chat/completions",
      defaultModel: "Baichuan4-Air",
      models: catalogModelSpecs("baichuan", "llm"),
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
  "baidu-ernie-qianfan": {
    appProvider: "baidu-ernie-qianfan",
    catalogProviderId: "baidu-ernie-qianfan",
    label: "Baidu",
    shortLabel: "BAIDU",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Baidu Qianfan / ERNIE models through Qianfan's OpenAI-compatible chat API.",
    apiKeyUrl: "https://cloud.baidu.com/product-s/qianfan_home",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://qianfan.baidubce.com/v2/chat/completions",
      defaultModel: "ernie-5.0",
      models: catalogModelSpecs("baidu-ernie-qianfan", "llm"),
    },
    stt: {
      support: "provider",
      transport: "baidu-short-speech",
      defaultModel: "短语音识别",
      models: [
        namedModel("短语音识别", "Short Speech Recognition"),
        namedModel("短语音识别极速版", "Short Speech Recognition Pro / 极速版"),
      ],
      languageNote:
        "Baidu is currently wired only for its short-form request/response ASR surfaces. The async file-transcription job API and realtime WebSocket transcription remain catalog-only until the app gains long-file URL handling and realtime transports.",
    },
    tts: {
      support: "provider",
      transport: "baidu",
      endpoint: "https://tsn.baidu.com/text2audio",
      defaultModel: "短文本语音合成",
      defaultVoice: "0",
      voiceFallback: "0",
      models: [
        namedModel("短文本语音合成", "Short Text Speech Synthesis"),
        namedModel("长文本合成", "Long Text Speech Synthesis"),
      ],
      voiceOptions: [
        voice("0", "Standard female"),
        voice("1", "Standard male"),
        voice("3", "Emotional female"),
        voice("4", "Emotional child"),
      ],
      languageNote:
        "Baidu is currently wired for both the short-text REST TTS API and the long-text async synthesis job API. Streaming WebSocket TTS remains catalog-only until the app grows realtime speech transports.",
    },
  },
  "bytedance-doubao-seed": {
    appProvider: "bytedance-doubao-seed",
    catalogProviderId: "bytedance-doubao-seed",
    label: "ByteDance",
    shortLabel: "DOUBAO",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Doubao / Seed hosted models through Volcano Engine Ark's OpenAI-compatible chat API.",
    apiKeyUrl: "https://www.volcengine.com/docs/82379/1298459",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      defaultModel: "doubao-seed-2-0-lite-260215",
      models: catalogModelSpecs("bytedance-doubao-seed", "llm"),
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
  deepgram: {
    appProvider: "deepgram",
    catalogProviderId: "deepgram",
    label: "Deepgram",
    shortLabel: "DEEPGRAM",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Deepgram native speech-to-text and text-to-speech APIs.",
    apiKeyUrl: "https://console.deepgram.com/signup",
    llm: {
      support: "none",
      transport: "none",
      models: [],
      defaultModel: "",
    },
    stt: {
      support: "provider",
      transport: "deepgram-pre-recorded",
      endpointBase: "https://api.deepgram.com/v1",
      defaultModel: "nova-3",
      models: catalogModelSpecs("deepgram", "stt"),
      languageNote:
        "Deepgram exposes broad multilingual STT coverage. Flux is English-only, while Nova and Whisper families have broader multilingual coverage. Uploads can reach 2 GB, though Deepgram recommends keeping pre-recorded jobs under roughly 10 minutes for Nova/Base/Enhanced and under 20 minutes for Whisper to avoid gateway timeouts.",
    },
    tts: {
      support: "provider",
      transport: "deepgram",
      endpointBase: "https://api.deepgram.com/v1",
      defaultModel: "aura-2",
      defaultVoice: "aura-2-thalia-en",
      voiceFallback: "aura-2-thalia-en",
      models: catalogModelSpecs("deepgram", "tts"),
      voiceOptions: [
        voice("aura-2-thalia-en", "Aura 2 · Thalia"),
        voice("aura-2-asteria-en", "Aura 2 · Asteria"),
        voice("aura-2-apollo-en", "Aura 2 · Apollo"),
        voice("aura-2-helena-en", "Aura 2 · Helena"),
        voice("aura-asteria-en", "Aura 1 · Asteria"),
        voice("aura-luna-en", "Aura 1 · Luna"),
        voice("aura-orion-en", "Aura 1 · Orion"),
        voice("aura-zeus-en", "Aura 1 · Zeus"),
      ],
      languageNote:
        "Deepgram Aura voices are language- and voice-specific. Aura 2 currently documents English, Spanish, German, French, Dutch, Italian, and Japanese; Aura 1 is older and should be treated as a compatibility fallback.",
    },
  },
  elevenlabs: {
    appProvider: "elevenlabs",
    catalogProviderId: "elevenlabs",
    label: "ElevenLabs",
    shortLabel: "ELEVEN",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks ElevenLabs speech-to-text and text-to-speech APIs.",
    apiKeyUrl: "https://elevenlabs.io/app/settings/api-keys",
    llm: {
      support: "none",
      transport: "none",
      models: [],
      defaultModel: "",
    },
    stt: {
      support: "provider",
      transport: "elevenlabs",
      endpoint: "https://api.elevenlabs.io/v1/speech-to-text",
      defaultModel: "scribe_v2",
      models: [
        namedModel("scribe_v2", "Scribe v2"),
        namedModel("scribe_v1", "Scribe v1"),
      ],
      languageNote:
        "ElevenLabs STT supports 90+ languages. The current upload endpoint accepts scribe_v2 and scribe_v1; the realtime scribe_v2_realtime model remains catalog-only until the app gains a WebSocket transcription transport.",
    },
    tts: {
      support: "provider",
      transport: "elevenlabs",
      endpointBase: "https://api.elevenlabs.io/v1",
      defaultModel: "eleven_flash_v2_5",
      defaultVoice: "JBFqnCBsd6RMkjVDRZzb",
      voiceFallback: "JBFqnCBsd6RMkjVDRZzb",
      models: catalogModelSpecs("elevenlabs", "tts"),
      voiceOptions: [
        voice("JBFqnCBsd6RMkjVDRZzb", "Docs Example Voice"),
      ],
      languageNote:
        "ElevenLabs voices are live-discovered and dynamic. The current runtime uses a documented example voice as the default fallback; the TTS models themselves remain selectable and the voice catalog can be expanded later with live discovery.",
    },
  },
  "fish-audio": {
    appProvider: "fish-audio",
    catalogProviderId: "fish-audio",
    label: "Fish Audio",
    shortLabel: "FISH",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Fish Audio hosted speech-to-text and text-to-speech APIs.",
    apiKeyUrl: "https://fish.audio/plan/",
    llm: {
      support: "none",
      transport: "none",
      models: [],
      defaultModel: "",
    },
    stt: {
      support: "provider",
      transport: "fish-audio",
      endpoint: "https://api.fish.audio/v1/asr",
      defaultModel: "transcribe-1",
      models: [],
      languageNote:
        "Fish Audio STT is a generic provider endpoint rather than a stable public model picker. The hosted /v1/asr API auto-detects language; official docs publish a 20 MB / 60 minute cap but do not expose a canonical STT model ID.",
    },
    tts: {
      support: "provider",
      transport: "fish-audio",
      endpoint: "https://api.fish.audio/v1/tts",
      defaultModel: "s2-pro",
      models: catalogModelSpecs("fish-audio", "tts"),
      voiceOptions: [],
      languageNote:
        "Fish Audio TTS is backend-driven rather than voice-id driven. Current official backends include s2-pro and s1, while legacy speech-1.6 and speech-1.5 remain relevant for older integrations even though the catalog marks them deprecated.",
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
      support: "provider",
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
      defaultModel: "gemini-2.5-flash-tts",
      defaultVoice: "Kore",
      voiceFallback: "alloy",
      models: catalogModelSpecs("google-vertex-ai-studio", "tts"),
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
  cerebras: {
    appProvider: "cerebras",
    catalogProviderId: "cerebras",
    label: "Cerebras",
    shortLabel: "CEREBRAS",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Cerebras hosted models through its OpenAI-compatible inference API.",
    apiKeyUrl: "https://inference-docs.cerebras.ai/introduction",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.cerebras.ai/v1/chat/completions",
      defaultModel: "gpt-oss-120b",
      models: catalogModelSpecs("cerebras", "llm"),
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
  deepinfra: {
    appProvider: "deepinfra",
    catalogProviderId: "deepinfra",
    label: "DeepInfra",
    shortLabel: "DEEPINFRA",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks DeepInfra hosted models through its OpenAI-compatible API.",
    apiKeyUrl: "https://deepinfra.com/docs/openai_api",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.deepinfra.com/v1/openai/chat/completions",
      defaultModel: "deepseek-ai/DeepSeek-V3.2",
      models: catalogModelSpecs("deepinfra", "llm"),
    },
    stt: {
      support: "provider",
      transport: "deepinfra-inference",
      endpointBase: "https://api.deepinfra.com/v1/inference",
      defaultModel: "openai/whisper-large-v3-turbo",
      models: catalogModelSpecs("deepinfra", "stt"),
      languageNote:
        "DeepInfra STT is now wired through the native inference API for the documented Whisper and Voxtral catalog entries. DeepInfra does not publish a single provider-wide upload cap for all native ASR models, so catalog constraints remain model-specific.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
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
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.x.ai/v1/chat/completions",
      defaultModel: "grok-4",
      models: catalogModelSpecs("xai", "llm"),
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
      defaultModel: "text-to-speech",
      defaultVoice: "ara",
      voiceFallback: "alloy",
      models: catalogModelSpecs("xai", "tts"),
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
  "xiaomi-mimo": {
    appProvider: "xiaomi-mimo",
    catalogProviderId: "xiaomi-mimo",
    label: "Xiaomi MiMo",
    shortLabel: "MIMO",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks MiMo hosted text models through Xiaomi's OpenAI-compatible chat API.",
    apiKeyUrl: "https://platform.xiaomimimo.com/",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.xiaomimimo.com/v1/chat/completions",
      defaultModel: "mimo-v2-flash",
      models: catalogModelSpecs("xiaomi-mimo", "llm"),
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
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      defaultModel: "llama-3.3-70b-versatile",
      models: catalogModelSpecs("groq", "llm"),
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
      support: "provider",
      transport: "binary",
      endpoint: "https://api.groq.com/openai/v1/audio/speech",
      requestFormat: "groq-speech",
      defaultModel: "canopylabs/orpheus-v1-english",
      defaultVoice: "troy",
      voiceFallback: "troy",
      models: catalogModelSpecs("groq", "tts"),
      voiceOptions: [
        voice("autumn", "Autumn"),
        voice("diana", "Diana"),
        voice("hannah", "Hannah"),
        voice("austin", "Austin"),
        voice("daniel", "Daniel"),
        voice("troy", "Troy"),
        voice("fahad", "Fahad"),
        voice("sultan", "Sultan"),
        voice("lulwa", "Lulwa"),
        voice("noura", "Noura"),
      ],
      languageNote:
        "Groq TTS is preview-only and model-specific. The English Orpheus model supports vocal directions, while the Arabic Saudi model exposes four fixed Saudi dialect voices.",
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
  "fireworks-ai": {
    appProvider: "fireworks-ai",
    catalogProviderId: "fireworks-ai",
    label: "Fireworks",
    shortLabel: "FIREWORKS",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Fireworks hosted models through its OpenAI-compatible inference API.",
    apiKeyUrl: "https://docs.fireworks.ai/getting-started/introduction",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.fireworks.ai/inference/v1/chat/completions",
      defaultModel: "accounts/fireworks/models/gpt-oss-20b",
      models: catalogModelSpecs("fireworks-ai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "fireworks-pre-recorded",
      defaultModel: "whisper-v3",
      models: [
        namedModel("whisper-v3", "Whisper V3 Large"),
        namedModel("whisper-v3-turbo", "Whisper V3 Turbo"),
      ],
      languageNote:
        "Fireworks currently exposes offline transcription on /v1/audio/transcriptions for whisper-v3 and whisper-v3-turbo, with a 1 GB upload cap and no documented duration limit. Streaming-only ASR models remain catalog-only until the app grows a realtime STT transport.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  "hugging-face-inference-api": {
    appProvider: "hugging-face-inference-api",
    catalogProviderId: "hugging-face-inference-api",
    label: "Hugging Face",
    shortLabel: "HUGGINGFACE",
    apiKeyPlaceholder: "hf_...",
    apiKeyHint:
      "Unlocks Hugging Face routed models through its OpenAI-compatible inference providers API.",
    apiKeyUrl: "https://huggingface.co/docs/inference-providers/index",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://router.huggingface.co/v1/chat/completions",
      defaultModel: "openai/gpt-oss-20b",
      models: catalogModelSpecs("hugging-face-inference-api", "llm"),
    },
    stt: {
      support: "provider",
      transport: "huggingface-json",
      endpointBase: "https://router.huggingface.co/hf-inference/models",
      defaultModel: "openai/whisper-large-v3",
      models: catalogModelSpecs("hugging-face-inference-api", "stt"),
      languageNote:
        "Hugging Face hf-inference currently exposes Whisper large-v3 and large-v3-turbo for ASR. Public docs describe the task payload as base64 audio inputs with a recognized text response.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  hyperbolic: {
    appProvider: "hyperbolic",
    catalogProviderId: "hyperbolic",
    label: "Hyperbolic",
    shortLabel: "HYPERBOLIC",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Hyperbolic hosted models through its OpenAI-compatible inference API.",
    apiKeyUrl: "https://docs.hyperbolic.xyz/docs/inference-api",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.hyperbolic.xyz/v1/chat/completions",
      defaultModel: "gpt-oss-120b",
      models: catalogModelSpecs("hyperbolic", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "provider",
      transport: "hyperbolic",
      endpoint: "https://api.hyperbolic.xyz/v1/audio/generation",
      defaultModel: "Melo TTS",
      defaultVoice: "EN-US",
      voiceFallback: "EN-US",
      models: [namedModel("Melo TTS", "Melo TTS")],
      voiceOptions: [
        voice("EN-US", "English · US"),
        voice("EN-BR", "English · British"),
        voice("EN-INDIA", "English · India"),
        voice("EN-AU", "English · Australia"),
        voice("ES", "Spanish"),
        voice("FR", "French"),
        voice("ZH", "Chinese"),
        voice("JP", "Japanese"),
        voice("KR", "Korean"),
      ],
      languageNote:
        "Hyperbolic TTS currently exposes a single Melo TTS route on /v1/audio/generation with six language families and nine documented speaker variants.",
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
  minimax: {
    appProvider: "minimax",
    catalogProviderId: "minimax",
    label: "MiniMax",
    shortLabel: "MINIMAX",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks MiniMax hosted models through its OpenAI-compatible text generation API.",
    apiKeyUrl: "https://www.minimax.io/platform/document/ChatCompletion%20v4",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.minimax.io/v1/chat/completions",
      defaultModel: "MiniMax-M2.5",
      models: catalogModelSpecs("minimax", "llm"),
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "provider",
      transport: "minimax",
      endpoint: "https://api.minimax.io/v1/t2a_v2",
      defaultModel: "speech-2.8-hd",
      defaultVoice: "English_expressive_narrator",
      voiceFallback: "English_expressive_narrator",
      models: catalogModelSpecs("minimax", "tts"),
      voiceOptions: [
        voice("English_expressive_narrator", "English Expressive Narrator"),
      ],
      languageNote:
        "MiniMax TTS is currently wired through its synchronous HTTP T2A route. The public docs verify eight speech-* model IDs, 10,000-character sync limits, and hex or URL output.",
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
  cohere: {
    appProvider: "cohere",
    catalogProviderId: "cohere",
    label: "Cohere",
    shortLabel: "COHERE",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Cohere command models.",
    apiKeyUrl: "https://dashboard.cohere.com/api-keys",
    llm: {
      support: "provider",
      transport: "cohere",
      defaultModel: "command-a-03-2025",
      models: catalogModelSpecs("cohere", "llm"),
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
      "Unlocks Perplexity Sonar models through the chat completions-compatible Sonar API.",
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
  sambanova: {
    appProvider: "sambanova",
    catalogProviderId: "sambanova",
    label: "SambaNova",
    shortLabel: "SAMBANOVA",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks SambaNova hosted models through its OpenAI-compatible SambaCloud API.",
    apiKeyUrl: "https://docs.sambanova.ai/docs/en/get-started/api-keys-urls",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.sambanova.ai/v1/chat/completions",
      defaultModel: "DeepSeek-V3.1",
      models: catalogModelSpecs("sambanova", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.sambanova.ai/v1/audio/transcriptions",
      defaultModel: "Whisper-Large-v3",
      models: [namedModel("Whisper-Large-v3", "Whisper Large v3")],
      languageNote:
        "SambaNova currently exposes Whisper-Large-v3 on its OpenAI-compatible /v1/audio/transcriptions endpoint. The documented upload cap is 25 MB.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
    },
  },
  siliconflow: {
    appProvider: "siliconflow",
    catalogProviderId: "siliconflow",
    label: "SiliconFlow",
    shortLabel: "SILICONFLOW",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks SiliconFlow models through its OpenAI-compatible chat API.",
    apiKeyUrl: "https://docs.siliconflow.com/en/userguide/quickstart",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.siliconflow.com/v1/chat/completions",
      defaultModel: "deepseek-ai/DeepSeek-V3.2",
      models: catalogModelSpecs("siliconflow", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.siliconflow.com/v1/audio/transcriptions",
      defaultModel: "FunAudioLLM/SenseVoiceSmall",
      models: catalogModelSpecs("siliconflow", "stt"),
      languageNote:
        "SiliconFlow exposes dedicated /v1/audio/transcriptions for FunAudioLLM/SenseVoiceSmall and TeleAI/TeleSpeechASR. Public docs verify the multipart endpoint and model IDs, but they do not publish a compact language or file-size matrix.",
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.siliconflow.com/v1/audio/speech",
      requestFormat: "siliconflow-speech",
      defaultModel: "fishaudio/fish-speech-1.5",
      defaultVoice: "fishaudio/fish-speech-1.5:alex",
      voiceFallback: "fishaudio/fish-speech-1.5:alex",
      models: [
        namedModel("fishaudio/fish-speech-1.5", "Fish-Speech-1.5"),
        namedModel("FunAudioLLM/CosyVoice2-0.5B", "CosyVoice2-0.5B"),
      ],
      voiceOptions: [
        voice("fishaudio/fish-speech-1.5:alex", "Alex"),
        voice("fishaudio/fish-speech-1.5:anna", "Anna"),
        voice("fishaudio/fish-speech-1.5:bella", "Bella"),
        voice("fishaudio/fish-speech-1.5:benjamin", "Benjamin"),
        voice("fishaudio/fish-speech-1.5:charles", "Charles"),
        voice("fishaudio/fish-speech-1.5:claire", "Claire"),
        voice("fishaudio/fish-speech-1.5:david", "David"),
        voice("fishaudio/fish-speech-1.5:diana", "Diana"),
      ],
      languageNote:
        "SiliconFlow TTS is dynamic overall, but Fish-Speech-1.5 and CosyVoice2-0.5B both have public /v1/audio/speech documentation. Fish-Speech is the better-documented default; CosyVoice2 is also exposed for multilingual and dialect-heavy synthesis.",
    },
  },
  stepfun: {
    appProvider: "stepfun",
    catalogProviderId: "stepfun",
    label: "StepFun",
    shortLabel: "STEPFUN",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks StepFun hosted models through its OpenAI-compatible API.",
    apiKeyUrl: "https://platform.stepfun.com/docs/zh/overview/quickstart",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.stepfun.com/v1/chat/completions",
      defaultModel: "step-3.5-flash",
      models: catalogModelSpecs("stepfun", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.stepfun.com/v1/audio/transcriptions",
      defaultModel: "step-asr",
      models: catalogModelSpecs("stepfun", "stt", ["step-asr-1.1-stream"]),
      languageNote:
        "StepFun currently has the clearest file-transcription contract for step-asr and step-asr-1.1 on /v1/audio/transcriptions. The streaming-only step-asr-1.1-stream model remains catalog-only until the app grows a realtime STT transport.",
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://api.stepfun.com/v1/audio/speech",
      requestFormat: "openai-speech",
      defaultModel: "step-tts-2",
      defaultVoice: "cixingnansheng",
      voiceFallback: "cixingnansheng",
      models: catalogModelSpecs("stepfun", "tts"),
      voiceOptions: [voice("cixingnansheng", "磁性男声")],
      languageNote:
        "StepFun TTS uses /v1/audio/speech with model-specific voices. Public docs clearly support step-tts-2, step-tts-mini, and step-tts-vivid with a 1000-character input cap.",
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
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.together.xyz/v1/chat/completions",
      defaultModel: "openai/gpt-oss-20b",
      models: catalogModelSpecs("together-ai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.together.xyz/v1/audio/transcriptions",
      defaultModel: "openai/whisper-large-v3",
      models: catalogModelSpecs("together-ai", "stt"),
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
      models: catalogModelSpecs("together-ai", "tts"),
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
        voice("tara", "tara"),
        voice("leah", "leah"),
        voice("jess", "jess"),
        voice("leo", "leo"),
        voice("dan", "dan"),
        voice("mia", "mia"),
        voice("zac", "zac"),
        voice("zoe", "zoe"),
        voice("friendly sidekick", "friendly sidekick"),
        voice("aura-2-thalia-en", "aura-2-thalia-en"),
        voice("luna", "luna"),
        voice("albion", "albion"),
        voice("arcade", "arcade"),
        voice("astra", "astra"),
        voice("atrium", "atrium"),
        voice("bond", "bond"),
        voice("cupola", "cupola"),
        voice("eliphas", "eliphas"),
        voice("estelle", "estelle"),
        voice("eucalyptus", "eucalyptus"),
        voice("fern", "fern"),
        voice("lintel", "lintel"),
        voice("lyra", "lyra"),
        voice("marlu", "marlu"),
        voice("masonry", "masonry"),
        voice("moss", "moss"),
        voice("oculus", "oculus"),
        voice("parapet", "parapet"),
        voice("pilaster", "pilaster"),
        voice("sirius", "sirius"),
        voice("stucco", "stucco"),
        voice("transom", "transom"),
        voice("truss", "truss"),
        voice("vashti", "vashti"),
        voice("vespera", "vespera"),
        voice("walnut", "walnut"),
        voice("cove", "cove"),
        voice("lagoon", "lagoon"),
        voice("mari", "mari"),
        voice("mesa_extra", "mesa_extra"),
        voice("moon", "moon"),
        voice("moraine", "moraine"),
        voice("peak", "peak"),
        voice("summit", "summit"),
        voice("talon", "talon"),
        voice("thunder", "thunder"),
        voice("tundra", "tundra"),
        voice("wildflower", "wildflower"),
        voice("English_DeterminedMan", "English_DeterminedMan"),
        voice("English_TrustworthMan", "English_TrustworthMan"),
        voice("English_GracefulLady", "English_GracefulLady"),
        voice("English_WiseWoman", "English_WiseWoman"),
      ],
      languageNote:
        "Together TTS exposes a mixed catalog: Kokoro and Orpheus are broadly documented, while Cartesia, Deepgram, Rime, and MiniMax speech entries can require higher build tiers or dedicated access. Voice availability is strongly model-specific.",
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
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
      defaultModel: "nemotron-3-super-120b-a12b",
      models: catalogModelSpecs("nvidia-nim", "llm"),
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
  "novita-ai": {
    appProvider: "novita-ai",
    catalogProviderId: "novita-ai",
    label: "Novita",
    shortLabel: "NOVITA",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Novita hosted models through its OpenAI-compatible API.",
    apiKeyUrl: "https://novita.ai/docs/api-reference/model-apis-introduction",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.novita.ai/openai/v1/chat/completions",
      defaultModel: "deepseek/deepseek-v3.2",
      models: catalogModelSpecs("novita-ai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "novita-json",
      endpoint: "https://api.novita.ai/v3/glm-asr",
      defaultModel: "glm-asr",
      models: [namedModel("glm-asr", "GLM Audio to Text")],
      languageNote:
        "Novita GLM-ASR accepts wav/mp3 audio via URL or base64 on /v3/glm-asr, with a documented 25 MB and 30 second cap.",
    },
    tts: {
      support: "provider",
      transport: "novita",
      endpointBase: "https://api.novita.ai/v3",
      defaultModel: "glm-tts",
      defaultVoice: "tongtong",
      voiceFallback: "tongtong",
      models: catalogModelSpecs("novita-ai", "tts", [
        "txt2speech",
        "minimax-voice-cloning",
      ]),
      voiceOptions: [
        voice("tongtong", "彤彤"),
        voice("chuichui", "锤锤"),
        voice("xiaochen", "小陈"),
        voice("jam", "jam"),
        voice("kazi", "kazi"),
        voice("douji", "douji"),
        voice("luodo", "luodo"),
        voice("English_expressive_narrator", "English expressive narrator"),
        voice("English_DeterminedMan", "English determined man"),
        voice("English_TrustworthMan", "English trustworth man"),
        voice("English_GracefulLady", "English graceful lady"),
        voice("English_WiseWoman", "English wise woman"),
      ],
      languageNote:
        "Novita speech is now wired for GLM-TTS plus the documented MiniMax speech-02/2.6/2.8 model families. The legacy txt2speech async surface and MiniMax voice-cloning remain catalog-only because they need async or custom-voice workflows the app does not have yet.",
    },
  },
  "z-ai-zhipu-ai": {
    appProvider: "z-ai-zhipu-ai",
    catalogProviderId: "z-ai-zhipu-ai",
    label: "Z.ai",
    shortLabel: "Z.AI",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint:
      "Unlocks Z.ai hosted models through its OpenAI-compatible global chat API.",
    apiKeyUrl: "https://docs.z.ai/api-reference/llm/chat-completion",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://api.z.ai/api/paas/v4/chat/completions",
      defaultModel: "glm-4.7-flashx",
      models: catalogModelSpecs("z-ai-zhipu-ai", "llm"),
    },
    stt: {
      support: "provider",
      transport: "multipart",
      endpoint: "https://api.z.ai/api/paas/v4/audio/transcriptions",
      defaultModel: "glm-asr-2512",
      models: [model("glm-asr-2512")],
      languageNote:
        "Z.ai currently exposes glm-asr-2512 for multilingual transcription. The documented global upload cap is 25 MB and 30 seconds.",
    },
    tts: {
      support: "provider",
      transport: "binary",
      endpoint: "https://open.bigmodel.cn/api/paas/v4/audio/speech",
      requestFormat: "zai-speech",
      defaultModel: "glm-tts",
      defaultVoice: "tongtong",
      voiceFallback: "tongtong",
      models: [namedModel("glm-tts", "GLM-TTS")],
      voiceOptions: [
        voice("tongtong", "彤彤"),
        voice("chuichui", "锤锤"),
        voice("xiaochen", "小陈"),
        voice("jam", "jam"),
        voice("kazi", "kazi"),
        voice("douji", "douji"),
        voice("luodo", "luodo"),
      ],
      languageNote:
        "Z.ai TTS is region-gated to the mainland BigModel stack today. The documented public path is glm-tts on /audio/speech with seven system voices and a 1024-character cap.",
    },
  },
};

export type RuntimeProviderManifest = typeof RUNTIME_PROVIDER_MANIFEST;
