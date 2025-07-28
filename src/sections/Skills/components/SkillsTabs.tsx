import { useState, useEffect } from "react";
import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { FiChevronDown } from "react-icons/fi";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const tabs = ["Frontend", "Native", "Testing", "Backend", "Tools"];

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = screenWidth <= 1023;

  return isMobile ? (

    <section className="flex flex-col items-center justify-center w-[90vw] gap-4 flex-wrap">
      <div
        className="relative flex flex-col justify-between p-3.5 rounded-4xl items-center w-full bg-[#FF4D7D] text-white shadow-inner translate-y-[1px] scale-[0.98] z-[50]"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <div className="flex justify-between w-full">
          {activeTab}
          <FiChevronDown size={25} className="text-white" />
        </div>
        {showDropDown && (
          <ul className="absolute p-3.5 rounded-b-4xl w-full bg-[#FF4D7D] text-white shadow-inner translate-y-[1px] scale-[0.98] top-10">
            {tabs.map((tab) => (
              <li className="flex pt-5" onClick={() => setActiveTab(tab)}>
                {tab}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  ) : (
    <section className="flex justify-center md:justify-end w-[80vw] gap-5 pt-10">
      {tabs.map((tab) => {
        const button = ButtonFactory.createButton({
          type: "tab",
          label: tab,
          isActive: tab === activeTab,
          setActiveTab,
        });
        return <div key={tab}>{button.render()}</div>;
      })}
    </section>
  );
};

export default SkillsTabs;
