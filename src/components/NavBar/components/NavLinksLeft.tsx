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
    <div className="flex w-full justify-evenly items-center h-[100%]">
      {Object.entries(navBar.getLinks()).map(([key, link]) => (
        <button key={key} className="hover:bg-[#fd853abb] w-full h-[100%] rounded-4xl ">
          <a href={link.hash} className="text-white">{link.label}</a>
        </button>
      ))}
    </div>
  );
};

export default NavLinksLeft;
