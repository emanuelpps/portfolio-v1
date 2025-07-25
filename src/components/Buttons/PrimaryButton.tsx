import { Button } from "./Types";
import { JSX } from "react";

export class PrimaryButton implements Button {
  label: string | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  constructor(
    label: string | JSX.Element,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) {
    this.label = label;
    this.onClick = onClick;
  }

  render() {
    return (
      <button
        className="px-8 py-2 bg-[#FF4D7D] text-white rounded-full font-medium shadow-lg hover:bg-[#ff4d7cce] transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={this.onClick}
      >
        {this.label}
      </button>
    );
  }
}
