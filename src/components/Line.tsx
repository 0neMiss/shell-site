import { FC, ReactNode } from "react";
import "./Line.scss";

interface LineProps {
  text: ReactNode;
}
export const Line: FC<LineProps> = ({ text }) => {
  return <div className="history-text">{text}</div>;
};
