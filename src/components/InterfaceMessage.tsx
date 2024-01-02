import { FC, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";
import "./InterfaceMessage.scss";

interface InterfaceMessageProps {
  /*Template system for syntax highlighting.*/
  template: string;
  currentTime: string;
}

export const InterfaceMessage: FC<InterfaceMessageProps> = ({ template }) => {
  const [parsedMessage, setParsedMessage] = useState<React.ReactNode[]>();
  useEffect(() => {
    const parseMessage = () => {
      const isSystemCommand = /\|(.+)\|/;
      setParsedMessage(
        reactStringReplace(template, isSystemCommand, (match, i) => (
          <span key={i} id={"sys-command"}>
            {match}
          </span>
        )),
      );
    };

    parseMessage();
  }, [template]);

  return <div className="interface-message">{parsedMessage}</div>;
};
