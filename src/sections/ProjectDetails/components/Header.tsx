import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";

interface HeaderProps {
  title: string;
  subtitle: string;
  code?: string;
  deploy?: string;
  stack: string[];
}

const Header = ({ title, subtitle, code, deploy, stack }: HeaderProps) => {
  const ProjectTitle = TitlesFactory.createTitle("secondary", `${title}`);

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
        <p>{subtitle}</p>
      </div>

      <div className="flex gap-8 mt-4 text-white">
        {code && (
          <a href={code} target="_blank" rel="noopener noreferrer">
            <button className="px-4 py-2 text-black transition bg-gray-300 rounded-md hover:bg-white">
              Code
            </button>
          </a>
        )}
        {deploy && (
          <a href={deploy} target="_blank" rel="noopener noreferrer">
            <button className="px-4 py-2 text-black transition bg-gray-300 rounded-md hover:bg-white">
              Deploy
            </button>
          </a>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {stack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm text-white rounded-full bg-white/10"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;
