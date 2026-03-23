import { getProviderSttLimitNote } from "../../../src/constants/providers/languageNotes";

describe("provider language notes", () => {
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
