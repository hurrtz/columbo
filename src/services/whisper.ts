import * as FileSystem from "expo-file-system/legacy";
import {
  getCatalogConstraintsForAppProvider,
  getStrictestCatalogMaxConstraint,
} from "../catalog";
import { PROVIDER_LABELS, getSttModelLabel } from "../constants/models";
import { translate } from "../i18n";
import { AppLanguage, Provider, SttBackendMode } from "../types";
import { getProviderSttConfig } from "./whisper/config";
import { waitForRecordedFileReady } from "./whisper/recordedFileReady";
import {
  transcribeWithBytedanceBigmodelFlashProvider,
  transcribeWithGoogleCloudSpeechV2Provider,
  transcribeWithMultipartProvider,
  transcribeWithOpenAiAudioInputProvider,
} from "./whisper/providers";
import { transcribeWithXaiRealtimeProvider } from "./whisper/realtimeProviders";

function isRemoteAudioSource(fileUri: string) {
  return /^(https?:\/\/|oss:\/\/)/i.test(fileUri);
}

function formatByteLimit(bytes: number) {
  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toFixed(1).replace(/\.0$/, "")} MB`;
  }

  if (bytes >= 1_000) {
    return `${(bytes / 1_000).toFixed(1).replace(/\.0$/, "")} KB`;
  }

  return `${bytes} B`;
}

async function assertSttUploadFitsCatalogLimits(params: {
  fileUri: string;
  provider: Provider;
  modelId: string;
  language: AppLanguage;
}) {
  const constraints = getCatalogConstraintsForAppProvider(
    params.provider,
    params.modelId,
    "stt",
  );
  const fileSizeLimit = getStrictestCatalogMaxConstraint(
    constraints,
    "file_size_bytes",
  );

  if (!fileSizeLimit) {
    return;
  }

  const info = await FileSystem.getInfoAsync(params.fileUri);
  const size =
    "size" in info && typeof info.size === "number" ? info.size : null;

  if (!info.exists || size === null || size <= fileSizeLimit.value) {
    return;
  }

  throw new Error(
    translate(params.language, "sttFileSizeLimitExceeded", {
      provider: PROVIDER_LABELS[params.provider],
      model: getSttModelLabel(params.provider, params.modelId),
      limit: formatByteLimit(fileSizeLimit.value),
    }),
  );
}

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

  const remoteAudioSource = isRemoteAudioSource(fileUri);

  if (!remoteAudioSource) {
    await waitForRecordedFileReady(fileUri, language, abortSignal);
  }

  const selectedModel = providerModel || "";
  const config = getProviderSttConfig(provider, selectedModel);

  if (!config) {
    throw new Error(
      translate(language, "sttNotSupportedYet", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const resolvedModel = providerModel || config.defaultModel;

  if (!remoteAudioSource) {
    await assertSttUploadFitsCatalogLimits({
      fileUri,
      provider,
      modelId: resolvedModel,
      language,
    });
  }

  if (config.kind === "openai-audio-input") {
    return transcribeWithOpenAiAudioInputProvider({
      abortSignal,
      apiKey,
      config,
      fileUri,
      language,
      provider,
      providerModel: resolvedModel,
    });
  }

  if (config.kind === "bytedance-bigmodel-flash") {
    return transcribeWithBytedanceBigmodelFlashProvider({
      abortSignal,
      apiKey,
      config,
      fileUri,
      language,
      provider,
      providerModel: resolvedModel,
    });
  }

  if (config.kind === "google-cloud-speech-v2") {
    return transcribeWithGoogleCloudSpeechV2Provider({
      abortSignal,
      apiKey,
      config,
      fileUri,
      language,
      provider,
      providerModel: resolvedModel,
    });
  }

  if (config.kind === "xai-realtime") {
    return transcribeWithXaiRealtimeProvider({
      abortSignal,
      apiKey,
      config,
      fileUri,
      language,
      provider,
      providerModel: resolvedModel,
    });
  }

  return transcribeWithMultipartProvider({
    abortSignal,
    apiKey,
    config,
    fileUri,
    language,
    provider,
    providerModel: resolvedModel,
  });
}
