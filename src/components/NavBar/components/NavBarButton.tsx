import { NavBarButtonProp } from "../types/NavLinkProp";
import { useScroll } from "@/hooks/UseScroll";

const NavBarButton: React.FC<NavBarButtonProp> = ({
  link,
  state,
  setHashSection,
  showDropDown,
  showDropDownVisible,
}) => {
  const { scrollTo } = useScroll();

  const isActive = state === link.hash;
  const isExternal = link.hash.startsWith("http");

  const handleClick = () => {
    if (isExternal) {
      window.open(link.hash, "_blank");
    } else {
      const sectionName = link.hash.replace("#", "") as
        | "home"
        | "skills"
        | "experience"
        | "projects"
        | "contact";
      scrollTo(sectionName);
      setHashSection(link.hash);
      if (showDropDown && showDropDownVisible) {
        showDropDown(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-2 py-1 font-medium transition-colors duration-300 text-md group cursor-pointer"
    >
      <div
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
      </div>
    </button>
  );
};

export default NavBarButton;
