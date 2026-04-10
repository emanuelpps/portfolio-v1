import { Title } from "./components/Title";
import { SectionProps } from "../Types/SectionTypes";
import { ShowcaseSection } from "../ShowCase/ShowCase";

export const DesignApproach: React.FC<SectionProps> = ({ text, images }) => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-5 items-center">
      <Title />
      <ShowcaseSection title="Design Approach" text={text} images={images} />
    </div>
  );
};
