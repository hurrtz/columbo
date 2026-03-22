export type TranslationParams = Record<string, string | number | undefined>;
export type TranslationValue = string | ((params: TranslationParams) => string);
export type TranslationDictionary = Record<string, TranslationValue>;
