import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import icons from "../../../components/Icons/IconsConfig";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

type Category = keyof typeof icons;

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  const TabFrontend = ButtonFactory.createButton("tab", "Frontend", activeTab, setActiveTab);
  const TabNative = ButtonFactory.createButton("tab", "Native", activeTab);
  const TabTesting = ButtonFactory.createButton("tab", "Testing", activeTab);
  const TabBackend = ButtonFactory.createButton("tab", "Backend", activeTab);

  const handleTabChange = (tab: Category) => {
    setActiveTab(tab);
  };
  return (
    <div className="justify-end flex w-[80vw] gap-5">
      {TabFrontend.render()}
      {TabNative.render()}
      {TabTesting.render()}
      {TabBackend.render()}
    </div>
  );
};

export default SkillsTabs;
