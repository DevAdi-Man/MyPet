import React, { useEffect } from "react";
import { Canvas, Path, Paint, Group } from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface SkiaHeartProps {
  x: number;
  y: number;
  size: number;
  color?: string;
}

const AnimatedView = Animated.createAnimatedComponent(React.Fragment);

export const SkiaHeart = ({
  x,
  y,
  size,
  color = "#fa3375",
}: SkiaHeartProps) => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });

    translateY.value = withTiming(-150, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });

    scale.value = withTiming(0.8, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // SVG heart path - normalized to 100x100
  const heartPath =
    "M50,95 C25,80 5,65 5,45 C5,25 20,10 32.5,10 C40,10 47.5,15 50,22 C52.5,15 60,10 67.5,10 C80,10 95,25 95,45 C95,65 75,80 50,95 Z";

  const scaleFactor = size / 100;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          left: x - size / 2,
          top: y - size / 2,
        },
      ]}
    >
      <Canvas style={{ width: size, height: size }}>
        <Group
          transform={[
            { scale: scaleFactor },
          ]}
        >
          <Path
            path={heartPath}
            color={color}
            style="fill"
          />
        </Group>
      </Canvas>
    </Animated.View>
  );
};
