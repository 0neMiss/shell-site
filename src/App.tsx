import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app-setup/store";
import { Terminal } from "./components/Terminal";

function App() {
  const forceFocusHandler = () => {
    (document.querySelector("#force-focus") as HTMLTextAreaElement)?.focus();
  };
  useEffect(() => {
    document.body.addEventListener("click", forceFocusHandler);
    return () => {
      document.body.removeEventListener("click", forceFocusHandler);
    };
  }, []);
  return (
    <Provider store={store}>
      <Terminal />
    </Provider>
  );
}

export default App;
