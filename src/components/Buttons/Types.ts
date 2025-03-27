import { JSX } from "react";
export interface Button {
  label: string;
  labelTwo?: string;
  render: () => JSX.Element;
}
