import { AppLanguage, Provider } from "../../types";
import {
  NATIVE_STT_LANGUAGE_NOTE,
  NATIVE_TTS_LANGUAGE_NOTE,
  PROVIDER_CONFIGS,
  PROVIDER_ORDER,
  WHISPER_WELL_SUPPORTED_LANGUAGES,
} from "./catalogData";

const NATIVE_STT_LANGUAGE_NOTES_BY_LANGUAGE: Record<AppLanguage, string> = {
  en: NATIVE_STT_LANGUAGE_NOTE,
  de:
    "Die Sprachunterstuetzung haengt vom Betriebssystem des Geraets, installierten Sprachpaketen und der Verfuegbarkeit der Erkennung ab. Die genaue Liste variiert je nach Geraet.",
};

const NATIVE_TTS_LANGUAGE_NOTES_BY_LANGUAGE: Record<AppLanguage, string> = {
  en: NATIVE_TTS_LANGUAGE_NOTE,
  de:
    "Die Sprachunterstuetzung haengt von den auf dem Geraet installierten Systemstimmen ab. Die genaue Liste, Aussprachequalitaet und Offline-Verfuegbarkeit variieren je nach Betriebssystem und Geraet.",
};

const PROVIDER_API_KEY_HINTS_BY_LANGUAGE: Record<AppLanguage, Record<Provider, string>> = {
  en: Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [provider, PROVIDER_CONFIGS[provider].apiKeyHint]),
  ) as Record<Provider, string>,
  de: {
    openai:
      "Schaltet OpenAI-Modelle und von OpenAI gehostete Sprachfunktionen frei, wenn du STT oder TTS ueber einen Anbieter nutzt.",
    anthropic: "Schaltet Anthropic-Modelle auf der Hauptbuehne frei.",
    gemini:
      "Schaltet Gemini-Modelle plus von Google gehostete Sprachfunktionen ueber die Gemini-API frei.",
    xai: "Schaltet Grok-Modelle von xAI frei.",
    groq:
      "Groq bietet einen kostenlosen Tarif und schaltet schnelle gehostete Inferenzmodelle frei.",
    deepseek: "Schaltet DeepSeek-Chat- und Reasoning-Modelle frei.",
    mistral: "Schaltet gehostete Mistral-Modelle frei.",
    cohere: "Schaltet Command-Modelle von Cohere frei.",
    together: "Schaltet bei Together gehostete Open-Modelle frei.",
    nvidia: "Schaltet gehostete Foundation-Modelle von NVIDIA frei.",
  },
};

const PROVIDER_API_KEY_PLACEHOLDERS_BY_LANGUAGE: Record<
  AppLanguage,
  Record<Provider, string>
> = {
  en: Object.fromEntries(
    PROVIDER_ORDER.map((provider) => [
      provider,
      PROVIDER_CONFIGS[provider].apiKeyPlaceholder,
    ]),
  ) as Record<Provider, string>,
  de: {
    openai: "sk-...",
    anthropic: "sk-ant-...",
    gemini: "AIza...",
    xai: "xai-...",
    groq: "gsk_...",
    deepseek: "sk-...",
    mistral: "API-Schluessel eingeben",
    cohere: "API-Schluessel eingeben",
    together: "API-Schluessel eingeben",
    nvidia: "nvapi-...",
  },
};

const PROVIDER_STT_LANGUAGE_NOTES_BY_LANGUAGE: Partial<
  Record<AppLanguage, Partial<Record<Provider, string>>>
