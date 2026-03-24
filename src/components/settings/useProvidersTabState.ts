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
import { getProviderValidationModel } from "../../utils/responseModes";

import { ProviderValidationState } from "./types";

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
    !!selectedRuntimeProvider && trimmedSelectedProviderApiKey.length > 0;
  const shouldShowValidateAction =
    hasApiKey && validationState.status !== "success";

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
    selectedRuntimeProvider,
    selectedProviderModel,
    t,
    trimmedSelectedProviderApiKey,
  ]);

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
    handleOpenProviderPortal,
    handleValidateProviderKey,
  };
}
