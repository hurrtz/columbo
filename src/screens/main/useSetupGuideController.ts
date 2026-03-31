import { useCallback, useEffect, useMemo, useState } from "react";

import type { LocalTtsPackStates, SettingsTab } from "../../components/settings/types";
import { PROVIDER_LABELS } from "../../constants/models";
import type { useAudioPlayer } from "../../hooks/useAudioPlayer";
import type { useAudioRecorder } from "../../hooks/useAudioRecorder";
import type { useNativeSpeechRecognizer } from "../../hooks/useNativeSpeechRecognizer";
import { useLocalization } from "../../i18n";
import { validateProviderConnection } from "../../services/llm";
import type { Provider, Settings } from "../../types";
import { hasProviderCredentialForCapability } from "../../utils/providerCredentials";

import {
  buildSetupGuideResponseModes,
  getCurrentSetupGuideValidationState,
  getSetupGuideInitialProvider,
  getSetupGuideProviderOptions,
  getSetupGuideValidationModel,
  resolveSetupGuideRoutes,
  type SetupGuideStep,
  type SetupGuideValidationState,
} from "./setupGuideSupport";
import { useSetupGuideVoiceTest } from "./useSetupGuideVoiceTest";

interface UseSetupGuideControllerParams {
  loaded: boolean;
  openSettings: (focusProvider?: Provider, focusTab?: SettingsTab) => void;
  setSetupGuideVisible: (visible: boolean) => void;
  setupGuideDismissed: boolean;
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  updateApiKey: (provider: Provider, apiKey: string) => void;
  localTtsPackStates: LocalTtsPackStates;
  player: ReturnType<typeof useAudioPlayer>;
  recorder: ReturnType<typeof useAudioRecorder>;
  nativeStt: ReturnType<typeof useNativeSpeechRecognizer>;
}

