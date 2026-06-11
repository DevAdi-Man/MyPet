import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
export const usePetHaptics = () => {
  const trigger = () => {
    if (Platform.OS === "android") {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid).catch(() => {
        // Some devices/emulators do not expose a haptics engine.
      });
    }
  };
  return { trigger };
};
