import { useState } from "react";
import { NavBar } from "./NavBarFactory";

const NavLinksLeft = () => {
  const [navBar] = useState(new NavBar());

  if (Object.keys(navBar.links).length === 0) {
    navBar.addLink("home", "Home", "#home");
    navBar.addLink("skills", "Skills", "#skills");
    navBar.addLink("experience", "Experience", "#experience");
  }
  return (
    <div className="flex w-full justify-evenly items-center">
      {Object.entries(navBar.getLinks()).map(([key, link]) => (
        <button key={key}>
          <a href={link.hash}>{link.label}</a>
        </button>
      ))}
    </div>
  );
};

export default NavLinksLeft;
