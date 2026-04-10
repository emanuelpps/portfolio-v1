import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const ySlow = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const yMid = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const yFast = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 5]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030712]">
      <motion.div style={{ y: ySlow }} className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF4D7D]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <motion.svg
        style={{ y: yMid, rotate }}
        className="absolute inset-0 w-full h-[120%] opacity-40"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#FF4D7D" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3DBFFF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="bloom">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {[
          {
            d: "M-200,200 C200,100 400,300 800,200 S1400,300 1600,200",
            grad: "grad-pink",
            dur: 18,
          },
          {
            d: "M-200,400 C300,500 600,200 900,400 S1300,300 1600,400",
            grad: "grad-blue",
            dur: 22,
          },
          {
            d: "M-200,600 C100,500 500,700 800,600 S1200,500 1600,600",
            grad: "grad-pink",
            dur: 20,
          },
        ].map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            stroke={`url(#${line.grad})`}
            strokeWidth="2"
            fill="none"
            filter="url(#bloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: line.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </motion.svg>
      <motion.div style={{ y: yFast }} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
