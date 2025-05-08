import { TitlesFactory } from "../../../../../components/Titles/TitlesFactory";

interface TitleProps {
  title: string;
  subtitle: string;
}
export const Title = ({ title, subtitle }: TitleProps) => {
  const ProjectTitle = TitlesFactory.createTitle("secondary", `${title}`);

  return (
    <>
      <div className="flex w-[80%] items-center">{ProjectTitle.render()}</div>
      <div className="flex w-[80%] items-center">
        <p className="text-xl">{subtitle}</p>
      </div>
    </>
  );
};
