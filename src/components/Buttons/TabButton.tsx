import { Button } from "./Types";

export class TabButton implements Button {
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
        className={`px-6 py-3 rounded-t-xl font-semibold transition-all cursor-pointer shadow-md ${
          this.isActive
            ? "bg-[#FF4D7D] text-white shadow-lg"
            : "bg-gray-800 text-gray-300 hover:bg-[#FF4D7D] hover:text-white hover:shadow-lg"
        }`}
        onClick={() => this.setActiveTab(this.label)}
      >
        {this.label}
      </button>
    );
  }
}
