import { Provider } from "react-redux";
import { store } from "./src/store";
import { Navigation } from "./src/navigation/RootNavigation";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationBar } from "expo-navigation-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStatDecay } from "@hooks/useStatDecay";

function AppContent() {
  useStatDecay();
  
  return (
    <>
      <StatusBar hidden={true} animated={true} />
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </>
  );
}

export default function App() {
  useEffect(() => {
    NavigationBar.setHidden(true);
  }, []);
  
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
