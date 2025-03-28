import { JSX } from "react";
export interface Button {
  label: string;
  labelTwo?: string;
  render: () => JSX.Element;
  setTitleSelection?: (value: string) => void;
  titleSelection?: string;
}
