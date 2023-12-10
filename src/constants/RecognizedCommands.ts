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
    outputText: "You can contact me ",
  },
  links: {
    outputText: String.raw`
      - Github        https://github.com/0neMiss?tab=overview
      - linkedin      https://www.linkedin.com/in/jordan-shehane-b2807a196/
    `,
  },
};
