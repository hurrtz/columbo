import {
  formatQwenApiCredential,
  parseQwenApiCredential,
  qwenRegionSupportsAppSpeech,
  resolveQwenApiEndpoint,
} from "../../src/utils/qwenRegion";
import { hasProviderCredentialForCapability } from "../../src/utils/providerCredentials";

describe("Qwen regional credentials", () => {
  it("defaults plain credentials to Singapore", () => {
    expect(parseQwenApiCredential(" sk-test ")).toEqual({
      apiKey: "sk-test",
      region: "singapore",
    });
    expect(formatQwenApiCredential("sk-test", "singapore")).toBe("sk-test");
  });

  it("stores non-default regions alongside the secure credential", () => {
    expect(formatQwenApiCredential("sk-test", "us")).toBe("sk-test|us");
    expect(parseQwenApiCredential("sk-test|beijing")).toEqual({
      apiKey: "sk-test",
      region: "beijing",
    });
  });

  it("routes requests to the selected DashScope host", () => {
    const endpoint =
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

    expect(resolveQwenApiEndpoint(endpoint, "sk-test|us")).toBe(
      "https://dashscope-us.aliyuncs.com/compatible-mode/v1/chat/completions",
    );
    expect(resolveQwenApiEndpoint(endpoint, "sk-test|beijing")).toBe(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    );
  });

  it("limits the app's current speech transports to supported regions", () => {
    expect(qwenRegionSupportsAppSpeech("singapore")).toBe(true);
    expect(qwenRegionSupportsAppSpeech("beijing")).toBe(true);
    expect(qwenRegionSupportsAppSpeech("us")).toBe(false);
    expect(
      hasProviderCredentialForCapability(
        "alibaba-qwen-dashscope",
        "sk-test|us",
        "llm",
      ),
    ).toBe(true);
    expect(
      hasProviderCredentialForCapability(
        "alibaba-qwen-dashscope",
        "sk-test|us",
        "stt",
      ),
    ).toBe(false);
    expect(
      hasProviderCredentialForCapability(
        "alibaba-qwen-dashscope",
        "sk-test|us",
        "tts",
      ),
    ).toBe(false);
  });
});
