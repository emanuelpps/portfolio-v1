import { JSX } from "react";

export interface SectionTypes {
  title: string | null;
  subtitle?: string;
  code?: string;
  deploy?: string;
  stack?: string[];
  text: string;
  images: string | string[];
  render: () => JSX.Element;
}

export interface SectionParams {
  type: "primary" | "secondary" | "tertiary";
  title: string | null;
  subtitle?: string;
  code?: string;
  deploy?: string;
  stack?: string[];
  text: string;
  images: string | string[];
}
