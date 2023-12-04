import { InterfaceMessage } from "../components/InterfaceMessage";
import { Line } from "../components/Line";
import { TextHistory } from "../types/TextHistory";

export const STARTING_HISTORY: TextHistory[] = [
  {
    message: <InterfaceMessage template={``} />,
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
