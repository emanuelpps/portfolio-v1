import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
const Header = () => {
  const FooterTitle = TitlesFactory.createTitle("secondary", "Lets Connect");
  const ConnectButton = ButtonFactory.createButton({
    type: "secondary",
    label: "Connect with me",
  });
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between w-full">
      {FooterTitle.render()}
      {ConnectButton.render()}
    </div>
  );
};

export default Header;
