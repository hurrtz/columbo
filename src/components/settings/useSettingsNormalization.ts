import { useEffect } from "react";

import { AppLanguage } from "../../types";

import {
  getNormalizedProviderSttModels,
  getNormalizedProviderTtsModels,
  getNormalizedProviderTtsVoices,
  getNormalizedResponseModes,
  getNormalizedSttProvider,
  getNormalizedTtsProvider,
} from "./settingsRules";
import { SettingsModalProps } from "./types";

type UpdatePayload = Parameters<SettingsModalProps["onUpdate"]>[0];

export function useSettingsNormalization(params: {
  visible: boolean;
  settings: SettingsModalProps["settings"];
  enabledProviders: Parameters<typeof getNormalizedResponseModes>[1];
  enabledSttProviders: Parameters<typeof getNormalizedSttProvider>[1];
  enabledTtsProviders: Parameters<typeof getNormalizedTtsProvider>[1];
  language: AppLanguage;
  onUpdate: SettingsModalProps["onUpdate"];
}) {
  const {
    visible,
    settings,
    enabledProviders,
    enabledSttProviders,
    enabledTtsProviders,
    language,
    onUpdate,
  } = params;

  useEffect(() => {
    if (!visible) {
      return;
    }

    const patch: UpdatePayload = {};
    const shouldPromoteSttMode =
      settings.sttMode === "native" && enabledSttProviders.length > 0;
    const promotedSttProvider =
      settings.sttProvider && enabledSttProviders.includes(settings.sttProvider)
        ? settings.sttProvider
        : (enabledSttProviders[0] ?? null);
    const shouldPromoteTtsMode =
      settings.ttsMode !== "provider" && enabledTtsProviders.length > 0;
    const promotedTtsProvider =
      settings.ttsProvider && enabledTtsProviders.includes(settings.ttsProvider)
        ? settings.ttsProvider
        : (enabledTtsProviders[0] ?? null);
    const nextSttProvider = getNormalizedSttProvider(
      settings,
      enabledSttProviders,
    );
    const nextResponseModes = getNormalizedResponseModes(
      settings,
      enabledProviders,
    );
    const nextTtsProvider = getNormalizedTtsProvider(
      settings,
      enabledTtsProviders,
    );
    const nextProviderSttModels = getNormalizedProviderSttModels(
      settings,
      enabledSttProviders,
    );
    const nextProviderTtsModels = getNormalizedProviderTtsModels(
      settings,
      enabledTtsProviders,
    );
    const nextProviderTtsVoices = getNormalizedProviderTtsVoices(
      settings,
      enabledTtsProviders,
      language,
    );

    if (shouldPromoteSttMode) {
      patch.sttMode = "provider";

      if (promotedSttProvider !== settings.sttProvider) {
        patch.sttProvider = promotedSttProvider;
      }
    }

    if (nextSttProvider !== null) {
      patch.sttProvider = nextSttProvider;
    }

    if (nextResponseModes) {
      patch.responseModes = nextResponseModes;
    }

    if (shouldPromoteTtsMode) {
      patch.ttsMode = "provider";

      if (promotedTtsProvider !== settings.ttsProvider) {
        patch.ttsProvider = promotedTtsProvider;
      }
    }

    if (nextTtsProvider !== null) {
      patch.ttsProvider = nextTtsProvider;
    }

    if (nextProviderSttModels) {
      patch.providerSttModels = nextProviderSttModels;
    }

    if (nextProviderTtsModels) {
      patch.providerTtsModels = nextProviderTtsModels;
    }

    if (nextProviderTtsVoices) {
      patch.providerTtsVoices = nextProviderTtsVoices;
    }

    if (Object.keys(patch).length > 0) {
      onUpdate(patch);
    }
  }, [
    enabledProviders,
    enabledSttProviders,
    enabledTtsProviders,
    language,
    onUpdate,
    settings,
    visible,
  ]);
}
