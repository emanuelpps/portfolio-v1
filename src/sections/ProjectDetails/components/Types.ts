import { JSX } from "react";

export interface SectionTypes {
  text: string;
  images?: string[] | undefined;
  render: () => JSX.Element;
}

export interface SectionParams {
  type: "primary" | "secondary" | "tertiary";
  text: string;
  images?: string[] | undefined;
}
