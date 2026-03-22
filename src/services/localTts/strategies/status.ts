import { LOCAL_TTS_SUPPORTED_LANGUAGES } from "../../../constants/localTts";
import type { TtsListenLanguage } from "../../../types";
import type { RawLocalTtsInstallStatus } from "../constants";
import { getLocalTtsStrategy } from "./registry";

export async function getRawLocalTtsInstallStatus(params: {
  language: TtsListenLanguage;
  voice: string;
}): Promise<RawLocalTtsInstallStatus> {
  if (!LOCAL_TTS_SUPPORTED_LANGUAGES.includes(params.language)) {
    return {
      supported: false,
      installed: false,
    };
  }

  const strategy = getLocalTtsStrategy(params.language);
  if (!strategy) {
    return {
      supported: false,
      installed: false,
    };
  }

  return strategy.getInstallStatus(
    params.voice,
  ) as Promise<RawLocalTtsInstallStatus>;
}
