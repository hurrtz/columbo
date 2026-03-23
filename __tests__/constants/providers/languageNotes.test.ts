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
    ).toBe("Supports 98 languages.");
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
    ).toBe("Multilingual. Voices are optimized for English.");
  });

  it("falls back to the curated provider TTS note when the selected model is not in the workbook catalog", () => {
    expect(
      getProviderTtsLanguageNoteForModel(
        "xai",
        "grok-tts-mini",
        "en",
      ),
    ).toContain("Arabic");
  });

  it("builds an exact STT upload limit note from catalog constraints", () => {
    expect(
      getProviderSttLimitNote("openai", "gpt-4o-mini-transcribe", "en"),
    ).toBe("File upload up to 25 MB.");
  });

  it("builds an approximate tier-aware STT upload limit note when only rough limits exist", () => {
    expect(
      getProviderSttLimitNote("groq", "whisper-large-v3-turbo", "en"),
    ).toBe("Approximate file upload limit 25 MB to 100 MB depending on tier.");
  });
});
