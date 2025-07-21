import { JSX } from "react";
export interface InputTypes {
  type: string;
  label: string;
  category?: string;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  render: () => JSX.Element;
}

