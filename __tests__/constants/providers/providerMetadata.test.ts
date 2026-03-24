import { getProviderModelName, PROVIDER_MODELS } from "../../../src/constants/models";

describe("provider metadata constants", () => {
  it("uses catalog-backed labels for runtime model pickers when the catalog knows the model", () => {
    expect(getProviderModelName("cohere", "command-a-03-2025")).toBe(
      "Command A",
    );
    expect(getProviderModelName("cohere", "command-r-plus-08-2024")).toBe(
      "Command R+",
    );
  });

  it("keeps the configured label when the catalog does not expose that exact runtime model id", () => {
    expect(getProviderModelName("together", "openai/gpt-oss-20b")).toBe(
      "GPT-OSS 20B",
    );
    expect(
      PROVIDER_MODELS.xai.find((model) => model.id === "grok-4")?.name,
    ).toBe("Grok 4");
  });

  it("uses direct catalog labels for known models even outside the curated picker list", () => {
    expect(getProviderModelName("xai", "grok-4.20")).toBe("Grok 4.20");
  });
});
