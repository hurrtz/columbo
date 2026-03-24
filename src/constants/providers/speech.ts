import { getCatalogModelForAppProvider } from "../../catalog";
import type { AppLanguage, Provider } from "../../types";
import type { ModelInfo, TtsVoiceOption } from "./types";

function getCatalogSpeechModelLabel(
  provider: Provider,
  service: "stt" | "tts",
  modelId: string,
) {
  return getCatalogModelForAppProvider(provider, modelId, service)?.publicName ?? null;
}

function withCatalogSpeechLabels(
  provider: Provider,
  service: "stt" | "tts",
  options: ModelInfo[],
) {
  return options.map((option) => ({
    ...option,
      name: getCatalogSpeechModelLabel(provider, service, option.id) ?? option.name,
  }));
}

interface RuntimeSpeechModelSpec {
  id: string;
  fallbackName?: string;
  isDefault?: boolean;
}

function speechModel(
  id: string,
  fallbackName?: string,
  isDefault = false,
): RuntimeSpeechModelSpec {
  return {
    id,
    ...(fallbackName ? { fallbackName } : {}),
    ...(isDefault ? { isDefault: true } : {}),
  };
}

function buildRuntimeSpeechModelOptions(
  provider: Provider,
  service: "stt" | "tts",
  specs: RuntimeSpeechModelSpec[],
): ModelInfo[] {
  return withCatalogSpeechLabels(
    provider,
    service,
    specs.map(({ id, fallbackName }) => ({
      id,
      name: fallbackName ?? id,
    })),
  );
}

function buildRuntimeSpeechDefaults(
  specsByProvider: Partial<Record<Provider, RuntimeSpeechModelSpec[]>>,
) {
  return Object.fromEntries(
    Object.entries(specsByProvider).flatMap(([provider, specs]) => {
      const defaultSpec = specs?.find((spec) => spec.isDefault) ?? specs?.[0];

      return defaultSpec ? [[provider, defaultSpec.id]] : [];
    }),
  ) as Partial<Record<Provider, string>>;
}

const PROVIDER_STT_MODEL_SPECS: Partial<Record<Provider, RuntimeSpeechModelSpec[]>> = {
  openai: [
    speechModel("gpt-4o-transcribe", "GPT-4o Transcribe"),
    speechModel(
      "gpt-4o-mini-transcribe",
      "GPT-4o Mini Transcribe",
      true,
    ),
    speechModel("whisper-1", "Whisper-1"),
  ],
  gemini: [
    speechModel("gemini-3.1-pro-preview", "Gemini 3.1 Pro Preview"),
    speechModel(
      "gemini-3.1-flash-lite-preview",
      "Gemini 3.1 Flash-Lite Preview",
    ),
    speechModel("gemini-3-flash-preview", "Gemini 3 Flash Preview"),
    speechModel("gemini-2.5-pro", "Gemini 2.5 Pro"),
    speechModel("gemini-2.5-flash", "Gemini 2.5 Flash", true),
    speechModel("gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite"),
    speechModel("gemini-2.0-flash", "Gemini 2.0 Flash"),
    speechModel("gemini-2.0-flash-lite", "Gemini 2.0 Flash-Lite"),
  ],
  groq: [
    speechModel(
      "whisper-large-v3-turbo",
      "Whisper Large v3 Turbo",
      true,
    ),
    speechModel("whisper-large-v3", "Whisper Large v3"),
  ],
  mistral: [speechModel("voxtral-mini-latest", "Voxtral Mini Latest", true)],
  together: [
    speechModel("openai/whisper-large-v3", "Whisper Large v3", true),
    speechModel("mistralai/Voxtral-Mini-3B-2507", "Voxtral Mini 3B"),
  ],
};

export const PROVIDER_STT_MODEL_OPTIONS: Partial<Record<Provider, ModelInfo[]>> =
  Object.fromEntries(
    Object.entries(PROVIDER_STT_MODEL_SPECS).map(([provider, specs]) => [
      provider,
      buildRuntimeSpeechModelOptions(provider as Provider, "stt", specs),
    ]),
  ) as Partial<Record<Provider, ModelInfo[]>>;

export const PROVIDER_DEFAULT_STT_MODELS = buildRuntimeSpeechDefaults(
  PROVIDER_STT_MODEL_SPECS,
);

export function getProviderSttModelOptions(provider: Provider) {
  return PROVIDER_STT_MODEL_OPTIONS[provider] ?? [];
}

export function getSttModelLabel(provider: Provider, modelId: string) {
  const option = getProviderSttModelOptions(provider).find(
    (model) => model.id === modelId,
  );
  return option?.name ?? modelId;
}

