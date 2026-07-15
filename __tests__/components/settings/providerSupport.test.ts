import { DEFAULT_SETTINGS } from "../../../src/types";
import {
  getConfiguredProvidersForCapability,
  getProviderHealthState,
  getProviderValidationTarget,
} from "../../../src/components/settings/providerSupport";

describe("getProviderValidationTarget", () => {
  it("prefers llm validation for xAI once a key unlocks chat plus voice", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        xai: "xai-test",
      },
    };

    expect(getProviderValidationTarget(settings, "xai")).toEqual({
      kind: "llm",
      model: expect.any(String),
      configKey: undefined,
    });
  });

  it("uses llm validation for providers with configured chat credentials", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providerModels: {
        ...DEFAULT_SETTINGS.providerModels,
        gemini: "gemini-2.5-flash",
      },
      apiKeys: {
        ...DEFAULT_SETTINGS.apiKeys,
        gemini: "not-a-google-key",
      },
    };

    expect(getProviderValidationTarget(settings, "gemini")).toEqual({
      kind: "llm",
      model: "gemini-2.5-flash",
    });
  });
});

describe("getProviderHealthState", () => {
  const settings = {
    ...DEFAULT_SETTINGS,
    apiKeys: {
      ...DEFAULT_SETTINGS.apiKeys,
      openai: "stored-openai-key",
    },
  };

  it("treats an untested stored key as configured but not healthy", () => {
    expect(
      getProviderHealthState({
        provider: "openai",
        settings,
        validationStateByProvider: {},
      }),
    ).toBe("configured");
  });

  it("restores a persisted validation failure independently of model changes", () => {
    const validationStateByProvider = {
      openai: {
        status: "error" as const,
        message: "Rejected credentials",
        model: "previous-model",
      },
    };

    expect(
      getProviderHealthState({
        provider: "openai",
        settings,
        validationStateByProvider,
      }),
    ).toBe("failing");
    expect(
      getConfiguredProvidersForCapability({
        capability: "llm",
        settings,
        validationStateByProvider,
      }),
    ).not.toContain("openai");
  });

  it("restores a successful validation only for the tested configuration", () => {
    const target = getProviderValidationTarget(settings, "openai");

    expect(
      getProviderHealthState({
        provider: "openai",
        settings,
        validationStateByProvider: {
          openai: {
            status: "success",
            model: target.model,
            configKey: target.configKey,
          },
        },
      }),
    ).toBe("healthy");

    expect(
      getProviderHealthState({
        provider: "openai",
        settings,
        validationStateByProvider: {
          openai: {
            status: "success",
            model: "different-model",
          },
        },
      }),
    ).toBe("configured");
  });
});
