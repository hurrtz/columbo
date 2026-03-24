import type {
  Provider,
  ProviderModelSelections,
  ProviderSttModelSelections,
  ProviderTtsModelSelections,
  ProviderTtsVoiceSelections,
  ResponseModeSelections,
} from "../../types";
import { PROVIDER_ORDER } from "./catalogData";
import {
  PROVIDER_DEFAULT_STT_MODELS as PARTIAL_PROVIDER_DEFAULT_STT_MODELS,
  PROVIDER_DEFAULT_TTS_MODELS as PARTIAL_PROVIDER_DEFAULT_TTS_MODELS,
  PROVIDER_DEFAULT_TTS_VOICES as PARTIAL_PROVIDER_DEFAULT_TTS_VOICES,
} from "./speech";

function expandProviderDefaults(
  partialDefaults: Partial<Record<Provider, string>>,
) {
  return Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [provider, partialDefaults[provider] ?? ""]),
  ) as Record<Provider, string>;
}

export const PROVIDER_DEFAULT_MODELS: ProviderModelSelections = {
  openai: "gpt-5.4",
  anthropic: "claude-sonnet-4-6",
  gemini: "gemini-2.5-flash",
  cohere: "command-a-03-2025",
  deepseek: "deepseek-chat",
  groq: "llama-3.3-70b-versatile",
  mistral: "mistral-medium-latest",
  nvidia: "nvidia/llama-3.3-nemotron-super-49b-v1.5",
  together: "openai/gpt-oss-20b",
  xai: "grok-4",
};

export const DEFAULT_PROVIDER_STT_MODELS: ProviderSttModelSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_STT_MODELS);

export const DEFAULT_PROVIDER_TTS_MODELS: ProviderTtsModelSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_TTS_MODELS);

export const DEFAULT_PROVIDER_TTS_VOICES: ProviderTtsVoiceSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_TTS_VOICES);

export const DEFAULT_RESPONSE_MODES: ResponseModeSelections = {
  quick: {
    provider: "groq",
    model: "llama-3.1-8b-instant",
  },
  normal: {
    provider: "anthropic",
    model: "claude-sonnet-4-6",
  },
  deep: {
    provider: "openai",
    model: "gpt-5.4",
  },
};
