import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { GameScreen } from "@screens/index";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: GameScreen,
  },
  screenOptions: { headerShown: false },
  animation: "slide_from_right",
});

type RootStackType = typeof RootStack;

export const Navigation = createStaticNavigation(RootStack);

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}
