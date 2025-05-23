import { SectionContainer } from "./components/SectionContainer";
import { Title } from "./components/Title";
import { SectionProps } from "../Types/SectionTypes";

export const DesignApproach: React.FC<SectionProps> = ({ text, images }) => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-5 items-center">
      <Title />
      <SectionContainer text={text} images={images} />
    </div>
  );
};
