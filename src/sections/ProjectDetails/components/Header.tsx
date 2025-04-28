import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

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
    <div className="text-white w-full flex flex-col items-center h-screen justify-center gap-5">
      <div className="flex w-[80%] items-center">{ProjectTitle.render()}</div>
      <div className="flex w-[80%] items-center">
        <p>{subtitle}</p>
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
