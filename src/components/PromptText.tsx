import { FC } from "react";
import "./PromptText.scss";
interface PromptTextProps {
  command?: string;
}
export const PromptText: FC<PromptTextProps> = ({ command = null }) => {
  return (
    <span className="directory-text">
      Guest@MYPORTFOLIO-0CD31MA:{"~$"}{" "}
      <span className="sys-commad">{command} </span>
    </span>
  );
};
