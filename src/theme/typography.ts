import { Platform } from "react-native";

export const fonts = {
  display: Platform.select({
    ios: "System",
    android: "sans-serif-medium",
    default: undefined,
  }),
  displayHeavy: Platform.select({
    ios: "System",
    android: "sans-serif-medium",
    default: undefined,
  }),
  body: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: undefined,
  }),
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
};
