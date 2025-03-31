import { ReactNode } from "react";

interface SkillCardProp {
  name: string;
  icon: ReactNode;
}

const SkillCard = ({ name, icon }: SkillCardProp) => {
  return (
    <div className="bg-gray w-full flex bg-[#2d2e30] rounded-3xl p-5 gap-5 justify-center items-center text-white">
      <div>{icon}</div>
      <div>
        <h4 className="font-semibold text-lg">{name}</h4>
      </div>
    </div>
  );
};

export default SkillCard;
