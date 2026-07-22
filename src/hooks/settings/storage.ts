import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import type { Provider, ProviderApiKeys, Settings } from "../../types";
import { reportPersistenceAlert } from "../../services/persistenceAlerts";
import {
  RUNTIME_PROVIDER_IDS,
} from "../../constants/providers/runtimeState";
import {
  API_KEY_STORAGE_PREFIX,
  type LegacyStoredSettings,
  STORAGE_KEY,
  type PublicSettings,
  type SettingsLoadResult,
} from "./types";

const mutationQueues = new Map<string, Promise<void>>();

function enqueueSettingsMutation(
  key: string,
  operation: () => Promise<void>,
) {
  const previous = mutationQueues.get(key) ?? Promise.resolve();
  const queued = previous
    .catch(() => undefined)
    .then(operation)
    .catch((error) => {
      console.error(`[settings-storage] persistence failed for ${key}`, error);
      reportPersistenceAlert("settings", "save");
    });

  mutationQueues.set(key, queued);
  void queued.then(() => {
    if (mutationQueues.get(key) === queued) {
      mutationQueues.delete(key);
    }
  });

  return queued;
}

async function awaitPendingMutation(key: string) {
  await mutationQueues.get(key);
}

export function getApiKeyStorageKey(provider: Provider) {
  const safeProvider = provider.replace(/[^0-9A-Za-z._-]/g, "_");
  return `${API_KEY_STORAGE_PREFIX}.${safeProvider}`;
}

export function toPublicSettings(settings: Settings): PublicSettings {
  const { apiKeys: _apiKeys, ...publicSettings } = settings;
  return publicSettings;
}

export function persistPublicSettings(settings: Settings) {
  const serialized = JSON.stringify(toPublicSettings(settings));
  return enqueueSettingsMutation(STORAGE_KEY, () =>
    AsyncStorage.setItem(STORAGE_KEY, serialized),
  );
}

export async function loadStoredApiKeys(): Promise<ProviderApiKeys> {
  const apiKeyEntries = await Promise.all(
    RUNTIME_PROVIDER_IDS.map(async (provider) => {
      const stored = await SecureStore.getItemAsync(getApiKeyStorageKey(provider));
      return [provider, stored?.trim() ?? ""] as const;
    }),
  );

  const apiKeys = Object.fromEntries(apiKeyEntries) as ProviderApiKeys;

  // Migrate a legacy standalone Grok voice key onto the merged xAI provider.
  if (!apiKeys.xai) {
    const legacyGrokKey = await SecureStore.getItemAsync(
      `${API_KEY_STORAGE_PREFIX}.grok`,
    );

    if (legacyGrokKey?.trim()) {
      apiKeys.xai = legacyGrokKey.trim();
    }
  }

  return apiKeys;
}

export async function loadStoredSettingsSnapshot(): Promise<SettingsLoadResult> {
  await Promise.all([
    awaitPendingMutation(STORAGE_KEY),
    ...RUNTIME_PROVIDER_IDS.map((provider) =>
      awaitPendingMutation(getApiKeyStorageKey(provider)),
    ),
  ]);
  const [raw, apiKeys] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEY),
    loadStoredApiKeys(),
  ]);

  return {
    storedSettings: raw ? (JSON.parse(raw) as LegacyStoredSettings) : undefined,
    apiKeys,
  };
}

export async function persistApiKey(provider: Provider, apiKey: string) {
  const key = getApiKeyStorageKey(provider);
  await enqueueSettingsMutation(key, async () => {
    if (apiKey) {
      await SecureStore.setItemAsync(key, apiKey);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  });
}
