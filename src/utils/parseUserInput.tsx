import { InterfaceMessage } from "../components/InterfaceMessage";
import { TextHistory } from "../types/TextHistory";

export const parseUserInput = (input: string): TextHistory => {
  return {
    message: <InterfaceMessage template={input} />,
    from: "user",
    inView: true,
  };
};
