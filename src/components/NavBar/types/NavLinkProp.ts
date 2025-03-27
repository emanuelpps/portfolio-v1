export interface NavLinkProp {
  hashSection: string;
  setHashSection: (hash: string) => void;
}

export interface NavBarButtonProp {
  key: number;
  link: NavLinkProp;
  label: string;
  state: string;
}
