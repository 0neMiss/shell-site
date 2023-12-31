import { useState } from "react";
import "./Terminal.scss";
import { Input } from "./Input";
import { TextHistory } from "../types/TextHistory";
import { STARTING_HISTORY } from "../constants/StartingHistory";

export const Terminal = () => {
  // track the text history from both user and interface
  const [textHistory, setTextHistory] =
    useState<TextHistory[]>(STARTING_HISTORY);
  return (
    <>
      <div className="terminal">
        <div className="text-container">
          {textHistory.map((item) => {
            return item.message;
          })}
          <Input textHistory={textHistory} setTextHistory={setTextHistory} />
        </div>
      </div>
    </>
  );
};
