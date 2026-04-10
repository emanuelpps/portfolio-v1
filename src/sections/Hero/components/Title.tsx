import { motion } from "framer-motion";

const Title = () => (
  <div className="space-y-4 min-h-[280px] flex flex-col justify-center">
    <motion.h4
      className="text-[#FF4D7D] tracking-[0.4em] text-sm uppercase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Creative Developer
    </motion.h4>
    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white md:text-8xl leading-tight">
      EMANUEL{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D7D] to-purple-500">
        PAGÉS
      </span>
    </h1>
    <p className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-md font-light tracking-wide text-gray-400 md:text-xl px-2 sm:px-0">
      Bringing together{" "}
      <span className="font-medium text-white">
        10 years of Digital Marketing experience
      </span>{" "}
      and +3 years of modern{" "}
      <span className="italic text-white">frontend development. </span>
    </p>
  </div>
);

export default Title;
