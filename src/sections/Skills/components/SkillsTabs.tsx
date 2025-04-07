import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const tabs = ["Frontend", "Native", "Testing", "Backend"];

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  return (
    <div className="flex justify-center md:justify-end w-[80vw] gap-5 pt-10">
      {tabs.map((tab) => {
        const button = ButtonFactory.createButton(
          "tab",
          tab,
          tab === activeTab,
          setActiveTab
        );
        return <div key={tab}>{button.render()}</div>;
      })}
    </div>
  );
};

export default SkillsTabs;
