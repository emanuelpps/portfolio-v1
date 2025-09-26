import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Title from "./components/Title";
import TitleText from "./components/TitleText";
import { ButtonFactory } from "@/components/Buttons/ButtonFactory";
import { useScroll } from "@/hooks/UseScroll";

export const Hero = () => {
  const { refs } = useScroll();
  const { scrollTo } = useScroll()
  /*   const [screenHeight, setScreenHeight] = useState(window.innerHeight); */
  const [titleSelection, setTitleSelection] = useState("title");

  /*   useEffect(() => {
    const updateHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []); */
  const ContactMeButton = ButtonFactory.createButton({
    type: "primary",
    label: "Contact Me",
    onClick: () => scrollTo("contact")
  });

  const SelectorButton = ButtonFactory.createButton({
    type: "selector",
    label: "Hello!",
    labelTwo: "About",
    setTitleSelection,
    titleSelection,
  });

  return (
    <section
      ref={refs.refHome}
      className="flex flex-col justify-center items-center w-full overflow-hidden bg-[#0F1621] text-white relative h-[600px] md:h-[95vh]"
      /* style={{ height: `${screenHeight}px` }} */
    >
      <div className="flex flex-col items-center justify-center flex-1 gap-10">
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
      <div className="md:absolute bottom-20 md:bottom-10">
        {SelectorButton.render()}
      </div>
    </section>
  );
};
