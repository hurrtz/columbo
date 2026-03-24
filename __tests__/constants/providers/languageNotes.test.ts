import {
  getProviderSttLanguageNoteForModel,
  getProviderSttLimitNote,
  getProviderTtsLanguageNoteForModel,
} from "../../../src/constants/providers/languageNotes";

describe("provider language notes", () => {
  it("derives an STT language note from exact catalog model metadata", () => {
    expect(
      getProviderSttLanguageNoteForModel(
        "openai",
        "gpt-4o-mini-transcribe",
        "en",
      ),
    ).toBe("Supports 57 languages.");
  });

  it("resolves catalog aliases before building STT language notes", () => {
    expect(
      getProviderSttLanguageNoteForModel("mistral", "voxtral-mini-latest", "en"),
    ).toBe("Supports 13 languages.");
  });

  it("falls back to the curated provider STT note when catalog language data is too generic", () => {
    expect(
      getProviderSttLanguageNoteForModel(
        "groq",
        "whisper-large-v3-turbo",
        "en",
      ),
    ).toContain("Whisper family");
  });

  it("derives a TTS language note from exact catalog model metadata", () => {
    expect(
      getProviderTtsLanguageNoteForModel("openai", "gpt-4o-mini-tts", "en"),
    ).toBe("13 voices across 57 languages. Voices are optimized for English.");
  });

  it("derives a TTS language note from the canonical xAI catalog model", () => {
    expect(
      getProviderTtsLanguageNoteForModel(
        "xai",
        "text-to-speech",
        "en",
      ),
    ).toBe("5 voices across 20 languages.");
  });

  it("builds an exact STT upload limit note from catalog constraints", () => {
    expect(
      getProviderSttLimitNote("openai", "gpt-4o-mini-transcribe", "en"),
    ).toBe("File upload up to 25 MB.");
  });

  it("builds an approximate tier-aware STT upload limit note when only rough limits exist", () => {
    expect(
      getProviderSttLimitNote("groq", "whisper-large-v3-turbo", "en"),
    ).toBe("File upload up to 100 MiB.");
  });
});
