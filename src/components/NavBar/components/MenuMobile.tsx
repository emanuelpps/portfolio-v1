import { useMemo, useEffect } from "react";
import { NavBar } from "./NavBarFactory";
import { NavLinkProp } from "../types/NavLinkProp";
import { motion } from "framer-motion";
import NavBarButton from "./NavBarButton";

const MenuMobile: React.FC<NavLinkProp> = ({
  hashSection,
  setHashSection,
  showDropDown,
  showDropDownVisible,
}) => {
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

  useEffect(() => {
    console.log("Hash section changed:", hashSection);
  }, [hashSection]);

  return (
    <motion.div
      className="absolute z-50 text-white top-7"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-start justify-center p-4 space-y-2 text-white border border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-lg rounded-2xl">
        {Object.entries(navBar.getLinks()).map(([key, link]) => (
          <NavBarButton
            key={key}
            state={hashSection}
            link={link}
            setHashSection={setHashSection}
            showDropDown={showDropDown}
            showDropDownVisible={showDropDownVisible}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MenuMobile;
