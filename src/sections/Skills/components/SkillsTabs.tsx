import { motion } from "framer-motion";

const tabs = ["Frontend", "Native", "Testing", "Backend", "Cloud", "Tools"];

const SkillsTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="p-1 bg-black/40 border border-white/5 rounded-[1.2rem] sm:rounded-[1.5rem] backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-wrap gap-1 justify-center sm:flex-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-black transition-all duration-500 rounded-[1rem] cursor-pointer flex-shrink-0 ${
              activeTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#FF4D7D] shadow-[0_0_25px_rgba(255,77,125,0.4)] rounded-[1rem]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillsTabs;