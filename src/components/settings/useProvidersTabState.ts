import { useCallback, useEffect, useMemo, useState } from "react";
import { Linking } from "react-native";

import {
  getAppProviderForCatalogProviderId,
  getCatalogProviderIdForAppProvider,
} from "../../catalog/appProviders";
import type { CatalogProviderId } from "../../catalog/types";
import {
  PROVIDER_API_KEY_URLS,
  PROVIDER_LABELS,
} from "../../constants/models";
import { useLocalization } from "../../i18n";
import { Provider, Settings } from "../../types";
import {
  hasAnyProviderCredential,
  hasProviderCredentialForCapability,
} from "../../utils/providerCredentials";
import { getProviderValidationModel } from "../../utils/responseModes";

import {
  getProviderValidationTarget,
  providerSupportsCapability,
} from "./providerSupport";
import { ProviderHealthState, ProviderValidationState } from "./types";

export function useProvidersTabState(params: {
  settings: Settings;
  focusProvider?: Provider;
  focusCatalogProviderId?: CatalogProviderId;
  onValidateProvider: (provider: Provider) => Promise<void>;
}) {
  const {
    settings,
    focusProvider,
    focusCatalogProviderId,
    onValidateProvider,
  } = params;
  const { t } = useLocalization();
  const [selectedCatalogProviderId, setSelectedCatalogProviderId] = useState<CatalogProviderId>(
    focusCatalogProviderId ??
      getCatalogProviderIdForAppProvider(focusProvider ?? settings.lastProvider),
  );
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [validationStateByProvider, setValidationStateByProvider] = useState<
    Partial<Record<Provider, ProviderValidationState>>
  >({});

  useEffect(() => {
    setSelectedCatalogProviderId(
      focusCatalogProviderId ??
        getCatalogProviderIdForAppProvider(focusProvider ?? settings.lastProvider),
    );
  }, [focusCatalogProviderId, focusProvider, settings.lastProvider]);

  const selectedRuntimeProvider = useMemo(
    () => getAppProviderForCatalogProviderId(selectedCatalogProviderId),
    [selectedCatalogProviderId],
  );

  useEffect(() => {
    setApiKeyVisible(false);
  }, [selectedCatalogProviderId]);

  const selectedProviderApiKey = selectedRuntimeProvider
    ? settings.apiKeys[selectedRuntimeProvider]
    : "";
  const trimmedSelectedProviderApiKey = selectedProviderApiKey.trim();
  const selectedProviderModel = selectedRuntimeProvider
    ? getProviderValidationModel(settings, selectedRuntimeProvider)
    : "";
  const storedValidationState = selectedRuntimeProvider
    ? validationStateByProvider[selectedRuntimeProvider]
    : undefined;
  const validationState = useMemo(() => {
    const validationStateMatchesCurrentSelection =
      storedValidationState?.apiKey === trimmedSelectedProviderApiKey &&
      storedValidationState?.model === selectedProviderModel;

    return validationStateMatchesCurrentSelection
      ? storedValidationState ?? { status: "idle" as const }
      : { status: "idle" as const };
  }, [
    selectedProviderModel,
    storedValidationState,
    trimmedSelectedProviderApiKey,
  ]);
  const hasApiKey =
    !!selectedRuntimeProvider &&
    hasAnyProviderCredential(
      selectedRuntimeProvider,
      trimmedSelectedProviderApiKey,
    );
  const canValidateSelectedProvider = !!selectedRuntimeProvider &&
    getProviderValidationTarget(settings, selectedRuntimeProvider).kind !== null;
  const shouldShowValidateAction =
    canValidateSelectedProvider && validationState.status !== "success";

  const handleOpenProviderPortal = useCallback(() => {
    if (!selectedRuntimeProvider) {
      return;
    }

    void Linking.openURL(PROVIDER_API_KEY_URLS[selectedRuntimeProvider]);
  }, [selectedRuntimeProvider]);

  const handleValidateProviderKey = useCallback(async () => {
    if (!selectedRuntimeProvider) {
      return;
    }

    const target = getProviderValidationTarget(settings, selectedRuntimeProvider);

    if (!target.kind) {
      return;
    }

    setValidationStateByProvider((previous) => ({
      ...previous,
      [selectedRuntimeProvider]: {
        status: "validating",
        apiKey: trimmedSelectedProviderApiKey,
        model: selectedProviderModel,
      },
    }));

    try {
      await onValidateProvider(selectedRuntimeProvider);
      setValidationStateByProvider((previous) => ({
        ...previous,
        [selectedRuntimeProvider]: {
          status: "success",
          message: t("providerValidationSuccess", {
            provider: PROVIDER_LABELS[selectedRuntimeProvider],
          }),
          apiKey: trimmedSelectedProviderApiKey,
          model: selectedProviderModel,
        },
      }));
    } catch (error) {
      setValidationStateByProvider((previous) => ({
        ...previous,
        [selectedRuntimeProvider]: {
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : t("providerValidationFailed"),
          apiKey: trimmedSelectedProviderApiKey,
          model: selectedProviderModel,
        },
      }));
    }
  }, [
    onValidateProvider,
    settings,
    selectedRuntimeProvider,
    selectedProviderModel,
    t,
    trimmedSelectedProviderApiKey,
  ]);

  const getProviderHealthState = useCallback(
    (provider: Provider): ProviderHealthState => {
      const apiKey = settings.apiKeys[provider].trim();

      if (!hasAnyProviderCredential(provider, apiKey)) {
        return "unconfigured";
      }

      const validationStateForProvider = validationStateByProvider[provider];
      const currentModel = getProviderValidationModel(settings, provider);
      const stateMatchesCurrentConfig =
        validationStateForProvider?.apiKey === apiKey &&
        validationStateForProvider?.model === currentModel;

      if (!stateMatchesCurrentConfig || !validationStateForProvider) {
        return "configured";
      }

      if (validationStateForProvider.status === "validating") {
        return "validating";
      }

      if (validationStateForProvider.status === "success") {
        return "healthy";
      }

      if (validationStateForProvider.status === "error") {
        return "failing";
      }

      return "configured";
    },
    [settings, validationStateByProvider],
  );

  return {
    selectedCatalogProviderId,
    setSelectedCatalogProviderId,
    selectedRuntimeProvider,
    apiKeyVisible,
    setApiKeyVisible,
    selectedProviderApiKey,
    validationState,
    shouldShowValidateAction,
    secureApiKey: hasApiKey && !apiKeyVisible,
    getProviderHealthState,
    handleOpenProviderPortal,
    handleValidateProviderKey,
  };
}
