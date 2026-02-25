import { motion } from "framer-motion";

const Title = () => (
  <div className="space-y-4">
    <motion.h4
      className="text-[#FF4D7D] font-mono tracking-[0.4em] text-sm uppercase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Creative Developer
    </motion.h4>
    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
      EMANUEL{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D7D] to-purple-500">
        PAGÉS
      </span>
    </h1>
    <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
      Blending{" "}
      <span className="text-white font-medium">10 years of Marketing DNA</span>{" "}
      with modern Frontend engineering.
    </p>
  </div>
);

export default Title;
