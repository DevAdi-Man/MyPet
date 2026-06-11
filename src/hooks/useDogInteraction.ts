import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { PanResponder } from "react-native";

export const useDogInteraction = (playBark: () => void) => {
  const [isDraggingDog, setIsDraggingDog] = useState(false);

  const starAnimationRef = useRef<LottieView>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsDraggingDog(true);

        playBark();

        starAnimationRef.current?.play(0);
      },

      onPanResponderRelease: () => {
        setIsDraggingDog(false);
      },

      onPanResponderTerminate: () => {
        setIsDraggingDog(false);
      },
    }),
  ).current;
  return {
    panResponder,
    starAnimationRef,
    isDraggingDog,
  };
};
