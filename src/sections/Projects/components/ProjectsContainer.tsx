import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

export const ProjectsContainer = () => {
  const ProjectsTitle = TitlesFactory.createTitle(
    "secondary",
    "Projects",
    "I've been working on these"
  );
  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-900/50 backdrop-blur-lg shadow-lg w-full max-w-7xl min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800">
        <div className="text-center flex w-[80%] justify-between items-center">
          <div className="flex w-full justify-start text-start items-center">
            {ProjectsTitle.render()}
          </div>
          <div className="flex w-full justify-start text-start items-center"></div>
        </div>
      </div>
    </div>
  );
};
