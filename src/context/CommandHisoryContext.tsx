import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { CommandHistory } from "../apis/CommandHistory";

export const CommandHistoryContext = createContext<CommandHistory | null>(null);

interface CommandHistoryContextProps {
  children: ReactNode;
}

//this should probably be a redux slice instead...Using a class is preventing me from updating the dom easily with react since it's non-serializable data.
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
