import { TitlesProp } from "./Types";
export class TertiaryTitle implements TitlesProp {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  render() {
    return (
      <div className="flex flex-col">
        <h1 className="font-semibold text-4xl text-[#FF4D7D]">{this.title}</h1>
      </div>
    );
  }
}
