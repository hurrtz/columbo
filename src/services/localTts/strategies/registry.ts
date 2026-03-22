import type { TtsListenLanguage } from "../../../types";
import { kokoroChineseStrategy } from "./kokoroChineseStrategy";
import { kokoroEnglishStrategy } from "./kokoroEnglishStrategy";
import { buildSherpaVitsStrategy } from "./sherpaVitsStrategy";
import type { LocalTtsStrategy } from "./types";

export const LOCAL_TTS_STRATEGIES: Partial<
  Record<TtsListenLanguage, LocalTtsStrategy>
> = {
  en: kokoroEnglishStrategy,
  de: buildSherpaVitsStrategy("de"),
  zh: kokoroChineseStrategy,
  es: buildSherpaVitsStrategy("es"),
  pt: buildSherpaVitsStrategy("pt"),
  hi: buildSherpaVitsStrategy("hi"),
  fr: buildSherpaVitsStrategy("fr"),
  it: buildSherpaVitsStrategy("it"),
};

export function getLocalTtsStrategy(language: TtsListenLanguage) {
  return LOCAL_TTS_STRATEGIES[language];
}