> = {
  en: Object.fromEntries(
    PROVIDER_ORDER.flatMap((provider) =>
      PROVIDER_CONFIGS[provider].sttLanguageNote
        ? [[provider, PROVIDER_CONFIGS[provider].sttLanguageNote]]
        : [],
    ),
  ) as Partial<Record<Provider, string>>,
  de: {
    openai:
      `OpenAI bietet aktuell gpt-4o-transcribe, gpt-4o-mini-transcribe und whisper-1 fuer Speech-to-Text an. Der von OpenAI veroeffentlichte Satz gut unterstuetzter Sprachen lautet: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
    gemini:
      "Gemini Audio Understanding ist mehrsprachig, aber Google veroeffentlicht fuer diesen Transkriptionspfad keine kompakte Tabelle unterstuetzter Sprachen. Es handelt sich eher um eine breite allgemeine Transkriptionsroute als um eine dedizierte Telephony-STT-API.",
    groq:
      `Die App nutzt hier whisper-large-v3-turbo. Groq dokumentiert das Modell als mehrsprachig. Fuer die Whisper-Familie ist dieser Satz gut unterstuetzter Sprachen veroeffentlicht: ${WHISPER_WELL_SUPPORTED_LANGUAGES} Wenn dir mehrsprachige Genauigkeit wichtiger ist als Geschwindigkeit, empfiehlt Groq whisper-large-v3 statt der Turbo-Variante.`,
    mistral:
      "Die aktuelle Voxtral-Transkriptionsroute ist fuer Englisch, Spanisch, Franzoesisch, Portugiesisch, Hindi, Deutsch, Niederlaendisch und Italienisch dokumentiert.",
    together:
      `Die aktuelle Integration nutzt openai/whisper-large-v3. Das Modell ist mehrsprachig und akzeptiert ISO-639-1-Sprachhinweise. Ein veroeffentlichter Satz gut unterstuetzter Whisper-Sprachen lautet: ${WHISPER_WELL_SUPPORTED_LANGUAGES}`,
  },
};

const PROVIDER_TTS_LANGUAGE_NOTES_BY_LANGUAGE: Partial<
  Record<AppLanguage, Partial<Record<Provider, string>>>
> = {
  en: Object.fromEntries(
    PROVIDER_ORDER.flatMap((provider) =>
      PROVIDER_CONFIGS[provider].ttsLanguageNote
        ? [[provider, PROVIDER_CONFIGS[provider].ttsLanguageNote]]
        : [],
    ),
  ) as Partial<Record<Provider, string>>,
  de: {
    openai:
      "OpenAI bietet aktuell gpt-4o-mini-tts, tts-1 und tts-1-hd fuer Text-to-Speech an. OpenAI veroeffentlicht fuer TTS keine so kompakte Liste gut unterstuetzter Sprachen wie fuer STT und weist darauf hin, dass die Stimmen fuer Englisch optimiert sind.",
    gemini:
      "Gemini TTS unterstuetzt aktuell Arabisch, Bengalisch, Niederlaendisch, Englisch, Franzoesisch, Deutsch, Hindi, Indonesisch, Italienisch, Japanisch, Koreanisch, Mandarin, Polnisch, Portugiesisch, Rumaenisch, Russisch, Spanisch, Tamil, Telugu, Thai, Tuerkisch, Ukrainisch, Urdu und Vietnamesisch.",
    xai:
      "xAI TTS unterstuetzt aktuell Arabisch, Niederlaendisch, Englisch, Franzoesisch, Deutsch, Hindi, Indonesisch, Italienisch, Japanisch, Koreanisch, Polnisch, Portugiesisch, Russisch, Spanisch, Thai, Tuerkisch, Vietnamesisch und Chinesisch.",
    together:
      "Die aktuelle Together-TTS-Route ist fuer Englisch, Spanisch, Franzoesisch, Deutsch, Italienisch, Portugiesisch, Hindi, Japanisch, Koreanisch und Chinesisch konfiguriert. Die Verfuegbarkeit einzelner Stimmen haengt vom Modell ab.",
  },
};

export function getNativeSttLanguageNote(language: AppLanguage) {
  return NATIVE_STT_LANGUAGE_NOTES_BY_LANGUAGE[language];
}

export function getNativeTtsLanguageNote(language: AppLanguage) {
  return NATIVE_TTS_LANGUAGE_NOTES_BY_LANGUAGE[language];
}

export function getProviderApiKeyHint(provider: Provider, language: AppLanguage) {
  return PROVIDER_API_KEY_HINTS_BY_LANGUAGE[language][provider];
}

export function getProviderApiKeyPlaceholder(
  provider: Provider,
  language: AppLanguage,
) {
  return PROVIDER_API_KEY_PLACEHOLDERS_BY_LANGUAGE[language][provider];
}

export function getProviderSttLanguageNote(
  provider: Provider,
  language: AppLanguage,
) {
  return PROVIDER_STT_LANGUAGE_NOTES_BY_LANGUAGE[language]?.[provider] ?? null;
}

export function getProviderTtsLanguageNote(
  provider: Provider,
  language: AppLanguage,
) {
  return PROVIDER_TTS_LANGUAGE_NOTES_BY_LANGUAGE[language]?.[provider] ?? null;
}
