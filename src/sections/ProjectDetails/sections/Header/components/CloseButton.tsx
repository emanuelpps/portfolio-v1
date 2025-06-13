import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";

export const CloseButton = () => {
  return (
    <>
      <Link
        to="/"
        className="absolute text-white transition-colors duration-200 top-5 justify-end items-center flex w-[95vw] hover:text-gray-400"
        aria-label="Close project view"
      >
        <RiCloseLargeLine size={24} className="cursor-pointer" />
      </Link>
    </>
  );
};
