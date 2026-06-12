import { Canvas, Rect, Group } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

const TRACK_W = 300,
  TRACK_H = 20,
  PADDING = 16;
const progress = 0.7;

export const ProgressBar = ({
  targetProgress = 0.7,
}: {
  targetProgress: number;
}) => {
  return (
    <Canvas style={{ width: TRACK_W + PADDING * 2, height: 60 }}>
      <Group
        clip={{
          x: PADDING,
          y: 0,
          width: TRACK_W + PADDING * 2,
          height: TRACK_H,
        }}
      >
        <Rect
          x={PADDING}
          y={20}
          width={TRACK_W}
          height={TRACK_H}
          color="#D3D1C7"
        />
        <Rect
          x={PADDING}
          y={20}
          width={TRACK_W * progress}
          height={TRACK_H}
          color="#1D9E75"
        />
      </Group>
    </Canvas>
  );
};
