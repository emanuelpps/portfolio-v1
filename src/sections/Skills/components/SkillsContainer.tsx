import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import SkillsTabs from "./SkillsTabs";
import icons from "../../../components/Icons/IconsConfig";
import SkillCard from "./SkillCard";

const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "What I can do"
  );

  return (
    <div className="flex flex-col items-center w-full">
      <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className=" bg-gray-900/50 backdrop-blur-lg shadow-lg w-full max-w-7xl min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800">
        <div className="text-center flex w-[90%] justify-between items-center">
          {SkillsTitle.render()}
          <h3 className="text-white font-semibold text-4xl mt-4 drop-shadow-lg">
            {activeTab}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
          {icons[activeTab].map(({ name, icon }) => (
            <SkillCard key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsContainer;
