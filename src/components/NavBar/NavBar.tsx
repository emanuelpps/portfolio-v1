import { useState, useEffect } from "react";
import LogoContainer from "./components/LogoContainer";
import NavLinksLeft from "./components/NavLinksLeft";
import NavLinksRight from "./components/NavLinksRight";
import NavBarMobile from "./components/NavBarMobile";

const NavBar: React.FC = () => {
  const [hashSection, setHashSection] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center z-50 transition-all duration-500 py-4 md:py-6">
      <nav
        className={`
          flex items-center justify-between px-4 md:px-8 py-2
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "w-[95%] md:w-[80%] bg-gray-950/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-full"
              : "w-full md:w-[90%] bg-transparent border-border-transparent rounded-2xl"
          }
        `}
      >
        <div className="hidden lg:flex flex-1 justify-start">
          <NavLinksLeft
            hashSection={hashSection}
            setHashSection={setHashSection}
          />
        </div>
        <div className="flex-shrink-0 z-[110]">
          <LogoContainer />
        </div>
        <div className="hidden lg:flex flex-1 justify-end">
          <NavLinksRight
            hashSection={hashSection}
            setHashSection={setHashSection}
          />
        </div>
        <div className="lg:hidden">
          <NavBarMobile
            hashSection={hashSection}
            setHashSection={setHashSection}
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
