import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import icons from "../../../components/Icons/IconsConfig";
import SkillCard from "./SkillCard";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

const tabs = ["Frontend", "Native", "Testing", "Backend", "Tools"];

export const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "What I can do"
  );

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div
        ref={ref}
        className="backdrop-blur-lg shadow-lg max-w-[95vw] md:w-full md:max-w-7xl md:h-[700px] min-h-[500px] flex flex-col items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pb-10 bg-gray-900/50"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center w-[95vw] md:w-[80%] md:h-[100px] gap-4">
          <div className="flex justify-center items-center text-center md:text-start w-full md:justify-start">
            {SkillsTitle.render()}
          </div>
          <div className="relative flex flex-col items-center w-full max-w-[250px] z-[50] md:items-end">
            <div
              className="relative flex justify-between items-center p-4 rounded-3xl w-full bg-[#FF4D7D] bg-opacity-90 backdrop-blur-md text-white shadow-lg cursor-pointer select-none"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <span className="text-xl font-semibold tracking-wide">
                {activeTab}
              </span>
              <motion.div
                animate={{ rotate: showDropDown ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center"
              >
                <FiChevronDown size={24} />
              </motion.div>
            </div>
            <AnimatePresence>
              {showDropDown && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute left-0 right-0 z-50 mt-3 overflow-hidden bg-gray-900 shadow-2xl top-full bg-opacity-80 backdrop-blur-lg rounded-2xl ring-1 ring-white/20"
                >
                  {tabs.map((tab, index) => (
                    <motion.li
                      key={tab}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#FF6380",
                        color: "white",
                        fontWeight: "600",
                      }}
                      className={`cursor-pointer px-5 py-3 text-white text-base transition-colors ${
                        index !== 0 ? "border-t border-white/10" : ""
                      }`}
                      onClick={() => {
                        setActiveTab(tab);
                        setShowDropDown(false);
                      }}
                    >
                      {tab}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 place-items-center justify-items-center">
            {icons[activeTab].map(({ name, Icon }) => (
              <SkillCard key={name} name={name} Icon={Icon} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
