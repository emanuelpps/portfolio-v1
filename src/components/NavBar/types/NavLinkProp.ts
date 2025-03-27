export interface NavLinkProp {
  hashSection: string;
  setHashSection: (hash: string) => void;
}

export interface NavBarButtonProp {
  link: { hash: string; label: string };
  state: string;
  setHashSection: (hash: string) => void;
}
