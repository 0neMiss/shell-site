import { ReactElement } from "react";

export interface TextHistory {
  message: ReactElement;
  from: "user" | "interface";
  inView: boolean;
}
