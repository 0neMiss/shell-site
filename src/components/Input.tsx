import { Dispatch, FC, SetStateAction, useState } from "react";
import { TextHistory } from "../types/TextHistory";
import { parseUserInput } from "../utils/parseUserInput";
import { DirectoryText } from "./DirectoryText";
import "./Input.scss";
interface InputProps {
  textHistory: TextHistory[];
  setTextHistory: Dispatch<SetStateAction<TextHistory[]>>;
}

export const Input: FC<InputProps> = ({ textHistory, setTextHistory }) => {
  const [input, setInput] = useState("");
  //when any key is pressed
  const onType = (e: any) => {
    setInput(e.target.value);
  };
  // when enter is pressed
  const onEnter = (e: any) => {
    if (e.code === "Enter") {
      setTextHistory([...textHistory, parseUserInput(e.target.value)]);
      setInput("");
      e.target.value = "";
      e.target.focus();
    }
  };
  return (
    <>
      <div className="input-line-container">
        <DirectoryText />
        <span className="user-text">{input}</span>
        <textarea
          id="force-focus"
          className="offscreen-text"
          onKeyDown={onEnter}
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
