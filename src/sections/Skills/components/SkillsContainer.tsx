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
    "My journey so far"
  );

  /*   const handleTabChange = (tab: Category) => {
    setActiveTab(tab);
  }; */
  return (
    <div className="w-[100vw] flex justify-center items-center flex-col">
      <div className="flex flex-col justify-start w-[90vw]">
        {SkillsTitle.render()}
      </div>
      <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-black-waves w-[100%] h-[90vh] rounded-4xl bg-cover bg-no-repeat justify-center flex items-center flex-col gap-5">
        <div>
          <h3 className="text-white text-4xl">{activeTab}</h3>
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
