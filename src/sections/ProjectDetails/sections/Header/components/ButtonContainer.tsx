import { ButtonFactory } from "../../../../../components/Buttons/ButtonFactory";
import { FaGithub } from "react-icons/fa";
import { GoBrowser } from "react-icons/go";

interface ButtonProps {
  code: string | undefined;
  deploy: string | undefined;
  buttonText: string;
}

export const ButtonContainer = ({ code, deploy, buttonText }: ButtonProps) => {
  const GithubButton = ButtonFactory.createButton({
    type: "tertiary",
    label: "Repository",
    icon: <FaGithub className="text-xl" />,
  });
  const DeployButton = ButtonFactory.createButton({
    type: "tertiary",
    label: `${buttonText}`,
    icon: <GoBrowser className="text-xl" />,
  });
  return (
    <>
      <div className="flex gap-20 mt-4 text-white">
        {code && GithubButton.render()}
        {deploy && DeployButton.render()}
      </div>
    </>
  );
};
