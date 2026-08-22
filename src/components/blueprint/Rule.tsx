import { DrawIn } from "./DrawIn";

/**
 * A horizontal hairline that begins at the stem and runs to the right edge —
 * one bar of the E hanging off its spine.
 *
 * `tick` pokes the line a few pixels past the stem to the left, so the join
 * reads as a crossing rather than a corner. Section-opening rules use it;
 * rules that merely divide content inside a section do not.
 */
export function Rule({
  tick = false,
  delay = 0,
  soft = false,
  className = "",
}: {
  tick?: boolean;
  delay?: number;
  soft?: boolean;
  className?: string;
}) {
  const color = soft ? "bg-rule-soft" : "bg-rule";

  return (
    <div className={`relative from-stem h-px ${className}`}>
      <DrawIn delay={delay} className="h-px w-full" stroke={color} />
      {tick && (
        <span
          aria-hidden
          className={`absolute right-full top-0 h-px w-2 ${color}`}
        />
      )}
    </div>
  );
}
