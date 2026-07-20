import { setBackgroundVoiceTurnActive } from "../../src/services/backgroundVoiceTurn";

describe("backgroundVoiceTurn", () => {
  it("arms and ends native background grace for an active voice turn", () => {
    const nativeModule = {
      setTurnActive: jest.fn(),
    };
    const dependencies = { nativeModule, platform: "ios" };

    expect(setBackgroundVoiceTurnActive(true, dependencies)).toBe(true);
    expect(setBackgroundVoiceTurnActive(false, dependencies)).toBe(true);

    expect(nativeModule.setTurnActive).toHaveBeenNthCalledWith(1, true);
    expect(nativeModule.setTurnActive).toHaveBeenNthCalledWith(2, false);
  });
});
