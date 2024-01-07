import { recognizedCommands } from "../constants/RecognizedCommands";

export interface ParsedReturn {
  template: string;
  command: string;
  flags?: Record<string, boolean>[];
}

export const parseCommandsAndFlags = (userInput: string): ParsedReturn => {
  const wordArray = userInput.split(" ");
  const command = wordArray.shift()?.trim();
  const parsedReturn: ParsedReturn = {
    template: userInput,
    command: command || "",
  };
  if (recognizedCommands[command ?? ""]) {
    parsedReturn.template = `|${command}|`.concat(wordArray.join(""));
  }
  return parsedReturn;
};
