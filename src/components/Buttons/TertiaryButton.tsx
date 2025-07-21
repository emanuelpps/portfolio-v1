import { JSX } from "react";
import { Button } from "./Types";

export class TertiaryButton implements Button {
  label: string | JSX.Element;
  icon?: JSX.Element | undefined;

  constructor(label: string | JSX.Element, icon?: JSX.Element) {
    this.label = label;
    this.icon = icon;
  }

  render() {
    return (
      <button className="flex items-center justify-center gap-2 px-5 md:px-10 py-3 bg-gray-400 border-[1px] border-gray text-black hover:text-white rounded-2xl backdrop-blur-md shadow-lg hover:bg-gray-800 transition-all duration-300 font-semibold cursor-pointer w-[45%] md:w-[15%]">
        {this.icon}
        {this.label}
      </button>
    );
  }
}
