import { useCallback } from "react";

import type { Provider, Settings } from "../../../types";

import type { ShowToastFn, TranslateFn } from "../shared";

interface UseVoiceSessionGuardsParams {
  availableSttProviders: Provider[];
  availableTtsProviders: Provider[];
  nativeSttAvailable: boolean;
  providerApiKey: string;
  providerLabel: string;
  settings: Pick<Settings, "spokenRepliesEnabled" | "sttMode" | "ttsMode">;
  showToast: ShowToastFn;
  sttApiKey: string;
  sttProvider: Provider | null;
  t: TranslateFn;
  ttsApiKey: string;
  ttsProvider: Provider | null;
}

export function useVoiceSessionGuards({
  availableSttProviders,
  availableTtsProviders,
  nativeSttAvailable,
  providerApiKey,
  providerLabel,
  settings,
  showToast,
  sttApiKey,
  sttProvider,
  t,
  ttsApiKey,
  ttsProvider,
}: UseVoiceSessionGuardsParams) {
  return useCallback(() => {
    if (!providerApiKey) {
      showToast(t("addProviderKeyToUseProvider", { provider: providerLabel }));
      return false;
    }

    if (settings.sttMode === "native" && !nativeSttAvailable) {
      showToast(t("speechRecognitionUnavailableOnDevice"));
      return false;
    }

    if (
      settings.sttMode === "provider" &&
      (!sttProvider ||
        !availableSttProviders.includes(sttProvider) ||
        !sttApiKey)
    ) {
      showToast(t("chooseSttBeforeVoiceSession"));
      return false;
    }

    if (
      settings.spokenRepliesEnabled &&
      settings.ttsMode === "provider" &&
      (!ttsProvider ||
        !availableTtsProviders.includes(ttsProvider) ||
        !ttsApiKey)
    ) {
      showToast(t("chooseTtsBeforeSpokenReplies"));
      return false;
    }

    return true;
  }, [
    availableSttProviders,
    availableTtsProviders,
    nativeSttAvailable,
    providerApiKey,
    providerLabel,
    settings.sttMode,
    settings.spokenRepliesEnabled,
    settings.ttsMode,
    showToast,
    sttApiKey,
    sttProvider,
    t,
    ttsApiKey,
    ttsProvider,
  ]);
}
