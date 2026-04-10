import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";

const Header = () => {
  const FooterTitle = TitlesFactory.createTitle(
    "secondary",
    "Available for new projects",
    "LET'S CREATE SOMETHING IMPACTFUL",
  );

  const ConnectButton = ButtonFactory.createButton({
    type: "primary",
    label: "GET IN TOUCH",
    onClick: () => window.open("https://linkedin.com...", "_blank"),
  });

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="[&>h4]:text-[#FF4D7D] [&>h4]:tracking-[0.4em] [&>h1]:text-4xl md:[&>h1]:text-6xl [&>h1]:font-black">
        {FooterTitle.render()}
      </div>
      {ConnectButton.render()}
    </div>
  );
};

export default Header;
