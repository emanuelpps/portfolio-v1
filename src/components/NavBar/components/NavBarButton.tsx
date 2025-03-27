import { NavBarButtonProp } from "../types/NavLinkProp";

const NavBarButton: React.FC<NavBarButtonProp> = ({
  link,
  state,
  setHashSection,
}) => {
  return (
    <button
      className={`hover:bg-[#fd853abb] w-full h-[100%] rounded-4xl ml-1 mr-1 ${
        state === link.hash ? "bg-[#FD853A]" : ""
      }`}
      onClick={() => setHashSection(link.hash)}
    >
      <a href={link.hash} className="text-white">
        {link.label}
      </a>
    </button>
  );
};

export default NavBarButton;
