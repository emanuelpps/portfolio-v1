import { useEffect, useState } from "react";
import Title from "./components/Title";
import TitleText from "./components/TitleText";
import { ButtonFactory } from "../../components/Buttons/ButtonFactory";

export const Hero = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [titleSelection, setTitleSelection] = useState("title");

  useEffect(() => {
    const updateHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const ContactMeButton = ButtonFactory.createButton("primary", "Contact Me");
  const SelectorButton = ButtonFactory.createButton(
    "selector",
    "Title",
    "About",
    setTitleSelection,
    titleSelection
  );

  return (
    <section
      className="flex flex-col justify-center items-center w-full overflow-hidden bg-[#0F1621] text-white relative"
      style={{ height: `${screenHeight}px` }}
    >
      <div className="flex flex-col justify-center items-center flex-1 gap-10">
        {titleSelection === "title" ? <Title /> : <TitleText />}
        {ContactMeButton.render()}
      </div>
      <div className="absolute bottom-10">{SelectorButton.render()}</div>
    </section>
  );
};
