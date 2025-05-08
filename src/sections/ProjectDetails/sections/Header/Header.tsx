import { Title } from "./components/Title";
import { ButtonContainer } from "./components/ButtonContainer";
import { CloseButton } from "./components/CloseButton";
import { StackContainer } from "./components/StackContainer";

interface HeaderProps {
  title: string;
  subtitle: string;
  code?: string;
  deploy?: string;
  stack: string[];
  buttonText: string;
}

const Header = ({
  title,
  subtitle,
  code,
  deploy,
  stack,
  buttonText,
}: HeaderProps) => {
  return (
    <div className="relative flex flex-col items-center w-full gap-5 pt-10 text-white">
      <CloseButton />
      <Title title={title} subtitle={subtitle} />
      <ButtonContainer code={code} deploy={deploy} buttonText={buttonText} />
      <StackContainer stack={stack} />
    </div>
  );
};

export default Header;
