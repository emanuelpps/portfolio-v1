import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch } from "react-router-dom";
import LogoEP from "@/assets/images/epLogo.png";
import { useScroll } from "@/hooks/UseScroll";
import { getLenis } from "@/lib/SmoothScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";

type SectionKey = "home" | "skills" | "experience" | "projects" | "contact";

const LINKS: { label: string; to: SectionKey }[] = [
  { label: "Work", to: "projects" },
  { label: "Stack", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Contact", to: "contact" },
];

const NavBar: React.FC = () => {
  const { scrollTo } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onProjectPage = useMatch("/project/:projectId");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (to: SectionKey) => {
    setOpen(false);
    // allow the overlay to start closing before scrolling
    setTimeout(() => scrollTo(to), open ? 280 : 0);
  };

  // The project-detail overlay is fullscreen with its own close button —
  // hide the site nav while it is open.
  if (onProjectPage) return null;

  return (
    <header className="fixed left-0 top-0 z-[100] flex w-full justify-center py-4 md:py-6">
      <nav
        className={`flex items-center justify-between gap-6 px-4 py-2 transition-all duration-500 ease-in-out md:px-6 ${
          scrolled
            ? "w-[94%] rounded-full border border-white/10 bg-black/50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:w-[82%]"
            : "w-full rounded-2xl border border-transparent bg-transparent md:w-[92%]"
        }`}
      >
        {/* Left — logo */}
        <div className="flex flex-1 justify-start">
          <button
            onClick={() => go("home")}
            data-cursor="hover"
            aria-label="Back to top"
            className="flex-shrink-0"
          >
            <img
              src={LogoEP}
              alt="Emanuel Pagés"
              className="h-10 w-10 rounded-xl border border-white/10 opacity-90 transition-opacity hover:opacity-100"
            />
          </button>
        </div>

        {/* Center — links */}
        <div className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              data-cursor="hover"
              className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--accent)] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Right — action / menu toggle */}
        <div className="flex flex-1 items-center justify-end">
          <div className="hidden lg:block">
            <MagneticButton
              onClick={() => go("contact")}
              data-cursor="hover"
              className="rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(255,77,125,0.35)] transition-transform"
            >
              Let&apos;s talk
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-8 bg-[color:var(--bg)]/95 backdrop-blur-2xl lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.to}
                onClick={() => go(l.to)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE }}
                className="text-4xl font-black tracking-tight text-white"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => go("contact")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + LINKS.length * 0.07, duration: 0.5, ease: EASE }}
              className="mt-4 rounded-full bg-[color:var(--accent)] px-8 py-3 text-base font-bold text-white"
            >
              Let&apos;s talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
