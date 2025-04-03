import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";

interface SkillsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const tabs = ["Frontend", "Native", "Testing", "Backend"];

const SkillsTabs = ({ activeTab, setActiveTab }: SkillsProps) => {
  return (
    <div className="flex justify-center md:justify-end w-[80vw] gap-5 pt-10">
      {tabs.map((tab) => (
        <div key={tab} className="transition-all">
          {ButtonFactory.createButton("tab", tab, activeTab, setActiveTab).render()}
        </div>
      ))}
    </div>
  );
};

export default SkillsTabs;