export function useSetupGuideController({
  loaded,
  localTtsPackStates,
  nativeStt,
  openSettings,
  player,
  recorder,
  setSetupGuideVisible,
  setupGuideDismissed,
  settings,
  updateApiKey,
  updateSettings,
}: UseSetupGuideControllerParams) {
  const { t } = useLocalization();
  const providerOptions = useMemo(() => getSetupGuideProviderOptions(), []);
  const [step, setStep] = useState<SetupGuideStep>("intro");
  const [selectedProvider, setSelectedProvider] = useState<Provider>(() =>
    getSetupGuideInitialProvider(settings),
  );
  const [validationState, setValidationState] = useState<SetupGuideValidationState>(
    {
      status: "idle",
    },
  );

  useEffect(() => {
    if (!loaded) {
      return;
    }

    if (!setupGuideDismissed) {
      setSelectedProvider(getSetupGuideInitialProvider(settings));
      setStep("intro");
      setSetupGuideVisible(true);
    }
  }, [loaded, setSetupGuideVisible, setupGuideDismissed]);

  const selectedProviderApiKey = settings.apiKeys[selectedProvider].trim();
  const selectedProviderModel = getSetupGuideValidationModel(
    settings,
    selectedProvider,
  );
  const currentValidationState = useMemo(
    () =>
      getCurrentSetupGuideValidationState({
        provider: selectedProvider,
        apiKey: selectedProviderApiKey,
        model: selectedProviderModel,
        validationState,
      }),
    [selectedProvider, selectedProviderApiKey, selectedProviderModel, validationState],
  );
  const resolvedRoutes = useMemo(
    () =>
      resolveSetupGuideRoutes({
        provider: selectedProvider,
        settings,
        nativeSttAvailable: nativeStt.isAvailable,
        localTtsPackStates,
      }),
    [localTtsPackStates, nativeStt.isAvailable, selectedProvider, settings],
  );

  const voiceTest = useSetupGuideVoiceTest({
    settings,
    routes: resolvedRoutes,
    provider: selectedProvider,
    player,
    recorder,
    nativeStt,
    t,
  });

  const closeGuide = useCallback(
    async (markDismissed: boolean) => {
      await voiceTest.reset(true);
      setSetupGuideVisible(false);
      setStep("intro");

      if (markDismissed) {
        updateSettings({ setupGuideDismissed: true });
      }
    },
    [setSetupGuideVisible, updateSettings, voiceTest],
  );

  const handleOpenSetupGuide = useCallback(
    (nextStep: SetupGuideStep = "provider") => {
      setValidationState({ status: "idle" });
      setSelectedProvider(getSetupGuideInitialProvider(settings));
      setStep(nextStep);
      setSetupGuideVisible(true);
      void voiceTest.reset(true);
    },
    [setSetupGuideVisible, settings, voiceTest],
  );

  const handleDismissSetupGuide = useCallback(() => {
    void closeGuide(true);
  }, [closeGuide]);

  const handleBack = useCallback(() => {
    if (step === "provider") {
      setStep("intro");
      return;
    }

    if (step === "voice-test") {
      void voiceTest.reset(false);
      setStep("provider");
      return;
    }

    if (step === "summary") {
      setStep("voice-test");
    }
  }, [step, voiceTest]);

  const handleContinueFromIntro = useCallback(() => {
    setStep("provider");
  }, []);

  const handleSelectProvider = useCallback(
    (provider: Provider) => {
      setSelectedProvider(provider);
    },
    [],
  );

  const handleProviderApiKeyChange = useCallback(
    (value: string) => {
      updateApiKey(selectedProvider, value);
    },
    [selectedProvider, updateApiKey],
  );

  const handleValidateProviderKey = useCallback(async () => {
    if (
      !hasProviderCredentialForCapability(
        selectedProvider,
        selectedProviderApiKey,
        "llm",
      )
    ) {
      setValidationState({
        status: "error",
        provider: selectedProvider,
        apiKey: selectedProviderApiKey,
        model: selectedProviderModel,
        message: t("setupGuideProviderKeyNeedsLlmAccess", {
          provider: PROVIDER_LABELS[selectedProvider],
        }),
      });
      return false;
    }

    setValidationState({
      status: "validating",
      provider: selectedProvider,
      apiKey: selectedProviderApiKey,
      model: selectedProviderModel,
    });

    try {
      await validateProviderConnection({
        provider: selectedProvider,
        model: selectedProviderModel,
        apiKey: selectedProviderApiKey,
        language: settings.language,
      });

      setValidationState({
        status: "success",
        provider: selectedProvider,
        apiKey: selectedProviderApiKey,
        model: selectedProviderModel,
        message: t("providerValidationSuccess", {
          provider: PROVIDER_LABELS[selectedProvider],
        }),
      });
      return true;
    } catch (error) {
      setValidationState({
        status: "error",
        provider: selectedProvider,
        apiKey: selectedProviderApiKey,
        model: selectedProviderModel,
        message:
          error instanceof Error ? error.message : t("providerValidationFailed"),
      });
      return false;
    }
  }, [
    selectedProvider,
    selectedProviderApiKey,
    selectedProviderModel,
    settings.language,
    t,
  ]);

  const handleContinueFromProvider = useCallback(() => {
    if (currentValidationState.status !== "success") {
      return;
    }

    setStep("voice-test");
  }, [currentValidationState.status]);

  const handleContinueFromVoiceTest = useCallback(() => {
    setStep("summary");
  }, []);

  const handleFinishSetupGuide = useCallback(async () => {
    updateSettings({
      activeResponseMode: "normal",
      responseModes: buildSetupGuideResponseModes(selectedProvider),
      setupGuideDismissed: true,
      lastProvider: selectedProvider,
      spokenRepliesEnabled: resolvedRoutes.tts.enabled,
      sttMode: resolvedRoutes.stt.kind === "provider" ? "provider" : "native",
      sttProvider:
        resolvedRoutes.stt.kind === "provider" ? selectedProvider : null,
      ...(resolvedRoutes.tts.kind === "provider"
        ? {
            ttsMode: "provider" as const,
            ttsProvider: selectedProvider,
          }
        : resolvedRoutes.tts.kind === "local"
          ? {
              ttsMode: "local" as const,
              ttsProvider: null,
            }
          : {}),
      webSearchMode: "off",
      webSearchProvider: resolvedRoutes.webSearch.provider,
    });

    await closeGuide(false);
  }, [closeGuide, resolvedRoutes, selectedProvider, updateSettings]);

  const handleOpenSettingsFromSummary = useCallback(async () => {
    const focusTab: SettingsTab =
      !resolvedRoutes.stt.enabled
        ? "stt"
        : !resolvedRoutes.tts.enabled
          ? "tts"
          : "providers";

    await closeGuide(true);
    openSettings(selectedProvider, focusTab);
  }, [closeGuide, openSettings, resolvedRoutes.stt.enabled, resolvedRoutes.tts.enabled, selectedProvider]);

  return {
    step,
    providerOptions,
    selectedProvider,
    selectedProviderApiKey,
    currentValidationState,
    resolvedRoutes,
    voiceTest,
    handleOpenSetupGuide,
    handleDismissSetupGuide,
    handleBack,
    handleContinueFromIntro,
    handleSelectProvider,
    handleProviderApiKeyChange,
    handleValidateProviderKey,
    handleContinueFromProvider,
    handleContinueFromVoiceTest,
    handleFinishSetupGuide,
    handleOpenSettingsFromSummary,
  };
}
