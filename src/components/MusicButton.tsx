import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
interface MusicButtonProps {
  musicEnabled: boolean;
  toggleMusic: () => void;
}
export const MusicButton = ({
  musicEnabled,
  toggleMusic,
}: MusicButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.musicButton,
        musicEnabled && styles.musicButtonActive,
        pressed && styles.pressed,
      ]}
      onPress={toggleMusic}
    >
      <View style={styles.iconWrap}>
        <FontAwesome name="music" size={24} color="#17251F" />
        {!musicEnabled && <View style={styles.cutLine} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  musicButton: {
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
  cutLine: {
    backgroundColor: "#E23A3A",
    borderRadius: 999,
    height: 3,
    position: "absolute",
    transform: [{ rotate: "-42deg" }],
    width: 34,
  },
});
