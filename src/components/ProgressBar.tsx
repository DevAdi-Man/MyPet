import { Canvas, Rect, Group, RoundedRect, interpolateColors } from "@shopify/react-native-skia";
import { useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

const TRACK_W = 220;
const TRACK_H = 16;
const PADDING = 16;
const RADIUS = 8;

export const ProgressBar = ({
  value,
}: {
  value: number; // 0–100
}) => {
  const progress = useSharedValue(value / 100);

  const fillWidth = useDerivedValue(() => {
    return progress.value * TRACK_W;
  });

  // Tight transition: red → brief amber crossover → green
  const fillColor = useDerivedValue(() => {
    return interpolateColors(
      progress.value,
      [0,         0.25,      0.5,       0.75,      1],
      ["#C0392B", "#C0392B", "#E67E22", "#27AE60", "#27AE60"]
    );
  });

  useEffect(() => {
    progress.value = withTiming(value / 100, { duration: 600 });
  }, [value]);

  const canvasW = TRACK_W + PADDING * 2;
  const canvasH = TRACK_H + PADDING * 2;
  const trackY = PADDING;

  return (
    <Canvas style={{ width: canvasW, height: canvasH }}>

      {/* Outer dark border — gives depth */}
      <RoundedRect
        x={PADDING - 2}
        y={trackY - 2}
        width={TRACK_W + 4}
        height={TRACK_H + 4}
        r={RADIUS + 2}
        color="#0A0A0A"
      />

      {/* Track — dark sunken base */}
      <RoundedRect
        x={PADDING}
        y={trackY}
        width={TRACK_W}
        height={TRACK_H}
        r={RADIUS}
        color="#1A1A1A"
      />

      <Group
        clip={{
          x: PADDING,
          y: trackY,
          width: TRACK_W,
          height: TRACK_H,
        }}
      >
        <RoundedRect
          x={PADDING}
          y={trackY}
          width={fillWidth}
          height={TRACK_H}
          r={RADIUS}
          color={fillColor}
        />
      </Group>

      <RoundedRect
        x={PADDING}
        y={trackY}
        width={TRACK_W}
        height={3}
        r={RADIUS}
        color="rgba(255,255,255,0.07)"
      />

    </Canvas>
  );
};