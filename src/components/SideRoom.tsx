import { Pressable, View, StyleSheet } from "react-native";
import Carrot from "@assets/carrot.svg";
import { Room } from "src/types/room";
import Shower from "@assets/shower.svg";
import Bed from "@assets/bed.svg";
interface SideRoomProps {
  moveToRoom: (room: Room) => void;
}
const roomData = [
  Room.KITCHEN,
  Room.BATHROOM,
  Room.BEDROOM,
];

export const SideRoom = ({ moveToRoom }: SideRoomProps) => {
  return (
    <View
      style={{
        position: "absolute",
        right: 30,
        top: "22%",
        backgroundColor: "transparent",
        gap: 16,
      }}
    >
      {roomData.map((room) => (
        <Pressable
          key={room}
          onPress={() => moveToRoom(room)}
          style={({ pressed }) => [
            styles.carrotButton,
            pressed && styles.pressed,
          ]}
        >
            {room === Room.KITCHEN && <Carrot />}
            {room === Room.BATHROOM && <Shower />}
            {room === Room.BEDROOM && <Bed />}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  carrotButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 22,
    height: 62,
    justifyContent: "center",
    width: 52,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
});
