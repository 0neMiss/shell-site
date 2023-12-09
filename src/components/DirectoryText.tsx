import { FC } from "react";
import "./DirectoryText.scss";
interface DirectoryTextProps {
  command?: string;
}
export const DirectoryText: FC<DirectoryTextProps> = ({ command = null }) => {
  return (
    <span className="directory-text">
      Guest@MYPORTFOLIO-0CD31MA: <span className="sys-command">{command} </span>
    </span>
  );
};
