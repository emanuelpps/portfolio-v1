import { ReactNode } from "react";

interface SkillCardProp {
  name: string;
  icon: ReactNode;
}

const SkillCard = ({ name, icon }: SkillCardProp) => {
  return (
    <div className="bg-gray-900 w-full max-w-[250px] flex justify-center items-center gap-5 p-6 rounded-3xl text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
      <div className="text-4xl text-[#FF4D7D]">{icon}</div>
      <h4 className="font-normal text-md drop-shadow-sm">{name}</h4>
    </div>
  );
};

export default SkillCard;
