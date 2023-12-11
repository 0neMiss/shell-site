import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { PromptText } from "./PromptText";
import "./Input.scss";
import { RegisteredKeys } from "../enums/RegisteredKeys";
import { CommandHistoryContext } from "../context/CommandHisoryContext";
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
  const history = useContext(CommandHistoryContext);

  const onType = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  //still meh
  const newOnRegisteredKeypress = (e: any) => {
    const historyEnabled = history?.enabled;
    switch (e.code) {
      case RegisteredKeys.ENTER:
        setTextHistory([...textHistory, parseUserInput(e.target.value)]);
        history?.add(e.target.value.trim());
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
        if (history?.pointer === 0) {
        }
        break;
      case RegisteredKeys.UP:
        if (!historyEnabled && history?.length) {
          history.enabled = true;
        }
        break;
    }
  };

  // something wrong with the setting of the index, jumping way farther in history than intended
  const onRegisteredKeypress = (e: any) => {
    let command;
    let outOfHistoryRange;
    switch (e.code) {
      case RegisteredKeys.ENTER:
        setTextHistory([...textHistory, parseUserInput(e.target.value)]);
        setCommandHistory([...commandHistory, e.target.value.trim()]);
        setCommandHistoryIndex(0);
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
        outOfHistoryRange = commandHistoryIndex + 1 > commandHistory.length;
        command = commandHistory[commandHistoryIndex ?? 0];
        e.target.value = commandHistory.length
          ? commandHistory[commandHistoryIndex ?? 0]
          : e.target.value;

        break;
      case RegisteredKeys.UP:
        outOfHistoryRange = commandHistoryIndex + 1 < commandHistory.length;
        if (outOfHistoryRange) {
          break;
        }
        command = commandHistory[commandHistoryIndex ?? 0];
        e.target.value = command;
        setInput(command);
        setCommandHistoryIndex(
          outOfHistoryRange ? commandHistory.length : commandHistoryIndex + 1,
        );
        e.target.selectionStart = e.target.selectionEnd;
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
