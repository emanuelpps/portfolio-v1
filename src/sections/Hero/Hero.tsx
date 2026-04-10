import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonFactory } from "@/components/Buttons/ButtonFactory";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import Title from "./components/Title";
import TitleText from "./components/TitleText";

export const Hero = () => {
  const { refs, scrollTo } = useAppScroll();
  const [titleSelection, setTitleSelection] = useState("title");

  const ContactMeButton = ButtonFactory.createButton({
    type: "primary",
    label: "Let's Talk",
    onClick: () => scrollTo("contact"),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8 px-3 sm:px-4 py-1 rounded-full border border-[#FF4D7D]/30 bg-[#FF4D7D]/10 backdrop-blur-md"
      >
        <span className="text-[#FF4D7D] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF4D7D] rounded-full animate-pulse" />
          Available for new projects
        </span>
      </motion.div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl gap-12 mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={titleSelection}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="text-center"
          >
            {titleSelection === "title" ? <Title /> : <TitleText />}
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col items-center h-auto gap-6 md:flex-row">
          {ContactMeButton.render()}
          <div className="bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 flex gap-2">
            {["title", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() => setTitleSelection(tab)}
                className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  titleSelection === tab
                    ? "bg-[#FF4D7D] text-white shadow-[0_0_20px_rgba(255,77,125,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "title" ? "Hello" : "About"}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute hidden md:block flex justify-center w-6 h-10 p-1 border-2 rounded-full bottom-10 border-white/20"
      >
        <div className="w-1 h-2 bg-[#FF4D7D] rounded-full mx-auto" />
      </motion.div>
    </section>
  );
};
