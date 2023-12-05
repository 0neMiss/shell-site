import { InterfaceMessage } from "../components/InterfaceMessage";
import { WordArt } from "../components/WordArt";
import { TextHistory } from "../types/TextHistory";
import { textArtName } from "./FormattedTemplates";

export const STARTING_HISTORY: TextHistory[] = [
  {
    message: <WordArt wordArt={textArtName} />,
    from: "interface",
    inView: true,
  },
  {
    message: (
      <InterfaceMessage template={`Type |help| for a list of commands!`} />
    ),
    from: "interface",
    inView: true,
  },
];
