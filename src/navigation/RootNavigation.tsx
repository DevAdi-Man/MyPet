import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { createStaticNavigation } from "@react-navigation/native";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

type RootStackType = typeof RootStack;

export const Navigation = createStaticNavigation(RootStack);

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}
