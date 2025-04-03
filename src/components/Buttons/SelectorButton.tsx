import { Button } from "./Types";

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
      <div className="flex items-center bg-gray-800 rounded-full p-1 w-40 min-w-[150px] h-10 shadow-lg border border-gray-700 bg-opacity-80 backdrop-blur-md">
        <button
          className={`flex-1 text-sm font-medium transition-all duration-300 rounded-full px-3 py-1 ${
            this.titleSelection === "title"
              ? "bg-gray-600 text-white shadow-md"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => this.setTitleSelection?.("title")}
        >
          {this.label}
        </button>

        <button
          className={`flex-1 text-sm font-medium transition-all duration-300 rounded-full px-3 py-1 ${
            this.titleSelection === "about"
              ? "bg-gray-600 text-white shadow-md"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => this.setTitleSelection?.("about")}
        >
          {this.labelTwo}
        </button>
      </div>
    );
  }
}
