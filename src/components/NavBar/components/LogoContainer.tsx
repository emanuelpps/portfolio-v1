import LogoImage from "../../../../public/assets/images/epLogo.png";
const LogoContainer = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex justify-center items-center w-full gap-1">
        <div>
          <img src={LogoImage} className="w-[50px] rounded-2xl p-1" />
        </div>
        <div>
          <h3 className="font-semibold text-[0.8rem] leading-3">
            Emanuel Pages
            <br />
            <span className="font-extralight">Frontend Developer</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;
