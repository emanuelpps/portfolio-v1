import { SectionProps } from "../Types/SectionTypes";
import { SectionContainer } from "./components/SectionContainer";
import { Title } from "./components/Title";

const Challenges: React.FC<SectionProps> = ({ text, images }) => {
  return (
    <div>
      <Title />
      <SectionContainer text={text} images={images} />
    </div>
  );
};

export default Challenges;
