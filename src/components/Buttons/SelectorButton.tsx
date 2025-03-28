import { Button } from "./Types";
import { FiArrowUpRight } from "react-icons/fi";

export class SelectorButton implements Button {
  label: string;
  labelTwo: string;
  setTitleSelection?: (value: string) => void;
  titleSelection?: string;

  constructor(
    label: string,
    labelTwo: string,
    setTitleSelection?: (value: string) => void,
    titleSelection?: string
  ) {
    this.label = label;
    this.labelTwo = labelTwo;
    this.setTitleSelection = setTitleSelection;
    this.titleSelection = titleSelection;
  }

  render() {
    return (
      <div className="flex items-center bg-gradient-to-r from-orange-200 to-orange-200 rounded-full p-1 w-[280px] min-w-[280px] h-[60px] shadow-md bg-opacity-50 backdrop-blur-lg border-gray-100 border-b-2">
        <button
          className={`${
            this.titleSelection !== "title"
              ? "flex-1 text-orange-900 font-medium text-lg hover:text-orange-700 transition cursor-pointer"
              : "flex items-center justify-center bg-orange-400 text-white font-semibold rounded-full w-[55%] h-full hover:bg-orange-500 transition cursor-pointer"
          }`}
          onClick={() => this.setTitleSelection?.("title")}
        >
          {this.label}
          {this.titleSelection === "title" && (
            <FiArrowUpRight className="ml-2" />
          )}
        </button>
        <button
          className={`${
            this.titleSelection !== "about"
              ? "flex-1 text-orange-900 font-medium text-lg hover:text-orange-700 transition cursor-pointer"
              : "flex items-center justify-center bg-orange-400 text-white font-semibold rounded-full w-[55%] h-full hover:bg-orange-500 transition cursor-pointer"
          }`}
          onClick={() => this.setTitleSelection?.("about")}
        >
          {this.labelTwo}
          {this.titleSelection === "about" && (
            <FiArrowUpRight className="ml-2" />
          )}
        </button>
      </div>
    );
  }
}
