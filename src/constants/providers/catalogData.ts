import { getCatalogModelForAppProvider } from "../../catalog";
import type { Provider } from "../../types";
import type { ModelInfo, ProviderConfig } from "./types";

export const NATIVE_STT_LANGUAGE_NOTE =
  "Language support depends on the device OS, installed speech packs, and recognizer availability. The exact language list varies by device.";

export const NATIVE_TTS_LANGUAGE_NOTE =
  "Language support depends on the system voices installed on the device. The exact language list, pronunciation quality, and offline availability vary by OS and device.";

export const WHISPER_WELL_SUPPORTED_LANGUAGES =
  "Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.";

export const PROVIDER_ORDER: Provider[] = [
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
];

interface RuntimeLlmModelSpec {
  id: string;
  fallbackName?: string;
  releaseDate?: string;
}

function model(id: string, releaseDate?: string): RuntimeLlmModelSpec {
  return releaseDate ? { id, releaseDate } : { id };
}

function namedModel(
  id: string,
  fallbackName: string,
  releaseDate?: string,
): RuntimeLlmModelSpec {
  return releaseDate ? { id, fallbackName, releaseDate } : { id, fallbackName };
}

function buildRuntimeLlmModels(
  provider: Provider,
  specs: RuntimeLlmModelSpec[],
): ModelInfo[] {
  return specs.map(({ id, fallbackName, releaseDate }) => ({
    id,
    name:
      getCatalogModelForAppProvider(provider, id, "llm")?.publicName ??
      fallbackName ??
      id,
    ...(releaseDate ? { releaseDate } : {}),
  }));
}

