import { Button } from "./Types";
import { FiArrowUpRight } from "react-icons/fi";

export class SelectorButton implements Button {
  label: string;
  labelTwo: string;

  constructor(label: string, labelTwo: string) {
    this.label = label;
    this.labelTwo = labelTwo;
  }

  render() {
    return (
      <div className="flex items-center bg-gradient-to-r from-orange-200 to-orange-200 rounded-full p-1 w-[260px] h-[60px] shadow-md bg-opacity-50 backdrop-blur-lg border-gray-100 border-b-2">
        <button className="flex items-center justify-center bg-orange-400 text-white font-semibold rounded-full w-[55%] h-full hover:bg-orange-500 transition cursor-pointer" onClick={() => "do something"}>
          {this.label} <FiArrowUpRight className="ml-2" />
        </button>
        <button className="flex-1 text-orange-900 font-medium text-lg hover:text-orange-700 transition cursor-pointer">
          {this.labelTwo}
        </button>
      </div>
    );
  }
}
