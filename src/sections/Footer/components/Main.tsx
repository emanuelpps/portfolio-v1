import { FaGithub, FaLinkedin } from "react-icons/fa";
import LogoEP from "@/assets/images/epLogo.png";

const Main = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-5 md:flex-row">
        <div className="flex items-center justify-center w-[50%]">
          <img
            src={LogoEP}
            className="border border-gray-800 w-[80px] rounded-2xl"
          />
        </div>
        <div className="flex items-center justify-center w-full text-pretty">
          My name is Emanuel Pagés, I have been working as a developer for two
          years, and I bring over 10 years of experience in Marketing and
          Digital Products. This background has given me a unique perspective
          that allows me to see things from both a user’s and a developer’s
          perspective, creating solutions that are not just functional but truly
          impactful.
        </div>
        <div className="flex  items-center justify-center w-[50%] md:gap-4 gap-20 text-2xl text-gray-400">
          <a
            href="https://github.com/emanuelpps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[35px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/emanuel-ps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-[35px]" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Main;
