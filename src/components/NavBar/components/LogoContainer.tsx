import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LogoImage from "/assets/images/epLogo.png";

const LogoContainer = () => {
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCentered((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-center items-center relative h-[60px] text-white">
      <motion.div
        className="absolute flex items-center justify-center gap-2"
        animate={{
          x: isCentered ? 0 : 0,
          y: isCentered ? 0 : 0,
        }}
      >
        <motion.img
          src={LogoImage}
          className="border border-gray-800 w-[50px] rounded-2xl"
          animate={{
            x: isCentered ? 60 : 0,
            y: isCentered ? 0 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          animate={{
            opacity: isCentered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-semibold text-[0.8rem] leading-3">
            Emanuel Pagés
            <br />
            <span className="font-extralight">Frontend Developer</span>
          </h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogoContainer;
