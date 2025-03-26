import LogoContainer from "./components/LogoContainer";
import NavLinksLeft from "./components/NavLinksLeft";
import NavLinksRight from "./components/NavLinksRight";

const NavBar = () => {
  return (
    <nav className="w-[100%] flex justify-center items-center">
      <div className="flex w-[80%] bg-black items-center text-white justify-between">
        <NavLinksLeft />
        <LogoContainer />
        <NavLinksRight />
      </div>
    </nav>
  );
};

export default NavBar;
