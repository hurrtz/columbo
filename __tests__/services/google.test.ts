import {
  buildGoogleCloudSpeechRecognizeEndpoint,
  parseGoogleAiStudioCredentials,
  parseGoogleCloudSpeechCredentials,
} from "../../src/services/google";

describe("Google credential helpers", () => {
  it("parses AI Studio-only credentials", () => {
    expect(parseGoogleAiStudioCredentials("AIza-test-key")).toEqual({
      apiKey: "AIza-test-key",
    });
    expect(parseGoogleCloudSpeechCredentials("AIza-test-key")).toBeNull();
  });

  it("parses Cloud Speech-only credentials", () => {
    expect(
      parseGoogleCloudSpeechCredentials("my-project|ya29.test-token|EU"),
    ).toEqual({
      projectId: "my-project",
      accessToken: "ya29.test-token",
      location: "eu",
    });
    expect(
      parseGoogleAiStudioCredentials("my-project|ya29.test-token|EU"),
    ).toBeNull();
  });

  it("parses combined AI Studio and Cloud Speech credentials", () => {
    expect(
      parseGoogleAiStudioCredentials(
        "AIza-test-key|my-project|ya29.test-token|us",
      ),
    ).toEqual({
      apiKey: "AIza-test-key",
    });
    expect(
      parseGoogleCloudSpeechCredentials(
        "AIza-test-key|my-project|ya29.test-token|us",
      ),
    ).toEqual({
      projectId: "my-project",
      accessToken: "ya29.test-token",
      location: "us",
    });
  });

  it("builds regional Cloud Speech recognize endpoints", () => {
    expect(
      buildGoogleCloudSpeechRecognizeEndpoint({
        projectId: "my-project",
        location: "eu",
      }),
    ).toBe(
      "https://eu-speech.googleapis.com/v2/projects/my-project/locations/eu/recognizers/_:recognize",
    );
    expect(
      buildGoogleCloudSpeechRecognizeEndpoint({
        projectId: "my-project",
        location: "global",
      }),
    ).toBe(
      "https://speech.googleapis.com/v2/projects/my-project/locations/global/recognizers/_:recognize",
    );
  });
});
