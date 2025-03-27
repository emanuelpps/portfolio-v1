import { JSX } from "react";

interface Button {
  label: string;
  labelTwo?: string;
  render: () => JSX.Element;
}

class PrimaryButton implements Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  render() {
    return (
      <button className="px-6 py-3 bg-white text-black rounded-3xl hover:bg-gray-200 transition font-semibold">
        {this.label}
      </button>
    );
  }
}

class SecondaryButton implements Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  render() {
    return (
      <button className="px-6 py-3 bg-[#FD853A] text-black rounded-3xl hover:bg-[#fd853ad8] transition font-semibold">
        {this.label}
      </button>
    );
  }
}

class SelectorButton implements Button {
  label: string;
  labelTwo: string;

  constructor(label: string, labelTwo: string) {
    this.label = label;
    this.labelTwo = labelTwo;
  }

  render() {
    return (
      <div className="px-6 py-3 bg-[#FD853A] text-black rounded-3xl hover:bg-[#fd853ad8] transition font-semibold">
        <button>{this.label}</button>
        <button>{this.labelTwo}</button>
      </div>
    );
  }
}

export class ButtonFactory {
  static createButton(type: string, label: string, labelTwo: string): Button {
    switch (type) {
      case "primary":
        return new PrimaryButton(label);
      case "secondary":
        return new SecondaryButton(label);
      case "selector":
        return new SelectorButton(label, labelTwo);
      default:
        throw new Error("Button type not supported");
    }
  }
}
