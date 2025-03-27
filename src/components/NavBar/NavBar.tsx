import LogoContainer from "./components/LogoContainer";
import NavLinksLeft from "./components/NavLinksLeft";
import NavLinksRight from "./components/NavLinksRight";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [hashSection, setHashSection] = useState<string>("");
  return (
    <nav className="w-[100%] flex justify-center items-center h-[9vh]">
      <div className="flex w-[80%] bg-black items-center text-white justify-between h-[100%] rounded-4xl p-2">
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
