import { FC } from "react";
import { DirectoryPath } from "./DirectoryPath";
import "./PromptText.scss";
interface PromptTextProps {
  command?: string;
}
export const PromptText: FC<PromptTextProps> = ({ command = null }) => {
  return (
    <span className="directory-text">
      Guest@MYPORTFOLIO-0CD31MA:
      <DirectoryPath />
      <p className="dollar-sign">$</p>
      {command && (
        <span id="sys-command" className="sys-command">
          {command}{" "}
        </span>
      )}
    </span>
  );
};
