class NavBarLink {
  label: string;
  hash: string;

  constructor(label: string, hash: string) {
    this.label = label;
    this.hash = hash;
  }
}

class NavBarFactory {
  static createLink(label: string, hash: string): NavBarLink {
    return new NavBarLink(label, hash);
  }
}

export class NavBar {
  links: { [key: string]: NavBarLink };

  constructor() {
    this.links = {};
  }

  addLink(key: string, label: string, hash: string) {
    this.links[key] = NavBarFactory.createLink(label, hash);
  }

  getLinks(): { [key: string]: NavBarLink } {
    return this.links;
  }
}
