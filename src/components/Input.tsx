import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { PromptText } from "./PromptText";
import "./Input.scss";
import { RegisteredKeys } from "../enums/RegisteredKeys";
import { useAppDispatch, useAppSelector } from "../app-setup/hooks";
import {
  addCommand,
  nextCommand,
  prevCommand,
  resetHistoryState,
} from "../slices/CommandHistorySlice";
interface InputProps {
  textHistory: TextHistory[];
  setTextHistory: Dispatch<SetStateAction<TextHistory[]>>;
}

export const Input: FC<InputProps> = ({ textHistory, setTextHistory }) => {
  const [input, setInput] = useState<undefined | string>("");
  const textArea = useRef<HTMLTextAreaElement>(null);
  const commandHistory = useAppSelector((state) => state.commandHistory);

  useEffect(() => {
    if (textArea?.current?.value) {
      textArea.current.focus();
      textArea.current.value = commandHistory.current;
      setInput(commandHistory.current);
    }
  }, [commandHistory]);

  const dispatch = useAppDispatch();
  const onType = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  //still meh
  const onRegisteredKeypress = (e: any) => {
    switch (e.code) {
      case RegisteredKeys.ENTER:
        setTextHistory([...textHistory, parseUserInput(e.target.value)]);
        dispatch(addCommand(e.target.value));
        dispatch(resetHistoryState());
        setInput("");
        if (textArea?.current?.value) {
          textArea.current.value = "";
          textArea?.current.focus();
        }
        const scrollAfterUpdate = setTimeout(() => {
          document
            .querySelector("#input-line-container .directory-text")
            ?.scrollIntoView({ behavior: "smooth" });
          clearTimeout(scrollAfterUpdate);
        }, 1);
        break;
      case RegisteredKeys.DOWN:
        dispatch(prevCommand());
        break;
      case RegisteredKeys.UP:
        dispatch(nextCommand());
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
          ref={textArea}
          onKeyDown={onRegisteredKeypress}
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
