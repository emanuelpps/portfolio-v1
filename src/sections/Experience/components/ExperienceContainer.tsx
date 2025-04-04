import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

const ExperienceContainer = () => {
  const ExperienceTitle = TitlesFactory.createTitle(
    "secondary",
    "Experience",
    "My journey so far"
  );
  return (
    <div className="text-center">
      {ExperienceTitle.render()}
    </div>
  );
};

export default ExperienceContainer;
