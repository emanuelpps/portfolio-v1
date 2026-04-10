import { ShowcaseSection } from "../ShowCase/ShowCase";
import { SectionProps } from "../Types/SectionTypes";
import { Title } from "./components/Title";

const Challenges: React.FC<SectionProps> = ({ text, images }) => {
  return (
    <div className="mb-20">
      <Title />
      <ShowcaseSection
        title="Challenges & Solutions"
        text={text}
        images={images}
      />
    </div>
  );
};

export default Challenges;
