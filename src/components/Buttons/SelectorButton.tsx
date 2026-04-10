import { Button } from "./Types";

export class SelectorButton implements Omit<Button, "isActive"> {
  label: string;
  labelTwo: string;
  setTitleSelection?: (value: string) => void;
  titleSelection?: string;

  constructor(
    label: string,
    labelTwo: string,
    setTitleSelection?: (value: string) => void,
    titleSelection?: string,
  ) {
    this.label = label;
    this.labelTwo = labelTwo;
    this.setTitleSelection = setTitleSelection;
    this.titleSelection = titleSelection;
  }

  render() {
    return (
      <div className="relative flex items-center bg-black/40 rounded-full p-1.5 w-44 h-12 border border-white/5 backdrop-blur-2xl shadow-2xl">
        {/* Fondo animado que se mueve (Píldora activa) */}
        <div
          className={`absolute h-8 w-[calc(50%-6px)] bg-[#FF4D7D] rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,77,125,0.4)] ${
            this.titleSelection === "about"
              ? "translate-x-full"
              : "translate-x-0"
          }`}
        />

        <button
          className={`relative z-10 flex-1 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${
            this.titleSelection === "title"
              ? "text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
          onClick={() => this.setTitleSelection?.("title")}
        >
          {this.label}
        </button>

        <button
          className={`relative z-10 flex-1 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${
            this.titleSelection === "about"
              ? "text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
          onClick={() => this.setTitleSelection?.("about")}
        >
          {this.labelTwo}
        </button>
      </div>
    );
  }
}
