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

  return (
    <section
      ref={refs.refHome}
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 px-4 py-1.5 rounded-full border border-[#FF4D7D]/30 bg-[#FF4D7D]/10 backdrop-blur-md"
      >
        <span className="text-[#FF4D7D] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
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
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
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
        className="absolute flex justify-center w-6 h-10 p-1 border-2 rounded-full bottom-10 border-white/20"
      >
        <div className="w-1 h-2 bg-[#FF4D7D] rounded-full" />
      </motion.div>
    </section>
  );
};
