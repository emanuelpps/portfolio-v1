import { JSX } from "react";
export interface Button {
  label: string | JSX.Element;
  labelTwo?: string;
  activeLabel?: string;
  render: () => JSX.Element;
  setTitleSelection?: (value: string) => void;
  titleSelection?: string;
  icon?: JSX.Element;
}
