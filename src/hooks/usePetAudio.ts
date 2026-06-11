import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

export const usePetAudio = (musicEnabled: boolean) => {
  const musicPlayer = useAudioPlayer(require("@assets/sound/BackGround.mp3"));
  const clickPlayer = useAudioPlayer(require("@assets/sound/ClickButton.mp3"));
  const barkPlayer = useAudioPlayer(require("@assets/sound/FriendlyBark.mp3"));

  useEffect(() => {
    musicPlayer.loop = true;

    if (musicEnabled) {
      musicPlayer.volume = 0.35;
      musicPlayer.play();
    } else {
      musicPlayer.pause();
    }
  }, [musicEnabled, musicPlayer]);

  const playClick = () => {
    clickPlayer.seekTo(0);
    clickPlayer.play();
  };

  const playBark = () => {
    barkPlayer.seekTo(0);
    barkPlayer.play();
  };

  return { playClick, playBark };
};
