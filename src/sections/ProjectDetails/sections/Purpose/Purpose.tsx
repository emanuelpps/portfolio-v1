import { ImageContainer } from "./components/ImageContainer";
import { TextContainer } from "./components/TextContainer";
import { Title } from "./components/Title";

interface PurposeProps {
  text: string;
  images: string[];
}
export const Purpose = ({ text, images }: PurposeProps) => {
  return (
    <div className="flex flex-col w-full h-screen gap-5 items-center">
      <Title />
      <TextContainer text={text} />
      <ImageContainer images={images} />
    </div>
  );
};
