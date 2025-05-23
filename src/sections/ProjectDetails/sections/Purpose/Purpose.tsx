import { Title } from "./components/Title";
import { SectionContainer } from "./components/SectionContainer";
import { SectionProps } from "../Types/SectionTypes";

export const Purpose: React.FC<SectionProps> = ({ text }) => {
  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <Title />
      <SectionContainer text={text}/>
    </div>
  );
};
