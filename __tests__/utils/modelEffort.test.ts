import {
  getDefaultModelEffort,
  getModelEffortOptions,
  getModelEffortTransportValue,
  normalizeResponseModeRouteEffort,
} from "../../src/utils/modelEffort";

describe("model effort metadata", () => {
  it("uses provider-documented defaults before the generic medium fallback", () => {
    expect(getDefaultModelEffort("gemini", "gemini-3.5-flash")).toBe("medium");
    expect(getDefaultModelEffort("gemini", "gemini-3.1-pro-preview")).toBe(
      "high",
    );
    expect(getDefaultModelEffort("gemini", "gemini-3.1-flash-lite")).toBe(
      "minimal",
    );
  });

  it("exposes the documented Gemini thinking levels per model", () => {
    expect(
      getModelEffortOptions("gemini", "gemini-3.5-flash").map(
        (option) => option.id,
      ),
    ).toEqual(["minimal", "low", "medium", "high"]);

    expect(
      getModelEffortOptions("gemini", "gemini-3.1-pro-preview").map(
        (option) => option.id,
      ),
    ).toEqual(["low", "medium", "high"]);
  });

  it("normalizes response routes to supported effort values", () => {
    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-3.1-pro-preview",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-3.1-pro-preview",
      effort: "high",
    });

    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-3.5-flash",
        effort: "not-real",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-3.5-flash",
      effort: "medium",
    });

    expect(
      normalizeResponseModeRouteEffort({
        provider: "gemini",
        model: "gemini-2.5-flash",
        effort: "high",
      }),
    ).toEqual({
      provider: "gemini",
      model: "gemini-2.5-flash",
    });
  });

  it("maps stored effort ids to provider transport values", () => {
    expect(
      getModelEffortTransportValue("gemini", "gemini-3.5-flash", "high"),
    ).toBe("HIGH");
  });
});
