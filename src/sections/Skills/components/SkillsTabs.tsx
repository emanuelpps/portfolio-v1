import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  const TabFrontend = ButtonFactory.createButton("tab", "Frontend");
  const TabNative = ButtonFactory.createButton("tab", "Native");
  const TabTesting = ButtonFactory.createButton("tab", "Testing");
  const TabBackend = ButtonFactory.createButton("tab", "Backend");
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
