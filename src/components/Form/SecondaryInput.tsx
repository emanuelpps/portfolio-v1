import { InputTypes } from "./Types";

export class SecondaryInput implements InputTypes {
  type: string;
  label: string;

  constructor(type: string, label: string) {
    this.label = label;
    this.type = type;
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="relative w-full mb-4">
          <label>{this.label}</label>
        </div>
        <textarea
          className="px-8 py-2 bg-[#FF4D7D] text-white rounded-full font-medium shadow-lg hover:bg-[#ff4d7cce] transition-all duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
    );
  }
}
