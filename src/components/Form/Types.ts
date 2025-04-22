import { JSX } from "react";
export interface InputTypes {
  type: string;
  label: string;
  category?: string;
  render: () => JSX.Element;
}
