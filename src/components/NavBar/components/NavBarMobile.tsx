import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import MenuMobile from "./MenuMobile";
import { motion, AnimatePresence } from "framer-motion";

interface NavBarMobileProps {
  hashSection: string;
  setHashSection: (hash: string) => void;
}

const NavBarMobile: React.FC<NavBarMobileProps> = ({
  hashSection,
  setHashSection,
}) => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-end w-full px-5">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setDropDownVisible(!dropDownVisible)}
        className={`z-[110] w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-500 ${
          dropDownVisible
            ? "bg-[#FF4D7D] border-[#FF4D7D] shadow-[0_0_20px_rgba(255,77,125,0.4)]"
            : "bg-white/5 border-white/10 backdrop-blur-md"
        }`}
      >
        <CgMenuRightAlt
          className={`text-2xl transition-transform duration-500 ${dropDownVisible ? "rotate-90 text-white" : "text-white"}`}
        />
      </motion.button>
      <AnimatePresence>
        {dropDownVisible && (
          <MenuMobile
            hashSection={hashSection}
            setHashSection={(hash) => {
              setHashSection(hash);
              setDropDownVisible(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBarMobile;
