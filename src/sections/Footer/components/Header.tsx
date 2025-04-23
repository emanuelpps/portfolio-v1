import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
const Header = () => {
  const FooterTitle = TitlesFactory.createTitle("secondary", "Lets Connect");
  const ConnectButton = ButtonFactory.createButton({
    type: "secondary",
    label: "Connect with me",
  });
  return (
    <div className="flex justify-between w-full">
      {FooterTitle.render()}
      {ConnectButton.render()}
    </div>
  );
};

export default Header;
