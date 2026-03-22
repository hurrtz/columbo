import {
  downloadModelByCategory,
  isModelDownloadedByCategory,
  ModelCategory,
  refreshModelsByCategory,
} from "react-native-sherpa-onnx/download";
import {
  getLocalPackLanguageLabel,
  getSherpaVitsModelId,
  type SherpaVitsLanguage,
} from "../constants";
import { getSherpaVitsSession } from "../sessions";
import { normalizeLocalSpeechText, synthesizeEngineSpeechToFile } from "./shared";
import type { LocalTtsStrategy } from "./types";

async function installSherpaVitsVoicePack(params: {
  language: SherpaVitsLanguage;
  voice: string;
  onProgress?: (progress: number) => void;
}) {
  const modelId = getSherpaVitsModelId(params.language, params.voice);

  if (!modelId) {
    throw new Error(
      `A local ${getLocalPackLanguageLabel(params.language)} voice pack is not configured for this voice.`,
    );
  }

  await refreshModelsByCategory(ModelCategory.Tts);
  await downloadModelByCategory(ModelCategory.Tts, modelId, {
    onProgress: (progress) => {
      params.onProgress?.(progress.percent / 100);
    },
  });

  params.onProgress?.(1);
}

function getSherpaInstallStatus(language: SherpaVitsLanguage, voice: string) {
  return getSherpaVitsModelId(language, voice)
    ? isModelDownloadedByCategory(
        ModelCategory.Tts,
        getSherpaVitsModelId(language, voice)!,
      ).then((modelInstalled) => ({
        supported: true,
        installed: modelInstalled,
        modelInstalled,
      }))
    : Promise.resolve({
        supported: true,
        installed: false,
        modelInstalled: false,
      });
}

async function synthesizeSherpaVitsSpeech(params: {
  language: SherpaVitsLanguage;
  text: string;
  voice: string;
}) {
  const modelId = getSherpaVitsModelId(params.language, params.voice);
  const languageLabel = getLocalPackLanguageLabel(params.language);

  if (!modelId) {
    throw new Error(
      `A local ${languageLabel} voice pack is not configured for this voice.`,
    );
  }

  const status = await getSherpaInstallStatus(params.language, params.voice);
  if (!status.installed) {
    throw new Error(`The ${languageLabel} local voice pack is not installed yet.`);
  }

  const sessionState = await getSherpaVitsSession(modelId);
  return synthesizeEngineSpeechToFile({
    engine: sessionState.engine,
    text: normalizeLocalSpeechText(params.text),
    sid: 0,
    speed: 1,
  }).catch((error) => {
    throw new Error(
      error instanceof Error && error.message
        ? error.message
        : `The local ${languageLabel} voice model did not return audio.`,
    );
  });
}

export function buildSherpaVitsStrategy(
  language: SherpaVitsLanguage,
): LocalTtsStrategy {
  return {
    getInstallStatus: (voice) => getSherpaInstallStatus(language, voice),
    install: async (params) => {
      await installSherpaVitsVoicePack({
        language,
        voice: params.voice,
        onProgress: params.onProgress,
      });
    },
    synthesize: async (params) => {
      return synthesizeSherpaVitsSpeech({
        language,
        text: params.text,
        voice: params.voice,
      });
    },
  };
}
