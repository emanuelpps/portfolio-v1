import { motion } from "framer-motion";
import { useScroll } from "@/hooks/UseScroll";

interface NavBarButtonProps {
  link: { hash: string; label: string };
  state: string;
  setHashSection: (hash: string) => void;
}

const NavBarButton = ({ link, state, setHashSection }: NavBarButtonProps) => {
  const { scrollTo } = useScroll();
  const isActive = state === link.hash;

  const handleClick = () => {
    if (link.hash.startsWith("http")) {
      window.open(link.hash, "_blank");
    } else {
      const section = link.hash.replace("#", "") as
        | "home"
        | "skills"
        | "experience"
        | "projects"
        | "contact";
      scrollTo(section);
      setHashSection(link.hash);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-5 py-2 text-sm font-medium transition-colors duration-300 group outline-none cursor-pointer"
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
        }`}
      >
        {link.label}
      </span>

      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-gradient-to-r from-[#FF4D7D] to-[#ff759b] shadow-[0_0_15px_rgba(255,77,125,0.4)]"
          style={{ borderRadius: 9999 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
};

export default NavBarButton;
