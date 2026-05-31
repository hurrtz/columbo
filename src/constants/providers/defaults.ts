import type {
  Provider,
  ProviderModelSelections,
  ProviderSttModelSelections,
  ProviderTtsModelSelections,
  ProviderTtsVoiceSelections,
  ResponseModeSelections,
} from "../../types";
import { PROVIDER_ORDER } from "./catalogData";
import { RUNTIME_PROVIDER_MANIFEST } from "./runtimeManifest";
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

export const PROVIDER_DEFAULT_MODELS: ProviderModelSelections = Object.fromEntries(
  PROVIDER_ORDER.map((provider) => [
    provider,
    RUNTIME_PROVIDER_MANIFEST[provider].llm.defaultModel ?? "",
  ]),
) as ProviderModelSelections;

export const DEFAULT_PROVIDER_STT_MODELS: ProviderSttModelSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_STT_MODELS);

export const DEFAULT_PROVIDER_TTS_MODELS: ProviderTtsModelSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_TTS_MODELS);

export const DEFAULT_PROVIDER_TTS_VOICES: ProviderTtsVoiceSelections =
  expandProviderDefaults(PARTIAL_PROVIDER_DEFAULT_TTS_VOICES);

export const DEFAULT_RESPONSE_MODES: ResponseModeSelections = {
  quick: {
    provider: "gemini",
    model: "gemini-2.5-flash",
  },
  normal: {
    provider: "anthropic",
    model: "claude-sonnet-4-6",
  },
  deep: {
    provider: "openai",
    model: "gpt-5.5",
  },
};
