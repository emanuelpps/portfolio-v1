import { Button } from "./Types";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { SelectorButton } from "./SelectorButton";
import { TabButton } from "./TabButton";
import { TertiaryButton } from "./TertiaryButton";
import { JSX } from "react";
import { SelectionToggle } from "./SelectionToggle";

type ButtonFactoryOptions =
  | {
      type: "primary" | "secondary" | "tertiary";
      label: string | JSX.Element;
      icon?: JSX.Element;
      link?: string;
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
  | {
      type: "selector";
      label: string;
      labelTwo: string;
      setTitleSelection?: (value: string) => void;
      titleSelection?: string;
    }
  | {
      type: "selectionToggler";
      label: string;
      isActive?: boolean;
      setActiveTab: (value: string) => void;
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
        return new PrimaryButton(options.label, options.onClick);
      case "secondary":
        return new SecondaryButton(options.label);
      case "tertiary":
        return new TertiaryButton(options.label, options.icon, options.link);
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
          options.isActive ?? false,
          options.setActiveTab
        );
      case "selectionToggler":
        return new SelectionToggle(
          options.label,
          options.isActive ?? false,
          options.setActiveTab
        );
      default:
        throw new Error("Unsupported button type");
    }
  }
}
