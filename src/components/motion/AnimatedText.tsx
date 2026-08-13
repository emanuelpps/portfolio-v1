import { motion } from "framer-motion";
import { EASE, MASK_HIDDEN_Y } from "@/lib/motion";

/** Splits text into words and reveals them with an overflow mask + stagger. */
export function AnimatedText({
  text,
  className,
  delay = 0,
  el = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  el?: "h1" | "h2" | "span";
}) {
  const words = text.split(" ");
  const Tag = motion[el] as typeof motion.span;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="text-mask inline-block align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: MASK_HIDDEN_Y },
              show: { y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
