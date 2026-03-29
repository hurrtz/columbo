import {
  createBytedanceRequestId,
  parseBytedanceArkCredentials,
  parseBytedanceSpeechCredentials,
} from "../../src/services/bytedance";

describe("ByteDance credential helpers", () => {
  it("parses Ark-only credentials", () => {
    expect(parseBytedanceArkCredentials("ark-test-key")).toEqual({
      apiKey: "ark-test-key",
    });
    expect(parseBytedanceSpeechCredentials("ark-test-key")).toBeNull();
  });

  it("parses speech-only credentials with the default resource id", () => {
    expect(
      parseBytedanceSpeechCredentials("speech-app-key|speech-access-key"),
    ).toEqual({
      appKey: "speech-app-key",
      accessKey: "speech-access-key",
      resourceId: "volc.bigasr.auc_turbo",
    });
  });

  it("parses combined Ark and speech credentials", () => {
    expect(
      parseBytedanceArkCredentials(
        "ark-test-key|speech-app-key|speech-access-key|volc.bigasr.auc_turbo",
      ),
    ).toEqual({
      apiKey: "ark-test-key",
    });
    expect(
      parseBytedanceSpeechCredentials(
        "ark-test-key|speech-app-key|speech-access-key|volc.bigasr.auc_turbo",
      ),
    ).toEqual({
      appKey: "speech-app-key",
      accessKey: "speech-access-key",
      resourceId: "volc.bigasr.auc_turbo",
    });
  });

  it("generates request ids with the SchnackAI prefix", () => {
    expect(createBytedanceRequestId()).toMatch(/^schnackai-\d+-[a-z0-9]+$/);
  });
});
