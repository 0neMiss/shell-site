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
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentIndex, commandHistory } = useAppSelector(
    (state) => state.commandHistory,
  );

  useEffect(() => {
    if (inputRef?.current?.value) {
      setInput(inputRef.current.value);
    }
  }, [commandHistory]);

  const dispatch = useAppDispatch();
  const onType = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    const onRegisteredKeypress = (e: any) => {
      switch (e.code) {
        case RegisteredKeys.ENTER:
          setTextHistory([...textHistory, parseUserInput(e.target.value)]);
          dispatch(addCommand(e.target.value));
          dispatch(resetHistoryState());
          setInput("");
          if (inputRef?.current?.value) {
            inputRef.current.value = "";
            inputRef?.current.focus();
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
    if (inputRef.current) {
      inputRef.current.onkeydown = onRegisteredKeypress;
    }
  }, [textHistory, currentIndex, commandHistory]);

  useEffect(() => {
    setInput(commandHistory[currentIndex]);
    if (inputRef.current && currentIndex >= 0) {
      inputRef.current.value = commandHistory[currentIndex];
      setTimeout(() => {
        inputRef.current?.setSelectionRange(
          commandHistory[currentIndex].length,
          commandHistory[currentIndex].length,
        );
      }, 0);
    }
  }, [currentIndex, commandHistory]);

  return (
    <>
      <div id="input-line-container" className="input-line-container">
        <PromptText />
        <span className="user-text">{input}</span>
        <input
          id="force-focus"
          className="offscreen-text"
          ref={inputRef}
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
