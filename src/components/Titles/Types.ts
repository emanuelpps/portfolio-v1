import { JSX } from "react";

export interface TitlesProp {
  title: string;
  subtitle?: string;
  render: () => JSX.Element;
}
