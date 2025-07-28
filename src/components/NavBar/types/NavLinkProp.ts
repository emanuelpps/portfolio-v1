export interface NavLinkProp {
  hashSection: string;
  setHashSection: (hash: string) => void;
  showDropDown?: (value: boolean) => void;
  showDropDownVisible?: boolean
}

export interface NavBarButtonProp {
  link: { hash: string; label: string };
  state: string;
  setHashSection: (hash: string) => void;
}
