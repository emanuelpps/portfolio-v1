import { TitlesProp } from "./Types";
import { PrimaryTitle } from "./PrimaryTitle";
import { SecondaryTitle } from "./SecondaryTitle";

export class TitlesFactory {
  static createTitle(
    type: string,
    title: string,
    subtitle?: string
  ): TitlesProp {
    switch (type) {
      case "primary":
        return new PrimaryTitle(title, subtitle);
      case "secondary":
        return new SecondaryTitle(title, subtitle);
      default:
        throw new Error("Title type not supported");
    }
  }
}
