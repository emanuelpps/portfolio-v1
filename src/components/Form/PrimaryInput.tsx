import { InputTypes } from "./Types";

export class PrimaryInput implements InputTypes {
  type: string;
  label: string;
  category: string;

  constructor(type: string, label: string, category: string) {
    this.label = label;
    this.type = type;
    this.category = category;
  }

  render() {
    return (
      <div className="flex items-center justify-center w-full gap-0 h-full text-white">
        <div className="relative w-50 text-start mb-4">
          <label>{this.label}</label>
        </div>
        <input
          type={this.category}
          className="bg-white h-10 w-92 text-black rounded-xl font-medium shadow-lg hover:bg-[#ff4d7cce] transition-all duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
    );
  }
}
