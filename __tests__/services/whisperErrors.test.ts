import {
  createSttRecordingTooLargeError,
  formatByteLimit,
} from "../../src/services/whisper/errors";

describe("formatByteLimit", () => {
  it("formats megabyte-scale limits without trailing zeros", () => {
    expect(formatByteLimit(25_000_000)).toBe("25 MB");
    expect(formatByteLimit(26_500_000)).toBe("26.5 MB");
  });

  it("formats kilobyte- and byte-scale limits", () => {
    expect(formatByteLimit(64_000)).toBe("64 KB");
    expect(formatByteLimit(512)).toBe("512 B");
  });
});

describe("createSttRecordingTooLargeError", () => {
  it("builds a localized, provider-aware message with the formatted limit (en)", () => {
    const error = createSttRecordingTooLargeError({
      provider: "openai",
      model: "GPT-4o mini Transcribe",
      maxBytes: 25_000_000,
      language: "en",
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toMatch(/speech-to-text \(max 25 MB\)/);
    expect(error.message).toContain("App Native");
  });

  it("builds a localized message in German", () => {
    const error = createSttRecordingTooLargeError({
      provider: "openai",
      model: "GPT-4o mini Transcribe",
      maxBytes: 25_000_000,
      language: "de",
    });

    expect(error.message).toContain("25 MB");
    expect(error.message).toContain("App-intern");
  });
});
