import { motion } from "framer-motion";

const Title = () => (
  <div className="space-y-4">
    <motion.h4
      className="text-[#FF4D7D] tracking-[0.4em] text-sm uppercase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Creative Developer
    </motion.h4>
    <h1 className="text-5xl font-black tracking-tighter text-white md:text-8xl">
      EMANUEL{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D7D] to-purple-500">
        PAGÉS
      </span>
    </h1>
    <p className="max-w-2xl mx-auto text-lg font-light tracking-wide text-gray-400 md:text-xl">
      Blending{" "}
      <span className="font-medium text-white">
        10 years of Digital Marketing{" "}
      </span>{" "}
      with modern Frontend engineering.
    </p>
  </div>
);

export default Title;
