import LogoContainer from "./components/LogoContainer";
import NavLinksLeft from "./components/NavLinksLeft";
import NavLinksRight from "./components/NavLinksRight";

const NavBar: React.FC = () => {
  return (
    <nav className="w-[100%] flex justify-center items-center h-[8vh]">
      <div className="flex w-[80%] bg-black items-center text-white justify-between h-[100%] rounded-4xl p-2">
        <NavLinksLeft />
        <LogoContainer />
        <NavLinksRight />
      </div>
    </nav>
  );
};

export default NavBar;
