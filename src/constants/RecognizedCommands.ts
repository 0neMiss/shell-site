import { CommandMap } from "../types/CommandObjects";
import {
  contactOutputText,
  helpOutputText,
  linksOutputText,
  projectsOuputText,
} from "./FormattedTemplates";
export const recognizedCommands: CommandMap = {
  help: {
    outputText: helpOutputText,
  },
  projects: {
    outputText: projectsOuputText,
  },
  contact: {
    outputText: contactOutputText,
  },
  links: {
    outputText: linksOutputText,
  }
}
