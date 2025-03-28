import { TitlesProp } from "./Types";
export class PrimaryTitle implements TitlesProp {
  title: string;
  subtitle?: string;

  constructor(title: string, subtitle?: string) {
    this.title = title;
    this.subtitle = subtitle;
  }

  render() {
    return (
      <>
        <h2>{this.subtitle}</h2>
        <h1>{this.title}</h1>
      </>
    );
  }
}
