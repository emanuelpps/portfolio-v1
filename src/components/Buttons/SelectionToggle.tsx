import { Button } from "./Types";

export class SelectionToggle implements Button {
  label: string;
  isActive: boolean;
  setActiveTab: (value: string) => void;

  constructor(
    label: string,
    isActive: boolean,
    setActiveTab: (value: string) => void
  ) {
    this.label = label;
    this.isActive = isActive;
    this.setActiveTab = setActiveTab;
  }
  render() {
    return (
      <button
        className={`px-6 py-3 w-[100px] rounded-xl font-semibold transition-all cursor-pointer duration-150 ease-in-out
        ${
          this.isActive
            ? "bg-[#FF4D7D] text-white shadow-inner translate-y-[1px] scale-[0.98]"
            : "bg-gray-800 text-gray-300 hover:bg-[#FF4D7D] hover:text-white hover:shadow-lg shadow-md active:scale-[0.97] active:translate-y-[1px]"
        }
      `}
        onClick={() => this.setActiveTab(this.label)}
      >
        {this.label}
      </button>
    );
  }
}
