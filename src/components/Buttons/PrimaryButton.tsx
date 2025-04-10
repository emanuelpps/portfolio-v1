import { Button } from "./Types";

export class PrimaryButton implements Button {
  label: string;
  onClick?: () => void;

  constructor(label: string, onClick?: () => void) {
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
