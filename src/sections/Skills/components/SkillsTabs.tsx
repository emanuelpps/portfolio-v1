import { useState, useEffect } from "react";
import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const tabs = ["Frontend", "Native", "Testing", "Backend", "Tools"];

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = screenWidth <= 1023;

  return isMobile ? (
    <div className="flex justify-center w-[90vw] gap-4 pt-20 flex-wrap-reverse">
      {tabs.map((tab) => {
        const button = ButtonFactory.createButton({
          type: "selectionToggler",
          label: tab,
          isActive: tab === activeTab,
          setActiveTab,
        });
        return <div key={tab}>{button.render()}</div>;
      })}
    </div>
  ) : (
    <div className="flex justify-center md:justify-end w-[80vw] gap-5 pt-10">
      {tabs.map((tab) => {
        const button = ButtonFactory.createButton({
          type: "tab",
          label: tab,
          isActive: tab === activeTab,
          setActiveTab,
        });

        return <div key={tab}>{button.render()}</div>;
      })}
    </div>
  );
};

export default SkillsTabs;
