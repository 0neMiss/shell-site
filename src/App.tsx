import { useEffect } from "react";
import { Terminal } from "./components/Terminal";
import { CommandHistoryProvider } from "./context/CommandHisoryContext";

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
    <CommandHistoryProvider>
      <Terminal />
    </CommandHistoryProvider>
  );
}

export default App;
