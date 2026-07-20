import { NativeModules, Platform } from "react-native";

type BackgroundVoiceTurnModule = {
  setTurnActive(active: boolean): void;
};

const nativeModule = NativeModules.ColumboBackgroundVoiceTurn as
  | BackgroundVoiceTurnModule
  | undefined;

export function setBackgroundVoiceTurnActive(
  active: boolean,
  dependencies: {
    nativeModule?: BackgroundVoiceTurnModule;
    platform?: string;
  } = {},
) {
  const resolvedModule = dependencies.nativeModule ?? nativeModule;
  const resolvedPlatform = dependencies.platform ?? Platform.OS;

  if (
    resolvedPlatform !== "ios" ||
    !resolvedModule ||
    typeof resolvedModule.setTurnActive !== "function"
  ) {
    return false;
  }

  resolvedModule.setTurnActive(active);
  return true;
}
