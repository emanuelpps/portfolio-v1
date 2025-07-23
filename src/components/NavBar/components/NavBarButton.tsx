import { NavBarButtonProp } from "../types/NavLinkProp";

const NavBarButton: React.FC<NavBarButtonProp> = ({
  link,
  state,
  setHashSection,
}) => {
  const isActive = state === link.hash;
  const isExternal = link.hash.startsWith("http");

  return (
    <button
      onClick={() => setHashSection(link.hash)}
      className="relative px-2 py-1 font-medium transition-colors duration-300 text-md group"
    >
      <a
        href={link.hash}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`text-white transition-colors duration-300 ${
          isActive ? "text-[#FF4D7D]" : "hover:text-[#FF4D7D]"
        }`}
      >
        {link.label}
        <span
          className={`block h-[1px] mt-[2px] bg-[#FF4D7D] transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </a>
    </button>
  );
};

export default NavBarButton;
