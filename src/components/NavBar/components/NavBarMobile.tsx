import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import MenuMobile from "./MenuMobile";
import { NavLinkProp } from "../types/NavLinkProp";

const NavBarMobile: React.FC<NavLinkProp> = ({
  hashSection,
  setHashSection,
}) => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const MenuHandler = () => {
    setDropDownVisible(!dropDownVisible);
  };
  return (
    <div className="relative flex items-center justify-end w-full px-5">
      <CgMenuRightAlt
        className="text-3xl text-white cursor-pointer"
        onClick={MenuHandler}
      />
      {dropDownVisible && (
        <MenuMobile hashSection={hashSection} setHashSection={setHashSection} />
      )}
    </div>
  );
};

export default NavBarMobile;
