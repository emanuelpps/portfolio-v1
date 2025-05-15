import { TitlesFactory } from "../../../../../components/Titles/TitlesFactory";

export const Title = () => {
  const PurposeTitle = TitlesFactory.createTitle("tertiary", "Challenges");
  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%]">{PurposeTitle.render()}</div>
    </div>
  );
};
