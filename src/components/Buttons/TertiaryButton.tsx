import { JSX } from "react";
import { Button } from "./Types";
import { motion } from "framer-motion";

export class TertiaryButton implements Button {
  label: string | JSX.Element;
  icon?: JSX.Element | undefined;
  link?: string;
  isActive: boolean = false;

  constructor(label: string | JSX.Element, icon?: JSX.Element, link?: string) {
    this.label = label;
    this.icon = icon;
    this.link = link;
  }

  render() {
    return (
      <button
        className={`relative px-8 py-3 font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 cursor-pointer ${
          this.isActive ? "text-[#FF4D7D]" : "text-gray-500 hover:text-white"
        }`}
        onClick={() => this.setActiveTab(this.label)}
      >
        {this.label}
        {this.isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4D7D] shadow-[0_0_10px_#FF4D7D]"
          />
        )}
      </button>
    );
  }
  setActiveTab(label: string | JSX.Element): void {
    throw new Error("Method not implemented.");
  }
}
