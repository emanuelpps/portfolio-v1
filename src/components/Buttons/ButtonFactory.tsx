import { Button } from "./Types";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { SelectorButton } from "./SelectorButton";

export class ButtonFactory {
  static createButton(
    type: string,
    label: string,
    labelTwo?: string,
    setTitleSelection?: (value: string) => void,
    titleSelection?: string
  ): Button {
    switch (type) {
      case "primary":
        return new PrimaryButton(label);
      case "secondary":
        return new SecondaryButton(label);
      case "selector":
        if (!labelTwo) {
          throw new Error(
            "Both labelOne and labelTwo must be provided for 'selector' buttons."
          );
        }
        return new SelectorButton(
          label,
          labelTwo,
          setTitleSelection,
          titleSelection
        );
      default:
        throw new Error("Button type not supported");
    }
  }
}
