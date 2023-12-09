import { DirectoryText } from "../components/DirectoryText";
import { InterfaceMessage } from "../components/InterfaceMessage";
import { recognizedCommands } from "../constants/RecognizedCommands";
import { TextHistory } from "../types/TextHistory";
import { parseCommandsAndFlags } from "./parseCommandsAndFlags";

type ParsingResult = TextHistory;

export const parseUserInput = (input: string): ParsingResult => {
  const { command } = parseCommandsAndFlags(input);

  const currentTime = new Date().toISOString();
  const outputText =
    recognizedCommands[command]?.outputText ??
    `|${command}|: command not found`;

  return {
    message: [
      <DirectoryText command={command} />,
      <InterfaceMessage
        key={`outputText-${currentTime}`}
        currentTime={currentTime}
        template={outputText}
      />,
    ],
    time: currentTime,
    interfaceResponse:
      recognizedCommands[command]?.outputText ??
      `${command} is not a recognized command!`,
    from: "user",
    inView: true,
  };
};
