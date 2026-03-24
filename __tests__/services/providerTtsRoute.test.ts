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
});
