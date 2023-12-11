import { useEffect, useState } from "react";
import "./Terminal.scss";
import { Input } from "./Input";
import { TextHistory } from "../types/TextHistory";
import { STARTING_HISTORY } from "../constants/StartingHistory";

export const Terminal = () => {
  // track the text history from both user and interface
  const [textHistory, setTextHistory] =
    useState<TextHistory[]>(STARTING_HISTORY);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(0);
  return (
    <>
      <div className="terminal">
        <div className="text-container">
          {textHistory.map((item) => {
            return item.message;
          })}
          <Input
            setCommandHistoryIndex={setCommandHistoryIndex}
            commandHistoryIndex={commandHistoryIndex}
            setCommandHistory={setCommandHistory}
            commandHistory={commandHistory}
            textHistory={textHistory}
            setTextHistory={setTextHistory}
          />
        </div>
      </div>
    </>
  );
};
