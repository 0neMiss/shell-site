import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { PromptText } from "./PromptText";
import "./Input.scss";
import { RegisteredKeys } from "../enums/RegisteredKeys";
import { useAppSelector } from "../app-setup/hooks";
import { CommandHistoryState } from "../slices/CommandHistorySlice";
interface InputProps {
  textHistory: TextHistory[];
  setTextHistory: Dispatch<SetStateAction<TextHistory[]>>;
}

export const Input: FC<InputProps> = ({ textHistory, setTextHistory }) => {
  const [input, setInput] = useState("");
  const commandHistory = useAppSelector((state) => state.commandHistory);

  const onType = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  //still meh
  const onRegisteredKeypress = (e: any) => {
    const historyEnabled = commandHistory?.enabled;
    switch (e.code) {
      case RegisteredKeys.ENTER:
        setTextHistory([...textHistory, parseUserInput(e.target.value)]);
        setInput("");
        e.target.value = "";
        e.target.focus();
        const scrollAfterUpdate = setTimeout(() => {
          document
            .querySelector("#input-line-container .directory-text")
            ?.scrollIntoView({ behavior: "smooth" });
          clearTimeout(scrollAfterUpdate);
        }, 1);
        break;
      case RegisteredKeys.DOWN:
        if (!historyEnabled) {
          break;
        }
        if (commandHistory?.pointer === 0) {
        }
        break;
      case RegisteredKeys.UP:
        if (!historyEnabled && commandHistory?.history?.length) {
          commandHistory.enabled = true;
        }
        break;
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
          onKeyDown={onRegisteredKeypress}
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
