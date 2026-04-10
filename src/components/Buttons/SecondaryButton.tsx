import { Button } from "./Types";
import { FaArrowUp } from "react-icons/fa";
import { JSX } from "react";

export class SecondaryButton implements Button {
  label: string | JSX.Element;

  constructor(label: string | JSX.Element) {
    this.label = label;
  }

  render() {
    return (
      <button
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group flex items-center gap-3 px-7 py-3 border border-white/10 text-white rounded-full 
                   bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-[#FF4D7D]/50 
                   transition-all duration-500 font-medium tracking-wide cursor-pointer"
      >
        <span className="opacity-80 group-hover:opacity-100">{this.label}</span>
        <FaArrowUp className="text-xs text-[#FF4D7D] transition-transform group-hover:-translate-y-1" />
      </button>
    );
  }
}
