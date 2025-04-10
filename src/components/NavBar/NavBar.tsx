import LogoContainer from "./components/LogoContainer";
import NavLinksLeft from "./components/NavLinksLeft";
import NavLinksRight from "./components/NavLinksRight";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [hashSection, setHashSection] = useState<string>("");
  return (
    <nav className="fixed top-5 left-0 w-full flex justify-center items-center h-[10vh] z-50">
      <div className="flex w-[85%] bg-gray-900/50 backdrop-blur-lg shadow-lg items-center justify-between h-full rounded-2xl px-6 py-3 text-white border border-gray-800">
        <NavLinksLeft
          hashSection={hashSection}
          setHashSection={setHashSection}
        />
        <LogoContainer />
        <NavLinksRight
          hashSection={hashSection}
          setHashSection={setHashSection}
        />
      </div>
    </nav>
  );
};

export default NavBar;
