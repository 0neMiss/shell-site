import { CommandMap } from "../types/CommandObjects";
export const recognizedCommands: CommandMap = {
  help: {
    outputText:
      "other commands:\n - projects       Provides a list of links to other things I've worked on.\n - contact        How to contact me!\n - links          Links to things like my linkedin and github",
  },
  projects: {
    outputText: "",
  },
  contact: {
    outputText: "You can conta",
  },
  links: {
    outputText: String.raw`
      
    `,
  },
};
