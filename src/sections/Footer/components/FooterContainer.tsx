import Bottom from "./Bottom";
import Header from "./Header";
import Main from "./Main";

const FooterContainer = () => {
  return (
    <div className="flex flex-col items-center w-full gap-16 px-6 max-w-7xl">
      <Header />
      <Main />
      <Bottom />
    </div>
  );
};

export default FooterContainer;
