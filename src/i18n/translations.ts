import type { AppLanguage } from "../types";
import { de } from "./locales/de";
import { en } from "./locales/en";
import type { TranslationDictionary, TranslationParams, TranslationValue } from "./types";

export type { TranslationDictionary, TranslationParams, TranslationValue } from "./types";

export const translations = {
  en,
  de,
} satisfies Record<AppLanguage, TranslationDictionary>;
