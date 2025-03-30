import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import SkillsTabs from "./SkillsTabs";

const SkillsContainer = () => {
  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "My journey so far"
  );
  return (
    <div className="w-[100vw] flex justify-center items-center flex-col">
      <div className="flex flex-col justify-start w-[90vw]">
        {SkillsTitle.render()}
      </div>
      <SkillsTabs />
      <div className="bg-black-waves w-[90%] h-[90vh] rounded-4xl bg-cover bg-no-repeat"></div>
    </div>
  );
};

export default SkillsContainer;

///Deberia armar un estado tipo objeto
