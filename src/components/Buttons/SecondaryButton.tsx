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
        className="flex items-center gap-2 px-6 py-3 border border-[#FF4D7D] text-white rounded-3xl bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 transition-all duration-300 font-semibold"
      >
        {this.label}
        <FaArrowUp className="text-sm text-white transition-transform group-hover:-translate-y-1" />
      </button>
    );
  }
}
