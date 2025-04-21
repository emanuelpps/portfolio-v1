import { InputTypes } from "./Types";
import { PrimaryInput } from "./PrimaryInput";
import { SecondaryInput } from "./SecondaryInput";

export class InputFactory {
  static createButton(options: InputTypes): InputTypes {
    switch (options.type) {
      case "primary":
        return new PrimaryInput(options.type, options.label);
      case "secondary":
        return new SecondaryInput(options.type, options.label);
      default:
        throw new Error("Button type not supported");
    }
  }
}
