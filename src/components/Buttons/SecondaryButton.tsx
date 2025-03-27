import { Button } from "./Types";
export class SecondaryButton implements Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  render() {
    return (
      <button
        className="px-6 py-3 bg-[#FD853A] text-black rounded-3xl hover:bg-[#fd853ad8] transition font-semibold"
        onClick={() => "do Something"}
      >
        {this.label}
      </button>
    );
  }
}
