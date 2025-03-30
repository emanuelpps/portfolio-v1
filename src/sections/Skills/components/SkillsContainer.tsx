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
      <SkillsTabs />
      <div className="bg-black-waves w-[90%] h-[90vh] rounded-2xl bg-cover bg-no-repeat">
        <div>{SkillsTitle.render()}</div>
      </div>
    </div>
  );
};

export default SkillsContainer;

///Deberia armar un estado tipo objeto
