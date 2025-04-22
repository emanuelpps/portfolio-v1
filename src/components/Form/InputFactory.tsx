import { InputTypes } from "./Types";
import { PrimaryInput } from "./PrimaryInput";
import { SecondaryInput } from "./SecondaryInput";

export class InputFactory {
  static createInput(type: string, label: string, category?: string): InputTypes {
    switch (type) {
      case "primary":
        return new PrimaryInput(type, label, category ?? "");
      case "secondary":
        return new SecondaryInput(type, label);
      default:
        throw new Error("Input type not supported");
    }
  }
}
