import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { PromptText } from "./PromptText";
import "./Input.scss";
interface InputProps {
  textHistory: TextHistory[];
  setTextHistory: Dispatch<SetStateAction<TextHistory[]>>;
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  setCommandHistoryIndex: Dispatch<SetStateAction<number>>;
  commandHistoryIndex: number;
}

export const Input: FC<InputProps> = ({
  textHistory,
  setTextHistory,
  commandHistory,
  setCommandHistory,
  setCommandHistoryIndex,
  commandHistoryIndex,
}) => {
  const [input, setInput] = useState("");
  // when any key is pressed
  const onType = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const onSpecialKeypress = (e: any) => {
    console.log(e.code);
    let command;
    if (e.code === "ArrowUp") {
      if (!commandHistory.length) {
        return;
      }

      const outOfHistoryRange = commandHistoryIndex + 1 > commandHistory.length;
      if (outOfHistoryRange) {
        return;
      }
      setCommandHistoryIndex(
        outOfHistoryRange ? commandHistory.length : commandHistoryIndex + 1,
      );
      command = commandHistory[commandHistoryIndex ?? 0];
      e.target.value = commandHistory[commandHistoryIndex ?? 0];
      setInput(command);
      console.log((e.target.selectionStart = e.target.selectionEnd));
    }
    if (e.code === "ArrowDown") {
      e.target.value = commandHistory.length
        ? commandHistory[commandHistoryIndex ?? 0]
        : e.target.value;
      console.log((e.target.selectionStart = e.target.selectionEnd));
    }
    if (e.code === "Enter") {
      setTextHistory([...textHistory, parseUserInput(e.target.value)]);
      setCommandHistory([...commandHistory, e.target.value.trim()]);
      console.log(commandHistory);
      setInput("");
      e.target.value = "";
      e.target.focus();
      const scrollAfterUpdate = setTimeout(() => {
        document
          .querySelector("#input-line-container .directory-text")
          ?.scrollIntoView({ behavior: "smooth" });
        clearTimeout(scrollAfterUpdate);
      }, 1);
      return;
    }
  };

  return (
    <>
      <div id="input-line-container" className="input-line-container">
        <PromptText />
        <span className="user-text">{input}</span>
        <textarea
          id="force-focus"
          className="offscreen-text"
          onKeyDown={onSpecialKeypress}
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
