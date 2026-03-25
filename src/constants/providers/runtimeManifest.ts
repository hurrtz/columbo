import type { CatalogProviderId } from "../../catalog/types";
import { PROVIDER_DOCUMENTS } from "../../../data/providers";

export type RuntimeAppProviderId =
  | "01-ai-yi"
  | "openai"
  | "microsoft-azure"
  | "aleph-alpha"
  | "anthropic"
  | "assemblyai"
  | "ai21-labs"
  | "alibaba-qwen-dashscope"
  | "amazon-aws"
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
  | "ibm-watsonx"
  | "lepton-ai"
  | "mistral"
  | "minimax"
  | "moonshot-ai-kimi"
  | "nvidia"
  | "novita-ai"
  | "perplexity"
  | "replicate"
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
  | "openai-realtime"
  | "azure-openai"
  | "azure-openai-realtime"
  | "amazon-bedrock"
  | "gemini-live"
  | "aleph-alpha"
  | "anthropic"
  | "cohere"
  | "ibm-watsonx"
  | "replicate";
export type RuntimeSttTransport =
  | "none"
  | "multipart"
  | "credential-endpoint-multipart"
  | "google-cloud-speech"
  | "azure-openai"
  | "aleph-alpha"
  | "assemblyai-realtime"
  | "dashscope-realtime"
  | "deepinfra-inference"
  | "gemini"
  | "openai-audio-input"
  | "baidu-short-speech"
  | "baidu-realtime"
  | "assemblyai-pre-recorded"
  | "deepgram-pre-recorded"
  | "elevenlabs-realtime"
  | "fireworks-streaming"
  | "fireworks-pre-recorded"
  | "fish-audio"
  | "huggingface-json"
  | "ibm-watsonx"
  | "novita-json"
  | "stepfun-realtime"
  | "volcengine-file-asr"
  | "xai-voice-agent"
  | "elevenlabs"
  | "replicate";
