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
import { DEFAULT_RUNTIME_PROVIDER_ID } from "./runtimeState";
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

/**
 * Neutral placeholder routes for a fresh install. There are no hardcoded
 * default models: every mode points at the default runtime provider with an
 * empty model id, which is never "ready" (see `isResponseModeReady`). The
 * three modes are auto-derived from the user's first configured provider in
 * `updateApiKey`, so this placeholder is replaced before it is ever relied on.
 */
const NEUTRAL_RESPONSE_MODE_ROUTE = {
  provider: DEFAULT_RUNTIME_PROVIDER_ID,
  model: "",
} as const;

export const DEFAULT_RESPONSE_MODES: ResponseModeSelections = {
  quick: { ...NEUTRAL_RESPONSE_MODE_ROUTE },
  normal: { ...NEUTRAL_RESPONSE_MODE_ROUTE },
  deep: { ...NEUTRAL_RESPONSE_MODE_ROUTE },
};
