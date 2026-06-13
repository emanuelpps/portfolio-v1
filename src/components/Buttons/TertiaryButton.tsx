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
        href={this.link || "#"}
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 transition-colors duration-300 hover:text-[color:var(--accent)]"
      >
        {this.icon}
        <span className="relative">
          {this.label}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--accent)] transition-all duration-300 group-hover:w-full" />
        </span>
      </a>
    );
  }
}
