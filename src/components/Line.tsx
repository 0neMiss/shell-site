import { FC, ReactElement } from "react";
import "./Line.scss";

interface LineProps {
  text: ReactElement | string;
}
export const Line: FC<LineProps> = ({ text }) => {
  return <div className="history-text">{text}</div>;
};
