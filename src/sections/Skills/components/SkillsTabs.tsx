import { motion } from "framer-motion";

const tabs = ["Frontend", "Native", "Testing", "Backend", "Tools"];

const SkillsTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="flex p-1.5 bg-gray-950/50 border border-white/5 rounded-2xl backdrop-blur-md">
      <div className="hidden md:flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === tab
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#FF4D7D] shadow-[0_0_20px_rgba(255,77,125,0.4)] rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Mobile: Selector simplificado o Scroll Horizontal */}
      <div className="md:hidden flex overflow-x-auto gap-2 no-scrollbar p-1">
        {/* ... Código similar o select optimizado ... */}
      </div>
    </div>
  );
};

export default SkillsTabs;
