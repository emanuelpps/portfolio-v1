import { Button } from "./Types";
import { JSX } from "react";

export class PrimaryButton implements Button {
  label: string | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  constructor(
    label: string | JSX.Element,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) {
    this.label = label;
    this.onClick = onClick;
  }

  render() {
    return (
      <button
        className="px-8 py-3 bg-[#FF4D7D] text-white rounded-full font-bold uppercase tracking-widest text-xs 
                   shadow-[0_0_20px_rgba(255,77,125,0.3)] hover:shadow-[0_0_30px_rgba(255,77,125,0.6)] 
                   transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        onClick={this.onClick}
      >
        {this.label}
      </button>
    );
  }
}
