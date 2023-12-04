import { FC, useState } from "react";
import { TextHistory } from "../types/TextHistory";
import "./Input.scss";
interface InputProps {
  history: TextHistory;
}

export const Input = () => {
  const [input, setInput] = useState("");
  const onType = (e: any) => {
    setInput(e.target.value);
  };
  return (
    <>
      <div className="input-line-container">
        <span className="directory-text">Guest@MYPORTFOLIO-0CD31MA: </span>
        <span className="user-text">{input}</span>
        <textarea
          id="force-focus"
          className="offscreen-text"
          onInput={onType}
          autoFocus
        />
      </div>
    </>
  );
};
