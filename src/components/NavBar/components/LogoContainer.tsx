import { motion } from "framer-motion";
import LogoImage from "@/assets/images/epLogo.png";

const LogoContainer = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#FF4D7D]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <img
          src={LogoImage}
          alt="Logo"
          className="relative w-10 h-10 md:w-12 md:h-12 border border-white/10 rounded-xl object-cover z-10"
        />
      </div>
      
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm md:text-base leading-tight tracking-tight">
          Emanuel <span className="text-[#FF4D7D]">Pagés</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
          Frontend Developer
        </span>
      </div>
    </motion.div>
  );
};

export default LogoContainer;