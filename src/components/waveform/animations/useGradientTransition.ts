import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function clearPreviousGradient(
  token: number,
  gradientTransitionTokenRef: React.MutableRefObject<number>,
  setPreviousGradientColors: React.Dispatch<
    React.SetStateAction<[string, string, string] | null>
  >,
) {
  if (gradientTransitionTokenRef.current !== token) {
    return;
  }

  setPreviousGradientColors(null);
}

export function useGradientTransition(gradientColors: [string, string, string]) {
  const [previousGradientColors, setPreviousGradientColors] = useState<
    [string, string, string] | null
  >(null);
  const previousGradientKeyRef = useRef<string | null>(null);
  const previousGradientColorsRef = useRef<[string, string, string] | null>(
    null,
  );
  const gradientTransitionTokenRef = useRef(0);
  const backgroundGradientFade = useSharedValue(0);
  const gradientColorKey = gradientColors.join("|");

  useEffect(() => {
    if (!previousGradientKeyRef.current || !previousGradientColorsRef.current) {
      previousGradientKeyRef.current = gradientColorKey;
      previousGradientColorsRef.current = gradientColors;
      return;
    }

    if (previousGradientKeyRef.current === gradientColorKey) {
      return;
    }

    const outgoingColors = previousGradientColorsRef.current;
    previousGradientKeyRef.current = gradientColorKey;
    previousGradientColorsRef.current = gradientColors;

    if (!outgoingColors) {
      return;
    }

    gradientTransitionTokenRef.current += 1;
    const token = gradientTransitionTokenRef.current;
    setPreviousGradientColors(outgoingColors);
    backgroundGradientFade.value = 1;
    backgroundGradientFade.value = withTiming(
      0,
      {
        duration: 420,
        easing: Easing.inOut(Easing.ease),
      },
      (finished) => {
        if (finished) {
          runOnJS(clearPreviousGradient)(
            token,
            gradientTransitionTokenRef,
            setPreviousGradientColors,
          );
        }
      },
    );
  }, [
    backgroundGradientFade,
    gradientColorKey,
    gradientColors,
    previousGradientColorsRef,
    previousGradientKeyRef,
  ]);

  return {
    backgroundGradientFade,
    previousGradientColors,
  };
}
