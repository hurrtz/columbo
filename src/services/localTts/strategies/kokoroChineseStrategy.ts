import { exists as pathExists } from "@dr.pogodin/react-native-fs";
import {
  downloadModelByCategory,
  isModelDownloadedByCategory,
  ModelCategory,
  refreshModelsByCategory,
} from "react-native-sherpa-onnx/download";
import {
  ensureKokoroMultilingualModelRootPath,
  getInstalledKokoroMultilingualModelRootPath,
} from "../modelFiles";
import {
  getKokoroChineseVoiceConfig,
  KOKORO_MULTILINGUAL_MODEL_ID,
} from "../constants";
import { getKokoroMultilingualSession } from "../sessions";
import { normalizeLocalSpeechText, synthesizeEngineSpeechToFile } from "./shared";
import type { LocalTtsStrategy } from "./types";

async function getChineseInstallStatus(voice: string) {
  const voiceConfig = getKokoroChineseVoiceConfig(voice);

  if (!voiceConfig) {
    return {
      supported: true,
      installed: false,
      modelInstalled: false,
    };
  }

  const modelInstalled = await isModelDownloadedByCategory(
    ModelCategory.Tts,
    KOKORO_MULTILINGUAL_MODEL_ID,
  );
  const modelRootPath = modelInstalled
    ? await getInstalledKokoroMultilingualModelRootPath()
    : null;
  const lexiconInstalled = modelRootPath
    ? await pathExists(`${modelRootPath}/lexicon-zh.txt`)
    : false;

  return {
    supported: true,
    installed: modelInstalled && !!modelRootPath && lexiconInstalled,
    modelInstalled,
    lexiconInstalled,
  };
}

export const kokoroChineseStrategy: LocalTtsStrategy = {
  getInstallStatus: getChineseInstallStatus,
  install: async (params) => {
    if (!getKokoroChineseVoiceConfig(params.voice)) {
      throw new Error(
        "A local Simplified Chinese voice pack is not configured for this voice.",
      );
    }

    await refreshModelsByCategory(ModelCategory.Tts);
    await downloadModelByCategory(ModelCategory.Tts, KOKORO_MULTILINGUAL_MODEL_ID, {
      onProgress: (progress) => params.onProgress?.(progress.percent / 100),
    });

    await ensureKokoroMultilingualModelRootPath("zh");
    params.onProgress?.(1);
  },
  synthesize: async (params) => {
    const voiceConfig = getKokoroChineseVoiceConfig(params.voice);

    if (!voiceConfig) {
      throw new Error(
        "A local Simplified Chinese voice pack is not configured for this voice.",
      );
    }

    const status = await getChineseInstallStatus(params.voice);
    if (!status.installed) {
      throw new Error(
        "The Simplified Chinese local voice pack is not installed yet.",
      );
    }

    const sessionState = await getKokoroMultilingualSession("zh");
    return synthesizeEngineSpeechToFile({
      engine: sessionState.engine,
      text: normalizeLocalSpeechText(params.text),
      sid: voiceConfig.sid,
      speed: 1,
    });
  },
};
