import { RoomButton } from "@components/RoomButton";
import { ImageBackground, StyleSheet } from "react-native";
import { Room } from "src/types/room";

export const BathRoom = () => {
  return (
    <ImageBackground
      source={require("@assets/Bath.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <RoomButton room={Room.HOME} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
