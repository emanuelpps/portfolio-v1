import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import SkillsTabs from "./SkillsTabs";
import icons from "../../../components/Icons/IconsConfig";
import SkillCard from "./SkillCard";

//type Category = keyof typeof icons;

const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "What I can do"
  );

  /*   const handleTabChange = (tab: Category) => {
    setActiveTab(tab);
  }; */
  return (
    <div className="w-[100vw] flex justify-center items-center flex-col">
      <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-[#222222] from-orange-900 to-orange-300 w-[100%] h-[90vh] rounded-4xl bg-cover bg-no-repeat justify-center flex items-center flex-col gap-5">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center text-start items-center w-full">
            <div>{SkillsTitle.render()}</div>
          </div>
          <h3 className="flex flex-col justify-center items-center w-full text-white font-medium text-4xl">
            {activeTab}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 place-items-center">
          {icons[activeTab].map(({ name, icon }) => (
            <SkillCard key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsContainer;

///Deberia armar un estado tipo objeto
