import { formatLatencyCountdown } from "../../src/utils/latencyDisplay";

describe("formatLatencyCountdown", () => {
  it("counts down using whole seconds", () => {
    expect(formatLatencyCountdown(18_400, 120_000)).toEqual({
      overtime: false,
      text: "1:42",
    });
  });

  it("shows zero at the estimate", () => {
    expect(formatLatencyCountdown(120_000, 120_000)).toEqual({
      overtime: false,
      text: "0:00",
    });
  });

  it("counts upward after the estimate is exceeded", () => {
    expect(formatLatencyCountdown(132_250, 120_000)).toEqual({
      overtime: true,
      text: "+0:13",
    });
  });
});
