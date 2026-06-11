import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { RoomButton } from "@components/RoomButton";
import { Room } from "src/types/room";
import { Pet } from "@components/Pet";
import { Foods, PLATES } from "src/constants/foods";
import { useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const getRandomFoods = () => {
  return [...Foods].sort(() => Math.random() - 0.5).slice(0, 4);
};
const AnimatedImage = Animated.createAnimatedComponent(Image);
const MOUTH = {
  x: 190,
  y: 260,
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
        onEat(plateIndex);
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
  const mouthRef = useRef<View>(null);

  const handleEat = (plateIndex: number) => {
    console.log("food eaten", plateIndex);
  };
  return (
    <ImageBackground
      source={require("@assets/kitchen.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <RoomButton room={Room.HOME} />
      <Pet />
      <View
        ref={mouthRef}
        style={{
          position: "absolute",
          width: 65,
          height: 65,
          top: "36%",
          left: "46.5%",
          borderRadius: 1000,
          // debug
          backgroundColor: "rgba(255,0,0,0.3)",
        }}
      />
      <ImageBackground
        source={require("@assets/table.png")}
        resizeMode="cover"
        style={styles.table}
      >
        <View style={styles.tableContainer}>
          {foods.map((food, index) => (
            <FoodItem
              key={food.id + index}
              food={food}
              plateIndex={index}
              onEat={handleEat}
            />
          ))}
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
