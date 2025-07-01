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
      <div className="flex flex-col md:flex-row items-center justify-center w-[95vw] md:w-[100%] gap-0 h-full text-white">
        <div className="relative w-[95vw] mb-4 md:w-40 text-start">
          <label>{this.label}</label>
        </div>
        <input
          type={this.category}
          className="bg-white h-10 w-[95vw] md:w-[100%] text-black rounded-xl font-medium shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform text-md"
        />
      </div>
    );
  }
}
