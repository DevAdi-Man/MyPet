import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { View, StyleSheet } from "react-native";

export const RoomTransition = () => {
  const visible = useSelector(
    (state: RootState) => state.transition.visible
  );

  if (!visible) return null;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <LottieView
        source={require("@assets/pets/transition.json")}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
      />
      <LottieView
        source={require("@assets/pets/transition.json")}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
      />
      <LottieView
        source={require("@assets/pets/transition.json")}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    color: "#ccc",
  },
  animation: {
    height: "100%",
    width: "100%",
  },
});