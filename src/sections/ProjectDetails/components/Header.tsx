import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { GoBrowser } from "react-icons/go";

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
  const ProjectTitle = TitlesFactory.createTitle("secondary", `${title}`);
  const GithubButton = ButtonFactory.createButton({
    type: "tertiary",
    label: `${buttonText}`,
    icon: <FaGithub className="text-xl" />,
  });
  const DeployButton = ButtonFactory.createButton({
    type: "tertiary",
    label: `${buttonText}`,
    icon: <GoBrowser className="text-xl" />,
  });

  return (
    <div className="relative flex flex-col items-center w-full gap-5 pt-10 text-white">
      {/* Close button */}
      <Link
        to="/"
        className="absolute text-white transition-colors duration-200 top-5 right-5 hover:text-gray-400"
        aria-label="Close project view"
      >
        <RiCloseLargeLine size={24} className="cursor-pointer" />
      </Link>

      <div className="flex w-[80%] items-center">{ProjectTitle.render()}</div>

      <div className="flex w-[80%] items-center">
        <p className="text-xl">{subtitle}</p>
      </div>

      <div className="flex gap-20 mt-4 text-white">
        {code && GithubButton.render()}
        {deploy && DeployButton.render()}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {stack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm text-white rounded-lg bg-white/10"
          >
            {tech}
          </span>
        ))}
      </div>
 <div className="flex text-white gap-40">
        <a href={code}>
          <button className="bg-gray-300">Code</button>
        </a>
        <a href={deploy}>
          <button className="bg-gray-300">Deploy</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
