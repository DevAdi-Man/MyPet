import { Pressable, View, StyleSheet, Text } from "react-native";
import Carrot from "@assets/carrot.svg";
import { Room } from "src/types/room";
import Shower from "@assets/shower.svg";
import Bed from "@assets/bed.svg";
import { useAppSelector } from "@hooks/reducerHook";
interface SideRoomProps {
  moveToRoom: (room: Room) => void;
}
const roomData = [Room.KITCHEN, Room.BATHROOM, Room.BEDROOM];
export const SideRoom = ({ moveToRoom }: SideRoomProps) => {
  const { hunger, happiness, energy } = useAppSelector((state) => state.pet);
  const getRoomEmoji = (room: Room) => {
    switch (room) {
      case Room.KITCHEN:
        if (hunger <= 20) return "😭";
        if (hunger <= 40) return "🥺";
        return null;

      case Room.BATHROOM:
        if (happiness <= 20) return "😢";
        if (happiness <= 40) return "🙁";
        return null;

      case Room.BEDROOM:
        if (energy <= 20) return "💤";
        if (energy <= 40) return "😴";
        return null;

      default:
        return null;
    }
  };
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
      {roomData.map((room) => {
        const emoji = getRoomEmoji(room);

        return (
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

            {emoji && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{emoji}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
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
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
  },

  badgeText: {
    fontSize: 24,
  },
});
