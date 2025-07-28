import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import MenuMobile from "./MenuMobile";

interface NavBarMobileProps {
  hashSection: string;
  setHashSection: (hash: string) => void;
}

const NavBarMobile: React.FC<NavBarMobileProps> = ({
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
        <MenuMobile
          hashSection={hashSection}
          setHashSection={setHashSection}
          showDropDown={setDropDownVisible}
          showDropDownVisible={dropDownVisible}
        />
      )}
    </div>
  );
};

export default NavBarMobile;