export const OPENAI_TTS_VOICES: TtsVoiceOption[] = [
  { id: "alloy", label: "Alloy" },
  { id: "ash", label: "Ash" },
  { id: "ballad", label: "Ballad" },
  { id: "cedar", label: "Cedar" },
  { id: "coral", label: "Coral" },
  { id: "echo", label: "Echo" },
  { id: "fable", label: "Fable" },
  { id: "marin", label: "Marin" },
  { id: "onyx", label: "Onyx" },
  { id: "nova", label: "Nova" },
  { id: "sage", label: "Sage" },
  { id: "shimmer", label: "Shimmer" },
  { id: "verse", label: "Verse" },
];

export const GEMINI_TTS_VOICES: TtsVoiceOption[] = [
  { id: "Zephyr", label: "Zephyr · Bright" },
  { id: "Puck", label: "Puck · Upbeat" },
  { id: "Charon", label: "Charon · Informative" },
  { id: "Kore", label: "Kore · Firm" },
  { id: "Fenrir", label: "Fenrir · Excitable" },
  { id: "Leda", label: "Leda · Youthful" },
  { id: "Orus", label: "Orus · Firm" },
  { id: "Aoede", label: "Aoede · Breezy" },
  { id: "Callirrhoe", label: "Callirrhoe · Easy-going" },
  { id: "Autonoe", label: "Autonoe · Bright" },
  { id: "Enceladus", label: "Enceladus · Breathy" },
  { id: "Iapetus", label: "Iapetus · Clear" },
  { id: "Umbriel", label: "Umbriel · Easy-going" },
  { id: "Algieba", label: "Algieba · Smooth" },
  { id: "Despina", label: "Despina · Smooth" },
  { id: "Erinome", label: "Erinome · Clear" },
  { id: "Algenib", label: "Algenib · Gravelly" },
  { id: "Rasalgethi", label: "Rasalgethi · Informative" },
  { id: "Laomedeia", label: "Laomedeia · Upbeat" },
  { id: "Achernar", label: "Achernar · Soft" },
  { id: "Alnilam", label: "Alnilam · Firm" },
  { id: "Schedar", label: "Schedar · Even" },
  { id: "Gacrux", label: "Gacrux · Mature" },
  { id: "Pulcherrima", label: "Pulcherrima · Forward" },
  { id: "Achird", label: "Achird · Friendly" },
  { id: "Zubenelgenubi", label: "Zubenelgenubi · Casual" },
  { id: "Vindemiatrix", label: "Vindemiatrix · Gentle" },
  { id: "Sadachbia", label: "Sadachbia · Lively" },
  { id: "Sadaltager", label: "Sadaltager · Knowledgeable" },
  { id: "Sulafat", label: "Sulafat · Warm" },
];

export const TOGETHER_TTS_VOICES: TtsVoiceOption[] = [
  { id: "af_heart", label: "af_heart" },
  { id: "af_alloy", label: "af_alloy" },
  { id: "af_aoede", label: "af_aoede" },
  { id: "af_bella", label: "af_bella" },
  { id: "af_jessica", label: "af_jessica" },
  { id: "af_kore", label: "af_kore" },
  { id: "af_nicole", label: "af_nicole" },
  { id: "af_nova", label: "af_nova" },
  { id: "af_river", label: "af_river" },
  { id: "af_sarah", label: "af_sarah" },
  { id: "af_sky", label: "af_sky" },
  { id: "am_adam", label: "am_adam" },
  { id: "am_echo", label: "am_echo" },
  { id: "am_eric", label: "am_eric" },
  { id: "am_fenrir", label: "am_fenrir" },
  { id: "am_liam", label: "am_liam" },
];

export const XAI_TTS_VOICES: TtsVoiceOption[] = [
  { id: "eve", label: "Eve · Energetic" },
  { id: "ara", label: "Ara · Warm" },
  { id: "rex", label: "Rex · Confident" },
  { id: "sal", label: "Sal · Balanced" },
  { id: "leo", label: "Leo · Authoritative" },
];

export const PROVIDER_TTS_VOICE_OPTIONS: Partial<Record<Provider, TtsVoiceOption[]>> = {
  openai: OPENAI_TTS_VOICES,
  gemini: GEMINI_TTS_VOICES,
  together: TOGETHER_TTS_VOICES,
  xai: XAI_TTS_VOICES,
};

export const PROVIDER_DEFAULT_TTS_VOICES: Partial<Record<Provider, string>> = {
  openai: "alloy",
  gemini: "Kore",
  together: "af_alloy",
  xai: "ara",
};

