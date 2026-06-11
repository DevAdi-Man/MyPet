import LottieView from "lottie-react-native";
import { useRef } from "react";
import { View, StyleSheet } from "react-native";

export const Pet = () => {
  const petRef = useRef<LottieView>(null);
  return (
    <View style={styles.container}>
      <LottieView
        ref={petRef}
        source={require("@assets/pets/dog.json")}
        autoPlay
        loop
        style={styles.pet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: '20%',
    alignSelf: "center",
  },

  pet: {
    width: 250,
    height: 250,
  },

  mouthHitbox: {
    position: "absolute",
    width: 60,
    height: 60,
    top: '20%',
    left: '20%',
  },
});