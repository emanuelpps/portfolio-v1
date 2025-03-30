import { Button } from "./Types";
export class TabButton implements Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  render() {
    return (
      <button className="px-6 py-3 bg-white text-black rounded-3xl hover:bg-gray-200 transition font-semibold cursor-pointer" onClick={() => "do something"}>
        {this.label}
      </button>
    );
  }
}
