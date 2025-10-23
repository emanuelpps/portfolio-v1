import { JSX } from "react";
import { Button } from "./Types";

export class TertiaryButton implements Button {
  label: string | JSX.Element;
  icon?: JSX.Element | undefined;
  link?: string;

  constructor(label: string | JSX.Element, icon?: JSX.Element, link?: string) {
    this.label = label;
    this.icon = icon;
    this.link = link;
  }

  render() {
    return (
      <a
        href={this.link}
        target="_blank"
        className="flex items-center justify-center gap-2 px-5 md:px-10 py-3 bg-gray-400 border border-gray text-black hover:text-white rounded-2xl backdrop-blur-md shadow-lg hover:bg-gray-800 transition-all duration-300 font-semibold cursor-pointer w-[45%] md:w-[15%]"
        aria-label={
          typeof this.label === "string" ? this.label : "tertiary button"
        }
      >
        <div>{this.icon}</div>
        <div>{this.label}</div>
      </a>
    );
  }
}
