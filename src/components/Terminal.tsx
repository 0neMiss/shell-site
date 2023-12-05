import { useState } from "react";
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
  // to track the current set of items in history currently being displayed
  // each index is tracking a bound of the window
  // index 0 is the top of the window
  // index 1 is the bottom
  const [view, setView] = useState<View>(STARTING_VIEW);

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
