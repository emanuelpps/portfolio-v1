import { Button } from "./Types";
import { JSX } from "react";

export class TabButton implements Button {
  label: string;
  activeLabel?: string;
  setTitleSelection?: (value: string) => void;

  constructor(
    label: string,
    activeLabel?: string,
    setTitleSelection?: (value: string) => void
  ) {
    this.label = label;
    this.activeLabel = activeLabel;
    this.setTitleSelection = setTitleSelection;
  }

  render = (): JSX.Element => {

    const handleChange = (value:string) => {
      this.setTitleSelection(value)
    }
    return (
      <button
        className={`px-6 py-3 rounded-t-3xl transition font-semibold cursor-pointer ${
          this.activeLabel === this.label
            ? "bg-[#FF6900] text-white hover:bg-[#FCB173]"
            : "bg-white text-black hover:bg-gray-200"
        }`}
        onClick={() => handleChange(this.label)}
      >
        {this.label}
      </button>
    );
  };
}

export default TabButton;
