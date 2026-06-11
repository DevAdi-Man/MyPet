import React, { useRef } from "react";
import {
  Animated,
  Image,
  PanResponder,
  ImageSourcePropType,
} from "react-native";

interface Props {
  source: ImageSourcePropType;
  startX: number;
  startY: number;
  onFeed?: () => void;
}

export const DraggableFood = ({
  source,
  startX,
  startY,
  onFeed,
}: Props) => {
  const pan = useRef(
    new Animated.ValueXY({
      x: startX,
      y: startY,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (_, gesture) => {
        const foodCenterX = startX + gesture.dx;
        const foodCenterY = startY + gesture.dy;

        const mouthX = 180;
        const mouthY = 250;

        const distance = Math.sqrt(
          Math.pow(foodCenterX - mouthX, 2) +
            Math.pow(foodCenterY - mouthY, 2)
        );

        if (distance < 80) {
          onFeed?.();
        } else {
          Animated.spring(pan, {
            toValue: { x: startX, y: startY },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        transform: pan.getTranslateTransform(),
      }}
    >
      <Image
        source={source}
        style={{
          width: 70,
          height: 70,
        }}
      />
    </Animated.View>
  );
};