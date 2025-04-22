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
      <div className="flex items-center justify-center w-[100%] gap-0 h-full text-white">
        <div className="relative w-40 text-start mb-4">
          <label>{this.label}</label>
        </div>
        <textarea className="bg-white h-40 w-[100%] text-black rounded-xl font-medium shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform text-md" />
      </div>
    );
  }
}
