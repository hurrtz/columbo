import * as FileSystem from "expo-file-system/legacy";
import { PROVIDER_LABELS } from "../constants/models";
import { translate } from "../i18n";
import { AppLanguage, Provider, SttBackendMode } from "../types";
import { throwIfAborted } from "./whisper/abort";
import { STT_PROVIDER_CONFIGS } from "./whisper/config";
import { waitForRecordedFileReady } from "./whisper/recordedFileReady";
import {
  transcribeWithGeminiProvider,
  transcribeWithMultipartProvider,
} from "./whisper/providers";

export async function transcribeAudio(params: {
  fileUri: string;
  mode: SttBackendMode;
  provider?: Provider | null;
  providerModel?: string;
  apiKey?: string;
  language: AppLanguage;
  abortSignal?: AbortSignal;
}): Promise<string | null> {
  const {
    fileUri,
    mode,
    provider,
    providerModel,
    apiKey,
    language,
    abortSignal,
  } = params;

  if (mode === "native") {
    throw new Error(translate(language, "nativeSttHandledInApp"));
  }

  if (!provider) {
    throw new Error(translate(language, "chooseSpeechToTextProviderInSettings"));
  }

  await waitForRecordedFileReady(fileUri, language, abortSignal);

  const config = STT_PROVIDER_CONFIGS[provider];

  if (!config) {
    throw new Error(
      translate(language, "sttNotSupportedYet", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  if (config.kind === "gemini") {
    return transcribeWithGeminiProvider({
      abortSignal,
      apiKey,
      config,
      fileUri,
      language,
      provider,
      providerModel,
    });
  }

  return transcribeWithMultipartProvider({
    abortSignal,
    apiKey,
    config,
    fileUri,
    language,
    provider,
    providerModel,
  });
}
