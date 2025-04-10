import { Button } from "./Types";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { SelectorButton } from "./SelectorButton";
import { TabButton } from "./TabButton";

type ButtonFactoryOptions =
  | {
      type: "primary" | "secondary";
      label: string;
    }
  | {
      type: "selector";
      label: string;
      labelTwo: string;
      setTitleSelection?: (value: string) => void;
      titleSelection?: string;
    }
  | {
      type: "tab";
      label: string;
      isActive?: boolean;
      setActiveTab: (value: string) => void;
    };

export class ButtonFactory {
  static createButton(options: ButtonFactoryOptions): Button {
    switch (options.type) {
      case "primary":
        return new PrimaryButton(options.label);
      case "secondary":
        return new SecondaryButton(options.label);
      case "selector":
        return new SelectorButton(
          options.label,
          options.labelTwo,
          options.setTitleSelection,
          options.titleSelection
        );
      case "tab":
        return new TabButton(
          options.label,
          Boolean(options.isActive),
          options.setActiveTab
        );
      default:
        throw new Error("Button type not supported");
    }
  }
}
