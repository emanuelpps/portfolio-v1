import { ButtonFactory } from "../../../../../components/Buttons/ButtonFactory";
import { FaGithub } from "react-icons/fa";
import { GoBrowser } from "react-icons/go";

interface ButtonProps {
  code: string | undefined;
  deploy: string | undefined;
  buttonText: string;
  link?: string;
}

export const ButtonContainer = ({ code, deploy, buttonText }: ButtonProps) => {
  const GithubButton = ButtonFactory.createButton({
    type: "tertiary",
    label: "Repository",
    icon: <FaGithub className="text-xl" />,
    link: code,
  });
  const DeployButton = ButtonFactory.createButton({
    type: "tertiary",
    label: `${buttonText}`,
    icon: <GoBrowser className="text-xl" />,
    link: deploy,
  });
  return (
    <>
      <div className="flex flex-row justify-center w-full gap-5 text-white md:gap-20 md:mt-4">
        {code && GithubButton.render()}
        {deploy && DeployButton.render()}
      </div>
    </>
  );
};
