import { useEffect, useState } from "react";
//import Available from "./components/Available";
import Title from "./components/Title";
import { ButtonFactory } from "../../components/Buttons/ButtonFactory";
import TitleText from "./components/TitleText";

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
    "About Me",
    setTitleSelection,
    titleSelection
  );

  return (
    <section
      className="flex justify-center items-center w-full overflow-hidden"
      style={{ height: `${screenHeight}px` }}
    >
      <div className="w-full flex justify-center items-center min-h-screen pt-10">
        <div className="bg-circle-bg-image w-full min-h-screen flex justify-center items-center bg-cover bg-no-repeat bg-top flex-col gap-14">
          {/*<Available />*/}
          {titleSelection === "title" ? <Title /> : <TitleText />}
          {ContactMeButton.render()}
          {SelectorButton.render()}
        </div>
      </div>
    </section>
  );
};
