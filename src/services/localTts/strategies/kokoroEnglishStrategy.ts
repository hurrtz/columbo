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
  getKokoroEnglishVoiceConfig,
  KOKORO_MULTILINGUAL_MODEL_ID,
} from "../constants";
import { getKokoroMultilingualSession } from "../sessions";
import { normalizeLocalSpeechText, synthesizeEngineSpeechToFile } from "./shared";
import type { LocalTtsStrategy } from "./types";

async function getEnglishInstallStatus(voice: string) {
  const voiceConfig = getKokoroEnglishVoiceConfig(voice);
  const modelInstalled = await isModelDownloadedByCategory(
    ModelCategory.Tts,
    KOKORO_MULTILINGUAL_MODEL_ID,
  );
  const modelRootPath = modelInstalled
    ? await getInstalledKokoroMultilingualModelRootPath()
    : null;
  const defaultLexiconInstalled = modelRootPath
    ? await pathExists(`${modelRootPath}/lexicon.txt`)
    : false;

  return {
    supported: true,
    installed:
      !!voiceConfig &&
      modelInstalled &&
      !!modelRootPath &&
      defaultLexiconInstalled,
    modelInstalled,
    defaultLexiconInstalled,
  };
}

export const kokoroEnglishStrategy: LocalTtsStrategy = {
  getInstallStatus: getEnglishInstallStatus,
  install: async (params) => {
    if (!getKokoroEnglishVoiceConfig(params.voice)) {
      throw new Error(
        "A local English voice pack is not configured for this voice.",
      );
    }

    await refreshModelsByCategory(ModelCategory.Tts);
    await downloadModelByCategory(ModelCategory.Tts, KOKORO_MULTILINGUAL_MODEL_ID, {
      onProgress: (progress) => params.onProgress?.(progress.percent / 100),
    });

    await ensureKokoroMultilingualModelRootPath("en");
    params.onProgress?.(1);
  },
  synthesize: async (params) => {
    const voiceConfig = getKokoroEnglishVoiceConfig(params.voice);

    if (!voiceConfig) {
      throw new Error(
        "A local English voice pack is not configured for this voice.",
      );
    }

    const status = await getEnglishInstallStatus(params.voice);
    if (!status.installed) {
      throw new Error("The local voice pack is not installed yet.");
    }

    const sessionState = await getKokoroMultilingualSession("en");
    return synthesizeEngineSpeechToFile({
      engine: sessionState.engine,
      text: normalizeLocalSpeechText(params.text),
      sid: voiceConfig.sid,
      speed: 1,
    });
  },
};
