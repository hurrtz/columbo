import * as FileSystem from "expo-file-system/legacy";

import type { AppLanguage, Provider } from "../types";

import { synthesizeProviderSpeech } from "./tts/providerRoute";

export async function validateTtsProviderConnection(params: {
  provider: Provider;
  apiKey: string;
  language: AppLanguage;
  model?: string;
  voice?: string;
  abortSignal?: AbortSignal;
}) {
  const audioPath = await synthesizeProviderSpeech({
    text: "OK",
    voice: params.voice ?? "",
    provider: params.provider,
    providerModel: params.model,
    apiKey: params.apiKey,
    language: params.language,
    abortSignal: params.abortSignal,
  });

  await FileSystem.deleteAsync(audioPath, {
    idempotent: true,
  });
}
