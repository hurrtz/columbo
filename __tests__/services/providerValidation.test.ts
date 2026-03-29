import * as FileSystem from "expo-file-system/legacy";

import { validateTtsProviderConnection } from "../../src/services/providerValidation";
import { synthesizeProviderSpeech } from "../../src/services/tts/providerRoute";

jest.mock("../../src/services/tts/providerRoute", () => ({
  synthesizeProviderSpeech: jest.fn(),
}));

jest.mock("expo-file-system/legacy", () => ({
  deleteAsync: jest.fn(() => Promise.resolve()),
}));

describe("validateTtsProviderConnection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("synthesizes a short validation sample and deletes the temp audio file", async () => {
    (synthesizeProviderSpeech as jest.Mock).mockResolvedValue("/tmp/tts-ok.mp3");

    await validateTtsProviderConnection({
      provider: "microsoft-azure",
      apiKey: "azure-speech-key|westeurope",
      language: "en",
      model: "azure-ai-speech-neural",
      voice: "en-US-JennyNeural",
    });

    expect(synthesizeProviderSpeech).toHaveBeenCalledWith({
      text: "OK",
      voice: "en-US-JennyNeural",
      provider: "microsoft-azure",
      providerModel: "azure-ai-speech-neural",
      apiKey: "azure-speech-key|westeurope",
      language: "en",
      abortSignal: undefined,
    });
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith("/tmp/tts-ok.mp3", {
      idempotent: true,
    });
  });
});
