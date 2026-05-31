import type {
  Provider,
  ProviderApiKeys,
  ProviderModelSelections,
  ReplyPlayback,
  Settings,
} from "../../types";

export const STORAGE_KEY = "@schnackai/settings";
export const API_KEY_STORAGE_PREFIX = "schnackai.provider_key";

export type PublicSettings = Omit<Settings, "apiKeys">;
export type SettingsUpdate = Partial<Omit<Settings, "apiKeys" | "providerModels">>;

export type LegacyStoredSettings = Omit<Partial<Settings>, "ttsMode"> & {
  webSearchEnabled?: boolean;
  ttsPlayback?: ReplyPlayback;
  ttsVoice?: string;
  ttsMode?: Settings["ttsMode"] | "local";
  localTtsVoices?: unknown;
  openaiModel?: string;
  anthropicModel?: string;
  geminiModel?: string;
  cohereModel?: string;
  deepseekModel?: string;
  groqModel?: string;
  mistralModel?: string;
  nvidiaModel?: string;
  togetherModel?: string;
  xaiModel?: string;
};

export const LEGACY_MODEL_FIELD_KEYS: Partial<Record<
  Provider,
  keyof LegacyStoredSettings
>> = {
  openai: "openaiModel",
  anthropic: "anthropicModel",
  gemini: "geminiModel",
  deepseek: "deepseekModel",
  mistral: "mistralModel",
  xai: "xaiModel",
};

export type SettingsLoadResult = {
  storedSettings: LegacyStoredSettings | undefined;
  apiKeys: ProviderApiKeys;
};

export type StoredProviderModels = Partial<ProviderModelSelections>;
