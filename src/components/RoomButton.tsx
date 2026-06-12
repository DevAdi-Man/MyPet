import { usePetAudio } from "@hooks/usePetAudio";
import { usePetHaptics } from "@hooks/usePetHaptics";
import { useRoom } from "@hooks/useRoom";
import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Room } from "src/types/room";

interface RoomButtonProps {
  room: Room;
}
export const RoomButton = ({ room }: RoomButtonProps) => {
  const { changeRoom } = useRoom();
  const { playClick } = usePetAudio();
  const { trigger } = usePetHaptics();
  const handlePress = () => {
    playClick();
    trigger();
    changeRoom(room);
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <View style={styles.iconWrap}>
        <FontAwesome name="close" size={24} color="#17251F" />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    left: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 999,
    height: 52,
    justifyContent: "center",
    width: 52,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    zIndex: 1000,
  },
  musicButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
  iconWrap: {
    alignItems: "center",
    height: 28,
    justifyContent: "center",
    width: 28,
  },
});
