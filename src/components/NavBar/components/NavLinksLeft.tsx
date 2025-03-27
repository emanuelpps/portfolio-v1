import { useState, useEffect } from "react";
import { NavBar } from "./NavBarFactory";
import { NavLinkProp } from "../types/NavLinkProp";
import NavBarButton from "./NavBarButton";

const NavLinksLeft = ({ hashSection, setHashSection }: NavLinkProp) => {
  const [navBar] = useState(new NavBar());

  if (Object.keys(navBar.links).length === 0) {
    navBar.addLink("home", "Home", "#home");
    navBar.addLink("skills", "Skills", "#skills");
    navBar.addLink("experience", "Experience", "#experience");
  }
  useEffect(() => {
    console.log("Hash section changed:", hashSection);
  }, [hashSection]);

  return (
    <div className="flex w-full justify-evenly items-center h-[100%]">
      {Object.entries(navBar.getLinks()).map(([key, link]) => (
        <NavBarButton
          key={key}
          state={hashSection}
          link={link}
          setHashSection={setHashSection}
        />
      ))}
    </div>
  );
};

export default NavLinksLeft;
