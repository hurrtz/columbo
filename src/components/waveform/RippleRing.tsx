import { useEffect } from "react";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../WaveformCircle.styles";

const RIPPLE_DURATION_MS = 2000;

export function RippleRing({
  delay,
  color,
  isActive,
  intensity,
  scale = 1,
}: {
  delay: number;
  color: string;
  isActive: boolean;
  intensity: number;
  scale?: number;
}) {
  const isActiveSV = useSharedValue(isActive);
  const intensitySV = useSharedValue(intensity);
  const progress = useSharedValue(0);

  useEffect(() => {
    isActiveSV.value = isActive;
  }, [isActive, isActiveSV]);

  useEffect(() => {
    intensitySV.value = intensity;
  }, [intensity, intensitySV]);

  useEffect(() => {
    if (!isActive) {
      cancelAnimation(progress);
      progress.value = 0;
      return;
    }

    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: RIPPLE_DURATION_MS,
          easing: Easing.out(Easing.ease),
        }),
        -1,
        false,
      ),
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [isActive, delay, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!isActiveSV.value) {
      return { opacity: 0, transform: [{ scale: 0.8 }] };
    }

    const peakOpacity = 0.1 + intensitySV.value * 0.25;

    return {
      opacity: interpolate(progress.value, [0, 1], [peakOpacity, 0]),
      transform: [
        { scale: interpolate(progress.value, [0, 1], [0.7, 1.4]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.rippleRing,
        {
          width: 190 * scale,
          height: 190 * scale,
          borderRadius: 95 * scale,
          borderWidth: 1.5 * scale,
          borderColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}
