import { InputTypes } from "./Types";
import { PrimaryInput } from "./PrimaryInput";
import { SecondaryInput } from "./SecondaryInput";

export class InputFactory {
  static createInput(
    type: string,
    label: string,
    category?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): InputTypes {
    switch (type) {
      case "primary":
        return new PrimaryInput(type, label, category ?? "", value, onChange);
      case "secondary":
        return new SecondaryInput(type, label);
      default:
        throw new Error("Input type not supported");
    }
  }
}
