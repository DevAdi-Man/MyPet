import { Provider } from "react-redux";
import { store } from "./src/store";
import { Navigation } from "./src/navigation/RootNavigation";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationBar } from "expo-navigation-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    NavigationBar.setHidden(true);
  }, []);
  return (
    <>
      <StatusBar hidden={true} animated={true} />
      <GestureHandlerRootView>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
