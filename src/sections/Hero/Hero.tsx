import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Title from "./components/Title";
import TitleText from "./components/TitleText";
import { ButtonFactory } from "@/components/Buttons/ButtonFactory";
import { useScroll } from "@/hooks/UseScroll";

export const Hero = () => {
  const { refs } = useScroll();
  const { scrollTo } = useScroll();
  const [titleSelection, setTitleSelection] = useState("title");

  const ContactMeButton = ButtonFactory.createButton({
    type: "primary",
    label: "Contact Me",
    onClick: () => scrollTo("contact"),
  });

  const SelectorButton = ButtonFactory.createButton({
    type: "selector",
    label: "Hello!",
    labelTwo: "About",
    setTitleSelection,
    titleSelection,
  });

  const lines = [
    {
      d: "M-200,150 Q100,50 400,150 T1000,150 Q1300,50 1600,150",
      color: "#FF006E",
      duration: 15,
      delay: 0,
    },
    {
      d: "M-200,200 Q100,300 400,200 T1000,200 Q1300,300 1600,200",
      color: "#FF1B8D",
      duration: 18,
      delay: 0.5,
    },
    {
      d: "M-200,250 Q100,150 400,250 T1000,250 Q1300,150 1600,250",
      color: "#8B3DFF",
      duration: 20,
      delay: 1.5,
    },
    {
      d: "M-200,300 Q100,400 400,300 T1000,300 Q1300,400 1600,300",
      color: "#3DBFFF",
      duration: 16,
      delay: 0.3,
    },
    {
      d: "M-200,350 Q100,250 400,350 T1000,350 Q1300,250 1600,350",
      color: "#5C8EFF",
      duration: 22,
      delay: 0.5,
    },
  ];
  return (
    <section
      ref={refs.refHome}
      className="flex flex-col justify-center items-center w-full overflow-hidden bg-[#0F1621] text-white  h-[600px] md:h-[95vh]"
    >
      <div className="absolute inset-0 h-full opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {lines.map((line, index) => (
            <motion.path
              key={index}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: [0, 100, 0],
              }}
              transition={{
                pathLength: {
                  duration: line.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: line.delay,
                },
                opacity: {
                  duration: line.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: line.delay,
                },
                x: {
                  duration: line.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: line.delay,
                },
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              r="2"
              fill={i % 2 === 0 ? "#FF006E" : "#3DBFFF"}
              filter="url(#glow)"
              initial={{
                cx: Math.random() * 1200,
                cy: Math.random() * 600,
                opacity: 0,
              }}
              animate={{
                cx: [
                  Math.random() * 1200,
                  Math.random() * 1200,
                  Math.random() * 1200,
                ],
                cy: [
                  Math.random() * 600,
                  Math.random() * 600,
                  Math.random() * 600,
                ],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 gap-10 relative z-10">
        <AnimatePresence mode="wait">
          {titleSelection === "title" ? (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Title />
            </motion.div>
          ) : (
            <motion.div
              key="titleText"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <TitleText />
            </motion.div>
          )}
          {ContactMeButton.render()}
        </AnimatePresence>
      </div>

      <div className="md:absolute bottom-20 md:bottom-10 relative z-10">
        {SelectorButton.render()}
      </div>
    </section>
  );
};
