import React from "react";
import {
  Platform,
  View,
  requireNativeComponent,
  type ColorValue,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";

type NativeWaveformViewProps = ViewProps & {
  channel?: "input" | "output";
  active?: boolean;
  lineColor?: ColorValue;
  baselineColor?: ColorValue;
  lineWidth?: number;
  renderStyle?: "automatic" | "waveform" | "envelope";
  style?: StyleProp<ViewStyle>;
};

const NativeWaveformComponent =
  Platform.OS === "ios" || Platform.OS === "android"
    ? requireNativeComponent<NativeWaveformViewProps>(
        "ColumboNativeWaveformView"
      )
    : null;

export function NativeWaveformView(props: NativeWaveformViewProps) {
  if (
    (Platform.OS !== "ios" && Platform.OS !== "android") ||
    !NativeWaveformComponent
  ) {
    return <View pointerEvents="none" style={props.style} />;
  }

  return <NativeWaveformComponent {...props} pointerEvents="none" />;
}
