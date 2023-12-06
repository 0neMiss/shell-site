import { FC, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";
import "./InterfaceMessage.scss";

interface InterfaceMessageProps {
  template: string;
  currentTime: string;
}

export const InterfaceMessage: FC<InterfaceMessageProps> = ({ template }) => {
  const [parsedMessage, setParsedMessage] = useState<React.ReactNode[]>();

  const parseMessage = () => {
    const isSystemCommand = /\|(.+)\|/;
    setParsedMessage(
      reactStringReplace(template, isSystemCommand, (match, i) => (
        <span key={i} className={"sys-command"}>
          {match}
        </span>
      )),
    );
  };
  useEffect(() => {
    parseMessage();
  }, [template]);

  return <div className="interface-message">{parsedMessage}</div>;
};
