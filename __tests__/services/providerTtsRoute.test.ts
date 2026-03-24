import { synthesizeProviderSpeech } from "../../src/services/tts/providerRoute";

global.fetch = jest.fn();

jest.mock("expo-file-system/legacy", () => ({
  cacheDirectory: "/tmp/",
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
}));

class MockFileReader {
  public result: string | ArrayBuffer | null = null;
  public onloadend: (() => void) | null = null;
  public onerror: (() => void) | null = null;

  readAsDataURL() {
    this.result = "data:audio/wav;base64,ZmFrZQ==";
    this.onloadend?.();
  }
}

Object.defineProperty(global, "FileReader", {
  value: MockFileReader,
  writable: true,
});

describe("synthesizeProviderSpeech", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses DashScope TTS and downloads the generated wav file", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            output: {
              audio: {
                url: "https://dashscope.example/audio.wav",
              },
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(new Blob(["fake-audio"])),
      });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "alibaba-qwen-dashscope",
      apiKey: "dashscope-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.wav$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
    );
    const body = JSON.parse(options.body);
    expect(body.model).toBe("qwen3-tts-flash");
    expect(body.input.voice).toBe("Cherry");
    expect(body.input.text).toBe("Hello world");
    expect((fetch as jest.Mock).mock.calls[1][0]).toBe(
      "https://dashscope.example/audio.wav",
    );
  });

  it("uses Deepgram native speak and sends the selected voice model", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "aura-2-thalia-en",
      provider: "deepgram",
      apiKey: "deepgram-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en",
    );
    expect(options.headers.Authorization).toBe("Token deepgram-test");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
    });
  });

  it("uses ElevenLabs TTS with the selected voice id and model id", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "JBFqnCBsd6RMkjVDRZzb",
      provider: "elevenlabs",
      apiKey: "elevenlabs-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb",
    );
    expect(options.headers["xi-api-key"]).toBe("elevenlabs-test");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
      model_id: "eleven_flash_v2_5",
      output_format: "mp3_44100_128",
    });
  });
});
