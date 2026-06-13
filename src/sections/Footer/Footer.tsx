import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useScroll } from "@/hooks/UseScroll";
import { getLenis } from "@/lib/SmoothScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AnimatedText } from "@/components/motion/AnimatedText";

const Footer = () => {
  const { scrollTo } = useScroll();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/10 px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-[80rem]">
        <div className="flex flex-col items-center gap-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--accent)]">
            Available for new projects
          </span>
          <AnimatedText
            el="h2"
            text="Let's create something impactful."
            className="flex flex-wrap justify-center text-4xl font-black tracking-tight text-white sm:text-6xl"
          />
          <MagneticButton
            onClick={() => scrollTo("contact")}
            data-cursor="hover"
            className="rounded-full bg-[color:var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,77,125,0.4)]"
          >
            Get in touch
          </MagneticButton>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">© 2026 Emanuel Pagés</p>
          <p className="text-xs text-gray-600">
            Built with React, TypeScript &amp; Framer Motion.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/emanuelpps"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="GitHub"
              className="text-gray-500 transition-colors hover:text-[color:var(--accent)]"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/emanuel-ps"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="LinkedIn"
              className="text-gray-500 transition-colors hover:text-[#3DBFFF]"
            >
              <FaLinkedin size={20} />
            </a>
            <button
              onClick={toTop}
              data-cursor="hover"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
