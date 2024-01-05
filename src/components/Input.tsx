import { Dispatch, FC, SetStateAction, useState } from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { PromptText } from "./PromptText";
import "./Input.scss";
import { RegisteredKeys } from "../enums/RegisteredKeys";
import { useAppDispatch, useAppSelector } from "../app-setup/hooks";
import {
  addCommand,
  nextCommand,
  resetHistoryState,
} from "../slices/CommandHistorySlice";
interface InputProps {
  textHistory: TextHistory[];
  setTextHistory: Dispatch<SetStateAction<TextHistory[]>>;
}

export const Input: FC<InputProps> = ({ textHistory, setTextHistory }) => {
  const [input, setInput] = useState("");
  const commandHistory = useAppSelector((state) => state.commandHistory);

  const dispatch = useAppDispatch();
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
        dispatch(addCommand(e.target.value.trim()));
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
          dispatch(resetHistoryState());
        }
        break;
      case RegisteredKeys.UP:
        if (commandHistory?.history?.length) {
          dispatch(nextCommand());
          setInput(commandHistory.current);
          e.target.value = commandHistory.current;
          e.target.focus();
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
