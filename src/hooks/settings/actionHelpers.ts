import type { LocalTtsVoiceSelections, Provider, ResponseMode, Settings } from "../../types";
import { persistApiKey, persistPublicSettings } from "./storage";

type SetSettings = React.Dispatch<React.SetStateAction<Settings>>;

function persistAndReturn(next: Settings) {
  void persistPublicSettings(next);
  return next;
}

export function updateNestedSettingsRecord<K extends keyof Settings>(
  setSettings: SetSettings,
  key: K,
  entry: keyof Settings[K] & (string | number | symbol),
  value: string,
) {
  setSettings((prev) =>
    persistAndReturn({
      ...prev,
      [key]: {
        ...(prev[key] as Record<string, string>),
        [entry]: value,
      },
    }),
  );
}

export function updateTopLevelSettingsValue<K extends keyof Settings>(
  setSettings: SetSettings,
  key: K,
  value: Settings[K],
) {
  setSettings((prev) =>
    persistAndReturn({
      ...prev,
      [key]: value,
    }),
  );
}

export function createProviderModelUpdater(
  setSettings: SetSettings,
  key: "providerModels" | "providerSttModels" | "providerTtsModels" | "providerTtsVoices",
) {
  return (provider: Provider, value: string) => {
    updateNestedSettingsRecord(setSettings, key, provider, value);
  };
}

export function createLocalTtsVoiceUpdater(setSettings: SetSettings) {
  return (language: keyof LocalTtsVoiceSelections, value: string) => {
    updateNestedSettingsRecord(setSettings, "localTtsVoices", language, value);
  };
}

export function createResponseModeUpdater(setSettings: SetSettings) {
  return (mode: ResponseMode, value: Settings["responseModes"][ResponseMode]) => {
    setSettings((prev) =>
      persistAndReturn({
        ...prev,
        responseModes: {
          ...prev.responseModes,
          [mode]: value,
        },
      }),
    );
  };
}

export function createApiKeyUpdater(setSettings: SetSettings) {
  return (provider: Provider, value: string) => {
    const nextValue = value.trim();

    setSettings((prev) => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [provider]: nextValue,
      },
    }));

    void persistApiKey(provider, nextValue);
  };
}
