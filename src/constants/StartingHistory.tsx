import { InterfaceMessage } from "../components/InterfaceMessage";
import { WordArt } from "../components/WordArt";
import { TextHistory } from "../types/TextHistory";
import { textArtName } from "./FormattedTemplates";

export const STARTING_HISTORY: TextHistory[] = [
  {
    message: [<WordArt wordArt={textArtName} />],
    interfaceResponse: "",
    time: new Date().toISOString(),
    from: "interface",
    inView: true,
  },
  {
    message: [
      <InterfaceMessage
        key="type-help"
        currentTime={new Date().toISOString()}
        template={`Type |help| for a list of commands!`}
      />,
    ],
    time: new Date().toISOString(),
    interfaceResponse: "",
    from: "interface",
    inView: true,
  },
];
