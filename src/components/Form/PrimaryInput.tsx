import { InputTypes } from "./Types";

export class PrimaryInput implements InputTypes {
  type: string;
  label: string;

  constructor(type: string, label: string) {
    this.label = label;
    this.type = type;
  }

  render() {
    return (
      <button className="px-8 py-2 bg-[#FF4D7D] text-white rounded-full font-medium shadow-lg hover:bg-[#ff4d7cce] transition-all duration-300 ease-in-out transform hover:scale-105">
        {this.label}
      </button>
    );
  }
}
