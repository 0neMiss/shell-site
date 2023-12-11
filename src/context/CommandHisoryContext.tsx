import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { CommandHistory } from "../apis/CommandHistory";

const CommandHistoryContext = createContext<CommandHistory | null>(null);

interface CommandHistoryContextProps {
  children: ReactNode;
}

export const CommandHistoryProvider: FC<CommandHistoryContextProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<CommandHistory>(
    new CommandHistory([]),
  );
  return (
    <CommandHistoryContext.Provider value={history}>
      {children}
    </CommandHistoryContext.Provider>
  );
};
