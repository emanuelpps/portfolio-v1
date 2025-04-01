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
      <>
        <h2 className="font-semibold text-4xl text-white">
          {this.subtitle}
        </h2>
        <h1 className="font-semibold text-5xl text-[#fd853a]">{this.title}</h1>
      </>
    );
  }
}
