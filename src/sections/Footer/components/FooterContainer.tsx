import Bottom from "./Bottom";
import Header from "./Header";
import Main from "./Main";
import Separator from "./Separator";

const FooterContainer = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="backdrop-blur-lg shadow-lg w-full max-w-7xl h-full flex flex-col items-center rounded-2xl gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] bg-gray-900/50 justify-center">
        <Header />
        <Separator />
        <Main />
        <Separator />
        <Bottom />
      </div>
    </div>
  );
};

export default FooterContainer;
