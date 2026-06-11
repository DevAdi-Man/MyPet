import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { RoomButton } from "@components/RoomButton";
import { Room } from "src/types/room";
import { Pet } from "@components/Pet";
import { Foods, PLATES } from "src/constants/foods";
import { useRef } from "react";

const getRandomFoods = () => {
  return [...Foods].sort(() => Math.random() - 0.5).slice(0, 4);
};

export const KitchenRoom = () => {
  const mouthRef = useRef<View>(null);
  const selectedFoods = getRandomFoods();
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
          top:"36%",
          left:"46.5%",
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
        <View style={styles.foodRow}>
          {selectedFoods.map((food, index) => (
            <Image
              key={food.id}
              source={food.source}
              style={[
                styles.food,
                { left: PLATES[index].left, top: PLATES[index].top },
              ]}
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
  foodRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginTop: 40,
  },
  food: {
    height: 70,
    width: 70,
  },
});
