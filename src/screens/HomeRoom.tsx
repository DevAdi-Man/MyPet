import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { toggleMusic as toggleMusicAction } from "@store/slices/petSlice";
import { usePetAudio } from "@hooks/usePetAudio";
import { usePetHaptics } from "@hooks/usePetHaptics";
import { useDogInteraction } from "@hooks/useDogInteraction";
import { MusicButton } from "@components/MusicButton";
import { SideRoom } from "@components/SideRoom";
import { Room } from "src/types/room";
import { useRoom } from "@hooks/useRoom";
import { useRoomTransition } from "@hooks/useRoomTransition";

const starColorFilters = [
  {
    keypath: "**",
    color: "#FFD447",
  },
  {
    keypath: "Star*",
    color: "#FF7A59",
  },
  {
    keypath: "Shape*",
    color: "#7C5CFF",
  },
];

export const HomeRoom = () => {
  const animationRef = useRef<LottieView>(null);
  const musicEnabled = useSelector(
    (state: RootState) => state.pet.musicEnabled,
  );
  // const { changeRoom } = useRoom();
  const { changeRoomWithTransition } = useRoomTransition();
  const dispatch = useDispatch<AppDispatch>();

  const { playBark, playClick } = usePetAudio(musicEnabled);
  const { trigger } = usePetHaptics();
  const { panResponder, starAnimationRef, isDraggingDog } =
    useDogInteraction(playBark);

  const toggleMusic = () => {
    playClick();

    trigger();

    dispatch(toggleMusicAction());
  };
  const moveToRoom = (room: Room) => {
    playClick();
    changeRoomWithTransition(room);
  };

  return (
    <ImageBackground
      source={require("@assets/Home.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Music Button */}
      <MusicButton musicEnabled={musicEnabled} toggleMusic={toggleMusic} />
      {/* Side Buttons like Carrot and Shower */}
      <SideRoom moveToRoom={moveToRoom} />
      {/* Pet Stage */}
      <View style={styles.petStage}>
        <View
          {...panResponder.panHandlers}
          style={[styles.dogWrap, isDraggingDog && styles.dogWrapActive]}
        >
          {isDraggingDog && (
            <>
              <LottieView
                ref={starAnimationRef}
                source={require("@assets/pets/stars.json")}
                autoPlay
                loop
                colorFilters={starColorFilters}
                style={[styles.stars, styles.leftStars]}
              />
              <LottieView
                source={require("@assets/pets/stars.json")}
                autoPlay
                loop
                colorFilters={starColorFilters}
                style={[styles.stars, styles.rightStars]}
              />
            </>
          )}

          <LottieView
            ref={animationRef}
            source={require("@assets/pets/dog.json")}
            autoPlay
            loop
            style={styles.dog}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  petStage: {
    alignItems: "center",
    bottom: 10,
    height: "66%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
  },
  dogWrap: {
    height: 280,
    width: 280,
  },
  dogWrapActive: {
    transform: [{ scale: 1.04 }],
  },
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
  },
  musicButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  showerButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 22,
    height: 62,
    justifyContent: "center",
    width: 52,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  carrotButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 22,
    height: 62,
    justifyContent: "center",
    width: 52,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
  dog: {
    height: "100%",
    width: "100%",
  },
  stars: {
    height: 130,
    position: "absolute",
    top: -16,
    width: 130,
    zIndex: 2,
  },
  leftStars: {
    left: -26,
    transform: [{ rotate: "-18deg" }],
  },
  rightStars: {
    right: -26,
    transform: [{ rotate: "18deg" }],
  },
});
