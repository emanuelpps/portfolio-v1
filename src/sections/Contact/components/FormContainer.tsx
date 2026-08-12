import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Form } from "./Form";
import { SectionLabel } from "@/components/ui/Section";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";

const LINKS = [
  {
    Icon: FaEnvelope,
    label: "emanuelpages.ps@gmail.com",
    href: "mailto:emanuelpages.ps@gmail.com",
  },
  {
    Icon: FaGithub,
    label: "github.com/emanuelpps",
    href: "https://github.com/emanuelpps",
  },
  {
    Icon: FaLinkedin,
    label: "linkedin.com/in/emanuel-ps",
    href: "https://www.linkedin.com/in/emanuel-ps",
  },
];

export const FormContainer = () => {
  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionLabel index="05">Contact</SectionLabel>
        <AnimatedText
          el="h2"
          text="Let's build something that performs."
          className="mt-4 flex flex-wrap text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl"
        />
        <Reveal variant="blurIn" className="mt-6 max-w-md">
          <p className="text-lg font-light leading-relaxed text-gray-400">
            Open to frontend roles and freelance projects. Tell me what
            you&apos;re working on — I usually reply within a day.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {LINKS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-colors group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)]">
                <Icon size={16} />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <Form />
      </div>
    </div>
  );
};
