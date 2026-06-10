import { Provider } from "react-redux";
import { store } from "./src/store";
import { Navigation } from "./src/navigation/RootNavigation";


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

