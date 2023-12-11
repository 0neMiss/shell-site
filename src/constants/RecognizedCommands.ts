import { CommandMap } from "../types/CommandObjects";
import {
  contactOutputText,
  helpOutpueText,
  linksOutputText,
  projectsOuputText,
} from "./FormattedTemplates";
export const recognizedCommands: CommandMap = {
  help: {
    outputText: helpOutpueText,
  },
  projects: {
    outputText: projectsOuputText,
  },
  contact: {
    outputText: contactOutputText,
  },
  links: {
    outputText: linksOutputText,
  },
};
