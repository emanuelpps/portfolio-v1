import { motion } from "framer-motion";

export const LoadingDots = () => {
  const dotTransition = {
    repeat: Infinity,
    duration: 1,
    ease: "easeInOut",
    repeatType: "loop" as const,
  };

  return (
    <div className="flex items-center gap-1">
      <p className="text-white text-sm">Sending</p>
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ ...dotTransition, delay: 0.2 }}
      />
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ ...dotTransition, delay: 0.4 }}
      />
    </div>
  );
};
