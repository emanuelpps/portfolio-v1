import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LogoImage from "/assets/images/epLogo.png";

interface LogoContainerProps {
  screenWidth?: number;
}

const LogoContainer: React.FC<LogoContainerProps> = ({ screenWidth }) => {
  const [isCentered, setIsCentered] = useState(false);
  const isMobile = screenWidth !== undefined && screenWidth <= 1023;

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setIsCentered((prev) => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <div className="flex w-full md:justify-center items-center relative h-[60px] text-white overflow-hidden">
      <motion.div
        className={`absolute flex items-center gap-2 z-50 ${
          isMobile ? "pl-4 bg-[#0f1621] " : ""
        }`}
        animate={{
          x: isMobile ? 0 : isCentered ? 0 : 0,
          y: 0,
        }}
      >
        <motion.img
          src={LogoImage}
          className="relative border border-gray-800 w-[50px] rounded-2xl z-20"
          animate={{
            x: isMobile ? 0 : isCentered ? 60 : 0,
            y: 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {isMobile ? (
          <motion.div
            className="absolute left-[40px]  z-10"
            initial={{ x: -80, opacity: 0 }}
            animate={{
              x: [-80, 10, 10, -80],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          >
            <h3 className="font-semibold text-[0.8rem] leading-3 whitespace-nowrap relative z-10">
              Emanuel Pagés
              <br />
              <span className="font-extralight">Frontend Developer</span>
            </h3>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: isCentered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-[0.8rem] leading-3 whitespace-nowrap">
              Emanuel Pagés
              <br />
              <span className="font-extralight">Frontend Developer</span>
            </h3>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LogoContainer;