const PROVIDER_TTS_MODEL_SPECS: Partial<Record<Provider, RuntimeSpeechModelSpec[]>> = {
  openai: [
    speechModel("gpt-4o-mini-tts", "GPT-4o Mini TTS", true),
    speechModel("tts-1", "tts-1"),
    speechModel("tts-1-hd", "tts-1-hd"),
  ],
  gemini: [
    speechModel(
      "gemini-2.5-flash-preview-tts",
      "Gemini 2.5 Flash Preview TTS",
      true,
    ),
    speechModel(
      "gemini-2.5-pro-preview-tts",
      "Gemini 2.5 Pro Preview TTS",
    ),
  ],
  together: [speechModel("hexgrad/Kokoro-82M", "Kokoro 82M", true)],
  xai: [speechModel("grok-tts-mini", "Grok TTS Mini", true)],
};

export const PROVIDER_TTS_MODEL_OPTIONS: Partial<Record<Provider, ModelInfo[]>> =
  Object.fromEntries(
    Object.entries(PROVIDER_TTS_MODEL_SPECS).map(([provider, specs]) => [
      provider,
      buildRuntimeSpeechModelOptions(provider as Provider, "tts", specs),
    ]),
  ) as Partial<Record<Provider, ModelInfo[]>>;

export const PROVIDER_DEFAULT_TTS_MODELS = buildRuntimeSpeechDefaults(
  PROVIDER_TTS_MODEL_SPECS,
);

function localizeVoiceOptions(
  options: TtsVoiceOption[],
  labels: Partial<Record<string, string>>,
) {
  return options.map((option) => ({
    ...option,
    label: labels[option.id] ?? option.label,
  }));
}

export function getProviderTtsVoiceOptions(
  provider: Provider,
  language: AppLanguage,
) {
  if (language === "en") {
    return PROVIDER_TTS_VOICE_OPTIONS[provider] ?? [];
  }

  switch (provider) {
    case "gemini":
      return localizeVoiceOptions(GEMINI_TTS_VOICES, {
        Zephyr: "Zephyr · Klar",
        Puck: "Puck · Schwungvoll",
        Charon: "Charon · Informativ",
        Kore: "Kore · Bestimmt",
        Fenrir: "Fenrir · Temperamentvoll",
        Leda: "Leda · Jugendlich",
        Orus: "Orus · Bestimmt",
        Aoede: "Aoede · Leicht",
        Callirrhoe: "Callirrhoe · Gelassen",
        Autonoe: "Autonoe · Klar",
        Enceladus: "Enceladus · Hauchig",
        Iapetus: "Iapetus · Klar",
        Umbriel: "Umbriel · Gelassen",
        Algieba: "Algieba · Sanft",
        Despina: "Despina · Sanft",
        Erinome: "Erinome · Klar",
        Algenib: "Algenib · Rau",
        Rasalgethi: "Rasalgethi · Informativ",
        Laomedeia: "Laomedeia · Schwungvoll",
        Achernar: "Achernar · Weich",
        Alnilam: "Alnilam · Bestimmt",
        Schedar: "Schedar · Gleichmaessig",
        Gacrux: "Gacrux · Reif",
        Pulcherrima: "Pulcherrima · Direkt",
        Achird: "Achird · Freundlich",
        Zubenelgenubi: "Zubenelgenubi · Locker",
        Vindemiatrix: "Vindemiatrix · Sanft",
        Sadachbia: "Sadachbia · Lebhaft",
        Sadaltager: "Sadaltager · Kenntnisreich",
        Sulafat: "Sulafat · Warm",
      });
    case "xai":
      return localizeVoiceOptions(XAI_TTS_VOICES, {
        eve: "Eve · Energetisch",
        ara: "Ara · Warm",
        rex: "Rex · Souveraen",
        sal: "Sal · Ausgewogen",
        leo: "Leo · Autoritaer",
      });
    default:
      return PROVIDER_TTS_VOICE_OPTIONS[provider] ?? [];
  }
}

export function getProviderTtsModelOptions(provider: Provider) {
  return PROVIDER_TTS_MODEL_OPTIONS[provider] ?? [];
}

export function getTtsModelLabel(provider: Provider, modelId: string) {
  const option = getProviderTtsModelOptions(provider).find(
    (model) => model.id === modelId,
  );
  return option?.name ?? modelId;
}

export function getTtsVoiceLabel(
  provider: Provider,
  voiceId: string,
  language: AppLanguage = "en",
) {
  const option = getProviderTtsVoiceOptions(provider, language).find(
    (voice) => voice.id === voiceId,
  );
  return option?.label ?? voiceId;
}
