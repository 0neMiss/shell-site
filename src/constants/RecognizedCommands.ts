import { CommandMap } from "../types/CommandObjects";
export const recognizedCommands: CommandMap = {
  help: {
    outputText:
      "other commands:\n - projects       Provides a list of links to other things I've worked on.\n - contact        How to contact me!\n - links          Links to things like my linkedin and github",
  },
  projects: {
    outputText: String.raw`
    - A mobile app using React Native for music practice     
    - Conways game of life using PiGame                         https://github.com/0neMiss/GameOfLife
  `,
  },
  contact: {
    outputText: String.raw`
    If you want to contact me the best way is to send me a message on linkedin!

    - email     jordanshehane@gmail.com
    - phone     618-946-4327
    - linkedin  https://www.linkedin.com/in/jordan-shehane-b2807a196/
    `,
  },
  links: {
    outputText: String.raw`
      - Github        https://github.com/0neMiss?tab=overview
      - linkedin      https://www.linkedin.com/in/jordan-shehane-b2807a196/
    `,
  },
};
