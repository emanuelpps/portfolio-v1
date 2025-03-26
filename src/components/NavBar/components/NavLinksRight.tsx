import { useState, useEffect } from "react";
import { NavBar } from "./NavBarFactory";
interface NavLinksRightProps {
  hashSection: string;
  setHashSection: (hash: string) => string;
}
const NavLinksRight = ({ hashSection, setHashSection }: NavLinksRightProps) => {
  const [navBar] = useState(new NavBar());

  if (Object.keys(navBar.links).length === 0) {
    navBar.addLink("projects", "Projects", "#projects");
    navBar.addLink("resume", "Resume", "#resume");
    navBar.addLink("contact", "Contact", "#contact");
  }

  useEffect(() => {
    console.log("Hash section changed:", hashSection); // ✅ Ahora useEffect está bien escrito
  }, [hashSection]);
  return (
    <div className="flex w-full justify-evenly items-center h-[100%]">
      {Object.entries(navBar.getLinks()).map(([key, link]) => (
        <button
          key={key}
          className={`hover:bg-[#fd853abb] w-full h-[100%] rounded-4xl ${
            hashSection === link.hash ? "bg-[#FD853A]" : ""
          }`}
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

export default NavLinksRight;
