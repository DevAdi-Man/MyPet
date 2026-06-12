import { useAudioPlayer } from "expo-audio";

export const usePetAudio = () => {
  const clickPlayer = useAudioPlayer(
    require("@assets/sound/ClickButton.mp3")
  );

  const barkPlayer = useAudioPlayer(
    require("@assets/sound/FriendlyBark.mp3")
  );

  const playClick = () => {
    clickPlayer.seekTo(0);
    clickPlayer.play();
  };

  const playBark = () => {
    barkPlayer.seekTo(0);
    barkPlayer.play();
  };

  return {
    playClick,
    playBark,
  };
};