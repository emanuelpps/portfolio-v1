import { useState, useEffect } from "react";
import { NavBar } from "./NavBarFactory";

interface NavLinksLeftProps {
  hashSection: string;
  setHashSection: (hash: string) => string;
}

const NavLinksLeft = ({ hashSection, setHashSection }: NavLinksLeftProps) => {
  const [navBar] = useState(new NavBar());

  if (Object.keys(navBar.links).length === 0) {
    navBar.addLink("home", "Home", "#home");
    navBar.addLink("skills", "Skills", "#skills");
    navBar.addLink("experience", "Experience", "#experience");
  }
  return (
    <div className="flex w-full justify-evenly items-center h-[100%]">
      {Object.entries(navBar.getLinks()).map(([key, link]) => (
        <button
          key={key}
          className="hover:bg-[#fd853abb] w-full h-[100%] rounded-4xl"
          onClick={() => setHashSection(link.label)}
        >
          <a href={link.hash} className="text-white">
            {link.label}
          </a>
        </button>
      ))}
    </div>
  );
};

export default NavLinksLeft;
