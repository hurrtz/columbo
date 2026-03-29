import {
  buildAzureOpenAiRealtimeEndpoint,
  normalizeAzureOpenAiEndpoint,
  parseAzureOpenAiCredentials,
  parseAzureProviderCredentials,
  parseAzureSpeechCredentials,
} from "../../src/services/azure";

describe("Azure credential helpers", () => {
  it("normalizes Azure OpenAI base endpoints to the /openai/v1 root", () => {
    expect(
      normalizeAzureOpenAiEndpoint(
        "https://example-resource.openai.azure.com/openai/v1/chat/completions",
      ),
    ).toBe("https://example-resource.openai.azure.com/openai/v1");
  });

  it("parses Azure OpenAI-only credentials", () => {
    expect(
      parseAzureOpenAiCredentials(
        "https://example-resource.openai.azure.com|azure-openai-key",
      ),
    ).toEqual({
      endpoint: "https://example-resource.openai.azure.com/openai/v1",
      apiKey: "azure-openai-key",
    });
    expect(
      parseAzureSpeechCredentials(
        "https://example-resource.openai.azure.com|azure-openai-key",
      ),
    ).toBeNull();
  });

  it("parses Azure Speech-only credentials", () => {
    expect(parseAzureSpeechCredentials("azure-speech-key|westeurope")).toEqual({
      subscriptionKey: "azure-speech-key",
      region: "westeurope",
    });
    expect(
      parseAzureOpenAiCredentials("azure-speech-key|westeurope"),
    ).toBeNull();
  });

  it("parses combined Azure OpenAI and Azure Speech credentials", () => {
    expect(
      parseAzureProviderCredentials(
        "https://example-resource.openai.azure.com|azure-openai-key|azure-speech-key|westeurope",
      ),
    ).toEqual({
      openAi: {
        endpoint: "https://example-resource.openai.azure.com/openai/v1",
        apiKey: "azure-openai-key",
      },
      speech: {
        subscriptionKey: "azure-speech-key",
        region: "westeurope",
      },
    });
  });

  it("builds the Azure OpenAI realtime websocket endpoint from the normalized base", () => {
    expect(
      buildAzureOpenAiRealtimeEndpoint(
        "https://example-resource.openai.azure.com/openai/v1/chat/completions",
        "gpt-realtime-1.5",
      ),
    ).toBe(
      "wss://example-resource.openai.azure.com/openai/v1/realtime?model=gpt-realtime-1.5",
    );
  });
});
