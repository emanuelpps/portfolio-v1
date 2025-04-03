import { TitlesProp } from "./Types";
export class SecondaryTitle implements TitlesProp {
  title: string;
  subtitle?: string;

  constructor(title: string, subtitle?: string) {
    this.title = title;
    this.subtitle = subtitle;
  }

  render() {
    return (
      <div className="flex flex-col justify-start items-start">
        <h2 className="font-semibold text-4xl text-white">{this.subtitle}</h2>
        <h1 className="font-semibold text-5xl text-[#FF4D7D]">{this.title}</h1>
      </div>
    );
  }
}