// Curated allowlist for the LLM models the current app transport can route.
const SUPPORTED_LLM_MODEL_SPECS: Record<Provider, RuntimeLlmModelSpec[]> = {
  openai: [
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
  anthropic: [
    namedModel("claude-opus-4-6", "Claude Opus 4.6"),
    namedModel("claude-sonnet-4-6", "Claude Sonnet 4.6"),
    namedModel("claude-haiku-4-5-20251001", "Claude Haiku 4.5", "2025-10-01"),
    namedModel("claude-opus-4-5-20251101", "Claude Opus 4.5", "2025-11-01"),
    namedModel(
      "claude-sonnet-4-5-20250929",
      "Claude Sonnet 4.5",
      "2025-09-29",
    ),
    namedModel("claude-opus-4-1-20250805", "Claude Opus 4.1", "2025-08-05"),
    namedModel("claude-opus-4-20250522", "Claude Opus 4", "2025-05-22"),
    namedModel(
      "claude-sonnet-4-20250514",
      "Claude Sonnet 4",
      "2025-05-14",
    ),
    namedModel("claude-3-haiku-20240307", "Claude 3 Haiku", "2024-03-07"),
  ],
  gemini: [
    model("gemini-3.1-pro-preview"),
    model("gemini-3.1-flash-lite-preview"),
    namedModel("gemini-3-flash-preview", "Gemini 3 Flash Preview"),
    model("gemini-2.5-pro"),
    model("gemini-2.5-flash"),
    namedModel("gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite"),
    model("gemini-2.0-flash"),
    model("gemini-2.0-flash-lite"),
  ],
  xai: [
    namedModel("grok-4", "Grok 4"),
    namedModel("grok-4-1-fast-reasoning", "Grok 4.1 Fast Reasoning"),
    namedModel(
      "grok-4-1-fast-non-reasoning",
      "Grok 4.1 Fast Non-Reasoning",
    ),
    model("grok-code-fast-1"),
    namedModel("grok-3", "Grok 3"),
    namedModel("grok-3-fast", "Grok 3 Fast"),
    namedModel("grok-3-mini", "Grok 3 Mini"),
  ],
  groq: [
    model("groq/compound"),
    model("groq/compound-mini"),
    namedModel(
      "meta-llama/llama-4-maverick-17b-128e-instruct",
      "Llama 4 Maverick",
    ),
    namedModel(
      "meta-llama/llama-4-scout-17b-16e-instruct",
      "Llama 4 Scout",
    ),
    namedModel("llama-3.3-70b-versatile", "Llama 3.3 70B Versatile"),
    namedModel("llama-3.1-8b-instant", "Llama 3.1 8B Instant"),
    namedModel("openai/gpt-oss-120b", "GPT-OSS 120B"),
    namedModel("openai/gpt-oss-20b", "GPT-OSS 20B"),
    namedModel("moonshotai/kimi-k2-instruct-0905", "Kimi K2 Instruct"),
    namedModel("qwen/qwen3-32b", "Qwen3 32B"),
  ],
  deepseek: [model("deepseek-chat"), model("deepseek-reasoner")],
  mistral: [
    namedModel("mistral-large-latest", "Mistral Large 3"),
    namedModel("mistral-medium-latest", "Mistral Medium 3"),
    namedModel("magistral-medium-latest", "Magistral Medium"),
    namedModel("magistral-small-latest", "Magistral Small"),
    namedModel("mistral-small-latest", "Mistral Small 3.1"),
    namedModel("ministral-8b-latest", "Ministral 8B"),
    namedModel("open-mistral-nemo", "Mistral Nemo"),
    namedModel("codestral-latest", "Codestral 2"),
  ],
  cohere: [
    namedModel("command-a-03-2025", "Command A"),
    namedModel("command-a-reasoning-08-2025", "Command A Reasoning"),
    namedModel("command-a-vision-07-2025", "Command A Vision"),
    namedModel("command-r7b-12-2024", "Command R7B"),
    namedModel("command-r-plus-08-2024", "Command R+"),
    namedModel("command-r-08-2024", "Command R"),
  ],
  together: [
    namedModel("MiniMaxAI/MiniMax-M2.5", "MiniMax M2.5"),
    namedModel("Qwen/Qwen3.5-397B-A17B", "Qwen3.5 397B A17B"),
    namedModel("Qwen/Qwen3-235B-A22B-FP8", "Qwen3 235B"),
    namedModel("Qwen/Qwen3.5-9B", "Qwen3.5 9B"),
    namedModel("openai/gpt-oss-20b", "GPT-OSS 20B"),
    namedModel("openai/gpt-oss-120b", "GPT-OSS 120B"),
    namedModel("moonshotai/Kimi-K2.5", "Kimi K2.5"),
    namedModel("deepseek-ai/DeepSeek-V3.1", "DeepSeek V3.1"),
    namedModel("deepseek-ai/DeepSeek-R1", "DeepSeek R1"),
    namedModel(
      "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      "Llama 3.3 70B Turbo",
    ),
    namedModel(
      "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      "Llama 3.1 8B Turbo",
    ),
    namedModel(
      "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      "Llama 4 Maverick",
    ),
    namedModel("Qwen/Qwen3-Next-80B-A3B-Instruct", "Qwen3 Next 80B"),
    namedModel("Qwen/Qwen3-Coder-Next-FP8", "Qwen3 Coder Next"),
  ],
  nvidia: [
    namedModel(
      "nvidia/llama-3.3-nemotron-super-49b-v1.5",
      "Llama 3.3 Nemotron Super 49B",
    ),
    namedModel(
      "nvidia/llama-3.1-nemotron-ultra-253b-v1",
      "Llama 3.1 Nemotron Ultra 253B",
    ),
    namedModel(
      "nvidia/llama-3.1-nemotron-nano-8b-v1",
      "Llama 3.1 Nemotron Nano 8B",
    ),
  ],
};

const PROVIDER_LLM_MODELS: Record<Provider, ModelInfo[]> = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [
    provider,
    buildRuntimeLlmModels(provider, SUPPORTED_LLM_MODEL_SPECS[provider]),
  ]),
) as Record<Provider, ModelInfo[]>;

