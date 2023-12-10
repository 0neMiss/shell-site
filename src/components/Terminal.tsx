import { useEffect, useState } from "react";
import "./Terminal.scss";
import { STARTING_VIEW } from "../constants/StartingView";
import { View } from "../types/View";
import { Input } from "./Input";
import { TextHistory } from "../types/TextHistory";
import { STARTING_HISTORY } from "../constants/StartingHistory";

export const Terminal = () => {
  // track the text history from both user and interface
  const [textHistory, setTextHistory] =
    useState<TextHistory[]>(STARTING_HISTORY);
  useEffect(() => {
    const element = document
      .querySelector("#input-line-container .directory-text")
      ?.scrollIntoView(true);

    console.log(element);
    window.scrollBy(400, window.scrollY);
  }, [textHistory]);
  return (
    <>
      <div className="terminal">
        <div className="text-container">
          {textHistory.map((item) => {
            if (item.inView) {
              return item.message;
            }
          })}
          <Input textHistory={textHistory} setTextHistory={setTextHistory} />
        </div>
      </div>
    </>
  );
};
