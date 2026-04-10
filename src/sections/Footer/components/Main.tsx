import LogoEP from "@/assets/images/epLogo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Main = () => {
  return (
    <div className="grid items-center w-full grid-cols-1 gap-10 py-12 md:grid-cols-3 border-y border-white/5">
      <div className="flex justify-center md:justify-start">
        <img
          src={LogoEP}
          className="transition-opacity border w-14 h-14 rounded-xl border-white/10 opacity-80 hover:opacity-100"
        />
      </div>
      <div className="text-center">
        <p className="max-w-xs mx-auto text-sm italic font-light leading-relaxed text-gray-400">
          Blending 10 years of{" "}
          <span className="text-white">Digital Marketing</span> with modern{" "}
          <span className="text-white">Frontend Engineering</span>.
        </p>
      </div>
      <div className="flex justify-center gap-8 text-2xl md:justify-end">
        <a
          href="https://github.com/emanuelpps"
          className="text-gray-500 hover:text-[#FF4D7D] transition-all"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/emanuel-ps"
          className="text-gray-400 hover:text-[#3DBFFF] transition-all"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Main;