export const PROVIDER_CONFIGS: Record<Provider, ProviderConfig> = {
  openai: {
    label: "OpenAI",
    shortLabel: "OPENAI",
    apiKeyPlaceholder: "sk-...",
    apiKeyHint:
      "Unlocks OpenAI models and OpenAI-hosted speech when you choose provider STT or TTS.",
    apiKeyUrl: "https://platform.openai.com/settings/organization/api-keys",
    sttSupport: "provider",
    ttsSupport: "provider",
    sttLanguageNote: `OpenAI currently exposes gpt-4o-transcribe, gpt-4o-mini-transcribe, and whisper-1 for speech-to-text. OpenAI's published well-supported language set is: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
    ttsLanguageNote:
      "OpenAI currently exposes gpt-4o-mini-tts, tts-1, and tts-1-hd. OpenAI does not publish a compact well-supported language list for TTS in the same way it does for STT, and notes that the voices are optimized for English.",
    models: PROVIDER_LLM_MODELS.openai,
  },
  anthropic: {
    label: "Anthropic",
    shortLabel: "ANTHROPIC",
    apiKeyPlaceholder: "sk-ant-...",
    apiKeyHint: "Unlocks Anthropic models in the main stage.",
    apiKeyUrl: "https://platform.claude.com/settings/keys",
    sttSupport: "none",
    ttsSupport: "none",
    models: PROVIDER_LLM_MODELS.anthropic,
  },
  gemini: {
    label: "Google",
    shortLabel: "GOOGLE",
    apiKeyPlaceholder: "AIza...",
    apiKeyHint:
      "Unlocks Gemini models plus Google-hosted speech features through the Gemini API.",
    apiKeyUrl: "https://aistudio.google.com/app/apikey",
    sttSupport: "provider",
    ttsSupport: "provider",
    sttLanguageNote:
      "Gemini audio understanding is multilingual, but Google does not publish a compact supported-language table for this transcription path. It is a broad general-purpose transcription route rather than a dedicated telephony STT API.",
    ttsLanguageNote:
      "Gemini TTS currently supports Arabic, Bengali, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Mandarin Chinese, Polish, Portuguese, Romanian, Russian, Spanish, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, and Vietnamese.",
    models: PROVIDER_LLM_MODELS.gemini,
  },
  xai: {
    label: "xAI",
    shortLabel: "XAI",
    apiKeyPlaceholder: "xai-...",
    apiKeyHint: "Unlocks Grok models from xAI.",
    apiKeyUrl: "https://console.x.ai/team/default/api-keys",
    sttSupport: "none",
    ttsSupport: "provider",
    ttsLanguageNote:
      "xAI TTS currently supports Arabic, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Thai, Turkish, Vietnamese, and Chinese.",
    models: PROVIDER_LLM_MODELS.xai,
  },
  groq: {
    label: "Groq",
    shortLabel: "GROQ",
    apiKeyPlaceholder: "gsk_...",
    apiKeyHint:
      "Groq offers a free tier and unlocks fast hosted inference models.",
    apiKeyUrl: "https://console.groq.com/keys",
    sttSupport: "provider",
    ttsSupport: "none",
    sttLanguageNote: `The app uses whisper-large-v3-turbo here. Groq documents it as multilingual. For the Whisper family, a published well-supported language set is: ${WHISPER_WELL_SUPPORTED_LANGUAGES} If multilingual accuracy matters more than speed, Groq recommends whisper-large-v3 over the turbo variant.`,
    models: PROVIDER_LLM_MODELS.groq,
  },
  deepseek: {
    label: "DeepSeek",
    shortLabel: "DEEPSEEK",
    apiKeyPlaceholder: "sk-...",
    apiKeyHint: "Unlocks DeepSeek chat and reasoning models.",
    apiKeyUrl: "https://platform.deepseek.com/api_keys",
    sttSupport: "none",
    ttsSupport: "none",
    models: PROVIDER_LLM_MODELS.deepseek,
  },
  mistral: {
    label: "Mistral",
    shortLabel: "MISTRAL",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Mistral hosted models.",
    apiKeyUrl: "https://console.mistral.ai/api-keys",
    sttSupport: "provider",
    ttsSupport: "none",
    sttLanguageNote:
      "The current Voxtral transcription route is documented for English, Spanish, French, Portuguese, Hindi, German, Dutch, and Italian.",
    models: PROVIDER_LLM_MODELS.mistral,
  },
  cohere: {
    label: "Cohere",
    shortLabel: "COHERE",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Cohere command models.",
    apiKeyUrl: "https://dashboard.cohere.com/api-keys",
    sttSupport: "none",
    ttsSupport: "none",
    models: PROVIDER_LLM_MODELS.cohere,
  },
  together: {
    label: "Together",
    shortLabel: "TOGETHER",
    apiKeyPlaceholder: "Enter API key",
    apiKeyHint: "Unlocks Together-hosted open models.",
    apiKeyUrl: "https://api.together.ai/settings/api-keys",
    sttSupport: "provider",
    ttsSupport: "provider",
    sttLanguageNote: `The current integration uses openai/whisper-large-v3. It is multilingual and accepts ISO 639-1 language hints. A published well-supported language set for Whisper is: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
    ttsLanguageNote:
      "The current Together TTS route is configured for English, Spanish, French, German, Italian, Portuguese, Hindi, Japanese, Korean, and Chinese. Voice availability is model-specific.",
    models: PROVIDER_LLM_MODELS.together,
  },
  nvidia: {
    label: "NVIDIA",
    shortLabel: "NVIDIA",
    apiKeyPlaceholder: "nvapi-...",
    apiKeyHint: "Unlocks NVIDIA hosted foundation models.",
    apiKeyUrl: "https://build.nvidia.com/settings/api-keys",
    sttSupport: "none",
    ttsSupport: "none",
    models: PROVIDER_LLM_MODELS.nvidia,
  },
};
