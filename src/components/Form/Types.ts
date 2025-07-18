import { JSX } from "react";
export interface InputTypes {
  type: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category?: string;
  render: () => JSX.Element;
}
