import { Button } from "./Types";
import { FaArrowUp } from "react-icons/fa";

export class SecondaryButton implements Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  render() {
    return (
      <button
        onClick={() => {
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="flex items-center gap-2 px-6 py-3 border-[1px] border-gray text-white rounded-3xl backdrop-blur-md shadow-lg hover:bg-gray-800 transition-all duration-300 font-semibold cursor-pointer"
      >
        {this.label}
        <FaArrowUp className="text-sm text-white transition-transform group-hover:-translate-y-1" />
      </button>
    );
  }
}
