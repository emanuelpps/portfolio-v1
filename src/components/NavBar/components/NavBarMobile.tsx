import React, { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import MenuMobile from "./MenuMobile";

const NavBarMobile: React.FC = () => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const MenuHandler = () => {
    setDropDownVisible(!dropDownVisible);
  };
  return (
    <div className="relative flex items-center justify-end w-full px-4">
      <CgMenuRightAlt
        className="text-3xl text-white cursor-pointer"
        onClick={MenuHandler}
      />
      {dropDownVisible && <MenuMobile />}
    </div>
  );
};

export default NavBarMobile;
