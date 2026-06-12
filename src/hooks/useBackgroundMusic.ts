import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

export const useBackgroundMusic = (enabled: boolean) => {
  const player = useAudioPlayer(
    require("@assets/sound/BackGround.mp3")
  );
  
  useEffect(() => {
    player.loop = true;

    if (enabled) {
      player.volume = 0.35;
      player.play();
    } else {
      player.pause();
    }
  }, [enabled]);
};