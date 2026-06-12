import { ProgressBar } from "@components/ProgressBar";
import { RoomButton } from "@components/RoomButton";
import { ImageBackground, StyleSheet } from "react-native";
import { Room } from "src/types/room";

export const BedRoom = () => {
  return (
    <ImageBackground
      source={require("@assets/Bath.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <RoomButton room={Room.HOME} />
      <ProgressBar value={70} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
