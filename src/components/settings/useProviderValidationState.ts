import { useCallback, useMemo, useState } from "react";

import { PROVIDER_LABELS } from "../../constants/models";
import type { WebSearchProvider } from "../../constants/webSearch";
import { useLocalization } from "../../i18n";
import type { Provider, Settings } from "../../types";
import { hasProviderCredentialForCapability } from "../../utils/providerCredentials";

import {
  getConfiguredProvidersForCapability,
  getProviderHealthState,
  getProviderValidationTarget,
  isWebSearchCapableProvider,
  providerSupportsCapability,
  type ProviderCapability,
} from "./providerSupport";
import type { ProviderHealthState, ProviderValidationState } from "./types";

export function useProviderValidationState(params: {
  settings: Settings;
  onValidateProvider: (provider: Provider) => Promise<void>;
  onValidateWebSearchProvider: (provider: WebSearchProvider) => Promise<void>;
}) {
  const { settings, onValidateProvider, onValidateWebSearchProvider } = params;
  const { t } = useLocalization();
  const [validationStateByProvider, setValidationStateByProvider] = useState<
    Partial<Record<Provider, ProviderValidationState>>
  >({});

  const getHealthState = useCallback(
    (provider: Provider): ProviderHealthState =>
      getProviderHealthState({
        provider,
        settings,
        validationStateByProvider,
      }),
    [settings, validationStateByProvider],
  );

  const canValidateProvider = useCallback(
    (provider: Provider) => {
      const target = getProviderValidationTarget(settings, provider);

      return (
        target.kind !== null &&
        hasProviderCredentialForCapability(
          provider,
          settings.apiKeys[provider],
          target.kind,
        )
      );
    },
    [settings],
  );

  const getValidationState = useCallback(
    (provider: Provider): ProviderValidationState => {
      const target = getProviderValidationTarget(settings, provider);
      const candidate = validationStateByProvider[provider];

      if (!candidate) {
        return { status: "idle" };
      }

      const currentApiKey = settings.apiKeys[provider].trim();
      const stateMatchesCurrentConfig =
        candidate.apiKey === currentApiKey &&
        candidate.model === target.model &&
        candidate.configKey === target.configKey;

      return stateMatchesCurrentConfig ? candidate : { status: "idle" };
    },
    [settings, validationStateByProvider],
  );

  const validateProviderForSettings = useCallback(
    async (provider: Provider) => {
      const target = getProviderValidationTarget(settings, provider);
      const trimmedApiKey = settings.apiKeys[provider].trim();

      if (
        !trimmedApiKey ||
        !target.kind ||
        !hasProviderCredentialForCapability(provider, trimmedApiKey, target.kind)
      ) {
        return;
      }

      setValidationStateByProvider((previous) => ({
        ...previous,
        [provider]: {
          status: "validating",
          apiKey: trimmedApiKey,
          model: target.model,
          configKey: target.configKey,
        },
      }));

      try {
        if (target.kind === "llm") {
          await onValidateProvider(provider);
        } else if (target.kind === "tts") {
          await onValidateProvider(provider);
        } else if (
          target.kind === "search" &&
          isWebSearchCapableProvider(provider)
        ) {
          await onValidateWebSearchProvider(provider);
        }

        setValidationStateByProvider((previous) => ({
          ...previous,
          [provider]: {
            status: "success",
            message: t("providerValidationSuccess", {
              provider: PROVIDER_LABELS[provider],
            }),
            apiKey: trimmedApiKey,
            model: target.model,
            configKey: target.configKey,
          },
        }));
      } catch (error) {
        setValidationStateByProvider((previous) => ({
          ...previous,
          [provider]: {
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : t("providerValidationFailed"),
            apiKey: trimmedApiKey,
            model: target.model,
            configKey: target.configKey,
          },
        }));

        throw error;
      }
    },
    [
      onValidateProvider,
      onValidateWebSearchProvider,
      settings,
      t,
    ],
  );

  const getConfiguredProviders = useCallback(
    (capability: ProviderCapability) =>
      getConfiguredProvidersForCapability({
        capability,
        settings,
        validationStateByProvider,
      }),
    [settings, validationStateByProvider],
  );

  const selectableLlmProviders = useMemo(
    () => getConfiguredProviders("llm"),
    [getConfiguredProviders],
  );
  const selectableSttProviders = useMemo(
    () => getConfiguredProviders("stt"),
    [getConfiguredProviders],
  );
  const selectableTtsProviders = useMemo(
    () => getConfiguredProviders("tts"),
    [getConfiguredProviders],
  );
  const selectableSearchProviders = useMemo(
    () => getConfiguredProviders("search").filter(isWebSearchCapableProvider),
    [getConfiguredProviders],
  );

  return {
    validationStateByProvider,
    getHealthState,
    getValidationState,
    canValidateProvider,
    validateProviderForSettings,
    selectableLlmProviders,
    selectableSttProviders,
    selectableTtsProviders,
    selectableSearchProviders,
    providerSupportsCapability,
  };
}
