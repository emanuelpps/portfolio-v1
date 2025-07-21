import { InputTypes } from "./Types";
import { PrimaryInput } from "./PrimaryInput";
import { SecondaryInput } from "./SecondaryInput";

export class InputFactory {
  static createInput(
    type: string,
    label: string,
    category?: string,
    name?: string,
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): InputTypes {
    switch (type) {
      case "primary":
        return new PrimaryInput(type, label, category ?? "", name, onChange);
      case "secondary":
        return new SecondaryInput(type, label, name, onChange);
      default:
        throw new Error("Input type not supported");
    }
  }
}
