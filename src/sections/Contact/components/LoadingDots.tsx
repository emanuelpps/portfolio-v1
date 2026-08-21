import { motion } from "framer-motion";

/**
 * Progress drawn as strokes rather than dots — a circle would be the only
 * curve on the site that is not the P's bowl.
 */
export const LoadingDots = () => {
  return (
    <span className="flex items-center gap-2">
      <span>Sending</span>
      <span className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-px w-3 bg-current"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </span>
    </span>
  );
};
