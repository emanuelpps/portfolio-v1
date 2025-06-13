import { TypeOfProject } from "../../../../../types/ProjectTypes";

interface MainImageTwoProps {
  image: string;
  type: TypeOfProject;
}

export const MainImageTwo = ({ image, type }: MainImageTwoProps) => {
  return (
    <div className="relative flex items-center justify-center w-full mt-2 rounded-2xl overflow-hidden bg-[#0F1724] ">
      <img
        src={image}
        className={
          type === TypeOfProject.PROJECT
            ? "w-[90%] rounded-2xl"
            : "w-[50%] object-contain rounded-2xl"
        }
        alt="Main visual"
      />
      <div
        className={`pointer-events-none ${
          type === TypeOfProject.PROJECT
            ? "absolute bottom-0 w-[90%] h-40 bg-gradient-to-b from-transparent to-[#0F1724]"
            : ""
        }`}
      />
    </div>
  );
};
