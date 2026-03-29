import {
  PROVIDER_LLM_SUPPORT,
  PROVIDER_ORDER,
  PROVIDER_STT_SUPPORT,
  PROVIDER_TTS_SUPPORT,
} from "../../constants/models";
import {
  WEB_SEARCH_PROVIDER_IDS,
  getWebSearchProviderModel,
  type WebSearchProvider,
} from "../../constants/webSearch";
import type { Provider, Settings } from "../../types";
import { getProviderValidationModel } from "../../utils/responseModes";
import { parseAzureSpeechCredentials } from "../../services/tts/azure";

import type { ProviderHealthState, ProviderValidationState } from "./types";

export type ProviderCapability = "llm" | "tts" | "stt" | "search";

export const PROVIDER_CAPABILITY_ORDER: ProviderCapability[] = [
  "llm",
  "tts",
  "stt",
  "search",
];

function hasApiKey(settings: Settings, provider: Provider) {
  if (provider === "microsoft-azure") {
    return parseAzureSpeechCredentials(settings.apiKeys[provider]) !== null;
  }

  return settings.apiKeys[provider].trim().length > 0;
}

export function isWebSearchCapableProvider(
  provider: Provider,
): provider is WebSearchProvider {
  return WEB_SEARCH_PROVIDER_IDS.includes(provider as WebSearchProvider);
}

export function providerSupportsCapability(
  provider: Provider,
  capability: ProviderCapability,
) {
  switch (capability) {
    case "llm":
      return PROVIDER_LLM_SUPPORT[provider] === "provider";
    case "tts":
      return PROVIDER_TTS_SUPPORT[provider] === "provider";
    case "stt":
      return PROVIDER_STT_SUPPORT[provider] === "provider";
    case "search":
      return isWebSearchCapableProvider(provider);
  }
}

export function getProviderCapabilities(provider: Provider) {
  return PROVIDER_CAPABILITY_ORDER.filter((capability) =>
    providerSupportsCapability(provider, capability),
  );
}

export function getProviderValidationTarget(settings: Settings, provider: Provider) {
  if (providerSupportsCapability(provider, "llm")) {
    return {
      kind: "llm" as const,
      model: getProviderValidationModel(settings, provider),
      configKey: undefined,
    };
  }

  if (providerSupportsCapability(provider, "search")) {
    const webSearchProvider = provider as WebSearchProvider;

    return {
      kind: "search" as const,
      model: getWebSearchProviderModel(webSearchProvider),
      configKey: JSON.stringify(
        settings.webSearchProviderSettings[webSearchProvider],
      ),
    };
  }

  return {
    kind: null,
    model: "",
    configKey: undefined,
  };
}

export function getProviderHealthState(params: {
  provider: Provider;
  settings: Settings;
  validationStateByProvider: Partial<Record<Provider, ProviderValidationState>>;
}): ProviderHealthState {
  const { provider, settings, validationStateByProvider } = params;

  if (!hasApiKey(settings, provider)) {
    return "unconfigured";
  }

  const validationState = validationStateByProvider[provider];
  const target = getProviderValidationTarget(settings, provider);

  if (!validationState || !target.kind) {
    return "configured";
  }

  const stateMatchesCurrentConfig =
    validationState.apiKey === settings.apiKeys[provider].trim() &&
    validationState.model === target.model &&
    validationState.configKey === target.configKey;

  if (!stateMatchesCurrentConfig) {
    return "configured";
  }

  if (validationState.status === "validating") {
    return "validating";
  }

  if (validationState.status === "success") {
    return "healthy";
  }

  if (validationState.status === "error") {
    return "failing";
  }

  return "configured";
}

export function isProviderSelectableForConfiguredFlow(
  healthState: ProviderHealthState,
) {
  return healthState !== "unconfigured" && healthState !== "failing";
}

export function getConfiguredProvidersForCapability(params: {
  capability: ProviderCapability;
  settings: Settings;
  validationStateByProvider: Partial<Record<Provider, ProviderValidationState>>;
}) {
  const { capability, settings, validationStateByProvider } = params;

  return PROVIDER_ORDER.filter((provider) => {
    if (!providerSupportsCapability(provider, capability)) {
      return false;
    }

    if (!hasApiKey(settings, provider)) {
      return false;
    }

    return isProviderSelectableForConfiguredFlow(
      getProviderHealthState({
        provider,
        settings,
        validationStateByProvider,
      }),
    );
  });
}
