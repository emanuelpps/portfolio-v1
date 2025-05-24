import { PrimarySection } from "./PrimarySection";
//import { SecondarySection } from "./SecondarySection";
import { SectionTypes, SectionParams } from "./Types";

export class SectionFactory {
  static createSection({
    type,
    text,
    images,
  }: SectionParams): SectionTypes {
    switch (type) {
      case "primary":
        return new PrimarySection(text, images);
/*       case "secondary":
        return new SecondarySection(text, images); */
      default:
        throw new Error("Section type not supported");
    }
  }
}
