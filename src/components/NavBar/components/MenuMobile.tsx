import { useMemo } from "react";
import { NavBar } from "./NavBarFactory";
import { NavLinkProp } from "../types/NavLinkProp";
import { motion } from "framer-motion";
import NavBarButton from "./NavBarButton";

const MenuMobile: React.FC<NavLinkProp> = ({ hashSection, setHashSection }) => {
  const navBar = useMemo(() => {
    const instance = new NavBar();
    if (Object.keys(instance.getLinks()).length === 0) {
      instance.addLink("home", "Home", "#home");
      instance.addLink("skills", "Skills", "#skills");
      instance.addLink("experience", "Experience", "#experience");
      instance.addLink("projects", "Projects", "#projects");
      instance.addLink("contact", "Contact", "#contact");
    }
    return instance;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-16 right-5 z-[100] w-64 origin-top-right"
    >
      <div className="relative overflow-hidden p-6 bg-[#0a0f18]/95 border border-white/10 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D7D]/10 blur-[50px] -z-10" />
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 mb-6 px-2"></div>
          <div className="flex flex-col gap-2">
            {Object.entries(navBar.getLinks()).map(([key, link], i) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={key}
              >
                <NavBarButton
                  state={hashSection}
                  link={link}
                  setHashSection={setHashSection}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuMobile;
