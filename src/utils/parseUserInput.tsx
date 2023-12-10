import { PromptText } from "../components/PromptText";
import { InterfaceMessage } from "../components/InterfaceMessage";
import { recognizedCommands } from "../constants/RecognizedCommands";
import { TextHistory } from "../types/TextHistory";
import { parseCommandsAndFlags } from "./parseCommandsAndFlags";

export const parseUserInput = (input: string): TextHistory => {
  const { command } = parseCommandsAndFlags(input);

  const currentTime = new Date().toISOString();
  const outputText =
    recognizedCommands[command]?.outputText ??
    `|${command}|: command not found`;

  return {
    message: [
      <PromptText command={command} />,
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
