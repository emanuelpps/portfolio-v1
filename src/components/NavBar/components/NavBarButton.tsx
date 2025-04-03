import { NavBarButtonProp } from "../types/NavLinkProp";

const NavBarButton: React.FC<NavBarButtonProp> = ({
  link,
  state,
  setHashSection,
}) => {
  return (
    <button
      className={`hover:bg-[#FF4D7D] w-full h-[100%] rounded-2xl ml-1 mr-1 ${
        state === link.hash ? "bg-[#FF4D7D]" : ""
      }`}
      onClick={() => setHashSection(link.hash)}
    >
      <a href={link.hash}>{link.label}</a>
    </button>
  );
};

export default NavBarButton;
