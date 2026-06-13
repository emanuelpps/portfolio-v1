import { ButtonContainer } from "./components/ButtonContainer";
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
  stack,
  deploy,
  code,
  buttonText,
}: HeaderProps) => {
  return (
    <header className="pt-20 md:pt-32 flex flex-col gap-10">
      <div className="space-y-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--accent)]">
          Project Showcase
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
          {title.toUpperCase()}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
        <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
          {subtitle}
        </p>
        <div className="flex flex-col gap-6 items-start md:items-end">
          <StackContainer stack={stack} />
          <ButtonContainer
            code={code}
            deploy={deploy}
            buttonText={buttonText}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
