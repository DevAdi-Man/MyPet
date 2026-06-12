import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { RoomButton } from "@components/RoomButton";
import { Room } from "src/types/room";
import { Pet } from "@components/Pet";
import { Foods, PLATES } from "src/constants/foods";
import { useCallback, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { useAppDispatch } from "@hooks/reducerHook";
import { useAudioPlayer } from "expo-audio";
import { feedPet } from "@store/slices/petSlice";

const getRandomFoods = () => {
  return [...Foods].sort(() => Math.random() - 0.5).slice(0, 4);
};
const AnimatedImage = Animated.createAnimatedComponent(Image);
const MOUTH = {
  x: 405 + 32,
  y: 0 + 32,
  radius: 60,
};
const FoodItem = ({
  food,
  plateIndex,
  onEat,
}: {
  food: any;
  plateIndex: number;
  onEat: (plateIndex: number) => void;
}) => {
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = transitionX.value;
      startY.value = transitionY.value;
    })
    .onUpdate((e) => {
      transitionX.value = startX.value + e.translationX;
      transitionY.value = startY.value + e.translationY;
    })
    .onFinalize(() => {
      const foodX = PLATES[plateIndex].left + transitionX.value + 35;
      const foodY = PLATES[plateIndex].top + transitionY.value + 35;

      const dx = foodX - MOUTH.x;
      const dy = foodY - MOUTH.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUTH.radius) {
        transitionX.value = withSpring(MOUTH.x - PLATES[plateIndex].left - 35);
        transitionY.value = withSpring(MOUTH.y - PLATES[plateIndex].top - 35);
        scheduleOnRN(onEat, plateIndex);
      } else {
        transitionX.value = withSpring(0);
        transitionY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transitionX.value },
        { translateY: transitionY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedImage
        source={food.source}
        style={[
          styles.food,
          {
            position: "absolute",
            left: PLATES[plateIndex].left,
            top: PLATES[plateIndex].top,
          },
          animatedStyle,
        ]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};

export const KitchenRoom = () => {
  const [foods, setFoods] = useState(getRandomFoods());
  const dispatch = useAppDispatch();
  const foodsRef = useRef(foods);
  foodsRef.current = foods;

  const eatPlayer = useAudioPlayer(require("@assets/sound/eating.mp3"));
  const playEatSound = useCallback(() => {
    eatPlayer.seekTo(0);
    eatPlayer.play();
  }, [eatPlayer]);

  const handleEat = useCallback(
    (plateIndex: number) => {
      playEatSound(); 

      const food = foodsRef.current[plateIndex]; 
      if (food) {
        dispatch(feedPet(food.hungerValue ?? 20));
      }

      setFoods((prev) => {
        const newFoods = [...prev];
        newFoods[plateIndex] = null as any;
        const allEaten = newFoods.every((f) => f === null);
        if (allEaten) {
          setTimeout(() => setFoods(getRandomFoods()), 1000);
        }
        return newFoods;
      });
    },
    [dispatch, playEatSound], 
  );
  return (
    <ImageBackground
      source={require("@assets/kitchen.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <RoomButton room={Room.HOME} />
      <Pet />
      <ImageBackground
        source={require("@assets/table.png")}
        resizeMode="cover"
        style={styles.table}
      >
        <View
          style={{
            position: "absolute",
            width: 65,
            height: 65,
            top: 0,
            left: 405,
            borderRadius: 1000,
            // debug
            // backgroundColor: "rgba(255,0,0,0.3)",
          }}
        />
        <View style={styles.tableContainer}>
          {foods.map((food, index) => {
            if (!food) return null;
            return (
              <FoodItem
                key={food.id + index}
                food={food}
                plateIndex={index}
                onEat={handleEat}
              />
            );
          })}
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  table: {
    position: "absolute",
    top: "38%",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
  tableContainer: {
    flex: 1,
    position: "relative",
  },
  foodRow: {
    flex: 1,
    backgroundColor: "red",
  },
  food: {
    height: 70,
    width: 70,
  },
});
