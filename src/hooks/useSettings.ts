import { useState, useEffect, useCallback } from "react";
import { type Settings, DEFAULT_SETTINGS } from "../types";
import { mergeSettings } from "./settings/mergeStoredSettings";
import { loadStoredSettingsSnapshot } from "./settings/storage";
import { useSettingsActions } from "./settings/useSettingsActions";
import { reportPersistenceAlert } from "../services/persistenceAlerts";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    void loadStoredSettingsSnapshot()
      .then(({ storedSettings, apiKeys }) => {
        if (!mounted) {
          return;
        }
        setSettings(mergeSettings(storedSettings, apiKeys));
      })
      .catch((error) => {
        console.error("[settings-storage] failed to load settings", error);
        reportPersistenceAlert("settings", "load");
      })
      .finally(() => {
        if (mounted) {
          setLoaded(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const {
    updateSettings,
    updateProviderModel,
    updateProviderSttModel,
    updateProviderTtsModel,
    updateResponseModeRoute,
    addResponseMode,
    removeResponseMode,
    updateActiveResponseMode,
    updateProviderTtsVoice,
    updateApiKey,
  } = useSettingsActions({ setSettings });

  return {
    settings,
    updateSettings,
    updateProviderModel,
    updateProviderSttModel,
    updateProviderTtsModel,
    updateResponseModeRoute,
    addResponseMode,
    removeResponseMode,
    updateActiveResponseMode,
    updateProviderTtsVoice,
    updateApiKey,
    loaded,
  };
}