export type RuntimeTtsTransport =
  | "none"
  | "binary"
  | "credential-endpoint-binary"
  | "azure-openai"
  | "baidu"
  | "gemini"
  | "dashscope"
  | "deepinfra"
  | "deepgram"
  | "fish-audio"
  | "hyperbolic"
  | "ibm-watsonx"
  | "minimax"
  | "novita"
  | "volcengine-tts"
  | "elevenlabs"
  | "replicate";
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
  "aleph-alpha",
  "anthropic",
  "assemblyai",
  "ai21-labs",
  "alibaba-qwen-dashscope",
  "amazon-aws",
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
  "ibm-watsonx",
  "lepton-ai",
  "minimax",
  "moonshot-ai-kimi",
  "novita-ai",
  "perplexity",
  "replicate",
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
      support: "provider",
      transport: "xai-voice-agent",
      endpoint: "wss://api.x.ai/v1/realtime",
      defaultModel: "voice-agent-api",
      models: [namedModel("voice-agent-api", "Voice Agent API")],
      languageNote:
        "xAI speech input is wired through the realtime Voice Agent WebSocket. It behaves like live conversational speech input rather than a standalone batch transcription API.",
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
      realtimeModelIds: ["gpt-realtime-1.5", "gpt-realtime-mini"],
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
        namedModel("gpt-realtime-1.5", "GPT-Realtime-1.5"),
        namedModel("gpt-realtime-mini", "GPT-Realtime-mini"),
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
      realtimeModelIds: ["gpt-realtime", "gpt-realtime-1.5", "gpt-realtime-mini"],
      models: catalogModelSpecs("microsoft-azure", "llm"),
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
  "aleph-alpha": {
    appProvider: "aleph-alpha",
    catalogProviderId: "aleph-alpha",
    label: "Aleph Alpha",
    shortLabel: "ALEPH",
    apiKeyPlaceholder: "https://your-pharia-endpoint.example.com/v2|api-key",
    apiKeyHint:
      "Enter your PhariaInference base URL and API key separated by |. The app uses /chat/completions for LLMs and /transcribe for STT on that base URL.",
    apiKeyUrl: "https://docs.aleph-alpha.com/",
    llm: {
      support: "provider",
      transport: "aleph-alpha",
      defaultModel: "pharia-1-llm-7b-control-aligned",
      models: catalogModelSpecs("aleph-alpha", "llm"),
    },
    stt: {
      support: "provider",
      transport: "aleph-alpha",
      defaultModel: "whisperx-transcription-medium",
      models: catalogModelSpecs("aleph-alpha", "stt"),
      languageNote:
        "Aleph Alpha STT is wired against the documented request-response /transcribe surface on a customer-provided PhariaInference endpoint. Catalog drift is expected because installed-model inventories are deployment-specific.",
    },
    tts: {
      support: "none",
      transport: "none",
      models: [],
      voiceOptions: [],
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
      realtimeTransport: "assemblyai-realtime",
      realtimeEndpoint: "wss://streaming.assemblyai.com/v3/ws",
      realtimeModelIds: [
        "u3-rt-pro",
        "universal-streaming-english",
        "universal-streaming-multilingual",
        "whisper-rt",
      ],
      models: [
        namedModel("universal-3-pro", "Universal-3 Pro"),
        namedModel("universal-2", "Universal-2"),
        namedModel("u3-rt-pro", "Universal-3 Pro Streaming"),
        namedModel("universal-streaming-english", "Universal-Streaming English"),
        namedModel(
          "universal-streaming-multilingual",
          "Universal-Streaming Multilingual",
        ),
        namedModel("whisper-rt", "Whisper Streaming"),
      ],
      languageNote:
        "AssemblyAI is wired for both pre-recorded and streaming STT. The pre-recorded path uses /v2/upload and /v2/transcript, while the streaming models use the realtime WebSocket with 16 kHz mono PCM input.",
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
        model("qwen3-omni-flash-realtime"),
      ],
    },
    stt: {
      support: "provider",
      transport: "openai-audio-input",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      defaultModel: "qwen3-asr-flash",
      realtimeTransport: "dashscope-realtime",
      realtimeEndpoint: "wss://dashscope-intl.aliyuncs.com/api-ws/v1/realtime",
      realtimeModelIds: ["qwen3-asr-flash-realtime"],
      models: [
        model("qwen3-asr-flash"),
        model("qwen3-asr-flash-filetrans"),
        model("qwen3-asr-flash-realtime"),
      ],
      languageNote:
        "DashScope STT is wired for Qwen3-ASR-Flash short-file transcription, Qwen3-ASR-Flash-Filetrans long-file async transcription with a public audio URL, and Qwen3-ASR-Flash-Realtime through the realtime WebSocket.",
    },
    tts: {
      support: "provider",
      transport: "dashscope",
      endpoint:
        "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      defaultModel: "qwen3-tts-flash",
      defaultVoice: "Cherry",
      voiceFallback: "Cherry",
      models: catalogModelSpecs("alibaba-qwen-dashscope", "tts"),
      voiceOptions: [voice("Cherry", "Cherry")],
      languageNote:
        "DashScope TTS is wired for both the standard Qwen3-TTS-Flash families and the realtime Qwen3-TTS-Flash-Realtime families with the default Cherry voice.",
    },
  },
  "amazon-aws": {
    appProvider: "amazon-aws",
    catalogProviderId: "amazon-aws",
    label: "AWS",
    shortLabel: "AWS",
    apiKeyPlaceholder:
      "us-east-1|access-key-id|secret-access-key|optional-session-token",
    apiKeyHint:
      "Enter your AWS region, access key ID, secret access key, and optional session token separated by |. The app uses Amazon Bedrock Converse for Nova text models.",
    apiKeyUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started-api-ex-python.html",
    llm: {
      support: "provider",
      transport: "amazon-bedrock",
      defaultModel: "amazon.nova-lite-v1:0",
      models: catalogModelSpecs("amazon-aws", "llm"),
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
      realtimeTransport: "baidu-realtime",
      realtimeEndpoint: "wss://vop.baidu.com/realtime_asr",
      realtimeModelIds: ["实时语音识别-websocket API"],
      models: [
        namedModel("音频文件转写", "Audio File Transcription"),
        namedModel("实时语音识别-websocket API", "Realtime Speech Recognition WebSocket API"),
        namedModel("短语音识别", "Short Speech Recognition"),
        namedModel("短语音识别极速版", "Short Speech Recognition Pro / 极速版"),
      ],
      languageNote:
        "Baidu is wired for short-form request/response STT, async file transcription via public audio URLs, and the realtime WebSocket STT surface. Realtime STT requires provider credentials in the format apiKey|appId|appKey.",
    },
    tts: {
      support: "provider",
      transport: "baidu",
      endpoint: "https://tsn.baidu.com/text2audio",
      defaultModel: "短文本语音合成",
      defaultVoice: "0",
      voiceFallback: "0",
      models: catalogModelSpecs("baidu-ernie-qianfan", "tts"),
      voiceOptions: [
        voice("0", "Standard female"),
        voice("1", "Standard male"),
        voice("3", "Emotional female"),
        voice("4", "Emotional child"),
      ],
      languageNote:
        "Baidu is wired for short-text REST TTS, long-text async synthesis jobs, and the streaming WebSocket TTS surface.",
    },
  },
  "bytedance-doubao-seed": {
    appProvider: "bytedance-doubao-seed",
    catalogProviderId: "bytedance-doubao-seed",
    label: "ByteDance",
    shortLabel: "DOUBAO",
    apiKeyPlaceholder: "ark-api-key|speech-app-id|speech-access-key",
    apiKeyHint:
      "Use ark-api-key for chat. Add speech-app-id and speech-access-key after | to unlock Doubao Speech file ASR and async TTS.",
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
      transport: "volcengine-file-asr",
      defaultModel: "bigmodel",
      models: [namedModel("bigmodel", "Doubao Big-Model ASR")],
      languageNote:
        "ByteDance speech uses Doubao Speech rather than Ark. The current app route is the async file-ASR submit/query flow and requires a public audio URL plus speech-app-id and speech-access-key in settings.",
    },
    tts: {
      support: "provider",
      transport: "volcengine-tts",
      endpointBase: "https://openspeech.bytedance.com/api/v3/tts",
      defaultModel: "unknown",
      defaultVoice: "zh_female_qingxin",
      voiceFallback: "zh_female_qingxin",
      models: [namedModel("unknown", "Doubao Large-Model TTS")],
      voiceOptions: [
        voice("zh_female_qingxin", "Qingxin"),
        voice("zh_male_chunhou", "Chunhou"),
        voice("zh_female_zhixing", "Zhixing"),
      ],
      languageNote:
        "ByteDance TTS is wired on the async submit/query API. Voice inventories are larger and dynamic in the official docs, so the built-in voices here are only a starter set.",
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
      realtimeTransport: "elevenlabs-realtime",
      realtimeEndpoint: "wss://api.elevenlabs.io/v1/speech-to-text/realtime",
      realtimeModelIds: ["scribe_v2_realtime"],
      models: [
        namedModel("scribe_v2", "Scribe v2"),
        namedModel("scribe_v1", "Scribe v1"),
        namedModel("scribe_v2_realtime", "Scribe v2 Realtime"),
      ],
      languageNote:
        "ElevenLabs STT supports 90+ languages. The upload endpoint accepts scribe_v2 and scribe_v1, while scribe_v2_realtime is wired on ElevenLabs' realtime WebSocket with PCM 16 kHz audio.",
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
    apiKeyPlaceholder: "AIza...|ya29...|project-id|us",
    apiKeyHint:
      "Enter a Gemini API key. To use Chirp and Telephony Cloud Speech models, append access token, project id, and optional location as primaryApiKey|accessToken|projectId|location.",
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
        namedModel("chirp_3", "Chirp 3: Transcription"),
        namedModel("chirp_2", "Chirp 2: Transcription"),
        namedModel("telephony", "Telephony"),
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
      support: "provider",
      transport: "deepinfra",
      endpointBase: "https://api.deepinfra.com/v1/inference",
      defaultModel: "ResembleAI/chatterbox-turbo",
      defaultVoice: "Warm neutral voice",
      voiceFallback: "Warm neutral voice",
      models: [
        namedModel("Qwen/Qwen3-TTS", "Qwen3-TTS"),
        namedModel("Qwen/Qwen3-TTS-VoiceDesign", "Qwen3-TTS-VoiceDesign"),
        namedModel("ResembleAI/chatterbox-turbo", "chatterbox-turbo"),
      ],
      voiceOptions: [],
      languageNote:
        "DeepInfra TTS is wired on the native inference API for the curated Qwen and Resemble models. Voice and output schemas differ across those hosted models, so this path is lower-confidence than providers with a single uniform speech contract.",
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
      support: "provider",
      transport: "xai-voice-agent",
      endpoint: "wss://api.x.ai/v1/realtime",
      defaultModel: "voice-agent-api",
      models: [namedModel("voice-agent-api", "Voice Agent API")],
      languageNote:
        "xAI speech input is wired through the realtime Voice Agent WebSocket. It behaves like live conversational speech input rather than a standalone batch transcription API.",
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
      support: "provider",
      transport: "binary",
      endpoint: "https://api.xiaomimimo.com/v1/audio/speech",
      requestFormat: "openai-speech",
      defaultModel: "mimo-v2-tts",
      defaultVoice: "alloy",
      voiceFallback: "alloy",
      models: catalogModelSpecs("xiaomi-mimo", "tts"),
      voiceOptions: [voice("alloy", "Default")],
      languageNote:
        "MiMo-V2-TTS is still under-documented at the protocol level. The app uses an experimental OpenAI-style speech request until Xiaomi publishes a fuller public API reference.",
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
      realtimeTransport: "fireworks-streaming",
      realtimeEndpointByModel: {
        "fireworks-asr-large":
          "wss://audio-streaming.api.fireworks.ai/v1/audio/transcriptions/streaming",
        "fireworks-asr-v2":
          "wss://audio-streaming-v2.api.fireworks.ai/v1/audio/transcriptions/streaming",
      },
      realtimeModelIds: ["fireworks-asr-large", "fireworks-asr-v2"],
      models: [
        namedModel("whisper-v3", "Whisper V3 Large"),
        namedModel("whisper-v3-turbo", "Whisper V3 Turbo"),
        namedModel("fireworks-asr-large", "Streaming ASR v1"),
        namedModel("fireworks-asr-v2", "Streaming ASR v2"),
      ],
      languageNote:
        "Fireworks exposes offline transcription on /v1/audio/transcriptions for whisper-v3 and whisper-v3-turbo, plus streaming STT over its dedicated WebSocket endpoints for fireworks-asr-large and fireworks-asr-v2 using 16 kHz mono PCM audio.",
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
      models: [
        namedModel("voxtral-mini-latest", "Voxtral Mini Latest"),
        namedModel(
          "voxtral-mini-transcribe-realtime-2602",
          "Voxtral Mini Transcribe Realtime",
        ),
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
  "ibm-watsonx": {
    appProvider: "ibm-watsonx",
    catalogProviderId: "ibm-watsonx",
    label: "IBM Watsonx",
    shortLabel: "IBM",
    apiKeyPlaceholder:
      "https://watsonx-url|watsonx-api-key|project-id|https://stt-url|stt-api-key|https://tts-url|tts-api-key",
    apiKeyHint:
      "Enter watsonx URL, watsonx API key, project ID, Speech to Text URL, Speech to Text API key, Text to Speech URL, and Text to Speech API key separated by |.",
    apiKeyUrl: "https://www.ibm.com/watsonx/developer/",
    llm: {
      support: "provider",
      transport: "ibm-watsonx",
      defaultModel: "ibm/granite-4-h-small",
      models: catalogModelSpecs("ibm-watsonx", "llm"),
    },
    stt: {
      support: "provider",
      transport: "ibm-watsonx",
      defaultModel: "en-US",
      models: catalogModelSpecs("ibm-watsonx", "stt"),
      languageNote:
        "IBM Speech to Text is wired on the synchronous recognize route. Large speech and next-generation multimedia models share the same request shape, but IBM's live WebSocket session surface remains broader than this request-response integration.",
    },
    tts: {
      support: "provider",
      transport: "ibm-watsonx",
      defaultModel: "en-US_VictoriaNatural",
      defaultVoice: "en-US_VictoriaNatural",
      voiceFallback: "en-US_VictoriaNatural",
      models: catalogModelSpecs("ibm-watsonx", "tts"),
      voiceOptions: [],
      languageNote:
        "IBM Text to Speech is voice-addressed rather than model-family-addressed. The app maps each catalog voice row directly onto IBM's /v1/synthesize voice parameter.",
    },
  },
  "lepton-ai": {
    appProvider: "lepton-ai",
    catalogProviderId: "lepton-ai",
    label: "Lepton",
    shortLabel: "LEPTON",
    apiKeyPlaceholder: "https://your-lepton-endpoint.example.com/v1|api-key",
    apiKeyHint:
      "Enter your Lepton endpoint base URL and API key separated by |. The app uses the deployed OpenAI-compatible chat surface and, if present, the deployed /audio/speech surface on that endpoint.",
    apiKeyUrl: "https://docs.nvidia.com/dgx-cloud/lepton/features/endpoints/create-llm/",
    llm: {
      support: "provider",
      transport: "aleph-alpha",
      defaultModel: "nim/openai/gpt-oss-120b:latest",
      models: [
        namedModel(
          "nim/openai/gpt-oss-120b:latest",
          "GPT-OSS-120B NIM image on DGX Cloud Lepton",
        ),
        namedModel(
          "meta-llama/Llama-3.1-8B-Instruct",
          "Meta Llama 3.1 8B Instruct (deployment example via Hugging Face)",
        ),
      ],
    },
    stt: {
      support: "none",
      transport: "none",
      models: [],
    },
    tts: {
      support: "provider",
      transport: "credential-endpoint-binary",
      requestFormat: "openai-speech",
      defaultModel: "nari-labs/Dia-1.6B-0626",
      defaultVoice: "alloy",
      voiceFallback: "alloy",
      models: catalogModelSpecs("lepton-ai", "tts"),
      voiceOptions: [voice("alloy", "Default")],
      languageNote:
        "Lepton TTS is deployment-specific. Configure a Lepton endpoint that exposes an OpenAI-style /audio/speech surface if you want this catalog row to be callable in-app.",
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
  replicate: {
    appProvider: "replicate",
    catalogProviderId: "replicate",
    label: "Replicate",
    shortLabel: "REPLICATE",
    apiKeyPlaceholder: "Enter API token",
    apiKeyHint:
      "Unlocks Replicate official models through its prediction API. The app discovers the latest model schema at runtime for the selected model.",
    apiKeyUrl: "https://replicate.com/account/api-tokens",
    llm: {
      support: "provider",
      transport: "replicate",
      defaultModel: "openai/gpt-5-mini",
      models: catalogModelSpecs("replicate", "llm"),
    },
    stt: {
      support: "provider",
      transport: "replicate",
      defaultModel: "openai/gpt-4o-mini-transcribe",
      models: catalogModelSpecs("replicate", "stt"),
      languageNote:
        "Replicate STT is wired through the prediction API and the official model schema for each selected model. Output format and language controls remain model-specific.",
    },
    tts: {
      support: "provider",
      transport: "replicate",
      defaultModel: "inworld/tts-1.5-mini",
      defaultVoice: "Ashley",
      voiceFallback: "Ashley",
      models: catalogModelSpecs("replicate", "tts"),
      voiceOptions: [],
      languageNote:
        "Replicate TTS is wired through the prediction API and per-model schemas. Voice options stay model-specific, so the app uses conservative defaults unless a future schema-aware picker is added.",
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
        namedModel("IndexTeam/IndexTTS-2", "IndexTTS-2"),
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
        "SiliconFlow TTS is dynamic overall, but Fish-Speech-1.5, CosyVoice2-0.5B, and IndexTTS-2 all have some public /v1/audio/speech evidence. Fish-Speech remains the better-documented default; CosyVoice2 and IndexTTS-2 should be treated as lower-confidence advanced options.",
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
      realtimeTransport: "stepfun-realtime",
      realtimeEndpoint: "wss://api.stepfun.com/v1/realtime/asr/stream",
      realtimeModelIds: ["step-asr-1.1-stream"],
      models: catalogModelSpecs("stepfun", "stt"),
      languageNote:
        "StepFun has file transcription on /v1/audio/transcriptions for step-asr and step-asr-1.1, plus realtime STT on /v1/realtime/asr/stream for step-asr-1.1-stream.",
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
    apiKeyPlaceholder: "nvapi-...|https://stt-endpoint.example.com/v1|https://tts-endpoint.example.com/v1",
    apiKeyHint:
      "Enter your NVIDIA API key. To use experimental custom speech routes, append STT and TTS endpoint URLs as primaryApiKey|sttEndpoint|ttsEndpoint.",
    apiKeyUrl: "https://build.nvidia.com",
    llm: {
      support: "provider",
      transport: "openai-compatible",
      endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
      defaultModel: "nemotron-3-super-120b-a12b",
      models: catalogModelSpecs("nvidia-nim", "llm"),
    },
    stt: {
      support: "provider",
      transport: "credential-endpoint-multipart",
      defaultModel: "parakeet-ctc-1_1b-asr",
      models: catalogModelSpecs("nvidia-nim", "stt"),
      languageNote:
        "NVIDIA speech is deployment-specific in the app. Provide a custom STT endpoint URL in the credentials field to call Parakeet or Canary from the existing multipart upload flow.",
    },
    tts: {
      support: "provider",
      transport: "credential-endpoint-binary",
      requestFormat: "openai-speech",
      defaultModel: "magpie-tts-multilingual",
      defaultVoice: "alloy",
      voiceFallback: "alloy",
      models: catalogModelSpecs("nvidia-nim", "tts"),
      voiceOptions: [voice("alloy", "Default")],
      languageNote:
        "NVIDIA TTS is deployment-specific in the app. Provide a custom TTS endpoint URL in the credentials field to call Magpie-family deployments from the existing speech request flow.",
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
      models: catalogModelSpecs("novita-ai", "tts"),
      voiceOptions: [
        voice("tongtong", "彤彤"),
        voice("chuichui", "锤锤"),
        voice("xiaochen", "小陈"),
        voice("jam", "jam"),
        voice("kazi", "kazi"),
        voice("douji", "douji"),
        voice("luodo", "luodo"),
        voice("Emily", "Emily"),
        voice("James", "James"),
        voice("Olivia", "Olivia"),
        voice("Michael", "Michael"),
        voice("Sarah", "Sarah"),
        voice("John", "John"),
        voice("English_expressive_narrator", "English expressive narrator"),
        voice("English_DeterminedMan", "English determined man"),
        voice("English_TrustworthMan", "English trustworth man"),
        voice("English_GracefulLady", "English graceful lady"),
        voice("English_WiseWoman", "English wise woman"),
      ],
      languageNote:
        "Novita speech is now wired for GLM-TTS, the legacy async txt2speech route, the documented MiniMax speech-02/2.6/2.8 model families, and the advanced MiniMax voice-cloning route. Voice-cloning still depends on provider-side custom voice assets.",
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
      models: catalogModelSpecs("z-ai-zhipu-ai", "tts"),
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
        "Z.ai speech models are region-gated to the mainland BigModel stack today. The app maps GLM-TTS plus the advanced glm-4-voice / glm-realtime / glm-tts-clone rows onto the currently documented BigModel speech surfaces as an experimental integration.",
    },
  },
};

export type RuntimeProviderManifest = typeof RUNTIME_PROVIDER_MANIFEST;
